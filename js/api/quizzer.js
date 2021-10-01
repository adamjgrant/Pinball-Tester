m$.quizzer.api({
    start_quiz: function(_$, options) {
        this.slides_completed = -1;
        this.number_correct = 0;
        this.number_incorrect = 0;
        this.deck = m$.utilities.api.shuffle({ array: deck });
        this.card = {
            question: undefined,
            answer: undefined,
        };
        this.timer = 0;
        this.clock_display_timer = 0;
        this.time_remaining_in_seconds = 0;

        // Bringing this value in here to work with "choose for me"
        this.session_quiz_type = m$.settings.quiz_type;
        if (this.session_quiz_type === "pick_one") {
            this.session_quiz_type = Math.random() >= .5 ? "names" : "numbers";
        }

        _$.api.toggle_tabs({ from: "results", to: "quiz" });
        m$.results.api.register_new_score();
        _$.api.next_card();
        m$.navigation.api.disable_tab_by_name({ name: "settings" });
        m$.after_trust_message.api.hide_and_reset();
    },

    flip_trust_mode: function(_$, options) {
        const me = _$()[0];
        m$.utilities.api.set_cache({ key: "trust_mode", value: options.enabled });
        me.dataset.showTrustMode = String(options.enabled);
    },

    next_card: function(_$, options) {
        this.slides_completed++;

        if (this.slides_completed >= m$.settings.slides_per_session) {
            return _$.api.finish_session();
        }

        let submission_type = "number";
        const randomly_choose_names_for_this_card = this.session_quiz_type === "mixed_and_random" && Math.random() >= .5;
        if (this.session_quiz_type === "names" || randomly_choose_names_for_this_card) {
            submission_type = "text"
        }

        if (submission_type === "number") {
            [this.card.question, this.card.answer] = this.deck.pop();
        } else {
            [this.card.answer, this.card.question] = this.deck.pop();
        }

        _$(".submission")[0].type = submission_type;
        _$(".display")[0].innerHTML = this.card.question;
        _$(".submission")[0].value = "";

        _$.api.update_progress_bar({
            classname: "session",
            value: this.slides_completed <= 0 ? 0 : (this.slides_completed / m$.settings.slides_per_session) * 100
        });

        _$.api.focus_input();
        _$.api.reset_card_timer();
    },

    update_progress_bar: (_$, options) => {
        var bar = _$(`.progress.${options.classname} .bar`)[0]
        bar.style.width = `${options.value}%`;
    },

    stop_quiz: (_$, options) => {
        _$.api.kill_card_timer();
        _$.api.kill_clock_display_timer();
    },

    focus_input: (_$, options) => {
        if (m$.settings.api.is_in_trust_mode()) return;
        _$("input")[0].focus();
    },

    kill_card_timer: function(_$, options) {
        _$.api.set_clock_face({
            time: m$.utilities.api.convert_seconds_to_time({ seconds: 0 })
        });
        clearInterval(this.timer);
    },

    start_card_timer: function(_$, options) {
        this.timer = setInterval(() => {
            m$.after_trust_message.api.hide_and_reset();
            _$.api.submit()
        }, m$.settings.speed_in_seconds * 1000);
        _$.api.reset_clock_display_timer();
    },

    reset_card_timer: (_$, options) => {
        _$.api.kill_card_timer();
        _$.api.start_card_timer();
    },

    kill_clock_display_timer: function(_$, options) {
        clearInterval(this.clock_display_timer);
    },

    start_clock_display_timer: function(_$, options) {
        this.time_remaining_in_seconds = m$.settings.speed_in_seconds;
        _$.api.update_clock_face();
        this.clock_display_timer = setInterval(_$.api.update_clock_face, 1000);
    },

    reset_clock_display_timer: function(_$, options) {
        _$.api.kill_clock_display_timer();
        _$.api.start_clock_display_timer();
    },

    update_clock_face: function(_$, options) {
        this.time_remaining_in_seconds--;
        _$.api.set_clock_face({ seconds: this.time_remaining_in_seconds });
    },

    set_clock_face: (_$, options) => {
        _$(".clock")[0].innerHTML = m$.utilities.api.convert_seconds_to_time({ seconds: options.seconds });
        var percent_complete;

        if (options.seconds > 0) {
            percent_complete = 100 - ((options.seconds + 1) / m$.settings.speed_in_seconds * 100)
        } else {
            percent_complete = 100;
        }

        _$.api.update_progress_bar({
            classname: "card",
            value: percent_complete
        });
    },

    validate_character: (_$, options) => {
        // TODO: This doesn't accept the command key, such as command+a
        if (options.e.target.type == "number" && !/\d/.test(options.value)) return options.e.preventDefault();
    },

    submit: function(_$, options) {
        var actual, expected;

        options = options || { submission: _$(".submission")[0].value }

        actual = String(this.card.answer).toLowerCase();
        expected = String(options.submission).toLowerCase();

        if (
            actual == expected ||
            actual + "s" == expected ||
            actual + "ies" == expected ||
            actual == expected + "s" ||
            actual == expected + "ies"
        ) {
            _$.api.grade_correct({ submission: options.submission });
        } else {
            _$.api.grade_incorrect({ submission: options.submission });
        }

        _$.api.next_card();
    },

    grade_correct: function(_$, options) {
        this.number_correct++;
        m$.navigation.api.toggle_class({ classname: "correct" });
        _$.api.toggle_submission_class({ classname: "correct" });
        m$.results.api.update_last_score({ submission: options.submission, correct: true });
    },

    grade_incorrect: function(_$, options) {
        console.info("Should be", this.card.answer);
        this.number_incorrect++;
        m$.navigation.api.toggle_class({ classname: "incorrect" });
        _$.api.toggle_submission_class({ classname: "incorrect" });
        m$.results.api.update_last_score({ submission: options.submission, correct: false });
    },

    force_grade: function(_$, options) {
        if (options.correct) {
            _$.api.grade_correct({ submission: String(this.card.answer) });
            m$.after_trust_message.api.set_trusted_answer({
                answer: String(this.card.answer)
            })
        } else {
            _$.api.grade_incorrect({ submission: "(Trust mode)" });
            m$.after_trust_message.api.hide_and_reset();
        }
        _$.api.next_card();
    },

    force_previous_grade_incorrect: function(_$, options) {
        this.number_correct--;
        this.number_incorrect++;
        m$.results.api.update_penultimate_score({ submission: "(Trust mode)", correct: false });
    },

    toggle_submission_class: (_$, options) => {
        var sub = _$(".submission")[0]
        sub.classList.add(options.classname);
        setTimeout(() => {
            sub.classList.remove(options.classname);
        }, 300);
    },

    finish_session: function(_$, options) {
        _$.api.stop_quiz();
        m$.results.api.finalize_last_score();
        _$.api.toggle_tabs({ from: "quiz", to: "results" });
        m$.navigation.api.enable_tab_by_name({ name: "settings" });
    }
});