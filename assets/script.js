// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

// var input = $('input').val
var button = $('button')
var apiKey = '3bfb3e5fac26e7969dbe0245cdbbfe6c'
var date = $('.date ')
var temp = $('.temp')
var humidity = $('.humidity')
var wind = $('.windspeed')
var uviEl = $(".uv-index")
var image = $('img')
var forecastEl = $('.forecast')
var forcast = $("#week-forecast")

// console.log(forecastEl)


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
        var dt = currentDay.dt
        var d = new Date(dt *1000)
        var month = d.getMonth() + 1;
        var day = d.getDate();
        var year = d.getFullYear()
        console.log(day)
       
        var icon = currentDay.weather[0].icon
        var iconLink = 'http://openweathermap.org/img/w/' + icon + '.png'
        date.text(data.city.name + ' ' + month +"/" + day +"/" + year)
        temp.text("Temp: " +currentDay.main.temp + "°F")
        wind.text( "Wind: " + currentDay.wind.speed + " MPH")
        humidity.text("Humidity: " + currentDay.main.humidity + " %")
        image.attr("src", iconLink)
           var lat = data.city.coord.lat
           var lon = data.city.coord.lon
         
        

      var dailyForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,alerts,minutely,current&appid=${apiKey}&units=imperial`

    //   This reset the data in HTML so it will not 
    // continue to append the same data
      $(".forecast").html("");
      fetch(dailyForecast)
      .then(function(response){
          return response.json()
      })
      .then(function(data){
          console.log(data)
          var forecast = data.daily[0]
          var uvIndex = forecast.uvi
          uviEl.text("UV Idex: " )
          uviEl.append(`<span> ${uvIndex}</span>`);
          if(uvIndex<2){
            $("span").addClass("green")
          }else if(uvIndex > 3 && uvIndex < 5){
            $("span").addClass("yellow") 
          }else if(uvIndex > 6 && uvIndex < 7){
            $("span").addClass("orange") 
          }else if(uvIndex > 8 && uvIndex < 10){
            $("span").addClass("red") 
          }

 

          forecastEl.each(function(i){

            var eachEL = (forecastEl[i])
            // $(".forecast").html("");
            console.log(forecastEl)
            console.log(eachEL)
         var forecastIndex = i + 1
          var forecastDay = data.daily[forecastIndex].dt
       var d = new Date(forecastDay * 1000);
      
       var month = d.getMonth() + 1;
       var day = d.getDate();
       var year = d.getFullYear()
       console.log(day)
       console.log(day)
         var right = `<p>${month + "/" + day + "/"+year}</p>`
     
    var t = $(right);
    $(this).append(t);
      })

        })


    })

} 

// button.click(apiCall())
button.on('click', apiCall);
