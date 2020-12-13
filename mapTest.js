function initMap() {
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 18,
    center: {lat: 25.042440044101546, lng: 121.51375921945278},
  });
  const destinationIcon =
    "https://chart.googleapis.com/chart?" +
    "chst=d_map_pin_letter&chld=D|FF0000|000000";
  const originIcon =
    "https://chart.googleapis.com/chart?" +
    "chst=d_map_pin_letter&chld=O|FFFF00|000000";
  directionsRenderer.setMap(map);

  // document.querySelector('#btn-cal').addEventListener('click', onChangeHandler)

  const onChangeHandler = function () {
    calculateAndDisplayRoute(directionsService, directionsRenderer);
    displayMarkersWithinTime(response)
    // displayDistanceAndTime(response);
  };
  document.getElementById("start-address").addEventListener("change", onChangeHandler);
  document.getElementById("end-address").addEventListener("change", onChangeHandler);
  // document.querySelector('btn-cal').addEventListener('click', calculateAndDisplayRoute(directionsService, directionsRenderer));

  // 顯示距離及所需時間
  const origin1 = document.getElementById('start-address').value
  const destination1 = document.getElementById('end-address').value
  const geocoder = new google.maps.Geocoder();



  const service = new google.maps.DistanceMatrixService();
  service.getDistanceMatrix(
    {
      origin: {
        query: document.getElementById("start-address").value,
      },
      destination: {
        query: document.getElementById("end-address").value,
      },
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC,
      avoidHighways: true,
      avoidTolls: true,
    },
    function(response, status) {
      if (status !== google.maps.DistanceMatrixStatus.OK) {
        window.alert('Error was' + status);
      } else {
        console.log(response);
      }
   });
  
}

// function success(position) {
//   const latitude  = position.coords.latitude;
//   return position.coords.latitude
// }

// function success2(position) {
//   const longitude = position.coords.longitude;
//   return position.coords.longitude
// }
function calculateAndDisplayRoute(directionsService, directionsRenderer) {
  // origin =  { lat: 55.93, lng: -3.118 }
  // window.setInterval(success, 1000)
  // window.setInterval(success2, 1000)
  

  directionsService.route(
    {
      origin: { 
        query: document.getElementById("start-address").value,
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

//
