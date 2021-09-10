m$.after_trust_message.events((_$) => {
    _$("a")[0].addEventListener("click", function(e) {
        _$.api.reverse_grade();
    });
});