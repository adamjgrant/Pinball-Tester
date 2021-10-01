var clock_is_done, initiate, int_number_correct, int_number_incorrect, int_number_of_slides, int_slides_completed, question, quiz_numbers, radios, response, session_is_done, set_clock, set_speed, set_speed_readout, speed, speed_in_seconds, start_clock, time, time_remaining_in_seconds, timer, update_clock, m$;

m$ = {};

m$.navigation = new Mozart();
m$.tab_pane = new Mozart();
m$.quizzer = new Mozart();
m$.settings = new Mozart();
m$.utilities = new Mozart();
m$.results = new Mozart();
m$.after_trust_message = new Mozart();

initiate = function() {
    set_speed(speed_setter.value);
    set_clock();
    set_speed_readout();
    return answer.focus();
};

document.querySelectorAll("input").forEach((el) => {
    ((el) => {
        el.addEventListener("blur", () => {
            document.querySelectorAll("article").forEach((_el) => {
                _el.scrollTop = 0;
            });
        });
    })(el)
});

// Prevent double-tap to zoom.
document.addEventListener('gesturestart', function(e) {
    e.preventDefault();
});