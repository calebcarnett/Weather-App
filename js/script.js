var search = document.getElementById('search-bar');
var button = document.getElementById('button');
var cities = document.getElementById('cities');
var message = document.getElementById('msg');
var boxOne = document.getElementById('box-1');
var currentDay = document.getElementById('current-day');



function getApi(city) {

var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=13d9c9ac41d36325eb94010be86f6d76"  + "&units=imperial";

fetch(queryURL)
.then(function(response) {
    return response.json();
})
.then(function (data) {
    console.log(data)
        currentDay.textContent = "City: " + data.name 
        var temp = document.createElement("li")
        currentDay.append(temp)
        temp.textContent = "Temp: " + data.main.temp + "°F"
        var wind = document.createElement("li")
        currentDay.append(wind)
        wind.textContent = "Wind: " + data.wind.speed + " MPH"
        var humidity = document.createElement("li")
        currentDay.append(humidity)
        humidity.textContent = "Humidity: " + data.main.humidity + " %"
        
});
}

 button.addEventListener("click", function(event) {
    event.preventDefault();
   
   var searching = {
    city: search.value.trim()
    };
    
    localStorage.setItem('searching', JSON.stringify(searching));
 
    var lastSearch = JSON.parse(localStorage.getItem('searching'));
            if (lastSearch !== null) {
            var list = document.createElement("h1").innerHTML = lastSearch.city;
            message.append(list)
            console.log(list)
            getApi(list);  
    }
});
