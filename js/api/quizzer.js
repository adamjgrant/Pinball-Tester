m$.quizzer.api({
  start_quiz: function(_$, options) {
    this.slides_completed = -1;
    this.number_correct   = 0;
    this.number_incorrect = 0;
    this.deck             = m$.utilities.api.shuffle({ array: deck });
    this.card             = {
      question: undefined,
      answer:   undefined,
    };
    this.timer                     = 0;
    this.clock_display_timer       = 0;
    this.time_remaining_in_seconds = 0;

    _$(".active_quiz")[0].classList.add("active");
    _$(".inactive_quiz")[0].classList.remove("active");

    _$.api.next_card(); 
  }, 

  next_card: function(_$, options) { 
    if (options && options.time_expired) {
      _$.api.submit({ submission: _$(".submission")[0].value });
    }

    this.slides_completed++;

    if (m$.settings.quiz_type == "numbers") { 
      [this.card.question, this.card.answer] = this.deck.pop(); 
      _$(".submission")[0].type = "number";
    } 
    else { 
      [this.card.answer, this.card.question] = this.deck.pop();
      _$(".submission")[0].type = "text";
    }

    _$(".display")[0].innerHTML = this.card.question;
    _$(".submission")[0].value = "";
    _$.api.focus_input();
    _$.api.reset_card_timer();
  },

  stop_quiz: (_$, options) => {
    _$(".active_quiz")[0].classList.remove("active");
    _$(".inactive_quiz")[0].classList.add("active");
    _$.api.kill_card_timer();
  },

  focus_input: (_$, options) => { 
    _$("input")[0].focus();
  },

  kill_card_timer: function(_$, options) {
    _$.api.set_clock_face({ 
      time: m$.utilities.api.convert_seconds_to_time({ seconds: 0 }) 
    }); 
    clearInterval(this.timer);
  },

  start_card_timer: function(_$, options) {
    this.timer = setInterval(() => {
      _$.api.next_card({ time_expired: true });
    }, m$.settings.speed_in_seconds * 1000);
    _$.api.reset_clock_display_timer();
  },

  reset_card_timer: (_$, options) => {
    _$.api.kill_card_timer();
    _$.api.start_card_timer();
  },

  kill_clock_display_timer: function(_$, options) {
    clearInterval(this.clock_display_timer);
  }, 

  start_clock_display_timer: function(_$, options) {
    this.time_remaining_in_seconds = m$.settings.speed_in_seconds;
    _$.api.update_clock_face();
    this.clock_display_timer = setInterval(_$.api.update_clock_face, 1000);
  },

  reset_clock_display_timer: function(_$, options) {
    _$.api.kill_clock_display_timer();
    _$.api.start_clock_display_timer();
  },

  update_clock_face: function(_$, options) {
    this.time_remaining_in_seconds--; 
    _$.api.set_clock_face({ seconds: this.time_remaining_in_seconds });
    if (this.time_remaining_in_seconds < 0) _$.api.next_card();
  },

  set_clock_face: (_$, options) => { 
    _$(".clock")[0].innerHTML = m$.utilities.api.convert_seconds_to_time({ seconds: options.seconds });
    var percent_complete;

    if (options.seconds > 0) {
      percent_complete = 100 - ((options.seconds + 1)/m$.settings.speed_in_seconds * 100)
    } else {
      percent_complete = 100;
    }

    _$("progress")[0].value = percent_complete;
  },

  validate_character: (_$, options) => { 
    // TODO: This doesn't accept the command key, such as command+a
    if (!/\d/.test(options.value)) return options.e.preventDefault();
  },

  submit: function(_$, options) {
    if (this.card.answer == options.submission) {
      _$.api.grade_correct();
    }
    else {
      _$.api.grade_incorrect();
    }

    _$.api.next_card();
  }, 

  grade_correct: function(_$, options) {
    this.number_correct++;
    var nav = $("[data-component='navigation']")[0];
    nav.classList.add("correct");
    setTimeout(() => {
      nav.classList.remove("correct");
    }, 300);
  },

  grade_incorrect: function(_$, options) {
    this.number_incorrect++;
    var nav = $("[data-component='navigation']")[0];
    nav.classList.add("incorrect");
    setTimeout(() => {
      nav.classList.remove("incorrect");
    }, 300);
  },
});
