var search = document.getElementById('search-bar');
var button = document.getElementById('button');
var cities = document.getElementById('cities');
var message = document.getElementById('msg');



function getApi(city) {

var APIkey = "13d9c9ac41d36325eb94010be86f6d76";
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIkey + "&units=imperial";

fetch(queryURL)
.then(function(response) {
    return response.json();
})
.then(function (data) {
    console.log(data)
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
            var list = document.createElement("li").innerHTML = lastSearch.city;
            message.append(list)
            console.log(list)
            getApi(list);

            
    }
});


