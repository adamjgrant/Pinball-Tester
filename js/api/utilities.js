m$.utilities.api({
  convert_seconds_to_time: (_$, options) => {
    var minutes, seconds;
    minutes = String(Math.floor(options.seconds / 60)).padStart(2, "0");
    seconds = String(options.seconds % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  },

  shuffle: (_$, options) => {
    var i, j, x, a;
    a = options.array;
    j = void 0;
    x = void 0;
    i = void 0;
    i = a.length - 1;

    while (i > 0) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
      i--;
    }

    return a;
  }, 

  get_cache: (_$, options) => { 
    return localStorage.getObject(`pinball.${options.key}`);
  },

  set_cache: (_$, options) => { 
    return localStorage.setObject(`pinball.${options.key}`, options.value);
  },
});
