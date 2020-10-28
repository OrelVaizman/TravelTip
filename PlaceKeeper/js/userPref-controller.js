'use strict';

function onSubmitPref(ev) {
    ev.preventDefault();
    var userHPColor = document.querySelector('[name=HP-color]').value;
    var userTXTColor = document.querySelector('[name=TXT-color]').value;
    var userBirthD = document.querySelector('[name=USR-birthdate]').value;
    var userBirthT = document.querySelector('[name=USR-birthtime]').value;
    var userEmail = document.querySelector('[name=USR-email]').value;
    createUser(userHPColor, userTXTColor, userBirthD, userBirthT, userEmail)
    alert('Your user perferneces has been set!')
    // console.log(elHPColor, elTXTColor, elUSRBirthD, elUSRBirthT)s
}

function renderUserPref() {
    if (gUserData.bgc === 'UNKNOWN') return;
    var elBody = document.querySelector('body');
    elBody.style.backgroundColor = (gUserData.bgc)
    elBody.style.color = (gUserData.color)
    console.log('rendering');
}
