m$.navigation.api({
  set_tab_at_index_active: (_$, options) => { 
    _$("a").forEach((el, index) => { 
      if (options.index == index) {
        el.classList.add("active");
      }
      else {
        el.classList.remove("active");
      }
    });
  }
});
