let options = {
    onSuccess: onConnect,
    onFailure: doFail
};

// connect the client
client.connect(options);

// called when the client connects
function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("onConnect");
    client.subscribe(getEepromSensorData);
    client.subscribe(getDeviceSensorData);
    client.subscribe(getReleEpromUpr);
    client.subscribe(getSensorVklOtklTemp);
    client.subscribe(stanRele);
    client.subscribe(getSensorName);
    client.subscribe(getReleName);
    client.subscribe(getReleEpromUprManual);
    client.subscribe(getReleDATATIME);
    client.subscribe(CONNECT_SSID);
    client.subscribe(LOCAL_IP);
    client.subscribe(getanaloInputA0);

    // sendMessage(outstartDataSensor, 'readAddressSensor');
    // sendMessage(outstartDataSensor, 'releControl');
    // sendMessage(outstartDataSensor, 'ReadTempVklOtkl');
    // sendMessage(outstartDataSensor, 'ReadDate');
    // sendMessage(outstartDataSensor, 'NameSensor');
    // sendMessage(outstartDataSensor, 'NameRele');
    // sendMessage(outstartDataSensor, 'ReleManual');

    // sendMessage(outCleareEPROM, 'ff');
    // sendMessage(outCleareEPROM, '00');
    sendMessage(outstartDataSensor, 'ALL');
    // console.log('ALL');
}

function doFail(e) { }
// console.log(e);


// called when the client loses its connection
function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:" + responseObject.errorMessage);
    }
}
//************************************************************************************************************** */
function sendMessage(topic, message) {
    let mes = new Paho.MQTT.Message(message);
    mes.destinationName = topic;
    mes.qos = 0;
    client.send(mes);
    // console.log('KKKKKKKKKKKKKKKK');
}
// *************************************************************************************************************************
let obj_1 = void 0;
let obj_2 = void 0;
let obj_3 = void 0;

