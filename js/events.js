
const objClickFunctions = {
    btnOnOffRele,//
    saveTimeData,//кнопка відправки дат і годин для таймера на чіп
    saveReleName,////Кнопка для відправки імені реле на чіп
    saveTimeClear,//
    releSetingSwitch,
    saveTempVklOtkl,///кнопка для збереження  зміни температури при вкл викл реле
    saveEepromAdress,//
    showSetibgSensors,//
    btnRestartDeviceFun,
    releSetingTimerSwitch,
    releManualAutoSwitch,
    btnEepromAddressClear,
    btnChangeEepromAddress,//
    releTempChangeSingleFun,
    btnPopapAddNewDeviceOpenFun,
}

const objChangeFunctions = {
    selectSensorOfRele,//
    inputControlErrorFun,
    releTempChangeRadioFun,
    // releitemChangeDataAndTime: releitemChangeDataAndTime//
}

const objInputFunctions = {
    releTempVklOtkl,
    // tempVklChange: tempVklChange,//
    // tempVyklChange: tempVyklChange,//
    // releOn: releOn,//
    // releOff: releOff,//
    // sensorOnRange, sensorOnRange,//
    // sensorTwoRange: sensorTwoRange,//
    // liReleItem: liReleItem//
}

const objKeyUpFunctions = {

}


//****************************CLICK**********************************
//******************************************************************************************************************************************************* */
function saveTempVklOtkl(target) {//кнопка для збереження  зміни температури при вкл викл реле
    const obj = {
        "number": target.closest('.rele__item').dataset.rele,//Читаємо номер блока реле
        "tempVkl": target.closest('.rele-temp-change-input').querySelector('.rele-temp-vkl').value,
        "tempOtkl": target.closest('.rele-temp-change-input').querySelector('.rele-temp-otkl').value
    }
    sendMessage(outSaveDataSensorTemp, JSON.stringify(obj));
    // console.log(obj);
}
//******************************************************************************************************************************************************* */

//******************************************************************************************************************************************************* */
function saveReleName(target) {//Кнопка для відправки імені реле на чіп
    const obj = {
        "number": target.closest('.rele__item').dataset.rele,//Читаємо номер блока реле
        "name": target.previousElementSibling.value
    }
    sendMessage(OUT_SAVE_RELE_NAME, JSON.stringify(obj));
    // console.log(obj);
}
//******************************************************************************************************************************************************* */

//******************************************************************************************************************************************************* */
function saveTimeData(target) {//кнопка відправки дат і годин для таймера на чіп
    const i = target.closest('.rele__item').dataset.rele;  //Читаємо номер блока реле
    // let numberReleClick = parent.getAttribute('data-rele');
    // console.log(i);
    const error_class = releItem[i].querySelectorAll('.date-red__color, .time-red__color, .date-blue__backround, .time-blue__backround,  .time-red__backround');

    // console.log('length error  ' + error_class.length);

    if (error_class.length > 0) {//Якщо є класи з помилками
        const popapError = document.querySelector('.popap_error');
        popapError.classList.add('popap_error-show');
        let counter = 0;
        let timerId = setInterval(function () {
            error_class.forEach(function (e) {
                if (counter % 2 == 0) e.classList.add('blink__eror-red');
                if (counter % 2 != 0) e.classList.remove('blink__eror-red');
            });
            counter++;
            if (counter > 9) {
                clearTimeout(timerId);
                popapError.classList.remove('popap_error-show');
            }
        }, 300);
    } else {
        //Якщо нема класів з помилками то відправляємо повідомлення
        //Відправляємо дані
        // console.log(delayWhenTurned[i].value);

        const dayElement = releItem[i].querySelectorAll('.day');
        let _s = 'rele' + i + '-' + delayWhenTurned[i].value + '-';
        const objReleData = {};
        objReleData.RELE = i;
        objReleData.delayWhenTurned = delayWhenTurned[i].value;
        let arr = [];
        for (nn = 0; nn < 10; nn++) {

            if (arrayDatetime[i].DatetimeReal[nn] != 'Invalid Date') {
                let dateInput = new Date(arrayDatetime[i].DatetimeReal[nn]).getTime();
                dateInput = dateInput / 1000;
                console.log(arrayDatetime[i].DatetimeReal[nn]);

                arr.push({
                    'DM': objReleData.dataTime = [i].dataMiis = dateInput,
                    'Y': arrayDatetime[i].DatetimeReal[nn].getFullYear(),
                    'M': arrayDatetime[i].DatetimeReal[nn].getMonth(),
                    'D': arrayDatetime[i].DatetimeReal[nn].getDate(),
                    'H': arrayDatetime[i].DatetimeReal[nn].getHours(),
                    'MI': arrayDatetime[i].DatetimeReal[nn].getMinutes(),
                    'T': arrayDatetime[i].DatetimeReal[nn].getDay()
                })

                _s += dateInput + '-'; //Рік  v minute
                _s += arrayDatetime[i].DatetimeReal[nn].getFullYear() + '-'; //Рік
                _s += arrayDatetime[i].DatetimeReal[nn].getMonth() + 1 + '-'; //Місяць
                _s += arrayDatetime[i].DatetimeReal[nn].getDate() + '-'; //день 1-31
                _s += arrayDatetime[i].DatetimeReal[nn].getHours() + '-'; //Година
                _s += arrayDatetime[i].DatetimeReal[nn].getMinutes() + '-'; //Хвилина
                _s += arrayDatetime[i].DatetimeReal[nn].getDay() + '-'; //День тижня 0-6
            } else {
                // _s += '4294967295-65535-99-99-99-99-99-'; //День тижня 0-6
                arr.push({ 'N': 'N' });
            }
        }
        objReleData.dataTime = arr;



        arr = [];
        for (nn = 0; nn < 50; nn++) {

            // console.log(arrayDatetime[i].timeReal[nn]);

            if (arrayDatetime[i].timeReal[nn] != undefined && arrayDatetime[i].timeReal[nn] != '') {
                arr.push({
                    'H': arrayDatetime[i].timeReal[nn].getHours(),
                    'MI': arrayDatetime[i].timeReal[nn].getMinutes()
                })
                _s += arrayDatetime[i].timeReal[nn].getHours() + "-" + arrayDatetime[i].timeReal[nn].getMinutes() + '-';
            } else {
                arr.push({
                    'N': 'N'
                })
            };
        }

        objReleData.Time = arr;
        arr = [];
        // s += 'DAY---';
        dayElement.forEach(function (e) {
            if (e.checked) {
                arr.push(1);
            } else {
                arr.push(0);
            }
        });
        objReleData.today = arr;
        // console.log(JSON.stringify(objReleData));
        // console.log(objReleData);
        sendMessage(SET_RELE_DATA_TIME, JSON.stringify(objReleData));
    }

}
//******************************************************************************************************************************************************* */

