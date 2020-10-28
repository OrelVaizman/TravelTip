'use strict';
var STORAGE_KEY = 'appDB'
var gUserData;

function onInitHome() {
    _setUserPref()
    renderUserPref()
}

function createUser(userHPColor, userTXTColor, userBirthD, userBirthT, userEmail) {
    // console.log(userHPColor, userTXTColor, userBirthD, userBirthT)
    var user = {
        bgc: userHPColor,
        color: userTXTColor,
        birthd: userBirthD,
        birtht: userBirthT,
        email: userEmail,
    }
    gUserData = user;
    _saveUserToStorage();
}

/*NOT TO BE USED OUTSIDE THIS SERVICE!!! */

function _setUserPref() {
    var user = loadFromStorage(STORAGE_KEY)
    if (!user) {
        user = {
            bgc: 'UNKNOWN',
            color: 'UNKNOWN',
            birthd: 'UNKNOWN',
            birtht: 'UNKNOWN',
            email: 'UNKNOWN',
        }
    }
    gUserData = user;
    _saveUserToStorage();
}

function _saveUserToStorage() {
    saveToStorage(STORAGE_KEY, gUserData)
}
