var search = document.getElementById('search-bar');
var button = document.getElementById('button');
var cities = document.getElementById('cities');
var message = document.getElementById('msg');
var currentDay = document.getElementById('current-day');
var iconId = document.getElementById('emoji-icon');
var boxTwo = document.getElementById('box-2');
var boxThree = document.getElementById('box-3');
var boxFour = document.getElementById('box-4');
var boxFive = document.getElementById('box-5');
var boxSix = document.getElementById('box-6');
var date = document.getElementById('date')
var timeOfDay = dayjs().format("MM/DD/YYYY");
date.textContent = timeOfDay;

function getApiCurrentDay(city) {

var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=13d9c9ac41d36325eb94010be86f6d76"  + "&units=imperial";

fetch(queryURL)
.then(function(response) {
    return response.json();
})
.then(function (data) {
    console.log(data)
        var weatherIcon = data.weather[0].icon 
        var iconUrl = "http://openweathermap.org/img/w/" + weatherIcon + ".png"
        iconId.setAttribute("src", iconUrl)
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
            var list = document.createElement('li').innerHTML = lastSearch.city;
            message.append(list)
            console.log(list)
            getApiCurrentDay(list);  
            getApiFiveDay(list)
    }
});

  // var iconTwo = "http://openweathermap.org/img/w/" + data.list[0].main.temp + ".png"
        // boxTwo.setAttribute("src", iconTwo)

function getApiFiveDay(city) {
    var queryFiveDay = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=13d9c9ac41d36325eb94010be86f6d76"  + "&units=imperial"
    fetch(queryFiveDay)
    .then(function(response) {
        return response.json(); 
    })
    .then(function (data) {
        const foreCastElement = document.querySelectorAll(".forecast")
        for (let index = 0; index < foreCastElement.length; index++) {
            const forecastIndex = index * 8 + 4 
            var hours = document.createElement("li")
            hours.textContent = data.list[forecastIndex].dt_txt
            foreCastElement[index].append(hours)
            const foreCastWeatherImg = document.createElement("img")
            foreCastWeatherImg.setAttribute("src", "https://openweathermap.org/img/wn/" + data.list[forecastIndex].weather[0].icon + "@2x.png")
            foreCastWeatherImg.setAttribute("alt", data.list[forecastIndex].weather[0].description);
            foreCastElement[index].append(foreCastWeatherImg)
            var tempTwo = document.createElement("li")
            tempTwo.textContent = "Temp: " + data.list[forecastIndex].main.temp
            foreCastElement[index].append(tempTwo)
            var windTwo = document.createElement("li")
            windTwo.textContent = "Wind: " + data.list[forecastIndex].wind.speed + " MPH"
            foreCastElement[index].append(windTwo)
            var humidityTwo = document.createElement("li")
            foreCastElement[index].append(humidityTwo)
            humidityTwo.textContent = "humidity: " + data.list[forecastIndex].main.humidity + "%"
           console.log(data.list[forecastIndex])
        }
    });
    }