//******************************************************************************************************************************************************* */
function saveTimeClear(target) {//Очишяаємо всі поля дат і годин

    const i = target.closest('.rele__item').dataset.rele; //Читаємо номер блока реле
    messageDate(i);
    releItem[i].querySelectorAll('.datetime, .time').forEach(function (e) {
        e.value = '';
    });
    // document.querySelectorAll('.time__btn-clear').forEach(function (e, i) {
    //     e.addEventListener('click', function () {
    //         messageDate(i);
    //         releItem[i].querySelectorAll('.datetime, .time').forEach(function (e) {
    //             e.value = '';
    //         });
    //     });
    // });
}
//******************************************************************************************************************************************************* */

//******************************************************************************************************************************************************* */
function saveEepromAdress(target) {//Записуємо в чіп, привязуємо конкретний датчик до до системи 
    let obj = {
        obj: {
            "nameSensor": [],
            "numberSensor": []
        }
    };

    tableEepromAddress.forEach(function (e, i) {
        if (i > 0) {
            obj.obj.numberSensor.push(e.textContent.toLocaleUpperCase());
            obj.obj.nameSensor.push(tableEepromNameSensor[i].value);
        };
    });

    // console.log((obj));
    sendMessage(OUT_SAVE_DATA_SENSOER_EEPROM, JSON.stringify(obj));
}
//******************************************************************************************************************************************************* */

//******************************************************************************************************************************************************* */
function btnOnOffRele(target) {//Включаємо або виключаємо реле в ручному режимі
    const i = target.closest('.rele__item').dataset.rele;//Читаємо номер блока реле
    let obj;
    if (target.checked) obj = { "number": i, "data": "1" };
    else obj = { "number": i, "data": "0" };
    // console.log('STAN RELE EEEEEEEEEEEEEEEEEEEEEEEE');
    // console.log(obj);
    sendMessage(SET_RELE_EEPROM_UPR, JSON.stringify(obj));



    // document.querySelectorAll('.rele__control-manually-on-off').forEach(function (e, i) {
    //     e.addEventListener('change', function () {
    //         let obj;
    //         if (e.checked) obj = { "number": i, "data": "1" };
    //         else obj = { "number": i, "data": "0" };
    //         console.log('STAN RELE EEEEEEEEEEEEEEEEEEEEEEEE');
    //         console.log(obj);
    //         sendMessage(SET_RELE_EEPROM_UPR, JSON.stringify(obj));
    //     });
    // });

}
//******************************************************************************************************************************************************* */

//******************************************************************************************************************************************************* */
function showSetibgSensors(target) {//Відкриваємо блок з настройками датчиків температур
    const sensorContainer = document.querySelector('.sensor');
    if (target.checked == true) sensorContainer.classList.add('sensor-show');
    else sensorContainer.classList.remove('sensor-show');
    // document.querySelector('.show_table').addEventListener('change', function (e) {//Відкриваємо блок з настройками
    //     const sensorContainer = document.querySelector('.sensor');
    //     if (e.target.checked == true) sensorContainer.classList.add('sensor-show');
    //     else sensorContainer.classList.remove('sensor-show');
    // });

}
//******************************************************************************************************************************************************* */

