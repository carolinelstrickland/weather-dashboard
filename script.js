let cities = [];

function displayWeatherInfo() {
    let APIKey = "166a433c57516f51dfab1f7edaed8413";
    let city = $(this).attr("data-name");
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city
    + "&appid=" + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(queryURL)
        console.log(response)
    });

}


function displayCity() {
    $("#cities-view").empty();
    for (let i=0; i < cities.length; i++) {
        let a = $("<button>");
        a.addClass("city");
        a.addClass("row");
        a.attr("data-name", cities[i]);
        a.text(cities[i]);
        $("#cities-view").append(a);
    }
}

$("#city-input").on("click", function(event) {
    event.preventDefault();
    let city = $("#city-entry").val();
    console.log(city);
    cities.push(city);
    
    displayCity();
});

$(document).on("click", ".city", displayWeatherInfo);

