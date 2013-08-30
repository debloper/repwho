$(document).ready(
	$.getJSON('https://reps.mozilla.org/api/v1/rep/?offset=0&limit=0&group=council&callback=?',
		function (data) {
			var id = Math.floor(Math.random() * data.objects.length)
			,	rep = data.objects[id];

			window.data = data;

			$("#rep_image").attr("data-id", id).attr("src", rep.profile.avatar_url + "&size=256");
			console.log(rep.profile.avatar_url);

			// $("img").on("click", function (event) {
			// 	console.log(data.objects[$(this).data("id")].fullname);
			// });
		},
		function (error) {
			console.log(error);
		}
	)
);

$("#mode_selector").on("click", "button", function () {
	$("#mode_selector").hide();
	$("#rep_quiz").show();
});