//******************************************************************************************************************************************************* */
function btnChangeEepromAddress(target) {//Виділяємо позицію в яку будемо присвоювати вільні сенсори
    parentListEeprom.forEach(function (m) {  //  <li class="address-eeprom__data"></li>
        //Видаляємо клас activ  на вісх елементах окрім тих наякі ми зробили клік і вони вже мають activ
        if (!target.closest('.address-eeprom__data').classList.contains('active')) {
            //Якщо ми клікаємо по елементу де вже є клас Activ то ми його не видаляємо
            m.classList.remove('active');
        }
    });
    target.closest('.address-eeprom__data').classList.toggle('active'); //інверсія класу
    CheckClickDevices();
    if (target.closest('.address-eeprom__data').classList.contains('active')) {
        addElementChangeSensor = target.closest('.address-eeprom__data');//Запамятовуємо елемент до якого треба додавити дані сенсора
    }

    // btnChange.forEach(function (e) {
    //     e.addEventListener('click', function (k) {
    //         console.log('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF')

    //         console.log(e)
    //         console.log(k.target)
    //         console.log(k.currentTarget)



    //         parentListEeprom.forEach(function (m) {  //  <li class="address-eeprom__data"></li>
    //             //Видаляємо клас activ  на вісх елементах окрім тих наякі ми зробили клік і вони вже мають activ
    //             if (!k.currentTarget.closest('.address-eeprom__data').classList.contains('active')) {
    //                 //Якщо ми клікаємо по елементу де вже є клас Activ то ми його не видаляємо
    //                 m.classList.remove('active');
    //             }
    //         });
    //         e.closest('.address-eeprom__data').classList.toggle('active'); //інверсія класу
    //         CheckClickDevices();
    //         if (e.closest('.address-eeprom__data').classList.contains('active')) {
    //             addElementChangeSensor = e.closest('.address-eeprom__data');//Запамятовуємо елемент до якого треба доавити дані сенсора
    //         }
    //     });
    // });
}
//******************************************************************************************************************************************************* */

//******************************************************************************************************************************************************* */
function btnGoSensorToEepromAddress(e) {//Перенносимо номер сенсора в позицію де буде збережений сенсор
    // parentRealDeviceSensor.addEventListener('click', e => {//
    const parentElement = e.target.closest('.address-device__data');
    if (parentElement)
        if (parentElement.classList.contains('red') && parentElement.classList.contains('click')) {
            addElementChangeSensor.querySelector('.address-eeprom__address').innerText = parentElement.querySelector('.address-device__address').textContent;
            compareSensorAddressHtml();
            // CheckClickDevices();
        }
    // })
}
//******************************************************************************************************************************************************* */


//******************************************************************************************************************************************************* */
function btnEepromAddressClear(target) {//Очишчаємо адрес сенсора в даній позиції
    const parent = target.closest('.address-eeprom__data');
    // console.log(parent);
    parent.querySelector('.address-eeprom__address').innerText = '0000000000000000';
    parent.querySelector('.address-eeprom__temp').innerText = '';
    compareSensorAddressHtml();
    // CheckClickDevices();
    //******************************************************************************************************************************************************* */



    // btnClear.forEach(function (e) {
    //     e.addEventListener('click', function () {
    //         const parent = e.closest('.address-eeprom__data');
    //         console.log(parent);
    //         parent.querySelector('.address-eeprom__address').innerText = '0000000000000000';
    //         parent.querySelector('.address-eeprom__temp').innerText = '';
    //         compareSensorAddressHtml();
    //         // CheckClickDevices();
    //     });
    // });

}
//******************************************************************************************************************************************************* */

//******************************************************************************************************************************************************* */
function btnPopapAddNewDeviceOpenFun(target) {//Відкриваємо меню для добавлення або зміни нових пристроїв
    popap_menu.classList.toggle('popap-menu__show');
    popapLocalStorage.classList.add('popap-local-storage__show');
}
//******************************************************************************************************************************************************* */

//******************************************************************************************************************************************************* */
function burgerMenuFunction(e) {//Відкриваємо 
    if (e.target != popap_menu) //Відкриває закриває бургер меню
        if (e.target != burgerMenu && e.target != burgerMenuLine && e.target != popap_menu) {
            popap_menu.classList.remove('popap-menu__show');
            burgerMenu.classList.remove('showw');
        } else {
            popap_menu.classList.toggle('popap-menu__show');
            burgerMenu.classList.toggle('showw');
        }
}
//******************************************************************************************************************************************************* */

//******************************************************************************************************************************************************* */
function btnRestartDeviceFun() {//Рестартуємо чіп
    let rezult = prompt("Підтвердіть введіть (ok)");
    if (rezult === 'ok') sendMessage(SET_RESET_FUNCTION, 'resetFunction');
}
//******************************************************************************************************************************************************* */

