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
    this.time = m$.utilities.api.convert_seconds_to_time({ seconds: this.speed_in_seconds });
  },

  set_defaults: function(_$, options) {
    _$.api.set_difficulty({ difficulty: 50 });
    _$.api.set_slides_per_session({ slides: 20 });
    _$.api.set_quiz_type({ is_number_type: true });
  },

  // TODO: This should probably go in the results tab.
  grade: (_$, options) => { 
    var correct_answers, initials, submission;
    console.log(_submission);
    submission = String(_submission).toLowerCase();
    correct_answers = [String(response).toLowerCase()];
    if (!quiz_numbers) {
      initials = correct_answers[0].split(" ").map(function (word) {
        return word.substr(0, 1);
      }).join("");
      if (!(initials.length < 2)) {
        correct_answers.push(initials);
      }
    }
    console.log(correct_answers, submission);
    return clock_is_done(correct_answers.includes(submission));
  }
});
