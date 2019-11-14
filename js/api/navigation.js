m$.navigation.api({
  set_tab_at_index_active: (_$, options) => { 
    _$("a").forEach((el, index) => { 
      if (options.index == index) {
        el.classList.add("active");
      }
      else {
        el.classList.remove("active");
      }
      m$.tab_pane.api.show_tab_at_index({ index: options.index });
    });
  },

  disable_tab_by_name: (_$, options) => { 
    var index = _$.api.get_tab_index_by_name({ name: options.name });
    _$("a")[index].setAttribute("disabled", true);
  },

  enable_tab_by_name: (_$, options) => { 
    var index = _$.api.get_tab_index_by_name({ name: options.name });
    _$("a")[index].removeAttribute("disabled");
  }, 

  set_tab_at_index_visible: (_$, options) => { 
    _$("a").forEach((el, index) => { 
      if (options.index == index) {
        el.parentNode.classList.remove("invisible");
      }
    });
  },

  set_tab_at_index_hidden: (_$, options) => { 
    _$("a").forEach((el, index) => { 
      if (options.index == index) {
        el.parentNode.classList.add("invisible");
      } else {
        el.parentNode.classList.remove("invisible");
      }
    });
  },

  toggle_class: (_$, options) => {
    var me = _$(this.scope)[0]
    me.classList.add(options.classname);
    setTimeout(() => {
      me.classList.remove(options.classname);
    }, 300);
  },

  get_tab_index_by_name: function(_$, options) {
    return _$("a").findIndex(tab => {
      return tab.innerHTML.toLowerCase() == options.name.toLowerCase();
    });
  },

  activate_tab_by_name: function(_$, options) {
    var index = _$.api.get_tab_index_by_name({ name: options.name });
    _$.api.set_tab_at_index_active({ index: index });
  },

  show_tab_by_name: function(_$, options) {
    var index = _$.api.get_tab_index_by_name({ name: options.name });
    _$.api.set_tab_at_index_visible({ index: index });
  }, 

  hide_tab_by_name: function(_$, options) {
    var index = _$.api.get_tab_index_by_name({ name: options.name });
    _$.api.set_tab_at_index_hidden({ index: index });
  },

  toggle_tabs: function(_$, options) { 
    _$.api.show_tab_by_name({ name: options.to });
    _$.api.hide_tab_by_name({ name: options.from });
    _$.api.activate_tab_by_name({ name: options.to });
  }
});