//******************************************************************************************************************************************************* */
function releSetingSwitch(target) {//Відкриває або закриває кнопку налаштувань для реле 
    showSectionTimeAndSeting(target, '.rele__seting-svg', '.rele__section-seting');//
}
//******************************************************************************************************************************************************* */

//******************************************************************************************************************************************************* */
function releSetingTimerSwitch(target) {//Відкриває або закриває кнопку налаштувань для реле таймера
    showSectionTimeAndSeting(target, '.rele__timer-seting-svg', '.rele-control-timer');//
}
//******************************************************************************************************************************************************* */

//******************************************************************************************************************************************************* */
function releManualAutoSwitch(target) {//Відкриває або закриває кнопку налаштувань для реле 
    showSectionTimeAndSeting(target, '.input-control-manually-svg', '.rele__control-manually', target.closest('.rele__item').dataset.rele);//
}
//******************************************************************************************************************************************************* */


// parentRealDeviceSensor.addEventListener('click', e => {//
//     const parentElement = e.target.closest('.address-device__data');
//     if (parentElement.classList.contains('red') && parentElement.classList.contains('click')) {
//         addElementChangeSensor.querySelector('.address-eeprom__address').innerText = parentElement.querySelector('.address-device__address').textContent;
//         compareSensorAddressHtml();
//         // CheckClickDevices();
//     }
// })

//Дана функція непрацює в новому режимі
document.querySelectorAll('.rele__item').forEach((parent, num) => {//Привязуємо датчик температури до реле  

    parent.addEventListener('change', function (event) {
        // event.stopPropagation ? event.stopPropagation() : (event.cancelBubble = true);
        const datetime = parent.querySelectorAll('.datetime');
        const time = parent.querySelectorAll('.time');
        //при зміні на .datetime і  .time визивати обробку
        // const parent = parent.closest('.rele__item');
        console.log('/*/*/*-*/-*//-*/-*/-*/-')
        console.log(event.target)
        console.log(parent)
        if (event.target.classList.contains('day')) chekChecedDay(event);
        if (event.target.classList.contains('datetime')) chekDate(parent, datetime, time);
        if (event.target.classList.contains('time')) chekTime(parent, datetime, time);
        showTimerIcons(parent, datetime, time); //Добавляє іконки таймера
    });

    // parent.addEventListener('click', function (event) {
    //     event.stopPropagation ? event.stopPropagation() : (event.cancelBubble = true);
    //     console.log(event.target);
    //     if (event.target.classList.contains('rele__seting-switch__input')) showSectionTimeAndSeting(event, parent, '.rele__seting-svg', '.rele__section-seting');//
    //     if (event.target.classList.contains('rele__timer-seting-show__input')) showSectionTimeAndSeting(event, parent, '.rele__timer-seting-svg', '.rele-control-timer');//
    //     if (event.target.classList.contains('rele__control-manually-show')) showSectionTimeAndSeting(event, parent, '.input-control-manually-svg', '.rele__control-manually', num);//
    // });
});


//****************************CHANGE**********************************

//******************************************************************************************************************************************************* */
function selectSensorOfRele(target) {
    const i = target.closest('.rele__item').dataset.rele;  //Читаємо номер блока реле
    // опреділяєм в якому блоці ми знаходимося тобто номер реле
    console.log(i);
    console.log(target.querySelectorAll('option')[target.selectedIndex].value);
    objSensorReleUpr[i] = target.querySelectorAll('option')[target.selectedIndex].value;
    sendMessage(setReleEpromUpr, JSON.stringify({ "number": i, "data": target.querySelectorAll('option')[target.selectedIndex].value }));

    // document.querySelectorAll('select').forEach(function (e) {//Вибір датчика для реле
    //     e.addEventListener('change', function (k) {
    //         // console.log(e.selectedIndex);
    //         releItem.forEach(function (k, i) {
    //             if (k == e.closest('.rele__item')) {
    //                 // опреділяєм в якому блоці ми знаходимося тобто номер реле
    //                 console.log(i);
    //                 console.log(e.querySelectorAll('option')[e.selectedIndex].value);
    //                 objSensorReleUpr[i] = e.querySelectorAll('option')[e.selectedIndex].value;
    //                 let s = i + 'x' + e.querySelectorAll('option')[e.selectedIndex].value + 'k';
    //                 console.log('s----' + s);
    //                 sendMessage(setReleEpromUpr, JSON.stringify({ "number": i, "data": e.querySelectorAll('option')[e.selectedIndex].value }));
    //             }
    //         });
    //     });
    // });
}

