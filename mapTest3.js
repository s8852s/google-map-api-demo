window.currentPos = {
  latitude: null,
  longitude: null
}
window.startPosi = {lat: window.currentPos.latitude, lng: window.currentPos.longitude};
// window.startMarker = new google.maps.Marker({
//   position: startPosi,
//   map: map,
//   title: 'First Marker!',
//   animation: google.maps.Animation.DROP,
//   icon: defaultIcon
// });

// window.endPosi = document.querySelector(".end-address").value;
// window.endMarker = new google.maps.Marker({
//   position: endPosi,
//   map: map,
//   title: 'End Marker!',
//   animation: google.maps.Animation.DROP,
//   icon: defaultIcon
// });
document.addEventListener("DOMContentLoaded", initMap)
// document.addEventListener(DOMContentLoaded, initMap)
function initMap() {
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();
//   const distanceMatrix = new google.maps.DistanceMatrixService();
  
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
  var locations = [
    {title: '板橋車站', location: {lat: 25.014499118873864, lng: 121.4632315819448}},
    {title: '台北車站', location: {lat: 25.047829614909368, lng: 121.51737528087179}},
    {title: '二二八公園', location: {lat: 25.04189342615461, lng: 121.51496603961701}},
    {title: '臺大醫院', location: {lat: 25.042613480677044, lng: 121.51854804295617}},
    {title: '總統府', location: {lat: 25.040082583969493, lng: 121.51194396845271}},
    {title: '龍山寺', location: {lat: 25.037153902969788, lng: 121.49992444654679}},
    {title: '大安森林公園', location: {lat: 25.033208656976786, lng: 121.53515702658704}},
    {title: '寧夏夜市', location: {lat: 25.056006380834173, lng:  121.51529418477676}}
  ];

  // 板橋車站 {lat: 25.014615804593976, lng: 121.4633388730153}
  // 台北車站 {lat: 121.517498, lng: 25.046273}
  directionsRenderer.setMap(map);
  const geocoder = new google.maps.Geocoder();
  setupEvents(directionsService, directionsRenderer)
  geoFindMe(directionsService, directionsRenderer)
  autoDetectYourPos(directionsService, directionsRenderer)
  
  distanceMatrixService()
  
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
  }, 1000000000)
}

// ----------------------------------------------------

// document.addEventListener('DOMContentLoaded', DistanceMatrixService)

document.querySelector('.btn-cal').addEventListener('click', distanceMatrixService)
// const distanceMatrix = new google.maps.DistanceMatrixService();
function distanceMatrixService(){
    var origin1 = new google.maps.LatLng(window.currentPos.latitude, window.currentPos.longitude);
    var distanceMatrix = new google.maps.DistanceMatrixService;
    console.log(distanceMatrix);
    console.log({ 
        lat: window.currentPos.latitude, 
        lng: window.currentPos.longitude, 
        });
    distanceMatrix.getDistanceMatrix(
        {
            origins: [origin1],
            destinations: [document.getElementById("end-address").value],
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.METRIC,
        },
        (response, status) => {
        if (status !== google.maps.DistanceMatrixStatus.OK) {
          window.alert('Error was' + status);
        } else {
            displayDistanceAndTime(response)
            console.log(response)
        }
      })

}
function displayDistanceAndTime(response) {
    // var element = results;
    var durationText = response.rows[0].elements[0].duration.text
    var distanceText = response.rows[0].elements[0].distance.text
    outputText = document.createElement('p')
    outputText.innerHTML = `<p>距離: ${distanceText} / 時間: ${durationText}</p>`
    output.appendChild(outputText)

  }
