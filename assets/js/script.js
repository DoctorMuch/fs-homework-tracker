const searchFormEl = document.getElementById("search-form");
const searchEl = document.getElementById("start");
let searchLat;
let searchLong;


function displayOldSearchHistory() {
  const zipReturn = localStorage.getItem("zipInput")
  if (zipReturn) {
    let zipDataLocalStorage = JSON.parse(localStorage.getItem("zipInput"));
    zipDataLocalStorage.forEach(zipSearch => {
    const searches = $("#searches");
    searches.append(`<p>${zipSearch}<p>`);
    });
  }
}; 

displayOldSearchHistory();


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
const yelpApiUrl = `https://api.yelp.com/v3/businesses/search?term=coffee&latitude=${searchLat}&longitude=${searchLong}&sort_by=rating`;

const requestOptions = {
  method: "GET",
  headers: headers,
  redirect: "follow"
};

  // the fetch 
let yelpFetch = function(){
  console.log(searchLat, searchLong);
  fetch(`${proxyUrl}https://api.yelp.com/v3/businesses/search?term=coffee&sort_by=rating&latitude=${searchLat}&longitude=${searchLong}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log("result = ", result);
      const coffeePlaces = result.businesses;
      console.log("coffeePlaces = ", coffeePlaces);
      
      for(i=0;i<5;i++){
        let shopCard = document.createElement("div");
        shopCard.textContent = '';
        $("#shopLog")
          .append(shopCard);

        $(shopCard)  
          .append(
          `<img src=${coffeePlaces[i].image_url} class="card-img-top">
          <h3 class="card-title">${coffeePlaces[i].name}</h3>
          <h4 class="card-subtitle">${coffeePlaces[i].rating} stars</h4>
          <address class="card-text">
          ${coffeePlaces[i].location.display_address[0]}
          ${coffeePlaces[i].location.display_address[1]}
          </address>`
          )
          .addClass("card-body")
          .attr("style", "width:10rem");
      }
    })
    .catch((error) => console.log("error", error));
  console.log(`${proxyUrl}${yelpApiUrl}`);
};

let searchHandler = function(event){
  const zipInput = searchEl.value.trim();
  event.preventDefault();
  if (zipInput){
    coordFetch(zipInput);
    console.log(zipInput);
  } else {
    alert("To find the coffee, you gots to give the zip!")
  }

  // Local Storage 
  const zipReturn = localStorage.getItem("zipInput")
  if (!zipReturn) {
    let zipData = [];
    zipData.push(zipInput);
    localStorage.setItem("zipInput", JSON.stringify(zipData ));
  } else {
    let zipDataLocalStorage = JSON.parse(localStorage.getItem("zipInput"));
    zipDataLocalStorage.push(zipInput);
    localStorage.setItem("zipInput",  JSON.stringify(zipDataLocalStorage));
  }

  const searches = $("#searches");
  searches.append(`<p>${zipInput}<p>`);
};
searchFormEl.addEventListener("submit",searchHandler);