function inputControlErrorFun(target) {//Кнопки переключення режиму при несправності датчика
    try {
        const objTemp = changeBits(target, target.closest('.rele__item').dataset.rele, 6);
        console.log('SET_RELE_EEPROM_UPR_ERROR_RELE_ON_OFF----' + objTemp);
        sendMessage(SET_RELE_EEPROM_UPR_ERROR_RELE_ON_OFF, objTemp);
    } catch (ee) {
        console.log('ERROR  ' + ee);
    }

    // inputControlError.forEach(function (e, i) {//Кнопки переключення режиму при несправності датчика

    //     e.addEventListener('change', function () {
    //         try {
    //             const objTemp = changeBits(e, Math.trunc(i / 2), 6);
    //             console.log('SET_RELE_EEPROM_UPR_ERROR_RELE_ON_OFF----' + objTemp);
    //             sendMessage(SET_RELE_EEPROM_UPR_ERROR_RELE_ON_OFF, objTemp);
    //         } catch (ee) {
    //             console.log('ERROR  ' + ee);
    //         }
    //     });
    // });
}
//******************************************************************************************************************************************************* */

//******************************************************************************************************************************************************* */

function releTempChangeRadioFun(target) {// Включаємо реле або Виключаємо реле  при зміні температури або часу
    try {
        const objTemp = changeBits(target, target.closest('.rele__item').dataset.rele, 5);
        console.log('SET_RELE_EEPROM_UPR_ON_OR_TWOrANGE_TEMP----' + objTemp);
        sendMessage(SET_RELE_EEPROM_UPR_CHANGE_ON_OR_OFF_, objTemp);
    } catch (e) {
        console.log('ERROR  ' + e);
    }

    // Включаємо реле або Виключаємо реле  при зміні температури або часу
    // releTempChangeRadio.forEach(function (e, i) {
    // e.addEventListener('change', function () {
    // try {
    // let ii = Math.trunc(i / 2);
    // console.log('i = ' + i + '  ' + 'e  = ' + e.value);
    // console.log('ii = ' + ii + '  ' + 'e  = ' + e.value);
    //  let temp = objSensorEepromUpr.obj[ii].number;
    // if (objSensorEepromUpr.obj.length > 0) {
    //   if (e.value == '0') {
    //     // console.log('000');
    //     objSensorEepromUpr.obj[ii] &= ~(1 << 5);
    //   } else if (e.value == '1') {
    //     // console.log('111');
    //     objSensorEepromUpr.obj[ii] |= 1 << 5;
    //   }
    //   let objTemp = {
    //     "number": ii,
    //     "data": objSensorEepromUpr.obj[ii]
    //   };
    // }
    // const objTemp = changeBits(e, ii, 5);
    // console.log('SET_RELE_EEPROM_UPR_ON_OR_TWOrANGE_TEMP----' + objTemp);
    // sendMessage(SET_RELE_EEPROM_UPR_CHANGE_ON_OR_OFF_, objTemp);
    // } catch (e) {
    //   console.log('ERROR  ' + e);
    // }
    //         });
    //     });
}
//******************************************************************************************************************************************************* */

function releTempChangeSingleFun(target) {// Один діапазон температур або два
    console.log('777777777777777772222222222222222222222227777777777777777');
    console.log(target.dataset.click);
    console.log(target);
    try {
        const objTemp = changeBits(target, target.closest('.rele__item').dataset.rele, 4);
        console.log('SET_RELE_EEPROM_UPR_ON_OR_TWOrANGE_TEMP----' + objTemp);
        sendMessage(SET_RELE_EEPROM_UPR_ON_OR_TWOrANGE_TEMP, objTemp);
    } catch (e) {
        console.log('ERROR  ' + e);
    }

    // Один діапазон температур або два
    // releTempChangeSingle.forEach(function (e, i) {
    //     e.addEventListener('change', function () {
    //         // try {
    //         let ii = Math.trunc(i / 2);
    // console.log('i = ' + i + '  ' + 'e  = ' + e.value);
    // console.log('ii = ' + ii + '  ' + 'e  = ' + e.value);
    // let temp = objSensorEepromUpr.obj[ii].number;
    // if (objSensorEepromUpr.obj.length > 0) {
    //   if (e.value == '1') {
    //     // console.log('000');
    //     objSensorEepromUpr.obj[ii] &= ~(1 << 4);
    //   } else if (e.value == '0') {
    //     // console.log('111');
    //     objSensorEepromUpr.obj[ii] |= 1 << 4;
    //   }
    // }
    //   let objTemp = {
    //     "number": ii,
    //     "data": objSensorEepromUpr.obj[ii]
    //   };
    //         const objTemp = changeBits(e, ii, 4);
    //         console.log('SET_RELE_EEPROM_UPR_ON_OR_TWOrANGE_TEMP----' + objTemp);
    //         sendMessage(SET_RELE_EEPROM_UPR_ON_OR_TWOrANGE_TEMP, objTemp);
    //         // } catch (e) {
    //         //   console.log('ERROR  ' + e);
    //         // }
    //     });
    // });
}

//****************************INPUT**********************************

