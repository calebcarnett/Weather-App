var search = document.getElementById("search-bar");
var button = document.getElementById("button");
var temperature = document.getElementById("temp");
var currentSky = document.getElementById("current-sky");
var currentcity = document.getElementById("current-city");
var cities = document.getElementById("cities");
var message = document.getElementById("msg");
var currentDay = document.getElementById("current-day");
var iconId = document.getElementById("emoji-icon");
var date = document.getElementById("date");
var timeOfDay = dayjs().format("MMMM D");
var hourOfDay = dayjs().format("h:mm a");
const foreCast = document.querySelectorAll(".forecast");
let lastSearch = JSON.parse(localStorage.getItem("lastSearched")) || [];
var imageURL = document.getElementById("img-url");
date.textContent = timeOfDay;

var title = document.querySelector(".card-title");
var content = document.querySelector(".card-text");
var link = document.querySelector(".article-link");

function getAPI() {
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    "San Antonio" +
    "&appid=13d9c9ac41d36325eb94010be86f6d76" +
    "&units=imperial";

  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var weatherIcon = data.weather[0].icon;
      var iconUrl = "https://openweathermap.org/img/w/" + weatherIcon + ".png";
      iconId.setAttribute("src", iconUrl);
      currentcity.textContent = data.name + " as of " + hourOfDay;
      temperature.textContent = data.main.temp + "°F";
      currentSky.textContent = data.weather[0].description;
      var wind = document.createElement("li");
      currentDay.append(wind);
      wind.textContent = "Wind: " + data.wind.speed + " MPH";
      var humidity = document.createElement("li");
      currentDay.append(humidity);
      humidity.textContent = "Humidity: " + data.main.humidity + " %";
    });
}

getAPI();

//get api for current day forecast
function getApiCurrentDay(city) {
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=13d9c9ac41d36325eb94010be86f6d76" +
    "&units=imperial";

  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var weatherIcon = data.weather[0].icon;
      var iconUrl = "https://openweathermap.org/img/w/" + weatherIcon + ".png";
      iconId.setAttribute("src", iconUrl);
      currentcity.textContent = data.name + " as of " + hourOfDay;
      temperature.textContent = data.main.temp + "°F";
      currentSky.textContent = data.weather[0].description;
      var wind = document.createElement("li");
      currentDay.append(wind);
      wind.textContent = "Wind: " + data.wind.speed + " MPH";
      var humidity = document.createElement("li");
      currentDay.append(humidity);
      humidity.textContent = "Humidity: " + data.main.humidity + " %";
    });
}

// get api for five day forecast
function getApiFiveDay(city) {
  var queryFiveDay =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&appid=13d9c9ac41d36325eb94010be86f6d76" +
    "&units=imperial";
  fetch(queryFiveDay)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      for (let index = 0; index < foreCast.length; index++) {
        foreCast[index].innerHTML = "";
        const forecastIndex = index * 8 + 4;
        const foreCastWeatherImg = document.createElement("img");
        foreCastWeatherImg.setAttribute(
          "src",
          "https://openweathermap.org/img/wn/" +
            data.list[forecastIndex].weather[0].icon +
            "@2x.png"
        );
        foreCastWeatherImg.setAttribute(
          "alt",
          data.list[forecastIndex].weather[0].description
        );
        foreCast[index].append(foreCastWeatherImg);
        var tempTwo = document.createElement("li");
        tempTwo.innerHTML = data.list[forecastIndex].main.temp;
        foreCast[index].append(tempTwo);
      }
    });
}
//event listener to run function and parse the data
button.addEventListener("click", function (event) {
  const searchedCity = search.value.trim();
  getApiCurrentDay(searchedCity);
  getApiFiveDay(searchedCity);
  lastSearch.push(searchedCity);
  localStorage.setItem("lastSearched", JSON.stringify(lastSearch));
  renderHistoryList();
});

//changed the function to have the search and message variables to empty strings so that every time the function is ran, it will
//replace the text and not append more lists
// function renderHistoryList() {
//   message.innerHTML = "";
//   for (let i = 0; i < lastSearch.length; i++) {
//     const historyLi = document.createElement("li");
//     historyLi.innerHTML = lastSearch[i];
//     message.append(historyLi);
//     historyLi.addEventListener("click", function (event) {
//       event.preventDefault();
//       getApiCurrentDay(historyLi.innerHTML);
//       getApiFiveDay(historyLi.innerHTML);
//       search.innerHTML = "";
//     });
//   }
// }

SearchHistoryButton = document.getElementById("clear-history");

SearchHistoryButton.addEventListener("click", function () {
  clearHistory();
});
//added a function to clear the search history, clears the local storage, sets the recent city list to an empty string and then reloads the page
function clearHistory() {
  localStorage.clear(lastSearch);
  message.innerHTML = "";
  location.reload();
}
