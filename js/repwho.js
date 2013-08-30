$(document).ready(

$.getJSON('https://reps.mozilla.org/api/v1/rep/?offset=0&limit=0&group=council&callback=?', 
    function(data) {
        console.log('got it!');
        $('body').append(JSON.stringify(data));
    })
);