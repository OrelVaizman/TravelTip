'use strict';
var gMarks = []

function init() {
    initMap();
    initPlaces();
    renderPlacesList();
}

function initMap(lat = 29.55805, lng = 34.94821) {
    var elMap = document.querySelector('#map');
    var options = {
        center: { lat, lng },
        zoom: 16
    };

    gMap = new google.maps.Map(
        elMap,
        options
    );

    var marker = new google.maps.Marker({
        position: { lat, lng },
        gMap,
        title: 'Your current location'
    });

    marker.setMap(gMap);
    google.maps.event.addListener(gMap, "click", (event) => { addMarker(event.latLng, gMap); });
}

function addMarker(location, map) {
    var nameLocation = prompt('Please name this location')
    var newmarker = new google.maps.Marker({
        position: location,
        map: map,
    });
    addPlace(location, nameLocation, newmarker);

    renderPlacesList();
}


function getPosition() {
    if (!navigator.geolocation) return alert("HTML5 Geolocation is not supported in your browser.");

    // One shot position getting or continus watch
    navigator.geolocation.getCurrentPosition(showLocation, handleLocationError);
    // navigator.geolocation.watchPosition(showLocation, handleLocationError);
}

function showLocation(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude
    var marker = new google.maps.Marker({
        position: { lat, lng },
        gMap,
        title: 'Hello World!'
    });
    var date = new Date(position.timestamp);
    document.getElementById("timestamp").innerHTML = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    gMap.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
    marker.setMap(gMap);
}

function handleLocationError(error) {
    var locationError = document.getElementById("locationError");

    switch (error.code) {
        case 0:
            locationError.innerHTML = "There was an error while retrieving your location: " + error.message;
            break;
        case 1:
            locationError.innerHTML = "The user didn't allow this page to retrieve a location.";
            break;
        case 2:
            locationError.innerHTML = "The browser was unable to determine your location: " + error.message;
            break;
        case 3:
            locationError.innerHTML = "The browser timed out before retrieving the location.";
            break;
    }
}

function renderPlacesList() {
    if (gPlaces.length < 0) return;
    var elPlacesList = document.querySelector('.location-list ul')
    var strHTML = gPlaces.map((currplace) => {
        return `
        <li>
        ${currplace.name} <button onclick="onRemovePlace(${currplace.id})">Remove</button>
        </li>
        `
    })
    elPlacesList.innerHTML = strHTML.join('');
}

function onRemovePlace(placeid) {
    // console.log(placeid)
    removePlace(placeid);
    renderPlacesList();
}