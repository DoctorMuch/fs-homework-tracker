const searchFormEl = document.getElementById("search-form");
const searchEl = document.getElementById("start");
const userInput = searchEl.value.trim();

let geoKey = "&apiKey=af0eec2b25d34eb690dca8d75d93b100";
let geoApiUrlRoot = "https://api.geoapify.com/v1/geocode/search?text=";

let yelpKey = "aBdON1ZvfAKCxHuCC0EUxrGoJYkiBMSVHOlne-grhLwl_lH2xVdrdr0dB8oWIW8GIpJeyo2ZelAiGq-ARqIYSXzNarkJXeG_yJK9Kk8iX2_bChtoEkojlSqFGzBJYXYx";
let yelpUrlRoot = "https://api.yelp.com/v3/businesses/search?term=coffee&latitude=-93.2529553&longitude=35.328973&apiKey=aBdON1ZvfAKCxHuCC0EUxrGoJYkiBMSVHOlne-grhLwl_lH2xVdrdr0dB8oWIW8GIpJeyo2ZelAiGq-ARqIYSXzNarkJXeG_yJK9Kk8iX2_bChtoEkojlSqFGzBJYXYx";

let searchHandler = function(event){
  event.preventDefault();
  
  testFetch(userInput);
  
}
let testFetch = function(){
  fetch("https://api.geoapify.com/v1/geocode/search?text=london&limit=5&type=city&filter=countrycode:us,mo"+geoKey)
  .then(function(res){
    res.json()
    .then(function(info){
      console.log(info.features);
      return info.features[0].geometry.coordinates[0];
    })
  })
}
let myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer aBdON1ZvfAKCxHuCC0EUxrGoJYkiBMSVHOlne-grhLwl_lH2xVdrdr0dB8oWIW8GIpJeyo2ZelAiGq-ARqIYSXzNarkJXeG_yJK9Kk8iX2_bChtoEkojlSqFGzBJYXYx");
myHeaders.append("Access-Control-Allow-Origin", "same-origin");

let requestOptions = {
  method: 'GET',
  headers: myHeaders, 
  redirect: 'follow'
};

fetch("https://api.yelp.com/v3/businesses/search?term=delis&latitude=37.2529553&longitude=35.328973", requestOptions)
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));
 

searchFormEl.addEventListener("submit",searchHandler);
