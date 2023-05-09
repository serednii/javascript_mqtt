const langArr = {
    "dey_monday": {
        "ua": 'ПО',
        "en": 'MO',
        "cz": 'PO',
    },
    "dey_tuesday": {
        "ua": 'ВІ',
        "en": 'TU',
        "cz": 'ÚT',
    },
    "dey_wednesday": {
        "ua": 'СЕ',
        "en": 'WE',
        "cz": 'ST',
    },
    "dey_thursday": {
        "ua": 'ЧЕ',
        "en": 'TH',
        "cz": 'ČT',
    },
    "dey_friday": {
        "ua": 'ПЯ',
        "en": 'FR',
        "cz": 'PA',
    },
    "dey_saturday": {
        "ua": 'СУ',
        "en": 'SA',
        "cz": 'SO',
    },
    "dey_sunday": {
        "ua": 'НЕ',
        "en": 'SU',
        "cz": 'NE',
    },
    "error_title": { //
        "ua": 'При несправності термодатчика  або таймера   реле залишаємо',
        "en": 'If the temperature sensor or timer malfunctions, leave the relay',
        "cz": 'Pokud dojde k poruše teplotního čidla nebo časovače, opusťte relé',
    },
    "on": { //
        "ua": 'вкл',
        "en": 'on',
        "cz": 'zapnut',
    },
    "off": { //
        "ua": 'відкл',
        "en": 'off',
        "cz": 'vypnut',
    },
    "change_on_off_rele": { //
        "ua": ' При спрацюванні термодатчика  або таймера включаємо або виключаємо реле',
        "en": ' When the temperature sensor or timer is activated, turn the relay on or off',
        "cz": 'Když je aktivován teplotní senzor nebo časovač, zapněte nebo vypněte relé',
    },
    "control_termo": { //
        "ua": ' Управління термодатчиком',
        "en": 'Temperature sensor control',
        "cz": 'Ovládání teplotním čidlem'
    },
    // "control_timer": { //
    //     "ua": ' Управління таймером',
    //     "en": 'Timer control',
    //     "cz": 'Ovládání časovače'
    // },
    "manual_control": { //
        "ua": 'Ручне управління',
        "en": 'Manual control',
        "cz": 'Ruční ovládání'
    },
    "select_sensor": { //
        "ua": 'Виберіть термодатчик',
        "en": 'Select the temperature sensor',
        "cz": 'Vyberte teplotní senzor'
    },
    "one_range ": { //
        "ua": 'Один  діапазон',
        "en": 'One range',
        "cz": 'Jeden rozsah',
    },
    "two_range ": { //
        "ua": 'Два   діапазони',
        "en": 'Two ranges',
        "cz": 'Dva rozsahy',
    },
    "temp_on": { //
        "ua": 'Темп вкл',
        "en": 'Temp ON',
        "cz": 'Tepl ZAP',
    },
    "temp_off": { //
        "ua": 'Темп відк',
        "en": 'Temp OFF',
        "cz": 'Tepl VYP',
    },
}

// languageChange('ua');

function languageChange(language) {
    for (let key in langArr) {
        // console.log('key  ' + key);
        let elem = document.querySelectorAll('.lan-' + key);
        elem.forEach(e => {
            e.innerHTML = langArr[key][language];
            // console.log('language = ' + langArr[key][language]);
        });
    }
}


document.querySelector('.popap-menu__btn-ua ').addEventListener('click', () => {
    // console.log('UAUAUA');
    localStorage.setItem('Language', 'ua');
    languageChange('ua');

});

document.querySelector('.popap-menu__btn-en').addEventListener('click', () => {
    // console.log('ENENENE');
    languageChange('en');
    localStorage.setItem('Language', 'en');

});

document.querySelector('.popap-menu__btn-cz').addEventListener('click', () => {
    // console.log('CZCZCZS');
    localStorage.setItem('Language', 'cz');
    languageChange('cz');
});