//******************************************************************************************************************************************************* */
function releTempVklOtkl(target) {

    if (target.value > 120) target.value = 120;
    if (target.value < -50) target.value = -50;

    // document.querySelectorAll('.rele-temp-vkl, .rele-temp-otkl').forEach(function (e) {
    //     e.addEventListener('keyup', function () { //при вводі даних перевірка на мінімальне і максимальне значення
    //         // console.log(e.value);
    //         if (e.value > 120) e.value = 120;
    //         if (e.value < -50) e.value = -50;
    //     });
    // });
}
//******************************************************************************************************************************************************* */
//Дана функція непрацює в новому режимі
function releitemChangeDataAndTime(target) {//Привязуємо датчик температури до реле
    // const i = target.closest('.rele__item').dataset.rele;  //Читаємо номер блока реле
    // опреділяєм в якому блоці ми знаходимося тобто номер реле
    // console.log('/*/*/*-*/-*//-*/-*/-*/-')
    // console.log(target)
    // const parent = target.closest('.rele-control-timer');
    // console.log(parent)
    // const datetime = parent.querySelectorAll('.datetime');
    // const time = parent.querySelectorAll('.time');
    // //при зміні на .datetime і  .time визивати обробку
    // if (target.classList.contains('day')) chekChecedDay(target);
    // if (target.classList.contains('datetime')) chekDate(parent, datetime, time);
    // if (target.classList.contains('time')) chekTime(parent, datetime, time);
    // showTimerIcons(parent, datetime, time); //Добавляє іконки таймера
}
//******************************************************************************************************************************************************* */

// //******************************************************************************************************************************************************* */
// function selectSensorOfRele(target) {//Привязуємо датчик температури до реле
//     // const i = target.closest('.rele__item').dataset.rele;  //Читаємо номер блока реле
//     // опреділяєм в якому блоці ми знаходимося тобто номер реле
//     console.log(i);
//     console.log(target.querySelectorAll('option')[target.selectedIndex].value);
//     const parent = target.closest('.rele__item');
//     const datetime = parent.querySelectorAll('.datetime');
//     const time = parent.querySelectorAll('.time');
//     hekDate(parent, datetime, time);
//     showTimerIcons(parent, datetime, time); //Добавляє іконки таймера
// }
// //******************************************************************************************************************************************************* */

// //******************************************************************************************************************************************************* */
// function selectSensorOfRele(target) {//Привязуємо датчик температури до реле
//     // const i = target.closest('.rele__item').dataset.rele;  //Читаємо номер блока реле
//     // опреділяєм в якому блоці ми знаходимося тобто номер реле
//     console.log(i);
//     console.log(target.querySelectorAll('option')[target.selectedIndex].value);
//     const parent = target.closest('.rele__item');
//     const datetime = parent.querySelectorAll('.datetime');
//     const time = parent.querySelectorAll('.time');
//     chekTime(parent, datetime, time);
//     showTimerIcons(parent, datetime, time); //Добавляє іконки таймера
// }
// //******************************************************************************************************************************************************* */


//keyUp
// function tempVklChange() { }
// function tempVyklChange() { }
// function releOn() { }
// function releOff() { }
// function sensorOnRange() { }
// function sensorTwoRange() { }
// function liReleItem() { }

// const searchNumberReleParent = ((elementTarget) => elementTarget.closest('.rele__item').dataset.rele)// 

//******************************************************************************************************************************************************* */
document.querySelector('body').addEventListener('click', function (e) {
    burgerMenuFunction(e);
    btnGoSensorToEepromAddress(e);
    e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = true);
    try {
        objClickFunctions[e.target.dataset.click].call(objClickFunctions, e.target);
    } catch (err) {
        console.log(err);
    }
});
//******************************************************************************************************************************************************* */

//******************************************************************************************************************************************************* */
document.querySelector('body').addEventListener('change', function (e) {
    releitemChangeDataAndTime(e.target);
    e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = true);
    try {
        objChangeFunctions[e.target.dataset.click].call(objChangeFunctions, e.target);
    } catch (err) {
        console.log(err);
    }
})
//******************************************************************************************************************************************************* */

//******************************************************************************************************************************************************* */
document.querySelector('body').addEventListener('input', function (e) {
    e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = true);
    try {
        objInputFunctions[e.target.dataset.click].call(objInputFunctions, e.target);
    } catch (err) {
        console.log(err);
    }
})
//******************************************************************************************************************************************************* */

//******************************************************************************************************************************************************* */
document.querySelector('body').addEventListener('keyup', function (e) {
    e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = true);
    try {
        objKeyUpFunctions[e.target.dataset.click].call(objKeyUpFunctions, e.target);
    } catch (err) {
        console.log(err);
    }
})
//******************************************************************************************************************************************************* */
//******************************************************************************************************************************************************* */
//******************************************************************************************************************************************************* */
//******************************************************************************************************************************************************* */
//******************************************************************************************************************************************************* */
//******************************************************************************************************************************************************* */
//******************************************************************************************************************************************************* */

