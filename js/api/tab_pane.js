m$.tab_pane.api({
  show_tab_at_index: (_$, options) => {
    _$("article").forEach((el, index) => {
      el.style.display = options.index != index ? "none" : "block";
    });
  }
});
