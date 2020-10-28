'use strict';
var gMap;
var gNextid = 101;
var gPlaces = [];
var STORAGE_KEY = 'mapDB'

function getPlaces() {
    var places = loadFromStorage(STORAGE_KEY);
    return places;
}

function addPlace(location, locationName, newmarker) {

    gMarks.push({ ref: newmarker, id: gNextid });
    gPlaces.push({
        id: gNextid++,
        name: locationName,
        lat: location.lat(),
        lng: location.lng(),
        location,
    });
    _savePlaceToStorage()
}


function _savePlaceToStorage() {
    saveToStorage(STORAGE_KEY, gPlaces)
}


function removePlace(placeId) {
    var placeIDX = getPlaceIDXByID(placeId)
    removePlaceFromMap(placeId);
    gMarks.splice(placeIDX, 1)
    // console.log(placeid, 'I am remove PLACE FROM THE SERVICE!', placeIDX)
    gPlaces.splice(placeIDX, 1)
    _savePlaceToStorage();
}

function getPlaceIDXByID(placeId) {
    var placeIDX = gPlaces.findIndex((currPlace) => currPlace.id === placeId);
    return placeIDX;
}

function removePlaceFromMap(placeid) {
    var markIDX = gMarks.findIndex((currmark) => currmark.id === placeid);
    console.log('I am mark IDX', markIDX)
    if (markIDX < 0) return;
    gMarks[markIDX].ref.setMap(null);
}