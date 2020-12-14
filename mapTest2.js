window.currentPos = {
  latitude: null,
  longitude: null
}

function initMap() {
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 18,
    center: {lat: 25.042440044101546, lng: 121.51375921945278},
  });
  // const destinationIcon =
  //   "https://chart.googleapis.com/chart?" +
  //   "chst=d_map_pin_letter&chld=D|FF0000|000000";
  // const originIcon =
  //   "https://chart.googleapis.com/chart?" +
  //   "chst=d_map_pin_letter&chld=O|FFFF00|000000";
  directionsRenderer.setMap(map);

  // document.querySelector('#btn-cal').addEventListener('click', onChangeHandler)

 
  // document.getElementById("start-address").addEventListener("change", onChangeHandler);
  // document.getElementById("end-address").addEventListener("change", onChangeHandler);
  // document.querySelector('btn-cal').addEventListener('click', calculateAndDisplayRoute(directionsService, directionsRenderer));

  // 顯示距離及所需時間
  // const origin1 = document.getElementById('start-address').value
  // const destination1 = document.getElementById('end-address').value
  const geocoder = new google.maps.Geocoder();

  setupEvents(directionsService, directionsRenderer)

  geoFindMe(directionsService, directionsRenderer)

  autoDetectYourPos(directionsService, directionsRenderer)
}

function setupEvents(directionsService, directionsRenderer) {
  document.getElementById('end-address').addEventListener('change', function (e) {
    changeEndaddressEvent(directionsService, directionsRenderer, e)
  })
}

function changeEndaddressEvent(directionsService, directionsRenderer, e) {
  calculateAndDisplayRoute(directionsService, directionsRenderer);
  // displayMarkersWithinTime(response)
}

function calculateAndDisplayRoute(directionsService, directionsRenderer) {
  directionsService.route(
    {
      origin: { 
         lat: window.currentPos.latitude, 
         lng: window.currentPos.longitude, 
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

function geoFindMe(directionsService, directionsRenderer, autoCalc) {
  const status = document.querySelector('#status');
  const mapLink = document.querySelector('#map-link');

  mapLink.href = '';
  mapLink.textContent = '';

  function success(position) {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
    window.currentPos = {latitude: latitude, longitude: longitude}
    let originPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    status.textContent = '';
    mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
    console.log('final')

    if (autoCalc) {
      calculateAndDisplayRoute(directionsService, directionsRenderer)
    }
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
}

function autoDetectYourPos(directionsService, directionsRenderer) {
  window.setInterval(function() {
    geoFindMe(directionsService, directionsRenderer, true)
  }, 10000)
}