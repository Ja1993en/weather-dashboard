// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

// var input = $('input').val
var button = $('button')
var apiKey = '3bfb3e5fac26e7969dbe0245cdbbfe6c'
var date = $('.date ')
var temp = $('.temp')
var humidity = $('.humidity')
var wind = $('.windspeed')
var uvIndex = $('.uv-index')
var image = $('img')

button.click(function(){
    console.log('jalen')
})


var apiCall = function(e){
    var city = $('.form-input').val()
    e.preventDefault();
    const myUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
    fetch(myUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data)
        var currentDay =  data.list[0]
       
        var icon = currentDay.weather[0].icon
        var iconLink = 'http://openweathermap.org/img/w/' + icon + '.png'
        date.text(data.city.name + ' ' +currentDay.dt_txt)
        temp.text(currentDay.main.temp)
        wind.text(currentDay.wind.speed + " mph")
        humidity.text(currentDay.main.humidity + " %")
        image.attr("src", iconLink)




    })

} 

// button.click(apiCall())
button.on('click', apiCall);
