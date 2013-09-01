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
		$("#rep_image").attr("data-id", repwho.id).attr("src", repwho.rep.profile.avatar_url + "&size=150");
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
		$("#quiz_result").html("");
		$("#quiz_result").hide();
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
		$("#quiz_result").html("<h2 id='right'>Yeehaw‎! :D</h2>");
		$("#quiz_result").show();
		window.setTimeout(repwho.reset, 2000);
	}).on("click", ".falsch", function () {
		$("#rep_quiz").hide();
		$("#quiz_result").html("<h2 id='wrong'>Noooo :P That was " + repwho.rep.fullname + "!</h2>");
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

(function(){
  function install(ev) {
    ev.preventDefault();
    // define the manifest URL
    var manifest_url = "http://ppapadeas.github.io/repwho/manifest.webapp";
    // install the app
    var myapp = navigator.mozApps.install(manifest_url);
    myapp.onsuccess = function(data) {
      // App is installed, remove button
      this.parentNode.removeChild(this);
    };
    myapp.onerror = function() {
      // App wasn't installed, info is in this.error.name
      console.log('Install failed, error: ' + this.error.name);
     };
  };
  // get a reference to the button and call install() on click
  var button = document.getElementById('install');
  button.addEventListener('click', install, false);
})();
