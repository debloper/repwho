(function () {

	window.repwho = {};

	repwho.go = function (mode) {
		var url = "https://reps.mozilla.org/api/v1/rep/?offset=0&limit=0&callback=?&group=" + mode;
		$.getJSON( url,
			function (data) {
				repwho.data = data;
				repwho.pick();
				repwho.pushDOM();
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

	repwho.pushDOM = function () {
		$("#rep_image").attr("data-id", repwho.id).attr("src", repwho.rep.profile.avatar_url + "&size=256");
		$("#rep_names").html(
			"<button id='option_1'>"+ repwho.rep.fullname +"</button>" +
			"<button id='option_2'>Option 2</button>" +
			"<button id='option_3'>Option 3</button>" +
			"<button id='option_4'>Option 4</button>"
		);
	};

	$("#mode_selector").on("click", "button", function () {
		window.mode = $(this).data("mode");
		repwho.go(mode);
		$("#mode_selector").hide();
		$("#rep_quiz").show();
	});
})();
