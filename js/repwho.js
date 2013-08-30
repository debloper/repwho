$(document).ready(
	$.getJSON('https://reps.mozilla.org/api/v1/rep/?offset=0&limit=0&group=council&callback=?',
		function (data) {
			var id = Math.floor(Math.random() * data.objects.length)
			,	rep = data.objects[id];

			window.data = data;

			$('body').html(
				"<img src='" + rep.profile.avatar_url + "' data-id='"+ id +"' />"
			);

			$("img").on("click", function (event) {
				console.log(data.objects[$(this).data("id")].fullname);
			});
		},
		function (error) {
			console.log(error);
		}
	)
);
