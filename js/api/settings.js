m$.settings.api({
    set_quiz_type: function(_$, options) {
        _$("input[type='radio']")[0].checked = options.is_number_type;
        _$("input[type='radio']")[1].checked = !options.is_number_type;
        this.quiz_type = options.is_number_type ? "numbers" : "names";

        m$.settings.api.set_cache({
            key: "is_number_type",
            value: options.is_number_type
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
        var difficulty,
            slides_per_session,
            is_number_type,
            trust_mode;

        difficulty = m$.settings.api.get_cache({ key: "difficulty" });
        slides_per_session = m$.settings.api.get_cache({ key: "slides_per_session" }) || deck.length;
        is_number_type = m$.settings.api.get_cache({ key: "is_number_type" });
        trust_mode = m$.settings.api.get_cache({ key: "trust_mode" });

        _$.api.set_difficulty({ difficulty: difficulty });
        _$.api.set_slides_per_session({ slides: Math.min(slides_per_session, deck.length) });
        _$.api.set_quiz_type({ is_number_type: is_number_type });
        _$.api.set_trust_mode({ enabled: (trust_mode === undefined ? true : trust_mode) });
    }
});