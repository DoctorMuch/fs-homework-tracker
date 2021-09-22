const searchFormEl = document.getElementById("search-form");
const searchEl = document.getElementById("start");
const zipInput = searchEl?.value?.trim();


let geoApiUrlRoot = "https://api.geoapify.com/v1/geocode/search?text=";

// proxy
const proxyUrl = "https://cors-anywhere.herokuapp.com/";

// Sample input is St. Louis. We can replace with our input eventually.
const sampleInput = "&latitude=39.819382402&longitude=-89.645660649";
const yelpApiUrl = `https://api.yelp.com/v3/businesses/search?term=coffee${sampleInput}`;


const headers = new Headers();
headers.append("Authorization", `Bearer ${yelpKey}`);
headers.append("Access-Control-Allow-Origin", "*");

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
      `<h1>${coffeePlaces[0].name}</h1>
       <h2>${coffeePlaces[0].rating} stars</h2>
        <address>
        ${coffeePlaces[0].location.display_address[0]}
        ${coffeePlaces[0].location.display_address[1]}
        </address>`
    );
  })
  .catch((error) => console.log("error", error));
console.log(`${proxyUrl}${yelpApiUrl}`);

let searchHandler = function(event){
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
};

 
let showResults = function(lat, lon){
  let resultsEl = document.getElementById("results");
}

searchFormEl.addEventListener("submit",searchHandler);
