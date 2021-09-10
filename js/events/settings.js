m$.settings.events(_$ => {
    _$("button")[0].addEventListener("click", m$.quizzer.api.start_quiz);

    _$("input[type='radio']").forEach(el => {
        (el => {
            el.addEventListener("click", e => {
                _$.api.set_quiz_type({ is_number_type: e.target.value == "numbers" });
            });
        })(el)
    });

    _$("input[type='number']")[0].addEventListener("change", e => {
        _$.api.set_slides_per_session({ slides: e.target.value });
    });

    _$("input[type='range']")[0].addEventListener("change", e => {
        _$.api.set_difficulty({ difficulty: e.target.value });
    });

    _$("input[name='trust-mode']")[0].addEventListener("click", e => {
        m$.quizzer.api.flip_trust_mode({ enabled: e.target.checked });
    });

    _$.api.set_defaults();
});