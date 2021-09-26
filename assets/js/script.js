const searchFormEl = document.getElementById("search-form");
const searchEl = document.getElementById("start");
let searchLat;
let searchLong;
let businessId;

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
      saveShops(result);
      console.log("result = ", result);
      const coffeePlaces = result.businesses;
      console.log("coffeePlaces = ", coffeePlaces);
      
      for(i=0;i<5;i++){
        businessId = coffeePlaces[i].id;
        let shopCard = document.createElement("div");
        let shopName = coffeePlaces[i].name;
        let shopStars = coffeePlaces[i].rating;
        let shopPic = coffeePlaces[i].image_url;
        let shopAddress = coffeePlaces[i].location.display_address[0];
        let shopTown = coffeePlaces[i].location.display_address[1];
        $("#shopLog")
          .append(shopCard);

        $(shopCard)  
          .append(
          `<img src=${shopPic} class="card-img-top">
          <h3 class="card-title">${shopName}</h3>
          <h4 class="card-subtitle">${shopStars} stars</h4>
          <address>
            ${shopAddress}
            ${shopTown}
          </address>`
          )
          .addClass("card-body")
          .attr("style", "width:15rem");
        console.log(businessId);
        }
    })
    .catch((error) => console.log("error", error));
  console.log(`${proxyUrl}${yelpApiUrl}`);
};

let saveShops = function(result){
  console.log(result);
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
 

  $("#shopLog").on("click", "div", function(){
    alert("You have clicked on a coffee shop image!");
    let shopChoice = $(this).text();
    let id = $(this).businessId;
    console.log(id)
    console.log(shopChoice);

  });

searchFormEl.addEventListener("submit",searchHandler);
