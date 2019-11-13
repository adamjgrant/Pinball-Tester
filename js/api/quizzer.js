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

    _$.api.focus_input();
    _$.api.reset_card_timer();
    _$.api.next_card(); 
  }, 

  next_card: (_$, options) => { 
    this.slides_completed++;

    if (m$.settings.quiz_type == "numbers") { 
      [this.card.question, this.card.answer] = this.deck.pop(); 
    } 
    else { 
      [this.card.answer, this.card.question] = this.deck.pop();
    }
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
    _$.api.set_clock({ 
      time: m$.utilities.convert_seconds_to_time({ seconds: 0 }) 
    }); 
    clearInterval(this.timer);
  },

  start_card_timer: function(_$, options) {
    _$.api.set_clock({ time: m$.settings.time }); 
    this.timer = setInterval(_$.api.next_card, m$.settings.speed_in_seconds * 1000);
    _$.api.start_clock();
  },

  reset_card_timer: (_$, options) => {
    _$.api.kill_card_timer();
    _$.api.start_card_timer();
  }

  kill_clock_display_timer: function(_$, options) {
    clearInterval(this.clock_display_timer);
  }, 

  start_clock_display_timer: function(_$, options) {
    this.clock_display_timer = setInterval(_$.api.update_clock_face, 1000);
    this.time_remaining_in_seconds = m$.settings.speed_in_seconds;
  },

  reset_clock_display_timer: function(_$, options) {
    _$.api.kill_clock_display_timer();
    _$.api.start_clock_display_timer();
  },

  update_clock_face: function(_$, options) {
    this.time_remaining_in_seconds--; 
    _$(".clock")[0].innerHTML = m$.utilities.api.convert_seconds_to_time({ seconds: this.time_remaining_in_seconds });
    if (this.time_remaining_in_seconds <= 0) _$.api.next_card();
  }
});
