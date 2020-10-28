import { mapService } from './services/mapService.js';
import { locationService } from './services/location-service.js';
var gMap;
console.log('Main!');

//This one just does nothing but returning a location variable in 2 ses(settimeout)
mapService.getLocs()
    .then(locs => console.log('locs', locs))

window.onload = () => {
    initMap()
        .then(() => {
            addMarker({ lat: 32.0749831, lng: 34.9120554 });
        })
        .catch(console.log('INIT MAP ERROR'));

    getPosition()
        .then(pos => {

            console.log('User position is:', pos.coords);
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}

function addEventListeners() {
    document.querySelector('form[name=search-form]').addEventListener('submit', (ev) => {
        ev.preventDefault();
        const searchedLocation = document.getElementById('search-location').value
        onSearchLocation(searchedLocation);
    })
    document.querySelector('.btn-my-location').addEventListener('click',(ev)=>{
        ev.preventDefault();
        console.log('click!!!')
        getPosition().then(pos=>showLocation(pos))
    })
}

function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap');
    addEventListeners()
    return _connectGoogleApi()
        .then(() => {
            console.log('google available');
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
            console.log('Map!', gMap);
        })
}

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!'
    });
    return marker;
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    gMap.panTo(laLatLng);
}

function getPosition() {
    console.log('Getting Pos');

    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}


function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${mapService.API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}


function onSearchLocation(name) {
    mapService.getLatLngByName(name)
        .then(location => {
            locationService.addLocation(name, location.lat, location.lng, 'weather', Date.now(), Date.now())
            panTo(location.lat, location.lng)
            renderLocations()
        })
}



function renderLocations() {
    const elLocations = document.querySelector('.locations-details');
    const strHtmls = locationService.gLocations.map(location => {
        return `
        <tr data-id="${location.id}">
        <td>${location.name}</td>
        <td>${location.lat}</td>
        <td>${location.lng}</td>
        <td>${location.weather}</td>
        <td>${new Date(location.createdAt).toTimeString()}</td>
        <td>${location.updatedAt}</td>
        <td><button class="btn btn-go">GO</button></td>
        <td><button class="btn btn-remove">Delete</button></td>
        </tr>
        `
    })
    elLocations.innerHTML = strHtmls.join('');
}
// QUEST 7:
function onRemoveLocation(id) {
    locationService.removeLocation(id);
}
function onGoLocation(id){
  const coords =  locationService.goToLocation(id);
  panTo(coords.lat, coords.lng)
}


function showLocation(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude
    var marker = new google.maps.Marker({
        position: { lat, lng },
        gMap,
        title: 'Hello World!'
    });
    gMap.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
    marker.setMap(gMap);
}