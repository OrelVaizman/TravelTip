import { mapService } from './services/mapService.js'

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

document.querySelector('.btn').addEventListener('click', (ev) => {
    console.log('Aha!', ev.target);
    panTo(35.6895, 139.6917);
})


function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap');
    _connectGoogleApi()
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
    const API_KEY = 'AIzaSyD8qth7BA_EefnQxB5LywbeAxaoDn6cxsQ'; //TODO: Enter your API Key
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}



function renderLocations(locations){
    const elLocations = document.querySelector('.locations-details');
    const strHtmls = locations.map(location=>{
        return `
        <tr class="${location.id}">
        <td>${location.name}</td>
        <td>${location.lat}</td>
        <td>${location.lng}</td>
        <td>${location.weather}</td>
        <td>${location.createdAt}</td>
        <td>${location.updatedAt}</td>
        <td>${location.updatedAt}</td>
        <td><button class="btn btn-go">GO</button></td>
        <td><button class="btn btn-remove">Delete</button></td>
        </tr>
        `
    })
    elLocations.innerHTML = strHtmls.join('');
}