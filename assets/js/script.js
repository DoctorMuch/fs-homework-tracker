const searchFormEl = document.getElementById("search-form");
const searchEl = document.getElementById("start");
const input = searchEl?.value?.trim();


let geoApiUrlRoot = "https://api.geoapify.com/v1/geocode/search?text=";
const headers = new Headers();

headers.append("Authorization", `Bearer ${yelpKey}`);
headers.append("Access-Control-Allow-Origin", "*");

// proxy
const proxyUrl = "https://cors-anywhere.herokuapp.com/";

// Sample input is St. Louis. We can replace with our input eventually.
const sampleInput = "&latitude=39.819382402&longitude=-89.645660649";
const yelpApiUrl = `https://api.yelp.com/v3/businesses/search?term=coffee${sampleInput}`;

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
  let zipInput = searchEl.value.trim();
  event.preventDefault();
  coordFetch(zipInput);
  console.log(zipInput);
};

let coordFetch = function(zipcode){
  fetch(`https://api.geoapify.com/v1/geocode/search?text=${zipcode}&type=postcode&limit=3&filter=countrycode:us,mo${geoKey}`)
  .then(function(res){
    res.json()
    .then(function(info){
      console.log(info.features[0].properties.lat, info.features[0].properties.lon);
      return info.features[0].properties.lat, info.features[0].properties.lon;
    })
  })
}

searchFormEl.addEventListener("submit",searchHandler);
