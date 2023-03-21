// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

// var input = $('input').val
var button = $('button')
var apiKey = '3bfb3e5fac26e7969dbe0245cdbbfe6c'


button.click(function(){
    console.log('jalen')
})


var apiCall = function(e){
    var city = $('.form-input').val()
    console.log(city)
    e.preventDefault();
    const myUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(myUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data)
    })

} 

// button.click(apiCall())
button.on('click', apiCall);
