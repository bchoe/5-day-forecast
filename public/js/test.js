let getWeatherData = document.querySelector('#weather');
let container = document.querySelector('#container');

getWeatherData.addEventListener('click', function(event) {

  let weather = [];
  this.container = document.getElementById('container');
  let oReq = new XMLHttpRequest();

    oReq.addEventListener('progress', function(){
    });

    oReq.addEventListener('error', function(){
      console.log('ERROR :<');
    });
    oReq.addEventListener('load', function(){
      let parsedWeatherData = JSON.parse(this.responseText);
      weather = parsedWeatherData.list;
      console.log(parsedWeatherData.city.name);
      const view = document.createElement('div');

      const items = weather.map(newWeather => {
        let item = document.createElement('div');
        let title = document.createTextNode(newWeather.city);
        item.appendChild(title);
        return item;
      });

      console.log(weather[1]);
      items.forEach(view.appendChild.bind(view));
      updateContainer(weather.city, container);

    });
  function updateContainer(data, container){
    container.innerHTML = '';
    container.innerHTML = data;
  }

  oReq.open('GET', 'http://api.openweathermap.org/data/2.5/forecast?q=Honolulu,US&appid=823b34086489cdf6eaf9807b3a8e6149');
  oReq.setRequestHeader('Accept', 'application/json');
  oReq.send();

  });