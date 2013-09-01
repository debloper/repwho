(function () {

	window.repwho = {};

	repwho.go = function (mode) {
		repwho.mode = mode;
		if (!repwho[mode]) {
			var url = "https://reps.mozilla.org/api/v1/rep/?offset=0&limit=0&callback=?&group=" + mode;
			$.getJSON( url,
				function (data) {
					repwho[mode] = data;
					repwho.repeat();
				},
				function (error) {
					console.log(error);
				}
			)
		} else repwho.repeat();
	};

	repwho.pick = function () {
		repwho.id = Math.floor(Math.random() * repwho[repwho.mode].objects.length);
		repwho.rep = repwho[repwho.mode].objects[repwho.id];
	};

	repwho.random = function () {
		repwho.tmp = Math.floor(Math.random() * repwho[repwho.mode].objects.length);
		if (repwho.tmp == repwho.id) repwho.random();
		return repwho.tmp;
	};

	repwho.pushDOM = function () {
		$("#rep_image").attr("data-id", repwho.id).attr("src", repwho.rep.profile.avatar_url + "&size=256");
		$("#rep_names").html(
			"<button id='richtig'>"+ repwho.rep.fullname +"</button>" +
			"<button class='falsch'>"+ repwho[repwho.mode].objects[repwho.random()].fullname +"</button>" +
			"<button class='falsch'>"+ repwho[repwho.mode].objects[repwho.random()].fullname +"</button>" +
			"<button class='falsch'>"+ repwho[repwho.mode].objects[repwho.random()].fullname +"</button>"
		);
	};

	repwho.reset = function () {
		repwho.repeat();
		$("#rep_quiz").show();
		$("#baDumTss").html("");
		$("#quiz_result").hide();
		$("#rep_image").attr("src", "");
	};

	repwho.repeat = function () {
		repwho.pick();
		repwho.pushDOM();
		$("#rep_names button").shuffle();
	}

	$("#mode_selector").on("click", "button", function () {
		window.mode = $(this).data("mode");
		repwho.go(mode);
		$("#mode_selector").hide();
		$("#rep_quiz").show();
	});

	$("#rep_names").on("click", "#richtig", function () {
		$("#rep_quiz").hide();
		$("#baDumTss").html("Yeehaw‎! xD");
		$("#quiz_result").show();
		window.setTimeout(repwho.reset, 2000);
	}).on("click", ".falsch", function () {
		$("#rep_quiz").hide();
		$("#baDumTss").html("Booooooo! :P");
		$("#quiz_result").show();
		window.setTimeout(repwho.reset, 2000);
	});
})();

(function($){

	$.fn.shuffle = function() {

		var allElems = this.get(),
			getRandom = function(max) {
				return Math.floor(Math.random() * max);
			},
			shuffled = $.map(allElems, function(){
				var random = getRandom(allElems.length),
					randEl = $(allElems[random]).clone(true)[0];
				allElems.splice(random, 1);
				return randEl;
			});

		this.each(function(i){
			$(this).replaceWith($(shuffled[i]));
		});

		return $(shuffled);
	};

})(jQuery);
