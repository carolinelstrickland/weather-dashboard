var cities = [];

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

