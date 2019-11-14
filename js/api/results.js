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
      console.log(this.correct, this.total);
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
  },

  register_new_score: function(_$, options) {
    var score,
        tbody;

    score = new this.ReportCard(
      new Date().getTime(), 
      m$.quizzer.number_correct, 
      m$.quizzer.number_incorrect, 
      m$.settings.slides_per_session
    ); 

    this.scores.push(score);
    
    tbody = _$("table tbody")[0];
    tbody.innerHTML += `
      <tr>
        <td>${score.time()}</td>
        <td>${score.correct}</td>
        <td>${score.incorrect}</td>
        <td>${score.percent_grade()}</td>
      </tr>
    `
  }
});
