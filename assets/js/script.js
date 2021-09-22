const searchFormEl = document.getElementById("search-form");
const searchEl = document.getElementById("start");
const input = searchEl.value.trim();



let geoApiUrlRoot = "https://api.geoapify.com/v1/geocode/search?text=";

let searchHandler = function(event){
  event.preventDefault();
  testFetch(input);
  console.log(input);
}
let testFetch = function(city){
  fetch("https://api.geoapify.com/v1/geocode/search?text=london&limit=3&type=city&filter=countrycode:us,mo"+geoKey)
  .then(function(res){
    res.json()
    .then(function(info){
      console.log(info.features[0].geometry.coordinates);
      return info.features[0].geometry.coordinates[0];
    })
  })
}

searchFormEl.addEventListener("submit",searchHandler);
