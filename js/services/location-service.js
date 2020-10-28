console.log("working!!");
import { storageService } from "./storage-service.js";
import { utilsService } from "./utils.js";

let gLocations = loadLocations();
const LOCATIONS = "LocationsDB";

function loadLocations() {
  gLocations = storageService.loadFromStorage(LOCATIONS);
  if (!gLocations || !gLocations.length) gLocations = [];
}

function addLocation(name, lat, lng, weather, createdAt, updatedAt = null) {
  gLocations.push(
    createLocation(name, lat, lng, weather, createdAt, (updatedAt = null))
  );
  storageService.saveToStorage(LOCATIONS, gLocations);
}
function removeLocation(id) {
  const idx = gLocations.findIndex((location) => location.id === id);
  gLocations.splice(idx, 1);
  storageService.saveToStorage(LOCATIONS, gLocations);
}
function goToLocation(id) {
  const idx = gLocations.findIndex((location) => location.id === id);
  const lat = gLocations[idx].lat;
  const lng = gLocations[idx].lng;
  return { lat, lng };
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
  addLocation,
  removeLocation,
  goToLocation,
};
