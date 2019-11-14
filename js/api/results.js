m$.results.api({
  init: function(_$, options) {
    this.scores = [];
    this.ReportCard = function(timestamp, correct, incorrect, total) {
      this.timestamp = timestamp;
      this.correct   = correct;
      this.incorrect = incorrect;
      this.total     = total;
    };

    this.ReportCard.prototype.percent_grade = function() {
      return this.correct <= 0 ? "0%" : `${this.correct / this.total * 100}%`
    }

    this.ReportCard.prototype.time = function() {
      var date,
          timestamp;

      date      = new Date(Math.round(new Date().getTime() / 1000) * 1000);
      timestamp = [date.getHours(), date.getMinutes(), date.getSeconds()].map(function (val) {
        return `${String(val).padStart(2, '0')}`;
      }).join(":");

      return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} ${timestamp}`;
    }

    this.ReportCard.prototype.emoji = function() {
      var emojis = ["🍾","🟢","🟡","🟠","🔴"],
          emoji  = emojis[0],
          raw_percent_grade = this.correct/this.total * 100;

      if (raw_percent_grade < 85) emoji = emojis[1];
      if (raw_percent_grade < 75) emoji = emojis[2];
      if (raw_percent_grade < 65) emoji = emojis[3];
      if (raw_percent_grade < 55) emoji = emojis[4];

      return emoji;
    }
  },

  register_new_score: function(_$, options) {
    score = new this.ReportCard(new Date().getTime(), 0, 0, 0)
  },

  update_last_score: function(_$, options) {
    var score = this.scores[this.scores.length - 1]; 
    score.correct   = m$.quizzer.number_correct;
    score.incorrect = m$.quizzer.number_incorrect; 
    score.total     = m$.settings.slides_per_session;
  },

  finalize_last_score: function(_$, options) {
    var tbody, 
        score;
    
    score = this.scores[this.scores.length - 1];
    tbody = _$("table tbody")[0];
    tbody.innerHTML = `
      <tr>
        <td>${score.emoji()} ${score.time()}</td>
        <td>${score.correct}</td>
        <td>${score.incorrect}</td>
        <td>${score.percent_grade()}</td>
      </tr>
    ` + tbody.innerHTML;
  }
});
