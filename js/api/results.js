m$.results.api({
  init: function(_$, options) {
    this.scores = [];
    this.ReportCard = function(timestamp, correct, incorrect, total) {
      this.timestamp  = timestamp;
      this.correct    = correct;
      this.incorrect  = incorrect;
      this.total      = total;
      this.answer_key = [];
    };

    this.ReportCard.prototype.percent_grade = function() {
      return this.correct <= 0 ? "0%" : `${Math.ceil(this.correct / this.total * 100)}%`
    }

    this.ReportCard.prototype.time = function() {
      var date,
          timestamp;

      date      = new Date(Math.round(new Date().getTime() / 1000) * 1000);
      timestamp = [date.getHours(), date.getMinutes()].map(function (val) {
        return `${String(val).padStart(2, '0')}`;
      }).join(":");

      return `${date.getMonth() + 1}/${date.getDate()} ${timestamp}`;
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

    this.ReportCard.prototype.answer_keys = function() {
      var html = ""
      this.answer_key.forEach(key => {
        html += `
          <tr>
            <td>${key[0].question}</td>
            <td>${key[1] || "(No response)"}</td>
            <td>${key[0].answer}</td>
          </tr>
        `
      });
      return html;
    }
  },

  register_new_score: function(_$, options) {
    var score = new this.ReportCard(
      new Date().getTime(), 
      0, 
      0, 
      m$.settings.slides_per_session
    )
    this.scores.push(score);
  },

  update_last_score: function(_$, options) {
    var score,
        card;

    score           = this.scores[this.scores.length - 1]; 
    score.correct   = m$.quizzer.number_correct;
    score.incorrect = m$.quizzer.number_incorrect; 
    card            = JSON.parse(JSON.stringify(m$.quizzer.card));

    score.answer_key.push([card, options.submission]);
  },

  finalize_last_score: function(_$, options) {
    var tables, 
        score;
    
    score = this.scores[this.scores.length - 1];
    tables = _$(".tables")[0];
    tables.innerHTML = `
      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Correct</th>
            <th>Incorrect</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
          <tr>
            <td>${score.emoji()} ${score.time()}</td>
            <td>${score.correct}</td>
            <td>${score.incorrect}</td>
            <td>${score.percent_grade()}</td>
          </tr>
          <tr>
            <td colspan="4">
              <table>
                <thead>
                  <tr>
                    <th>Question</th>
                    <th>You answered</th>
                    <th>Correct response</th> 
                  </tr>
                </thead>
                <tbody>
    ` + score.answer_keys()
      + `</tbody></table></td></tr></tbody></table>`
      + tables.innerHTML;
  }
});
