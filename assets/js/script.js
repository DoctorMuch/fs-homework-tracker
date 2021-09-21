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
let yelpTest = {
  method: 'GET',
  mode: 'no-cors',
  Headers: {
    'Access-Control-Allow-Origin': '*',
    'Authorization': 'Bearer aBdON1ZvfAKCxHuCC0EUxrGoJYkiBMSVHOlne-grhLwl_lH2xVdrdr0dB8oWIW8GIpJeyo2ZelAiGq-ARqIYSXzNarkJXeG_yJK9Kk8iX2_bChtoEkojlSqFGzBJYXYx'
  }
}
fetch("https://api.yelp.com/v3/businesses/search?term=coffee&latitude=-93.2529553&longitude=35.328973", yelpTest)
.then(function(response){
  response.json()
  .then(function(data){
    console.log(data);
  })
})

searchFormEl.addEventListener("submit",searchHandler);
