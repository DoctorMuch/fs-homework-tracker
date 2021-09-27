const searchFormEl = document.getElementById("search-form");
const searchEl = document.getElementById("start");
let searchLat;
let searchLong;
let businessId;

function replaceSearchInput(zipCode) {
  document.getElementById("start").value=zipCode;
  $("#submit-button").click();
}

function displayOldSearchHistory() {
  const zipReturn = localStorage.getItem("zipInput")
  if (zipReturn) {
    let zipDataLocalStorage = JSON.parse(localStorage.getItem("zipInput"));
    zipDataLocalStorage.forEach(zipSearch => {
    const searches = $("#searches");
    searches.append(`<button class="btn btn-secondary btn-lg" onClick = "replaceSearchInput(${zipSearch})">${zipSearch}</button>`);
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
          .attr("style", "width:15rem")
          .attr("id", `${businessId}`);
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

  // Local Storage 
  if (!zipInput) {
    return
  }
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
  searches.append(`<button class="btn btn-secondary btn-lg" onClick = "replaceSearchInput(${zipInput})">${zipInput}</button>`);
};
 

  $("#shopLog")
    .on("click", "div", function(){
      let shopName = this;
      console.log(shopName);
      fetch(`${proxyUrl}https://api.yelp.com/v3/businesses/${this.id}/reviews`, requestOptions)
        .then(function(response){
          response.json()
          .then(function(data){
            let shopReviews = data.reviews;
            console.log(shopReviews);
            console.log(shopReviews[1].text)
            $("#shop-modal")
              .modal()
              $("#shop-name")
              .append(shopName)
              $("#shop-details")
              .append(
                `<p>Review from ${shopReviews[0].user.name}: ${shopReviews[0].text}</p>
                <span href=${shopReviews[0].url}>`
              );
          })
        })
      console.log(this.id);
    });


searchFormEl.addEventListener("submit",searchHandler);
