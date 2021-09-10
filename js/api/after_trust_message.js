m$.after_trust_message.api({
    set_trusted_answer: (_$, options) => {
        _$(".trusted-answer")[0].innerHTML = options.answer;
        _$.api.show_and_reset();
    },

    hide_and_reset: (_$, options) => {
        _$()[0].classList.add("hide");
        _$.api.reset();
    },

    show_and_reset: (_$, options) => {
        _$()[0].classList.remove("hide");
        _$.api.reset();
    },

    reset: (_$, options) => {
        _$("a")[0].classList.remove("hide");
        _$(".graded-wrong-message")[0].classList.add("hide");
    },

    reverse_grade: (_$, options) => {
        m$.quizzer.api.force_previous_grade_incorrect();
        _$("a")[0].classList.add("hide");
        _$(".graded-wrong-message")[0].classList.remove("hide");
    }
});