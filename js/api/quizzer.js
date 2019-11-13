m$.quizzer.api({
  start_quiz: (_$, options) => {
    _$(".active_quiz")[0].classList.add("active");
    _$(".inactive_quiz")[0].classList.remove("active");
    _$("input")[0].focus();
  }, 
  stop_quiz: (_$, options) => {
    _$(".active_quiz")[0].classList.remove("active");
    _$(".inactive_quiz")[0].classList.add("active");
  }
});
