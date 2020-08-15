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
    $("#city-entry").val("");
});

function fiveDayForecast(city){
    let APIKey = "166a433c57516f51dfab1f7edaed8413";
    let queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}`;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        $("#week-forecast").empty();
        console.log(response)
        for (let i=0; i < response.list.length; i++) {
                    if (response.list[i].dt_txt.includes("21:00:00")){
                        console.log(response.list[i]);
                    let dataCol = $("<div>");
                    dataCol.addClass("col-md-2 bg-light mx-2 rounded text-dark p-3 text-center border"); 
                    let icon = `<img src="http://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png">`;
                    let date = response.list[i].dt_txt; 
                    dataCol.html(`<h6>${moment(date).format("ddd, MMM Do")}</h6>
                                         <div class="m-0">${icon}</div>
                                        <ul class="list-unstyled m-0">
                                        <li>Temp: <b>${response.list[i].main.temp} °F</b></li>
                                        <li>Humidity:<b> ${response.list[i].main.humidity} %</b></li>
                                        </ul>`
                                        );
                                            $("#week-forecast").append(dataCol);
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