function showSectionTimeAndSeting(event, classLink, classShowSection, num) { //Покузує або скриває блок з настройками
    const parent = event.closest('.rele__item');
    if (event.classList.contains('on')) {
        parent.querySelector(classLink).classList.remove(classLink.substring(1) + '-on');
        parent.querySelector(classShowSection).classList.remove('show-block');
        let obj;
        if (event.classList.contains('rele__control-manually-show')) {
            parent.querySelector('.rele__seting-sensor-timer').classList.remove('block__hidden'); //Добавляємо клас відкриваємо Select
            obj = { "number": num, "data": "0" }
            sendMessage(SET_RELE_EEPROM_UPR_MANUAL, JSON.stringify(obj));
        }
        event.classList.remove('on');
    } else {
        parent.querySelector(classLink).classList.add(classLink.substring(1) + '-on');
        parent.querySelector(classShowSection).classList.add('show-block');
        if (event.classList.contains('rele__control-manually-show')) {
            parent.querySelector('.rele__seting-sensor-timer').classList.add('block__hidden'); //Добавляємо клас відкриваємо Select
            obj = { "number": num, "data": "1" }
            sendMessage(SET_RELE_EEPROM_UPR_MANUAL, JSON.stringify(obj));
        }
        event.classList.add('on');
    }
}



//*********************************************************************** */
// popapClearDevice.classList.add('disable__global');
// popapClearDeviceItem.forEach((e) => e.classList.add('disable__global'));

// btnDefineDevice.onclick = () => {
//     let rezult = prompt("Підтвердіть введіть (ok)");
//     if (rezult === 'ok') {
//       // popapClearDevice.classList.remove('disable__global');
//       sendMessage(SET_DEFINE_DEVICE, 'SET_DEFINE_DEVICE');
//       // console.log('DEFAULT_DEVICE');
//     }
//   };
  //*********************************************************************** */

  





  
// document.querySelectorAll('.rele__control-manually_off').forEach(function (e, i) {
//   e.addEventListener('click', function () {
//     s = i + 'x0k';
//     console.log('s----' + s);

//     sendMessage(SET_RELE_EEPROM_UPR, s);
//   });
// });
// -------------------------------------------------------------------------------------------------------


// **************************************************************************************


// **************************************************************************************


// document.querySelectorAll('.input-control-manually__input').forEach(function (e, num) {//Ручний або атоматичний режим але елемент незнайдено цей блок непрацює
//     e.addEventListener('click', function (a) {
//         const parent = e.closest('.rele__item');
//         let obj;
//         if (a.target.checked) {
//             parent.querySelector('.rele__control-manually').classList.add('block__show'); //Добавляємо клас відкриваємо Select
//             parent.querySelector('.rele__seting-sensor-timer').classList.add('block__hidden'); //Добавляємо клас відкриваємо Select
//             // console.log('num  ' + num);
//             obj = { "number": num, "data": "1" }
//         } else {
//             parent.querySelector('.rele__control-manually').classList.remove('block__show');
//             parent.querySelector('.rele__seting-sensor-timer').classList.remove('block__hidden'); //Добавляємо клас відкриваємо Select
//             // console.log(e.name);
//             obj = { "number": num, "data": "0" }
//         }
//         console.log(obj);
//         sendMessage(SET_RELE_EEPROM_UPR_MANUAL, JSON.stringify(obj));
//     });
// });

// **************************************************************************************


// document.querySelectorAll('.rele-temp-btn').forEach(function (e, i) {//кнопка для збереження  зміни температури при вкл викл реле
//     //відправляє теператури на чіп
//     e.addEventListener('click', function () {

//         // let s = i + 'v' + e.closest('.rele__item').querySelector('.rele-temp-vkl').value + 'o' + e.closest('.rele-temp-change').querySelector('.rele-temp-otkl').value + 'k';
//         const obj = {
//             "number": i,
//             "tempVkl": e.closest('.rele__item').querySelector('.rele-temp-vkl').value,
//             "tempOtkl": e.closest('.rele-temp-change').querySelector('.rele-temp-otkl').value
//         }
//         sendMessage(outSaveDataSensorTemp, JSON.stringify(obj));
//         console.log(obj);
//     });
// });

// document.querySelectorAll('.rele__name-btn').forEach(function (e, i) {//Кнопка для відправки імені реле на чіп
//     e.addEventListener('click', function () {
//         const obj = {
//             "number": i,
//             "name": e.closest('.rele__item').querySelector('.rele__name-input').value
//         }
//         sendMessage(OUT_SAVE_RELE_NAME, JSON.stringify(obj));
//         console.log(obj);
//     });
// });
















// document.querySelectorAll('.time__btn ').forEach(function (e, i) {//кнопка відправки дат і годин для таймера на чі


//     e.addEventListener('click', function (ee) {
//         const parent = e.closest('.rele__item');
//         // let numberReleClick = parent.getAttribute('data-rele');
//         // console.log(i);
//         const error_class = parent.querySelectorAll('.date-red__color, .time-red__color, .date-blue__backround, .time-blue__backround,  .time-red__backround');

