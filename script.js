let cities = [];
let city;

function displayWeatherInfo(city) {
    let APIKey = "166a433c57516f51dfab1f7edaed8413";
    let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        let currentName = $("#current-selection").text(response.name);
        let currentWeather = $("#current-weather")
        currentWeather.html("");
        let tempF = (response.main.temp - 273.15) * 1.80 + 32;
        let pOne = $("<p>").text("Temperature: " + tempF.toFixed(2));
        currentWeather.append(pOne);
        let pTwo = $("<p>").text("Humidity: " + response.main.humidity);
        currentWeather.append(pTwo);
        let pThree = $("<p>").text("Wind Speed: " + response.wind.speed);
        currentWeather.append(pThree);  
        let lon = response.coord.lon;
        let lat = response.coord.lat;
        let queryURL2 = `http://api.openweathermap.org/data/2.5/uvi?appid=${APIKey}&lat=${lat}&lon=${lon}`
        $.ajax({
            url: queryURL2,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            let UVI = $("<p>").text("UV Index: " + response.value)
            currentWeather.append(UVI);
        });

    });
}

function displayCity() {
    $("#cities-view").empty();
    for (let i=0; i < cities.length; i++) {
        let a = $("<button>");
        a.addClass("city-btn");
        a.addClass("row");
        a.attr("id", cities[i]);
        console.log(city);
        a.text(cities[i]);
        $("#cities-view").append(a);
    }
}

$("#city-input").on("click", function(event) {
    event.preventDefault();
    city = $("#city-entry").val();
    cities.push(city); 
    displayCity();
    displayWeatherInfo(city);
    fiveDayForecast(city);
});

function fiveDayForecast(city){
    let APIKey = "166a433c57516f51dfab1f7edaed8413";
    let queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}`;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response)
        for (let i=0; i < response.list.length; i++) {
            if (response.list[i].dt_txt.includes("21:00:00")){
                $("#week-forecast").text(response.name);

                console.log(response.list[i]);
            }
        }
    });

}

$(document).on("click", ".city-btn", function(event){
    event.preventDefault();
    city = $(this).attr("id");
    console.log(city);
    displayWeatherInfo(city);
});



//http://api.openweathermap.org/data/2.5/uvi?appid={appid}&lat={lat}&lon={lon}
//api.openweathermap.org/data/2.5/forecast?q={city name}&appid={your api key}
