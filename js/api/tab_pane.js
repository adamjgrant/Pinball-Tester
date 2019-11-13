m$.tab_pane.api({
  show_tab_at_index: (_$, options) => {
    _$("article").forEach((el, index) => {
      if (options.index != index) {
        el.classList.remove("active");
      }
      else {
        el.classList.add("active");
      }
    });
  }
});