//         // console.log('length error  ' + error_class.length);

//         if (error_class.length > 0) {

//             //Якщо є класи з помилками

//             const popapError = document.querySelector('.popap_error');
//             popapError.classList.add('popap_error-show');
//             let counter = 0;

//             let timerId = setInterval(function () {
//                 error_class.forEach(function (e) {
//                     if (counter % 2 == 0) e.classList.add('blink__eror-red');
//                     if (counter % 2 != 0) e.classList.remove('blink__eror-red');
//                 });

//                 counter++;
//                 // console.log('counter  ' + counter);
//                 if (counter > 9) {
//                     clearTimeout(timerId);
//                     popapError.classList.remove('popap_error-show');
//                 }
//             }, 300);
//         } else {
//             //Якщо нема класів з помилками то відправляємо повідомлення
//             //Відправляємо дані
//             // console.log(delayWhenTurned[i].value);

//             const dayElement = parent.querySelectorAll('.day');
//             let _s = 'rele' + i + '-' + delayWhenTurned[i].value + '-';
//             const objReleData = {};
//             objReleData.RELE = i;
//             objReleData.delayWhenTurned = delayWhenTurned[i].value;
//             let arr = [];
//             for (nn = 0; nn < 10; nn++) {

//                 if (arrayDatetime[i].DatetimeReal[nn] != 'Invalid Date') {
//                     let dateInput = new Date(arrayDatetime[i].DatetimeReal[nn]).getTime();
//                     dateInput = dateInput / 1000;
//                     console.log(arrayDatetime[i].DatetimeReal[nn]);

//                     arr.push({
//                         'DM': objReleData.dataTime = [i].dataMiis = dateInput,
//                         'Y': arrayDatetime[i].DatetimeReal[nn].getFullYear(),
//                         'M': arrayDatetime[i].DatetimeReal[nn].getMonth(),
//                         'D': arrayDatetime[i].DatetimeReal[nn].getDate(),
//                         'H': arrayDatetime[i].DatetimeReal[nn].getHours(),
//                         'MI': arrayDatetime[i].DatetimeReal[nn].getMinutes(),
//                         'T': arrayDatetime[i].DatetimeReal[nn].getDay()
//                     })

//                     _s += dateInput + '-'; //Рік  v minute
//                     _s += arrayDatetime[i].DatetimeReal[nn].getFullYear() + '-'; //Рік
//                     _s += arrayDatetime[i].DatetimeReal[nn].getMonth() + 1 + '-'; //Місяць
//                     _s += arrayDatetime[i].DatetimeReal[nn].getDate() + '-'; //день 1-31
//                     _s += arrayDatetime[i].DatetimeReal[nn].getHours() + '-'; //Година
//                     _s += arrayDatetime[i].DatetimeReal[nn].getMinutes() + '-'; //Хвилина
//                     _s += arrayDatetime[i].DatetimeReal[nn].getDay() + '-'; //День тижня 0-6
//                 } else {
//                     // _s += '4294967295-65535-99-99-99-99-99-'; //День тижня 0-6
//                     arr.push({ 'N': 'N' });
//                 }
//             }
//             objReleData.dataTime = arr;



//             arr = [];
//             for (nn = 0; nn < 50; nn++) {

//                 console.log(arrayDatetime[i].timeReal[nn]);

//                 if (arrayDatetime[i].timeReal[nn] != undefined && arrayDatetime[i].timeReal[nn] != '') {
//                     arr.push({
//                         'H': arrayDatetime[i].timeReal[nn].getHours(),
//                         'MI': arrayDatetime[i].timeReal[nn].getMinutes()
//                     })
//                     _s += arrayDatetime[i].timeReal[nn].getHours() + "-" + arrayDatetime[i].timeReal[nn].getMinutes() + '-';
//                 } else {
//                     arr.push({
//                         'N': 'N'
//                     })
//                 };
//             }

//             objReleData.Time = arr;
//             arr = [];
//             // s += 'DAY---';
//             dayElement.forEach(function (e) {
//                 if (e.checked) {
//                     arr.push(1)
//                 } else {
//                     arr.push(0)
//                 }
//             });
//             objReleData.today = arr;

//             console.log(JSON.stringify(objReleData));
//             console.log(objReleData)
//             sendMessage(SET_RELE_DATA_TIME, JSON.stringify(objReleData));

//         }
//     });
// });



// -------------------------------
// btnSave.addEventListener('click', function () {
//     let obj = {
//         obj: {
//             "nameSensor": [],
//             "numberSensor": []
//         }
//     };

//     tableEepromAddress.forEach(function (e, i) {
//         if (i > 0) {
//             obj.obj.numberSensor.push(e.textContent.toLocaleUpperCase());
//             obj.obj.nameSensor.push(tableEepromNameSensor[i].value);
//         };
//     });
//     console.log((obj));
//     sendMessage(OUT_SAVE_DATA_SENSOER_EEPROM, JSON.stringify(obj));
// });


