m$.quizzer.events(_$ => {
    var numerical_input = _$("input[type='number'].submission");

    if (numerical_input) {
        numerical_input[0].addEventListener("keypress", e => {
            return _$.api.validate_character({ value: String.fromCharCode(e.charCode), e: e });
        });
    }

    _$(".submission")[0].addEventListener("keypress", e => {
        if (e.key == "Enter") _$.api.submit({ submission: e.target.value });
    });

    _$("#trust-correct")[0].addEventListener("click", () => {
        _$.api.force_grade({ correct: true })
    });
    _$("#trust-incorrect")[0].addEventListener("click", () => {
        _$.api.force_grade({ correct: false })
    });
});