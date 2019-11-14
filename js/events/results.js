m$.results.events(_$ => {
  _$("button")[0].addEventListener("click", m$.quizzer.api.start_quiz); 
  _$.api.init();
});
