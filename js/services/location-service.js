console.log('working!!')
import {storageService} from './storage-service.js'
let gLocations = loadLocations();
const LOCATIONS = 'LocationsDB'

function loadLocations(){
    gLocations = storageService.loadFromStorage(LOCATIONS);
    if(!gLocations || !gLocations.length) gLocations = [];
}

function addLocation(id,name,lat,lng,weather,createdAt,updatedAt=null){
    gLocations.push(createLocation(id,name,lat,lng,weather,createdAt,updatedAt=null));
    storageService.saveToStorage(LOCATIONS,gLocations)   
}

function createLocation(id,name,lat,lng,weather,createdAt,updatedAt=null){
    return {
        id,
        name,
        lat,
        lng,
        weather,
        createdAt,
        updatedAt
    }
}