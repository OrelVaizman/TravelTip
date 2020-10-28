console.log('working!!')
import {storageService} from './storage-service.js'
import { utilsService } from './utils.js';

let gLocations = loadLocations();
const LOCATIONS = 'LocationsDB'

function loadLocations(){
    gLocations = storageService.loadFromStorage(LOCATIONS);
    if(!gLocations || !gLocations.length) gLocations = [];
}

function addLocation(name,lat,lng,weather,createdAt,updatedAt=null){
    gLocations.push(createLocation(name,lat,lng,weather,createdAt,updatedAt=null));
    storageService.saveToStorage(LOCATIONS,gLocations)   
}

function createLocation(name,lat,lng,weather,createdAt,updatedAt=null){
    return {
        id:utilsService.makeId(),
        name,
        lat,
        lng,
        weather,
        createdAt,
        updatedAt
    }
}