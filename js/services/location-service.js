console.log("working!!");
var gLocations = [];
// const LOCATIONS = "LocationsDB";
import { storageService } from "./storage-service.js";
import { utilsService } from "./utils.js";


// function loadLocations() {
//   gLocations = storageService.loadFromStorage(LOCATIONS);
//   if (!gLocations || !gLocations.length) gLocations = [];
// }


function addLocation(name, lat, lng, weather, createdAt, updatedAt = null) {
  gLocations.push(
    createLocation(name, lat, lng, weather, createdAt, (updatedAt = null))
  );
  console.log(gLocations)
  // storageService.saveToStorage(LOCATIONS, gLocations);
}
function removeLocation(id) {
  const idx = findIndex(id);
  gLocations.splice(idx, 1);
  storageService.saveToStorage(LOCATIONS, gLocations);
}
function goToLocation(id) {
  const idx = findIndex(id);
  const lat = gLocations[idx].lat;
  const lng = gLocations[idx].lng;
  return { lat, lng };
}
function findIndex(id){
    return gLocations.findIndex((location) => location.id === id);
}
function createLocation(name, lat, lng, weather, createdAt, updatedAt = null) {
  return {
    id: utilsService.makeId(),
    name,
    lat,
    lng,
    weather,
    createdAt,
    updatedAt,
  };
}

export const locationService = {
  gLocations,
  addLocation,
  removeLocation,
  goToLocation,
};
