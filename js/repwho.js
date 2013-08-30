$(document).ready(
	$.getJSON('https://reps.mozilla.org/api/v1/rep/?offset=0&limit=0&group=council&callback=?',
		function (data) {
			var rep = JSON.stringify(
				data.objects[Math.floor(
					Math.random() * data.objects.length
				)]
			);
			rep = JSON.parse(rep);

			$('body').html(
				"<img src='" + rep.profile.avatar_url + "' />"
			);
		},
		function (error) {
			console.log(error);
		}
	)
);
