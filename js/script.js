var clock_is_done, convert_seconds_to_time, deck, grade, initiate, int_number_correct, int_number_incorrect, int_number_of_slides, int_slides_completed, question, quiz_numbers, radios, response, session_is_done, set_clock, set_speed, set_speed_readout, shuffle, speed, speed_in_seconds, start_clock, start_session, time, time_remaining_in_seconds, timer, update_clock, m$, deck;

m$ = {},

m$.navigation = new Mozart();
m$.tab_pane   = new Mozart();
m$.quizzer    = new Mozart();
m$.settings   = new Mozart();

deck          = [
  ["Poppy Seed", 1]
  ,['Flax seed', 2]
  ,['Cumin', 3]
  ,['Quinoa', 4]
  ,['Sesame seed', 5]
  ,['Fennel seed', 6]
  ,['Sunflower seed', 7]
  ,['Pine nut', 8]
  ,['Pumpkin seed', 9]
  ,['Apple', 10]
  ,['Banana', 11]
  ,['Orange', 12]
  ,['Strawberry', 13]
  ,['Kiwi', 14]
  ,['Cherry', 15]
  ,['Blueberry', 16]
  ,['Fig', 17]
  ,['Grapes', 18]
  ,['Grapefruit', 19]
  ,['Plate', 20]
  ,['Knife', 21]
  ,['Napkin', 22]
  ,['Bowl', 23]
  ,['Fork', 24]
  ,['Tongs', 25]
  ,['Cup', 26]
  ,['Pitcher', 27]
  ,['Ladel', 28]
  ,['Spoon', 29]
  ,['Lettuce', 30]
  ,['Celery', 31]
  ,['Arugula', 32]
  ,['Kale', 33]
  ,['Broccoli', 34]
  ,['Spinach', 35]
  ,['Leeks', 36]
  ,['Artichoke', 37]
  ,['Bok choy', 38]
  ,['Collard greens', 39]
  ,['Chickpea', 40]
  ,['Green bean', 41]
  ,['Soybean', 42]
  ,['Pinto beans', 43]
  ,['White beans', 44]
  ,['Black beans', 45]
  ,['Kidney beans', 46]
  ,['Lentil', 47]
  ,['Peanut', 48]
  ,['Lima bean', 49]
  ,['Salt', 50]
  ,['Pepper', 51]
  ,['Honey', 52]
  ,['Barbecue sauce', 53]
  ,['Sauerkraut', 54]
  ,['Capers', 55]
  ,['Hot sauce', 56]
  ,['Ketchup', 57]
  ,['Mustard', 58]
  ,['Relish', 59]
  ,['Water', 60]
  ,['Juice', 61]
  ,['Milk', 62]
  ,['Coffee', 63]
  ,['Tea', 64]
  ,['Seltzer', 65]
  ,['Kombucha', 66]
  ,['Beer', 67]
  ,['Wine', 68]
  ,['Liquor', 69]
  ,['Flour', 70]
  ,['Noodle', 71]
  ,['Couscous', 72]
  ,['Pasta', 73]
  ,['Crackers', 74]
  ,['Rice', 75]
  ,['Pretzel', 76]
  ,['Bread', 77]
  ,['Potato', 78]
  ,['Sweet Potato', 79]
  ,['Whipped cream', 80]
  ,['Sprinkles', 81]
  ,['Cupcake', 82]
  ,['Ice cream', 83]
  ,['Popsicle', 84]
  ,['Chocolate chips', 85]
  ,['Gummy bear', 86]
  ,['Brownies', 87]
  ,['Cookies', 88]
  ,['Cake', 89]
  ,['Coconut', 90]
  ,['Zucchini', 91]
  ,['Honeydew', 92]
  ,['Delicata squash', 93]
  ,['Acorn squash', 94]
  ,['Cucumber', 95]
  ,['Canteloupe', 96]
  ,['Butternut Squash', 97]
  ,['Watermelon', 98]
  ,['Pumpkin', 99]
]

convert_seconds_to_time = function (_seconds) {
	var minutes, seconds;
	minutes = String(Math.floor(_seconds / 60)).padStart(2, "0");
	seconds = String(_seconds % 60).padStart(2, "0");
	return `${minutes}:${seconds}`;
};

set_speed = function (value) {
	speed = value;
	speed_in_seconds = 101 - speed;
	time_remaining_in_seconds = speed_in_seconds;
	return time = convert_seconds_to_time(speed_in_seconds);
};

set_clock = function (_time) {
	var clock_time;
	clock_time = _time || time;
	return clock.innerHTML = clock_time;
};

update_clock = function () {
	return set_clock(convert_seconds_to_time(--time_remaining_in_seconds));
};

start_clock = function () {
	update_clock();
	return timer = setInterval(function () {
		if (time_remaining_in_seconds > 0) {
			return update_clock();
		} else {
			return clock_is_done();
		}
	}, 1000);
};

set_speed_readout = function () {
	speed_readout.innerHTML = time;
	return speed_readout_total.innerHTML = convert_seconds_to_time(speed_in_seconds * int_number_of_slides);
};

start_session = function (reset) {
	set_clock(convert_seconds_to_time(speed_in_seconds));
	int_slides_completed++;
	if (reset) {
		int_slides_completed = 1;
		int_number_incorrect = 0;
		int_number_correct = 0;
		shuffle(deck);
		clearInterval(timer);
	}
	initiate();
	start_clock();
	if (quiz_numbers) {
		[question, response] = deck.pop();
	} else {
		[response, question] = deck.pop();
	}
	return visual.innerHTML = question;
};

clock_is_done = function (correct_answer_given) {
	clearInterval(timer);
	if (correct_answer_given) {
		++int_number_correct;
		correct_answer_was.innerHTML = `Correct! (${response})`;
	} else {
		++int_number_incorrect;
		correct_answer_was.innerHTML = `Expected '${response}'`;
	}
	answer.value = "";
	if (int_slides_completed >= int_number_of_slides) {
		session_is_done();
		return initiate();
	}
	return start_session();
};

shuffle = function (a) {
	var i, j, x;
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
};

session_is_done = function () {
	var date, now, quiz_type, timestamp;
	date = new Date(Math.round(new Date().getTime() / 1000) * 1000);
	timestamp = [date.getHours(), date.getMinutes(), date.getSeconds()].map(function (val) {
		return `${String(val).padStart(2, '0')}`;
	}).join(":");
	now = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} ${timestamp}`;
	quiz_type = quiz_numbers ? "Numbers" : "Names";
	scores.querySelector("tbody").innerHTML += `<tr><td>${quiz_type}: ${now}</td><td>${time}</td><td>${int_number_of_slides}</td><td>${Math.ceil(int_number_correct / int_number_of_slides * 100)}%</td></tr>`;
	return initiate();
};

initiate = function () {
	set_speed(speed_setter.value);
	set_clock();
	set_speed_readout();
	number_of_slides.innerHTML = int_number_of_slides;
	slides_completed.innerHTML = int_slides_completed;
	number_incorrect.innerHTML = int_number_incorrect;
	number_correct.innerHTML = int_number_correct;
	return answer.focus();
};

grade = function (_submission) {
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
};
