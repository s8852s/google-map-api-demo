let curPosition = null
console.log(curPosition)
function initMap() {
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 18,
    center: {lat: 25.0147130292605986, lng: 121.46336033068708},
  });

   //板橋車站 25.014713029260598, 121.46336033068708
  // const destinationIcon =
  //   "https://chart.googleapis.com/chart?" +
  //   "chst=d_map_pin_letter&chld=D|FF0000|000000";
  // const originIcon =
  //   "https://chart.googleapis.com/chart?" +
  //   "chst=d_map_pin_letter&chld=O|FFFF00|000000";
  directionsRenderer.setMap(map);

  // document.querySelector('#btn-cal').addEventListener('click', onChangeHandler)

 
  document.getElementById("start-address").addEventListener("change", onChangeHandler);
  document.getElementById("end-address").addEventListener("change", onChangeHandler);
  // document.querySelector('btn-cal').addEventListener('click', calculateAndDisplayRoute(directionsService, directionsRenderer));

  // 顯示距離及所需時間
  const origin1 = document.getElementById('start-address').value
  const destination1 = document.getElementById('end-address').value
  const geocoder = new google.maps.Geocoder();

}





//
function geoFindMe() {

  const status = document.querySelector('#status');
  const mapLink = document.querySelector('#map-link');

  mapLink.href = '';
  mapLink.textContent = '';

  function success(position) {
    curPosition = position
    console.log(curPosition)
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
    let originPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    status.textContent = '';
    mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
    console.log('final')
  }

  function error() {
    status.textContent = 'Unable to retrieve your location';
  }

  if(!navigator.geolocation) {
    status.textContent = 'Geolocation is not supported by your browser';
  } else {
    status.textContent = 'Locating…';
    navigator.geolocation.getCurrentPosition(success, error);
  }
//   
  // const service = new google.maps.DistanceMatrixService();
  // service.getDistanceMatrix({
  //   origins: [originPosition],
  //   destination: {
  //     query: document.getElementById("end-address").value,
  //   },
  //    travelMode: 'DRIVING',
  //    unitSystem: google.maps.UnitSystem.METRIC, // 單位 METRIC(公里，預設)、IMPERIAL(哩)
  //    avoidHighways: true, // 是否避開高速公路
  //    avoidTolls: true // 是否避開收費路線
  // }, callback);

  // function callback(response, status) {
  //   if (status !== google.maps.DistanceMatrixStatus.OK) {
  //     window.alert('Error was' + status);
  //   } else {
  //     console.log(response);
  //   }
  // }

}
window.addEventListener("DOMContentLoaded", function(){
  document.querySelector('#find-me').addEventListener('click', geoFindMe);
})

let lat1 = function success(position) {
  console.log(position)
  const latitude  = position.coords.latitude;

  console.log(latitude)
  return position.coords.latitude
}

let lng1 = function success2(position) {
  const longitude = position.coords.longitude;
  return position.coords.longitude
}

const onChangeHandler = function () {
  calculateAndDisplayRoute(directionsService, directionsRenderer);
  displayMarkersWithinTime(response)
  // displayDistanceAndTime(response);
};

function calculateAndDisplayRoute(directionsService, directionsRenderer) {
  // window.setInterval(success2, 1000)
  // window.setInterval(lat1(1), 1000)
  directionsService.route(
    {
      origin: { 
         lat: lat1(position), lng: lng1(position), 
      },
      destination: {
        query: document.getElementById("end-address").value,
      },
      travelMode: google.maps.TravelMode.DRIVING,
    },
    (response, status) => {
      if (status === "OK") {
        directionsRenderer.setDirections(response);
      } else {
        window.alert("Directions request failed due to " + status);
      }
    }
  );
}