m$.quizzer.events(_$ => {
  _$("button")[0].addEventListener("click", _$.api.start_quiz); 

  var numerical_input = _$("input[type='number'].submission");
  if (numerical_input) {
    numerical_input[0].addEventListener("keypress", e => {
      return _$.api.validate_character({ value: String.fromCharCode(e.charCode), e: e });
    });
  }

  _$(".submission")[0].addEventListener("keypress", e => {
    if (e.key == "Enter") _$.api.submit({ submission: e.target.value });
  });
});
