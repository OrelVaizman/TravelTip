console.log('working!!')
import {storageService} from './storage-service.js'
const gLocations = [];
const LOCATIONS = 'LocationsDB'


function addLocation(id,name,lat,lng,weather,createdAt,updatedAt){
    gLocations.push(createLocation(id,name,lat,lng,weather,createdAt,updatedAt));
    storageService.saveToStorage(LOCATIONS,gLocations)
     
}

function createLocation(id,name,lat,lng,weather,createdAt,updatedAt){
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