m$.settings.api({
    set_quiz_type: function(_$, options) {
        _$("input[type='radio']")[0].checked = options.quiz_type == "numbers";
        _$("input[type='radio']")[1].checked = options.quiz_type == "names";
        _$("input[type='radio']")[2].checked = options.quiz_type == "pick_one";
        _$("input[type='radio']")[3].checked = options.quiz_type == "mixed_and_random";

        this.quiz_type = options.quiz_type;

        m$.settings.api.set_cache({
            key: "quiz_type",
            value: options.quiz_type
        });
    },

    set_slides_per_session: function(_$, options) {
        _$("input[type='number']")[0].value = options.slides;

        m$.settings.api.set_cache({
            key: "slides_per_session",
            value: parseInt(options.slides)
        });

        this.slides_per_session = Math.min(options.slides, deck.length);
    },

    set_difficulty: function(_$, options) {
        _$("input[type='range']")[0].value = options.difficulty;

        m$.settings.api.set_cache({
            key: "difficulty",
            value: parseInt(options.difficulty)
        });

        this.speed = options.difficulty;
        this.speed_in_seconds = 101 - this.speed;
        _$(".speed_readout")[0].innerHTML = m$.utilities.api.convert_seconds_to_time({ seconds: this.speed_in_seconds });
        this.time_remaining_in_seconds = this.speed_in_seconds;
        this.time = m$.utilities.api.convert_seconds_to_time({ seconds: this.speed_in_seconds });
    },

    set_trust_mode: function(_$, options) {
        _$("input[name='trust-mode']")[0].checked = options.enabled;
        m$.quizzer.api.flip_trust_mode(options);
    },

    is_in_trust_mode: function(_$, options) {
        return m$.settings.api.get_cache({ key: "trust_mode" }) === true;
    },

    set_defaults: function(_$, options) {
        const defaults = {
            quiz_type: "pick_one",
            trust_mode: true,
            slides_per_session: Math.min(20, deck.length),
            difficulty: 50
        };

        var difficulty,
            slides_per_session,
            quiz_type,
            trust_mode;

        difficulty = m$.settings.api.get_cache({ key: "difficulty" }) || defaults.difficulty;
        slides_per_session = m$.settings.api.get_cache({ key: "slides_per_session" }) || defaults.slides_per_session;
        quiz_type = m$.settings.api.get_cache({ key: "quiz_type" }) || defaults.quiz_type;
        trust_mode = m$.settings.api.get_cache({ key: "trust_mode" }) || defaults.trust_mode;

        _$.api.set_difficulty({ difficulty: difficulty });
        _$.api.set_slides_per_session({ slides: Math.min(slides_per_session, deck.length) });
        _$.api.set_quiz_type({ quiz_type: quiz_type });
        _$.api.set_trust_mode({ enabled: trust_mode });
    }
});