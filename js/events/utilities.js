m$.utilities.events(_$ => {
  document.body.addEventListener("keypress", e => {
    if (e.keyCode == 32) m$.quizzer.api.start_quiz();
  });
});
