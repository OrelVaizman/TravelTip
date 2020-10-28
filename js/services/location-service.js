console.log('working!!')
import {storageService} from './storage-service.js'
const gLocations = [];
const LOCATIONS = 'LocationsDB'


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