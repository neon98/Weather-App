var tempF, tempC;
$(document).ready(function() {
    getLocation();
});
$(".unit").click(function() {
    if ($(this).html() == "F") {
        $('.unit').html("C");
        $("#temperature").html(tempC + " &deg");
    } else {
        $('.unit').html("F");
        $("#temperature").html(tempF + " &deg");
    }
});

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var lat = position.coords.latitude;
            var long = position.coords.longitude;
            getWeather(lat, long);
        });
    }
}

function getWeather(lat, long) {
    $.ajax({
        type: 'GET',
        asynch: false,
        url: "https://api.wunderground.com/api/ef4d764362efe10f/conditions/q/" + lat + "," + long + ".json",
        contentType: "application/json",
        dataType: "jsonp",
        success: function(response) {
            var weatherObj = response;
            var userLocation = response.current_observation.display_location.full;
            $("#city-name").html(userLocation);
            tempF = Math.round(response.current_observation.temp_f);
            tempC = Math.round(response.current_observation.temp_c);
            var weather = response.current_observation.weather;
            var icon = response.current_observation.icon_url;
            $("#temperature").html(tempC + " &deg");
            $("#condition").html(weather);
            $("body").css("background-image", "url(" + backgroundImage(weather) + ")");
            getAnimation(weather);
            //temparature.innerHTML = celTemp + "&degC"

        }
    });
}

function backgroundImage(weather) {
    switch (weather.toLowerCase()) {
        case "overcast":
        case "mostly cloudy":
        case "partly cloudy":
        case "smoke":
        case "fog":
            return "img/cloudy.jpg";
        case "sunny":
        case "mostly sunny":
        case "partly sunny":
        case "clear skies":
        case "clear":
            return "img/sunny.jpg";
        case "flurries":
        case "snow":
        case "chance of snow":
        case "sleet":
        case "chance of sleet":
            return "img/snowy.jpg";
        case "rain":
        case "chance of rain":
        case "hase":
            return "img/rainy.jpg";
    }
}

function getAnimation(weather) {
    var wea = weather.toLowerCase();
    if (wea == "overcast" || wea == "mostly cloudy" || wea == "partly cloudy" || wea == "smoke" || wea == "fog") {
        $(".addAnimation").addClass("cloudC");
        $(".addAnimation").addClass("cloudC");
    } else if (wea == "sunny" || wea == "mostly sunny" || wea == "clear") {
        $(".addAnimation").addClass("sun");
        $(".addAnother").addClass("rayS");
    } else if (wea == "partly sunny" || wea == "clear skies") {
        $(".addAnimation").addClass("cloudS");
        $(".addAnother").addClass("rays");
    } else if (wea == "flurries" || wea == "snow" || wea == "chance of snow" || wea == "sleet" || wea == "chance of sleet") {
        $(".addAnimation").addClass("cloudC");
        var d1 = $("<div></div>").addClass("smallSnow snowFall1 drop1");
        var d2 = $("<div></div>").addClass("smallSnow snowFall1 drop2");
        var d3 = $("<div></div>").addClass("smallSnow snowFall1 drop3");
        var d4 = $("<div></div>").addClass("smallSnow snowFall2 drop4s");
        var d5 = $("<div></div>").addClass("smallSnow snowFall2 drop5s");
        var d6 = $("<div></div>").addClass("smallSnow snowFall2 drop6s");
        $(".addAnother").after(d1, d2, d3, d4, d5, d6);
    } else if (wea == "rain" || wea == "chance of rain" || wea == "haze") {
        $(".addAnimation").addClass("cloudC");
        var d1 = $("<div></div>").addClass("smallDrop drops1 drop1");
        var d2 = $("<div></div>").addClass("smallDrop drops1 drop2");
        var d3 = $("<div></div>").addClass("smallDrop drops1 drop3");
        var d4 = $("<div></div>").addClass("smallDrop drops2 drop4");
        var d5 = $("<div></div>").addClass("smallDrop drops2 drop5");
        var d6 = $("<div></div>").addClass("smallDrop drops2 drop6");
        $(".addAnother").after(d1, d2, d3, d4, d5, d6);
    }
}