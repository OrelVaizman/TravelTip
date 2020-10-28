<<<<<<< HEAD
'use strict';

function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}

function loadFromStorage(key) {
    var val = localStorage.getItem(key)
    return JSON.parse(val)
}
=======
function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
  }
  
  function loadFromStorage(key) {
    const val = localStorage.getItem(key);
    return JSON.parse(val);
  }

 export const storageService = {
      saveToStorage,
      loadFromStorage
  }
>>>>>>> 74d03ed7df433aea83818cd1862b12fdeaf9449a
