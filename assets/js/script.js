const searchFormEl = document.getElementById("search-form");
const searchEl = document.getElementById("start");


let geoKey = "&apiKey=af0eec2b25d34eb690dca8d75d93b100";
let geoApiUrlRoot = "https://api.geoapify.com/v1/geocode/search?text=";

let yelpKey = "aBdON1ZvfAKCxHuCC0EUxrGoJYkiBMSVHOlne-grhLwl_lH2xVdrdr0dB8oWIW8GIpJeyo2ZelAiGq-ARqIYSXzNarkJXeG_yJK9Kk8iX2_bChtoEkojlSqFGzBJYXYx";
let yelpUrlRoot = "https://api.yelp.com/v3/businesses/search?term=coffee&latitude=-93.2529553&longitude=35.328973&apiKey=aBdON1ZvfAKCxHuCC0EUxrGoJYkiBMSVHOlne-grhLwl_lH2xVdrdr0dB8oWIW8GIpJeyo2ZelAiGq-ARqIYSXzNarkJXeG_yJK9Kk8iX2_bChtoEkojlSqFGzBJYXYx";

let searchHandler = function(event){
  event.preventDefault();
  const userInput = searchEl.value.trim();
  testFetch(userInput);
  userInput.value = '';
  
}
let testFetch = function(zipcode){
  fetch(`https://api.geoapify.com/v1/geocode/search?text=${zipcode}&limit=1&type=postcode&filter=countrycode:us,mo`+geoKey)
  .then(function(response){
    response.json()
    .then(function(info){
      let inputLat = info.features[0].properties.lat;
      let inputLon = info.features[0].properties.lon
      console.log(inputLat,inputLon);
      return inputLat,inputLon;
    })
  })
};

let myHeaders = new Headers();
myHeaders.append("Host", "api.yelp.com");
myHeaders.append("Authorization", "Bearer AxElVNzLgKgxOjwHwRQhVWwefF8-zwSvByZ-veYfEtaZ53PaGII5hNE2s2W5BKjOhVCVycya1xmUDUGTffG3h8qA16VAzuWpCF5MqprKT9se4bbKgOiYaUn3X5FKYXYx");
myHeaders.append("Access-Control-Allow-Origin", "same-origin");
myHeaders.append("Cache-Control", "no-cache");

let requestOptions = {
  method: 'GET',
  headers: myHeaders, 
  redirect: 'follow'
};

fetch("https://api.yelp.com/v3/businesses/search?location=new+york", requestOptions)
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));
 

searchFormEl.addEventListener("submit",searchHandler);
