m$.results.api({
    init: function(_$, options) {
        this.scores = [];
        this.ReportCard = function(timestamp, correct, incorrect, total) {
            this.timestamp = timestamp;
            this.correct = correct;
            this.incorrect = incorrect;
            this.total = total;
            this.answer_key = [];
        };

        this.ReportCard.prototype.percent_grade = function() {
            return this.correct <= 0 ? "0%" : `${Math.ceil(this.correct / this.total * 100)}%`
        }

        this.ReportCard.prototype.time = function() {
            var date,
                timestamp;

            date = new Date(Math.round(new Date().getTime() / 1000) * 1000);
            timestamp = [date.getHours(), date.getMinutes()].map(function(val) {
                return `${String(val).padStart(2, '0')}`;
            }).join(":");

            return `${date.getMonth() + 1}/${date.getDate()} ${timestamp}`;
        }

        this.ReportCard.prototype.emoji = function() {
            var emojis = ["🍾", "🟢", "🟡", "🟠", "🔴"],
                emoji = emojis[0],
                raw_percent_grade = this.correct / this.total * 100;

            if (raw_percent_grade < 85) emoji = emojis[1];
            if (raw_percent_grade < 75) emoji = emojis[2];
            if (raw_percent_grade < 65) emoji = emojis[3];
            if (raw_percent_grade < 55) emoji = emojis[4];

            return emoji;
        }

        this.ReportCard.prototype.answer_keys = function(options) {
            var html = "";

            this.answer_key.forEach(key => {
                var correct,
                    question,
                    answer_provided,
                    actual_answer;

                [correct, question, answer_provided, actual_answer] = [key[2], key[0].question, key[1], key[0].answer];

                if (
                    (correct && (!options || options.filter == "correct")) ||
                    (!correct && (!options || options.filter == "incorrect"))
                ) {
                    html += `
            <tr>
              <td>${question}</td>
              <td>${answer_provided || "(No response)"}</td>
              <td>${actual_answer}</td>
            </tr>
          `
                }
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

        score = this.scores[this.scores.length - 1];
        score.correct = m$.quizzer.number_correct;
        score.incorrect = m$.quizzer.number_incorrect;
        card = JSON.parse(JSON.stringify(m$.quizzer.card));

        score.answer_key.push([card, options.submission, options.correct]);
    },

    update_penultimate_score: function(_$, options) {
        var score,
            card;

        score = this.scores[this.scores.length - 1];
        score.correct = m$.quizzer.number_correct;
        score.incorrect = m$.quizzer.number_incorrect;

        card = score.answer_key[score.answer_key.length - 1][0];

        console.log(this.scores);

        score.answer_key.push([card, options.submission, options.correct]);
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
                    <th colspan="3"><em>Here's what you missed</em></th>
                  </tr>
                  <tr>
                    <th>Question</th>
                    <th>You answered</th>
                    <th>Correct response</th> 
                  </tr>
                </thead>
                <tbody>
    ` + score.answer_keys({ filter: "incorrect" }) +
            `</tbody></table></td></tr></tbody></table>` +
            tables.innerHTML;
    }
});