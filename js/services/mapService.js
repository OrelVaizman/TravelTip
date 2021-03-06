import {storageService} from './storage-service.js'
const API_KEY = 'AIzaSyD8qth7BA_EefnQxB5LywbeAxaoDn6cxsQ';
export const mapService = {
    getLocs,
    getLatLngByName,
    API_KEY,
    getAddressFromLatLng
}
var locs = [{ lat: 11.22, lng: 22.11 }]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}

// function searchLocation(searchedLocation){
//     console.log(searchedLocation)
    //panto latlang
    //pushing to gLocations

// }

function getLatLngByName(name){
return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${name}&key=${API_KEY}`)
    .then(res => res.data.results[0].geometry.location)
}

function getAddressFromLatLng(latlng) {
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng.lat},${latlng.lng}&key=${API_KEY}`)
        .then(res => {
            var loc = res.data.results[0].formatted_address
            return Promise.resolve(loc);
        })
}