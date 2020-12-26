window.currentPos = {
  latitude: null,
  longitude: null
}
window.startPosi = {lat: window.currentPos.latitude, lng: window.currentPos.longitude};
window.startMarker = new google.maps.Marker({
  position: startPosi,
  map: map,
  title: 'First Marker!',
  animation: google.maps.Animation.DROP,
  icon: defaultIcon
});

window.endPosi = document.querySelector(".end-address").value;
window.endMarker = new google.maps.Marker({
  position: endPosi,
  map: map,
  title: 'End Marker!',
  animation: google.maps.Animation.DROP,
  icon: defaultIcon
});


function initMap() {
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 18,
    center: {lat: 25.014615804593976, lng: 121.4633388730153},
    styles:[
      {
          "featureType": "all",
          "elementType": "labels",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "all",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "saturation": 36
              },
              {
                  "color": "#000000"
              },
              {
                  "lightness": 40
              }
          ]
      },
      {
          "featureType": "all",
          "elementType": "labels.text.stroke",
          "stylers": [
              {
                  "visibility": "on"
              },
              {
                  "color": "#000000"
              },
              {
                  "lightness": 16
              }
          ]
      },
      {
          "featureType": "all",
          "elementType": "labels.icon",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "administrative",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#000000"
              },
              {
                  "lightness": 20
              }
          ]
      },
      {
          "featureType": "administrative",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "color": "#000000"
              },
              {
                  "lightness": 17
              },
              {
                  "weight": 1.2
              }
          ]
      },
      {
          "featureType": "administrative.country",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "color": "#e5c163"
              }
          ]
      },
      {
          "featureType": "administrative.locality",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "color": "#c4c4c4"
              }
          ]
      },
      {
          "featureType": "administrative.neighborhood",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "color": "#e5c163"
              }
          ]
      },
      {
          "featureType": "landscape",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#000000"
              },
              {
                  "lightness": 20
              }
          ]
      },
      {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#000000"
              },
              {
                  "lightness": 21
              },
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "poi.business",
          "elementType": "geometry",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#e5c163"
              },
              {
                  "lightness": "0"
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "color": "#ffffff"
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "labels.text.stroke",
          "stylers": [
              {
                  "color": "#e5c163"
              }
          ]
      },
      {
          "featureType": "road.arterial",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#000000"
              },
              {
                  "lightness": 18
              }
          ]
      },
      {
          "featureType": "road.arterial",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#575757"
              }
          ]
      },
      {
          "featureType": "road.arterial",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "color": "#ffffff"
              }
          ]
      },
      {
          "featureType": "road.arterial",
          "elementType": "labels.text.stroke",
          "stylers": [
              {
                  "color": "#2c2c2c"
              }
          ]
      },
      {
          "featureType": "road.local",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#000000"
              },
              {
                  "lightness": 16
              }
          ]
      },
      {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "color": "#999999"
              }
          ]
      },
      {
          "featureType": "transit",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#000000"
              },
              {
                  "lightness": 19
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#000000"
              },
              {
                  "lightness": 17
              }
          ]
      }
  ]
  });

  // 板橋車站 25.014615804593976, 121.4633388730153

  directionsRenderer.setMap(map);

  
  const geocoder = new google.maps.Geocoder();

  setupEvents(directionsService, directionsRenderer)

  geoFindMe(directionsService, directionsRenderer)

  autoDetectYourPos(directionsService, directionsRenderer)

  DistanceMatrixService(directionsService, directionsRenderer)
  
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
  }, 100000)
}

// ----------------------------------------------------

function DistanceMatrixService(){
    var service = new google.maps.DistanceMatrixService();
  service.getDistanceMatrix(
    {
      origin: { 
        lat: window.currentPos.latitude, 
        lng: window.currentPos.longitude
      },
      destination: {
        query: document.getElementById("end-address").value,
      },
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC,
    }, function(response, status) {
     if (status !== google.maps.DistanceMatrixStatus.OK) {
       window.alert('Error was' + status);
      //  console.log('OK');
     } else {
       console.log(response);
     }
  }); 
}
// ----------------------------------------------------

// google.maps.event.addDomListener(window,"load", searchWithinTime);

// function searchWithinTime() {
//     // console.log('123123');
//   var distanceMatrixService = new google.maps.DistanceMatrixService;
//   var address = document.getElementById("end-address").value;
//   if (address == '') {
//     window.alert('You must enter an address.');
//   } else {
//     distanceMatrixService.getDistanceMatrix({
//       origins: 
//             {lat: 25.014615804593976, 
//             lng: 121.4633388730153},
//       destinations: {
//             query: document.getElementById("end-address").value,
//             },
//       travelMode: google.maps.TravelMode.DRIVING,
//       unitSystem: google.maps.UnitSystem.IMPERIAL,
//     }, function(response, status) {
//       if (status !== google.maps.DistanceMatrixStatus.OK) {
//         window.alert('Error was: ' + status);
//       } else {
//           console.log('aassdsdad')
//         displayMarkersWithinTime(response);
//       }
//     });
//   }
// }


// function displayMarkersWithinTime(response) {

//   var destinations = response.destinationAddresses;

//   for (var i = 0; i < origins.length; i++) {
//     var results = response.rows[i].elements;
//     for (var j = 0; j < results.length; j++) {
//       var element = results[j];
//       if (element.status === "OK") {
//         var distanceText = element.distance.text;
//         var duration = element.duration.value / 60;
//         var durationText = element.duration.text;


//         startMarker.setMap(map);
//           // atLeastOne = true;

//           var infowindow = new google.maps.InfoWindow({
//             content: durationText + ' away, ' + distanceText +
//               '<div><input type=\"button\" value=\"View Route\" onclick =' +
//               '\"displayDirections(&quot;' + origins + '&quot;);\"></input></div>'
//           });
//           infowindow.open(map, startMarker);

//           google.maps.event.addListener(startMarker, 'click', function() {
   
//           });

//       }
//     }
//   }
// }