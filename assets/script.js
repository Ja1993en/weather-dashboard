var searchBtn = $('.searchbtn')
var removeBtn = $('.removebtn')
var apiKey = '3bfb3e5fac26e7969dbe0245cdbbfe6c'
var date = $('.date ')
var temp = $('.temp')
var humidity = $('.humidity')
var wind = $('.windspeed')
var uviEl = $(".uv-index")
var image = $('img')
var forecastEl = $('.forecast')
var forcast = $("#week-forecast")
const searchHistory = JSON.parse(localStorage.getItem('search')) || [];

var apiCall = function( cityName){
   

    var city = $('.form-input').val() 
    // e.preventDefault();
    const myUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=imperial`;
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




        
        })
      
        fetch(myUrl)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data)
          forecastEl.each(function(i){
          var forecastIndex = i * 8 + 4
          var forecastDay = data.list[forecastIndex]
          var forecastDate = data.list[forecastIndex].dt

         var d = new Date(forecastDate * 1000);
         var month = d.getMonth() + 1;
         var day = d.getDate();
         var year = d.getFullYear()

         var iconApi = forecastDay.weather[0].icon

         var iconLink = 'http://openweathermap.org/img/w/' + iconApi + '.png'
         var dailyIcon = `<p><img src="${iconLink}"></p>`
         var dailyTemp = `<p>Temp: ${forecastDay.main.temp} °F</p>`
         var  dailyWind =  `<p>Wind: ${forecastDay.wind.speed} MPH</p>`
         var dailyHum = `<p>Humidity: ${forecastDay.main.humidity} %</p>`
           var dailyDate = `<p>${month} / ${day} / ${year} </p>`
       
     
      $(this).append(dailyDate);
      $(this).append(dailyIcon)
      $(this).append(dailyTemp)
      $(this).append(dailyWind)
      $(this).append(dailyHum)
          })
          })

    })

    if(city==""){

    }else{
      searchHistory.unshift(city)
   
      searchHistory.splice(5)
      console.log(searchHistory)

      localStorage.setItem('search' , JSON.stringify(searchHistory))
      renderHistory()
    }

} 
var removeHistory = function(){
    console.log('jalen')
    localStorage.clear()
    // $('.button-div').remove();
    searchHistory.length = 0
   renderHistory()
}

var renderHistory = function(){
  $(".button-div").html("")
  for(let i=0; i< searchHistory.length; i++){
  const searches = `<button class="btn border border-secondary mb-2 weather-history">${searchHistory[i]}</button>`
 $(".button-div").append(searches)

  
}
$('.weather-history').on('click', function(e){
  var currentBtn = $(e.target)
      var  historySearch = currentBtn.text()
     apiCall(historySearch)
  })
}


$(document).ready(function history(){
//     // e.preventDefualt()
//         // var city = $('.form-input').val()
//         $(".button-div").html("")
//     var vv = searchHistory
//     for(let i=0; i< vv.length; i++){
//     const searches = `<button class="btn border border-secondary mb-2 weather-history">${searchHistory[i]}</button>`
//    $(".button-div").append(searches)
//     }
// })
//      $('.weather-history').on('click', function(e){
//      var currentBtn = $(e.target)
//     var  historySearch = currentBtn.text()
//     apiCall(historySearch)

})

var cityy = function(e){
e.preventDefault()
    var city = $('.form-input').val() 
    apiCall(city) 
}

renderHistory();
console.log($('.weather-history'))
// var removeHistory = function(){
//     console.log('jalen')
//     localStorage.removeItem('search')
//     $('.button-div').remove();
// }





  
// cc()
// button.click(apiCall())
searchBtn.on('click', cityy);
removeBtn.on('click', removeHistory);
