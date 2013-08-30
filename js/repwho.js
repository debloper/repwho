(function () {

	window.repwho = {};

	repwho.fetch = function (mode) {
		var url = "https://reps.mozilla.org/api/v1/rep/?offset=0&limit=0&callback=?&group=" + mode;
		$.getJSON( url,
			function (data) {
				repwho.data = data;

				var id = Math.floor(Math.random() * repwho.data.objects.length)
				,	rep = repwho.data.objects[id];

				$("#rep_image").attr("data-id", id).attr("src", rep.profile.avatar_url + "&size=256");
				$("#rep_names").html(
					"<button id='option_1'>"+ rep.fullname +"</button>" +
					"<button id='option_2'>Option 2</button>" +
					"<button id='option_3'>Option 3</button>" +
					"<button id='option_4'>Option 4</button>"
				);
			},
			function (error) {
				console.log(error);
			}
		)
	}

	$("#mode_selector").on("click", "button", function () {
		window.mode = $(this).data("mode");
		repwho.fetch(mode);
		$("#mode_selector").hide();
		$("#rep_quiz").show();
	});
})();
