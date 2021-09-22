const searchFormEl = document.getElementById("search-form");
const searchEl = document.getElementById("start");
const input = searchEl?.value?.trim();

let geoKey = "&apiKey=af0eec2b25d34eb690dca8d75d93b100";
let geoApiUrlRoot = "https://api.geoapify.com/v1/geocode/search?text=";
const headers = new Headers();

headers.append("Authorization", `Bearer ${yelpKey}`);
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
