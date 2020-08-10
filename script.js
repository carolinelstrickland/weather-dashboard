let cities = [];

function displayWeatherInfo(city) {
    let APIKey = "166a433c57516f51dfab1f7edaed8413";
    // let city = $(this).attr("data-name");
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city
    + "&appid=" + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
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
    });
}


function displayCity() {
    $("#cities-view").empty();
    for (let i=0; i < cities.length; i++) {
        let a = $("<button>");
        a.addClass("city-btn");
        a.addClass("row");
        a.attr("data-name", cities[i]);
        a.text(cities[i]);
        $("#cities-view").append(a);
    }
}

$("#city-input").on("click", function(event) {
    event.preventDefault();
    let city = $("#city-entry").val();
    cities.push(city); 
    displayCity();
    displayWeatherInfo(city);
    fiveDayForecast(city);

});


function fiveDayForecast(city){
    let APIKey = "166a433c57516f51dfab1f7edaed8413";
    // let city = $(this).attr("data-name");
    let queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}`;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response)
        for (let i=0; i < response.list.length; i++) {
            if (response.list[i].dt_txt.includes("21:00:00")){
                console.log(response.list[i]);
            }
        }
    });

}



$(document).on("click", ".city-btn", displayWeatherInfo);

// displayCity();

//http://api.openweathermap.org/data/2.5/uvi?appid={appid}&lat={lat}&lon={lon}
//api.openweathermap.org/data/2.5/forecast?q={city name}&appid={your api key}
