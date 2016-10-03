let getDataButton = document.querySelector('#getData');
//http://swapi.co/api/people/1/
let dynamicDataContainer = document.querySelector('#dynamicDataContainer');

getDataButton.addEventListener('click', function(event){
  let weather = [];
  this.container = document.getElementById('dynamicDataContainer');

  // creates new request onject
  let oReq = new XMLHttpRequest();

//attach events on requests

//progress event triggers while data is being downloaded
  oReq.addEventListener('progress', function(){
    console.log('progress tick');
  });

  oReq.addEventListener('error', function(){
    console.log('ERROR :<');
  });

  //load event triggers when all data is complete
  oReq.addEventListener('load', function(){
    //console.log('Data has loaded');
    let parsedWeatherData = JSON.parse(this.responseText);
    let weather = parsedWeatherData.list;
    console.log('xhr request: ',this);
    console.log('parsed data: ',parsedWeatherData.city);

    const view = document.createElement('div');

    const items = weather.map(newWeather => {
      let item = document.createElement('div');
      let title = document.createTextNode(newWeather.city);
      item.appendChild(title);
      return item;
    });

    console.log(weather);
    items.forEach(view.appendChild.bind(view));
    updateDynamicDataContainer(parsedWeatherData.city,dynamicDataContainer);

  });

function updateDynamicDataContainer(data,container){
  container.innerHTML ='';
  container.innerHTML = data;
}

  //error event triggers when there is a connection error
  //e.g. cant find server no server response no internet connection etc.
  oReq.addEventListener('error', function(){
    console.log('There was an error');
  });

//where to go? first arg: method, second arg: URL
oReq.open("GET", "http://api.openweathermap.org/data/2.5/forecast?q=Honolulu,USA&appid=" + apiKey);


// SET HEADERS AFTER req.open but BEFORE oReq.send()
oReq.setRequestHeader('Accept', 'application/json');
// required when POSTing data

// send off the REQUEST
oReq.send();
});