function onMessageArrived(message) {
    // called when a message arrives
    // console.log("onMessageArrived:  " + message.payloadString);
    //  console.log("onMessageArrived:  "+message.destinationName);
    //************************************************************************************************************** */
    if (message.destinationName === getanaloInputA0) {
        // console.log(message.payloadString);
        printAnalogInput.innerText = message.payloadString;
    }
    //************************************************************************************************************** */
    if (message.destinationName === CONNECT_SSID) {
        // console.log(message.payloadString);
        document.querySelector('.info__ssid').innerText = message.payloadString;
    }
    //************************************************************************************************************** */

    if (message.destinationName === LOCAL_IP) {
        // console.log(message.payloadString);
        document.querySelector('.info__ip').innerText = message.payloadString;
    }

    //************************************************************************************************************** */

    if (message.destinationName === getEepromSensorData) {
        //Дані що знаходяться в EEPROM позиція, мак адрес, і температура сенсору
        objEeprom = JSON.parse(message.payloadString);
        console.log('objEeprom');
        console.log(objEeprom);

        for (let _k = 0; _k < objEeprom.obj.length; _k++) {
            if (showEepromFlag) {
                tableEepromNumber[_k + 1].innerText = objEeprom.obj[_k].number;
                tableEepromAddress[_k + 1].innerText = objEeprom.obj[_k].address.toLocaleUpperCase();
            }

            tableEepromNameSensor[_k + 1].value = objEeprom.obj[_k].nameSensor;
            tableEepromTemp[_k + 1].innerText = objEeprom.obj[_k].temp.toFixed(1);

            if (objEeprom.obj[_k].address != '0000000000000000') {
                if (objNameSensor.obj != undefined) {
                    // console.log('7777777777777 ');
                    // console.log(objNameSensor.obj);
                    popapTemp[_k].textContent = (objNameSensor.obj[_k].nameSensor) + ' ' + (objEeprom.obj[_k].temp.toFixed(1));
                } else {
                    popapTemp[_k].innerText = objEeprom.obj[_k].temp.toFixed(1);
                }
            } else {
                popapTemp[_k].closest('.popap-info__lamp-item').classList.add('shiden');
            }

        }

        downloadedDataEEprom = true;
        if (downloadedDataDevice && downloadedDataEEprom) compareSensorAddress();
    }

    //************************************************************************************************************** */

    if (message.destinationName === getSensorName) {

        try {
            console.log('getSensorName');
            console.log(message.payloadString);
            objNameSensor = JSON.parse(message.payloadString);
            //получаємо дані про стан кожного реле
            tableEepromNameSensor.forEach(function (e, i) {

                if (i > 0) {
                    // e.value = objNameSensor.obj[i - 1].nameSensor;
                }
            });
            // console.log(objNameSensor);

        } catch (e) {
            console.log('ERROR NAME SENSOR' + e);
            sendMessage(setDefineDevice, 'setDefineDevice');
            console.log('DEFAULT_DEVICE');
        }
    }

    //************************************************************************************************************** */

    if (message.destinationName === getDeviceSensorData) {
        //Дані прочитані з сенсорів в реальному часі позиція, мак адрес, і температура сенсору
        objDevice = JSON.parse(message.payloadString);
        // console.log('objDevice');
        // console.log(objDevice);
        for (let _k2 = 0; _k2 < objDevice.obj.length; _k2++) {
            tableDeviceNumber[_k2 + 1].innerText = objDevice.obj[_k2].number;
            tableDeviceAddress[_k2 + 1].innerText = objDevice.obj[_k2].address.toLocaleUpperCase();
            tableDeviceTemp[_k2 + 1].innerText = objDevice.obj[_k2].temp.toFixed(1);
        }
        downloadedDataDevice = true;
        if (downloadedDataDevice && downloadedDataEEprom) {
            fun1();
            compareSensorAddress();
        }
    }

    //************************************************************************************************************** */
    //біт 0-3 номер датчика який управляє даним реле
    // біт 4 один або два діапазона контроля температрур
    // біт 5 вкл або викл реле при зміні температур або таймера
    // біт 6 стан реле при помилці термодатчмка
    if (message.destinationName === getReleEpromUpr) {
        //получаємо дані з памяті про датчики 
        objSensorEepromUpr = JSON.parse(message.payloadString);
        console.log('objSensorEepromUpr *****');
        console.log(objSensorEepromUpr);

        fun1();
    }

    //************************************************************************************************************** */

    if (message.destinationName === getSensorVklOtklTemp) {
        //получаємо дані з памяті про температури включення і відкючення
        objSensorVklOtklTemp = JSON.parse(message.payloadString);
        // console.log('objSensorVklOtklTemp *****');
        // console.log(message.payloadString);
        fun2();
    }

    //************************************************************************************************************** */

    if (message.destinationName === stanRele) {
        //получаємо дані про стан кожного реле включене або відключене 
        let stanReleTemp = parseInt(message.payloadString);
        const releOnOff = document.querySelectorAll('.rele__control-manually-on-off');
        for (n = 0; n < 8; n++) {
            //Засвічуємо або гасимо лампочки
            if (stanReleTemp & 1 << n) {
                releOnOff[n].checked = false;
                popapInfoTempItem[n].classList.remove('on')
            } else {
                releOnOff[n].checked = true;
                popapInfoTempItem[n].classList.add('on');
            }
        }
    }



    //************************************************************************************************************** */

    if (message.destinationName === getReleName) {
        try {
            // console.log('getReleName');
            // console.log(message.payloadString);

            //получаємо дані про стан кожного реле
            objNameRele = JSON.parse(message.payloadString);

            const releItemTitleName = document.querySelectorAll('.rele__item-title-name');
            releItemTitleName.forEach((e, i) => {
                e.textContent = objNameRele.obj[i].nameRele;

            });

            releNameInput.forEach(function (e, i) {
                e.value = objNameRele.obj[i].nameRele;
                popapInfoTempItem[i].textContent = objNameRele.obj[i].nameRele;
                releItemTitleName[i].textContent = objNameRele.obj[i].nameRele;
            });
            // console.log('objNameRele');

        } catch (e) {
            console.log('ERROR NAME RELE' + e);
            sendMessage(setDefineDevice, 'setDefineDevice');
            console.log('DEFAULT_DEVICE');
        }

    }
    //" "
    //************************************************************************************************************** */

    if (message.destinationName === getReleEpromUprManual) {

        //получаємо дані про стан кожного реле
        let objManualRele = JSON.parse(message.payloadString);
        console.log('message.payloadString   ////// getReleEpromUprManual');
        console.log(message.payloadString);
        document.querySelectorAll('.input-control-manually-svg').forEach(function (e, i) {
            const parent = e.closest('.rele__item');
            console.log("testttt")
            if (objManualRele.obj[i].namberRele == 1) {
                // e.checked = true;
                parent.querySelector('.input-control-manually-svg').classList.add('on');
                parent.querySelector('.rele__control-manually-show').classList.add('on');
                parent.querySelector('.rele__control-manually').classList.add('show-block'); //Добавляємо клас відкриваємо Select
                parent.querySelector('.rele__seting-sensor-timer').classList.add('block__hidden'); //Добавляємо клас відкриваємо Select
            } else if (objManualRele.obj[i].namberRele == 0) {
                // e.checked = false;
                parent.querySelector('.input-control-manually-svg').classList.remove('on');
                parent.querySelector('.rele__control-manually-show').classList.remove('on');

                parent.querySelector('.rele__control-manually').classList.remove('show-block');
                parent.querySelector('.rele__seting-sensor-timer').classList.remove('block__hidden'); //Добавляємо клас відкриваємо Select
            }
        });

    }

    //************************************************************************************************************** */

    if (message.destinationName === getReleDATATIME) {
        //получаємо дані про таймери

        let tempObj = JSON.parse(message.payloadString);
        console.log(message.payloadString);
        // console.log('ZETZET')/

        if (tempObj.NUMPACKAGE === 1) {
            obj_1 = Object.assign({}, tempObj);
        }

        if (tempObj.NUMPACKAGE === 2) {
            obj_2 = Object.assign({}, tempObj);
            // console.log('obj_2');
            // console.log(obj_2);
        }

        if (tempObj.NUMPACKAGE === 3) {
            obj_2.TIME = obj_2.TIME.concat(tempObj.TIME);
            //  console.log('obj_2');
            //  console.log(obj_2);
        }

        if (tempObj.NUMPACKAGE === 4) {
            obj_3 = Object.assign({}, tempObj);
            // obj_3 = JSON.parse(message.payloadString);
            objManualRele = Object.assign(obj_1, obj_2, obj_3);
            // console.log(objManualRele);
            let namberRele = parseInt(objManualRele.NUM);
            const dateTimeInput = releItem[namberRele].querySelectorAll('.datetime');
            const timeInput = releItem[namberRele].querySelectorAll('.time');
            const dayWikend = releItem[namberRele].querySelectorAll('.day');
            // const parent =  releItem[namberRele];

            dateTimeInput.forEach(function (e) {
                e.value = '';
            });

            timeInput.forEach(function (e) {
                e.value = '';
            });

            dayWikend.forEach(function (e) {
                e.checked = true; //ttt
            });

            let delaySecondStart = parseInt(objManualRele.DELAYSECONDSTART);

            if (delaySecondStart < 36000) releControlTimer[namberRele].value = delaySecondStart;
            else releControlTimer[namberRele].value = '0';

            // dateTimeInput[0].value = "2022-05-02T12:55";
            for (i = 0; i < 9; i += 2) {
                if (objManualRele.DATATIME[i] != '65535-99-99T99:99' && objManualRele.DATATIME[i + 1] != '65535-99-99T99:99') {
                    // console.log(objManualRele.DATATIME[i]);
                    // console.log(objManualRele.DATATIME[i + 1]);
                    dateTimeInput[i].value = objManualRele.DATATIME[i];
                    dateTimeInput[i + 1].value = objManualRele.DATATIME[i + 1];
                    arrayDatetime[namberRele].Datetime[i] = new Date(objManualRele.DATATIME[i]).getTime();
                    arrayDatetime[namberRele].DatetimeReal[i] = new Date(objManualRele.DATATIME[i]);
                    arrayDatetime[namberRele].Datetime[i + 1] = new Date(objManualRele.DATATIME[i + 1]).getTime();
                    arrayDatetime[namberRele].DatetimeReal[i + 1] = new Date(objManualRele.DATATIME[i + 1]);
                }
            }

            for (i = 0; i < 49; i += 2) {
                if (objManualRele.TIME[i] != '99:99' && objManualRele.TIME[i + 1] != '99:99') {
                    // console.log(objManualRele.TIME[i]); 
                    // console.log( objManualRele.TIME[i+1]);

                    timeInput[i].value = objManualRele.TIME[i];
                    timeInput[i + 1].value = objManualRele.TIME[i + 1];
                    arrayDatetime[namberRele].time[i] = new Date(objManualRele.DATATIME[i]);
                    arrayDatetime[namberRele].timeReal[i + 1] = new Date(objManualRele.DATATIME[i + 1]);
                }
            }


            // if(eve.target.checked){
            //   eve.target.previousElementSibling.classList.add('checked');
            // }else{
            //   eve.target.previousElementSibling.classList.remove('checked');
            // }


            for (i = 0; i < 35; i++) {
                if (objManualRele.DEY[i] == 1) {
                    dayWikend[i].checked = true;
                    dayWikend[i].previousElementSibling.classList.add('checked');
                } ///ttt
                if (objManualRele.DEY[i] == 0) {
                    dayWikend[i].checked = false;
                    dayWikend[i].previousElementSibling.classList.remove('checked');
                } ///ttt
            }

            // releItem.forEach(function (parent, i) {
            //   const firstDataElement = parent.querySelector('.datetime');
            //   const firstTimeElement = parent.querySelector('.time');
            //   const changeEvent = new Event('change'); // создаем событие
            //   firstDataElement.dispatchEvent(changeEvent); // имитируем клик на кнопку
            //   firstTimeElement.dispatchEvent(changeEvent); // имитируем клик на кнопку
            //   // const clickEvent = new Event('click'); // создаем событие
            //   // firstDataElement.dispatchEvent(clickEvent); // имитируем клик на кнопку
            //   // firstTimeElement.dispatchEvent(clickEvent); // имитируем клик на кнопку
            // });

            document.querySelectorAll('.rele__item').forEach((parent) => {
                const datetime = parent.querySelectorAll('.datetime');
                const time = parent.querySelectorAll('.time');
                // switchSeting( parent);
                // chekChecedDay(event);
                chekDate(parent, datetime, time);
                chekTime(parent, datetime, time);
                showTimerIcons(parent, datetime, time); //Добавляє іконки таймера

            });

        }
        // 2022-5-17T14:26
    }
    //************************************************************************************************************** */
}