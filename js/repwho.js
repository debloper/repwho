(function () {

	window.repwho = {};

	repwho.go = function (mode) {
		var url = "https://reps.mozilla.org/api/v1/rep/?offset=0&limit=0&callback=?&group=" + mode;
		$.getJSON( url,
			function (data) {
				repwho.data = data;
				repwho.pick();
				repwho.pushDOM();
				$("#rep_names button").shuffle();
			},
			function (error) {
				console.log(error);
			}
		)
	};

	repwho.pick = function () {
		repwho.id = Math.floor(Math.random() * repwho.data.objects.length);
		repwho.rep = repwho.data.objects[repwho.id];
	};

	repwho.random = function () {
		repwho.tmp = Math.floor(Math.random() * repwho.data.objects.length);
		if (repwho.tmp == repwho.id) repwho.random();
		return repwho.tmp;
	};

	repwho.pushDOM = function () {
		$("#rep_image").attr("data-id", repwho.id).attr("src", repwho.rep.profile.avatar_url + "&size=256");
		$("#rep_names").html(
			"<button id='richtig'>"+ repwho.rep.fullname +"</button>" +
			"<button class='falsch'>"+ repwho.data.objects[repwho.random()].fullname +"</button>" +
			"<button class='falsch'>"+ repwho.data.objects[repwho.random()].fullname +"</button>" +
			"<button class='falsch'>"+ repwho.data.objects[repwho.random()].fullname +"</button>"
		);
	};

	repwho.reset = function () {
		$("#mode_selector").show();
		$("#rep_quiz").hide();
		$("#quiz_result").hide();
		$("#rep_image").removeAttr("src");
		$("#rep_names").html("");
		$("#baDumTss").html("");
	};

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
