m$.navigation.events(_$ => {
  // _$("button")[0].addEventListener("click", m$.quizzer.api.start_quiz); 

  _$("a").forEach((el, index) => {
    ((el, index) => {
      el.addEventListener("click", () => { 
        _$.api.set_tab_at_index_active({ index: index });
      });
    })(el, index)
  });
});
