m$.settings.api({
  set_quiz_type: function(_$, options) { 
    _$("input[type='radio']")[0].checked = options.is_number_type;
    _$("input[type='radio']")[1].checked = !options.is_number_type;
    this.quiz_type = options.is_number_type ? "numbers" : "names";
  },

  set_slides_per_session: function(_$, options) {
    _$("input[type='number']")[0].value = options.slides;
    this.slides_per_session = options.slides;
  },

  set_difficulty: function(_$, options) {
    _$("input[type='range']")[0].value = options.difficulty;
    this.speed = options.difficulty;
    this.speed_in_seconds = 101 - this.speed;
    this.time_remaining_in_seconds = this.speed_in_seconds;
    this.time = _$.api.convert_seconds_to_time({ seconds: this.speed_in_seconds });
  },

  convert_seconds_to_time: (_$, options) => {
    var minutes, seconds;
    minutes = String(Math.floor(options.seconds / 60)).padStart(2, "0");
    seconds = String(options.seconds % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  },

  set_defaults: function(_$, options) {
    _$.api.set_difficulty({ difficulty: 50 });
    _$.api.set_slides_per_session({ slides: 20 });
    _$.api.set_quiz_type({ is_number_type: true });
  }
});
