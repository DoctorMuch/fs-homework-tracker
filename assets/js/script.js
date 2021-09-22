const searchFormEl = document.getElementById("search-form");
const searchEl = document.getElementById("start");
<<<<<<< HEAD
=======
const input = searchEl?.value?.trim();
>>>>>>> main


let geoApiUrlRoot = "https://api.geoapify.com/v1/geocode/search?text=";
const headers = new Headers();

// headers.append("Authorization", `Bearer ${yelpKey}`);
headers.append("Access-Control-Allow-Origin", "*");

// proxy
const proxyUrl = "https://cors-anywhere.herokuapp.com/";

// Sample input is St. Louis. We can replace with our input eventually.
const sampleInput = "St.Louis";
const yelpApiUrl = `https://api.yelp.com/v3/businesses/search?term=coffee&location=${sampleInput}`;

const requestOptions = {
  method: "GET",
  headers: headers,
  redirect: "follow"
};

// the fetch 
fetch(`${proxyUrl}${yelpApiUrl}`, requestOptions)
  .then((response) => response.json())
  .then((result) => {
    console.log("result = ", result);
    const coffeePlaces = result.businesses;
    console.log("coffeePlaces = ", coffeePlaces);
    $(".card-body").append(
      `<h1>${coffeePlaces[0].name}: ${coffeePlaces[0].rating} stars</h1>`
    );
  })
  .catch((error) => console.log("error", error));
console.log(`${proxyUrl}${yelpApiUrl}`);

let yelpKey = "aBdON1ZvfAKCxHuCC0EUxrGoJYkiBMSVHOlne-grhLwl_lH2xVdrdr0dB8oWIW8GIpJeyo2ZelAiGq-ARqIYSXzNarkJXeG_yJK9Kk8iX2_bChtoEkojlSqFGzBJYXYx";
let yelpUrlRoot = "https://api.yelp.com/v3/businesses/search?term=coffee&latitude=-93.2529553&longitude=35.328973&apiKey=aBdON1ZvfAKCxHuCC0EUxrGoJYkiBMSVHOlne-grhLwl_lH2xVdrdr0dB8oWIW8GIpJeyo2ZelAiGq-ARqIYSXzNarkJXeG_yJK9Kk8iX2_bChtoEkojlSqFGzBJYXYx";

let searchHandler = function(event){
  event.preventDefault();
  const userInput = searchEl.value.trim();
  testFetch(userInput);
  userInput.value = '';
  
}
let testFetch = function(zipcode){
<<<<<<< HEAD
  fetch(`https://api.geoapify.com/v1/geocode/search?text=${zipcode}&limit=1&type=postcode&filter=countrycode:us,mo`+geoKey)
  .then(function(response){
    response.json()
=======
  fetch(`https://api.geoapify.com/v1/geocode/search?text=${zipcode}&limit=3&type=city&filter=countrycode:us,mo${geoKey}`)
  .then(function(res){
    res.json()
>>>>>>> main
    .then(function(info){
      let inputLat = info.features[0].properties.lat;
      let inputLon = info.features[0].properties.lon
      console.log(inputLat,inputLon);
      return inputLat,inputLon;
    })
  })
};

let pos;
let map;
function initMap(){
  pos={lat: 38.623548023, lng: -90.25626161};
  map = new google.maps.Map(document.getElementById('map'), {
    center: pos,
    zoom: 15
  });
}
// Failed YelpFusionApi call attempt(s)
// let myHeaders = new Headers();
// myHeaders.append("Host", "api.yelp.com");
// myHeaders.append("Authorization", "Bearer AxElVNzLgKgxOjwHwRQhVWwefF8-zwSvByZ-veYfEtaZ53PaGII5hNE2s2W5BKjOhVCVycya1xmUDUGTffG3h8qA16VAzuWpCF5MqprKT9se4bbKgOiYaUn3X5FKYXYx");
// myHeaders.append("Access-Control-Allow-Origin", "same-origin");
// myHeaders.append("Cache-Control", "no-cache");

// let requestOptions = {
//   method: 'GET',
//   headers: myHeaders, 
//   redirect: 'follow'
// };

// fetch("https://api.yelp.com/v3/businesses/search?location=new+york", requestOptions)
// .then(response => response.text())
// .then(result => console.log(result))
// .catch(error => console.log('error', error));
 
let showResults = function(lat, lon){
  let resultsEl = document.getElementById("results");
}

searchFormEl.addEventListener("submit",searchHandler);
