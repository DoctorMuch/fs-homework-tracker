const searchFormEl = document.getElementById("search-form");
const searchEl = document.getElementById("start");
let searchLat;
let searchLong;

let coordFetch = function(zipcode){
  fetch(`https://api.geoapify.com/v1/geocode/search?text=${zipcode}&type=postcode&limit=3&filter=countrycode:us,mo${geoKey}`)
  .then(function(res){
    res.json()
    .then(function(info){
      searchLat = info.features[0].properties.lat;
      searchLong = info.features[0].properties.lon;
      console.log("searchLat", searchLat, "searchLong",searchLong);
      yelpFetch(searchLat,searchLong);
      return searchLat, searchLong;
    })
  })
};

let geoApiUrlRoot = "https://api.geoapify.com/v1/geocode/search?text=";
const headers = new Headers();

headers.append("Authorization", `Bearer ${yelpKey}`);
headers.append("Access-Control-Allow-Origin", "*");

// proxy
const proxyUrl = "https://cors-anywhere.herokuapp.com/";

// Sample input is St. Louis. We can replace with our input eventually.
const sampleInput = "&latitude=39.819382402&longitude=-89.645660649";
let lat = 38.623548023;
let lon = -90.25626161;
const yelpApiUrl = `https://api.yelp.com/v3/businesses/search?term=coffee&latitude=${searchLat}&longitude=${searchLong}`;

const requestOptions = {
  method: "GET",
  headers: headers,
  redirect: "follow"
};

  // the fetch 
let yelpFetch = function(){
  console.log(searchLat, searchLong);
  fetch(`${proxyUrl}https://api.yelp.com/v3/businesses/search?term=coffee&latitude=${searchLat}&longitude=${searchLong}&bias=rating`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log("result = ", result);
      const coffeePlaces = result.businesses;
      console.log("coffeePlaces = ", coffeePlaces);
      
      for(i=0;i<5;i++){
        let shopCard = document.createElement("div");
        $(".flex-container")
          .append(shopCard);

        $(shopCard)  
          .append(
          `<h3>${coffeePlaces[i].name}</h3>
          <h4>${coffeePlaces[i].rating} stars</h4>
          <address>
          ${coffeePlaces[i].location.display_address[0]}
          ${coffeePlaces[i].location.display_address[1]}
          </address>`
          )
          .addClass("flex-item");
      }
    })
    .catch((error) => console.log("error", error));
  console.log(`${proxyUrl}${yelpApiUrl}`);
}

let searchHandler = function(event){
  const zipInput = searchEl.value.trim();
  event.preventDefault();
  if (zipInput){
    coordFetch(zipInput);
    console.log(zipInput);
  } else {
    alert("To find the coffee, you gots to give the zip!")
  }
};
 
// let showResults = function(lat, lon){
//   let resultsEl = document.getElementById("results");
// }

searchFormEl.addEventListener("submit",searchHandler);
