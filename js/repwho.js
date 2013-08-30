$(document).ready(
	$.getJSON('https://reps.mozilla.org/api/v1/rep/?offset=0&limit=0&group=council&callback=?',
		function (data) {
			$('body').append(
				JSON.stringify(
					data.objects[Math.floor(Math.random() * data.objects.length)]
				)
			);
		},
		function (error) {
			console.log(error);
		}
	)
);
