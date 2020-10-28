'use strict';

function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}

function loadFromStorage(key) {
    var val = localStorage.getItem(key)
    return JSON.parse(val)
}

function initPlaces() {
    var places = loadFromStorage(STORAGE_KEY);
    if (!places) return
    gPlaces = places;
}