let obj_1 = {};
let obj_2 = {};
let obj_3 = {};


function initMQTT() {
    return new Promise(resolve => {
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
            client.subscribe(GET_EEPROM_SENSOR_DATA);
            client.subscribe(GET_DEVICE_SENSOR_DATA);
            client.subscribe(getReleEpromUpr);
            client.subscribe(GET_SENSOR_ON_OFF_TEMP);
            client.subscribe(STAN_RELE);
            // client.subscribe(getSensorName);
            client.subscribe(GET_RELE_NAME);
            client.subscribe(GET_RELE_EEPROM_UPR_MANUAL);
            client.subscribe(getReleDATATIME);
            client.subscribe(GET_RELE_DATA_TIME_ALL);
            client.subscribe(CONNECT_SSID);
            client.subscribe(LOCAL_IP);
            client.subscribe(GET_ANALOG_INPUT_A0);
            sendMessage(OUT_START_SENSOR_DATA, 'ALL');
        }
        resolve();
    });
}
//************************************************************************************************************** */



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
}
// *************************************************************************************************************************



function onMessageArrived(message) {
    // called when a message arrives
    // console.log("onMessageArrived:  " + message.payloadString);
    //  console.log("onMessageArrived:  "+message.destinationName);
    //************************************************************************************************************** */
    if (message.destinationName === GET_ANALOG_INPUT_A0) {
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
        document.querySelector('.info__ip').setAttribute("href", `http://${message.payloadString}`);
    }

    //************************************************************************************************************** */

    if (message.destinationName === GET_EEPROM_SENSOR_DATA) {
        try {
            //Дані що знаходяться в EEPROM позиція, мак адрес, і температура сенсору
            console.log('ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ');
            objEeprom = JSON.parse(message.payloadString);
            console.log(objEeprom);
            const lengthArrayEeprom = objEeprom.obj.length;
            console.log(lengthArrayEeprom);
            console.log('*ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ');

            for (let i = 0; i < lengthArrayEeprom; i++) {
                if (showEepromFlag) {
                    tableEepromNumber[i + 1].innerText = objEeprom.obj[i].number;
                    tableEepromAddress[i + 1].innerText = objEeprom.obj[i].address.toLocaleUpperCase();
                }

                tableEepromNameSensor[i + 1].value = objEeprom.obj[i].nameSensor;  //Робимо запис в вікно з вибору сенсорів
                tableEepromTemp[i + 1].innerText = objEeprom.obj[i].temp.toFixed(1);   //Робимо запис в вікно з вибору сенсорів

                if (objEeprom.obj[i].address != '0000000000000000') {
                    if (objEeprom.obj[i].nameSensor) {
                        popapTemp[i].textContent = (objEeprom.obj[i].nameSensor) + ' ' + (objEeprom.obj[i].temp.toFixed(1));
                    } else {
                        popapTemp[i].innerText = objEeprom.obj[i].temp.toFixed(1);
                    }
                } else {
                    popapTemp[i].closest('.popap-info__lamp-item').classList.add('shiden');//Якщо сенсора немає то скриваємо ячейку
                }

            }

            downloadedDataEEprom = true;
            console.log('******************----------------------------********************');
            console.log(downloadedDataDevice)
            console.log(downloadedDataEEprom)
            console.log('*****************************************************');
            if (downloadedDataDevice && downloadedDataEEprom) compareSensorAddress();
        } catch (err) {
            console.log(err)
        }

    }
    //************************************************************************************************************** */

    if (message.destinationName === GET_DEVICE_SENSOR_DATA) {
        try {
            //Дані прочитані з сенсорів в реальному часі позиція, мак адрес, і температура сенсору
            objDevice = JSON.parse(message.payloadString);
            countDeviceSensors = objDevice.obj.length;
            // console.log('objDevice');
            // console.log(countDeviceSensors);

            addDevicesensor(objDevice.obj);//Обновляємо

            // for (let _k2 = 0; _k2 < objDevice.obj.length; _k2++) {
            //     tableDeviceNumber[_k2 + 1].innerText = objDevice.obj[_k2].number;
            //     tableDeviceAddress[_k2 + 1].innerText = objDevice.obj[_k2].address.toLocaleUpperCase();
            //     tableDeviceTemp[_k2 + 1].innerText = objDevice.obj[_k2].temp.toFixed(1);
            // }
            downloadedDataDevice = true;
            // console.log('******************++++++++++++++++++++++********************');
            // console.log(downloadedDataDevice)
            // console.log(downloadedDataEEprom)
            // console.log('*****************************************************');

            if (downloadedDataDevice && downloadedDataEEprom) {
                fun1();
                compareSensorAddress();
            }
        } catch (err) {
            console.log(err)
        }

    }
    //************************************************************************************************************** */

    // if (message.destinationName === getSensorName) {

    //     try {
    //         console.log('getSensorName');
    //         console.log(message.payloadString);
    //         objNameSensor = JSON.parse(message.payloadString);
    //         //получаємо дані про стан кожного реле
    //         tableEepromNameSensor.forEach(function (e, i) {

    //             if (i > 0) {
    //                 // e.value = objNameSensor.obj[i - 1].nameSensor;
    //             }
    //         });
    //         // console.log(objNameSensor);

    //     } catch (e) {
    //         console.log('ERROR NAME SENSOR' + e);
    //         sendMessage(SET_DEFINE_DEVICE, 'SET_DEFINE_DEVICE');
    //         console.log('DEFAULT_DEVICE');
    //     }
    // }



    //************************************************************************************************************** */
    //біт 0-3 номер датчика який управляє даним реле
    // біт 4 один або два діапазона контроля температрур
    // біт 5 вкл або викл реле при зміні температур або таймера
    // біт 6 стан реле при помилці термодатчмка
    if (message.destinationName === getReleEpromUpr) {
        //получаємо дані з памяті про датчики 
        const obj = JSON.parse(message.payloadString);
        // console.log('333333333333333333333');
        // console.log('objSensorReleUpr *****');
        // console.log(obj);
        objSensorReleUpr = obj.sensor;
        objSensorReleFlags = obj.flags;
        console.log(objSensorReleUpr);
        console.log(objSensorReleFlags);
        fun1();
    }

    //************************************************************************************************************** */

    if (message.destinationName === GET_SENSOR_ON_OFF_TEMP) {
        //получаємо дані з памяті про температури включення і відкючення
        objSensorVklOtklTemp = JSON.parse(message.payloadString);
        // console.log('objSensorVklOtklTemp *****');
        // console.log(message.payloadString);
        fun2();
    }

    //************************************************************************************************************** */

    if (message.destinationName === STAN_RELE) {//Працює
        //получаємо дані про стан кожного реле включене або відключене контроллер читає вихідні піни для реле і відправляє інформацію
        let stanReleTemp = JSON.parse(message.payloadString);
        // console.log(stanReleTemp);

        const releOnOff = document.querySelectorAll('.rele__control-manually-on-off');
        try {
            stanReleTemp.data.forEach((e, i) => {
                releOnOff[i].checked = e;
                e ? popapInfoTempItem[i].classList.add('on') : popapInfoTempItem[i].classList.remove('on')
            });
        } catch (error) {
            // console.log(error)
        }
    }

    //************************************************************************************************************** */

    if (message.destinationName === GET_RELE_NAME) {//Працює
        try {
            // console.log('GET_RELE_NAME 22222222222222222222222222222222222222222222222222222222');
            // console.log(message.payloadString);

            // получаємо імя кожного реле
            objNameRele = JSON.parse(message.payloadString);
            const releItemTitleName = document.querySelectorAll('.rele__item-title-name');

            releItemTitleName.forEach((e, i) => {
                e.textContent = objNameRele.obj[i];
            });

            releNameInput.forEach(function (e, i) {
                e.value = objNameRele.obj[i];
                popapInfoTempItem[i].textContent = objNameRele.obj[i];
                releItemTitleName[i].textContent = objNameRele.obj[i];
            });
            // console.log('objNameRele');

        } catch (e) {
            // console.log('ERROR NAME RELE' + e);
            sendMessage(SET_DEFINE_DEVICE, 'setDefineDevice');
            // console.log('DEFAULT_DEVICE');
        }

    }
    //" "

    //************************************************************************************************************** */
    if (message.destinationName === GET_RELE_EEPROM_UPR_MANUAL) {
        //получаємо дані про стан кожного реле
        // console.log('55555555555555555555555555555');
        let objManualRele = JSON.parse(message.payloadString);
        // console.log('message.payloadString   ////// GET_RELE_EEPROM_UPR_MANUAL');
        // console.log(message.payloadString);

        document.querySelectorAll('.input-control-manually-svg').forEach(function (e, i) {
            const parent = e.closest('.rele__item');
            // console.log("testttt");
            if (objManualRele.data[i] == 1) {
                // e.checked = true;
                parent.querySelector('.input-control-manually-svg').classList.add('on');
                parent.querySelector('.rele__control-manually-show').classList.add('on');
                parent.querySelector('.rele__control-manually').classList.add('show-block'); //Добавляємо клас відкриваємо Select
                parent.querySelector('.rele__seting-sensor-timer').classList.add('block__hidden'); //Добавляємо клас відкриваємо Select
            } else if (objManualRele.data[i] == 0) {
                // e.checked = false;
                parent.querySelector('.input-control-manually-svg').classList.remove('on');
                parent.querySelector('.rele__control-manually-show').classList.remove('on');
                parent.querySelector('.rele__control-manually').classList.remove('show-block');
                parent.querySelector('.rele__seting-sensor-timer').classList.remove('block__hidden'); //Добавляємо клас відкриваємо Select
            }
        });
    }
    //************************************************************************************************************** */
    if (message.destinationName === GET_RELE_DATA_TIME_ALL) {//Працює
        const dataTimeRele = JSON.parse(message.payloadString);

        console.log('555555555555555555555555555555555555555555555555555555555');

        console.log(dataTimeRele);

        for (let namberRele = 0; namberRele < 8; namberRele++) {

            //             arrayDatetime.length<8 && arrayDatetime.push({
            //                 Datetime: [],
            //                 DatetimeReal: [],
            //                 time: [],
            //                 timeReal: []
            //             });
            console.log(arrayDatetime)
            console.log(arrayDatetime.length)


            const dateTimeInput = releItem[namberRele].querySelectorAll('.datetime');
            const timeInput = releItem[namberRele].querySelectorAll('.time');
            const dayWikend = releItem[namberRele].querySelectorAll('.day');

            dateTimeInput.forEach(function (e) {
                e.value = '';
            });

            timeInput.forEach(function (e) {
                e.value = '';
            });

            dayWikend.forEach(function (e) {
                e.checked = true;
            });

            for (i = 0; i < 9; i += 2) {
                let ii = i + (namberRele * 10);
                // console.log(ii)
                if (dataTimeRele.DATATIME[ii] != '65535-99-99T99:99' && dataTimeRele.DATATIME[ii + 1] != '65535-99-99T99:99') {
                    // console.log(dataTimeRele.DATATIME[ii]);
                    // console.log(dataTimeRele.DATATIME[ii + 1]);
                    dateTimeInput[i].value = dataTimeRele.DATATIME[ii];
                    dateTimeInput[i + 1].value = dataTimeRele.DATATIME[ii + 1];

                    arrayDatetime[namberRele].Datetime[i] = new Date(dataTimeRele.DATATIME[ii]).getTime();
                    arrayDatetime[namberRele].DatetimeReal[i] = new Date(dataTimeRele.DATATIME[ii]);
                    arrayDatetime[namberRele].Datetime[i + 1] = new Date(dataTimeRele.DATATIME[ii + 1]).getTime();
                    arrayDatetime[namberRele].DatetimeReal[i + 1] = new Date(dataTimeRele.DATATIME[ii + 1]);
                }
            }
            //*****************************
            for (i = 0; i < 49; i += 2) {
                let ii = i + (namberRele * 50);
                // console.log(ii)
                if (dataTimeRele.TIME[ii] != '99:99' && dataTimeRele.TIME[ii + 1] != '99:99') {
                    // console.log(objManualRele.TIME[i]); 
                    // console.log( objManualRele.TIME[i+1]);
                    timeInput[i].value = dataTimeRele.TIME[ii];
                    timeInput[i + 1].value = dataTimeRele.TIME[ii + 1];
                    arrayDatetime[namberRele].time[i] = new Date(dataTimeRele.DATATIME[ii]);
                    arrayDatetime[namberRele].timeReal[i + 1] = new Date(dataTimeRele.DATATIME[ii + 1]);
                }
            }

            for (i = 0; i < 35; i++) {
                let ii = i + (namberRele * 35);
                if (dataTimeRele.DEY[i] == 1) {
                    dayWikend[i].checked = true;
                    dayWikend[i].previousElementSibling.classList.add('checked');
                }
                if (dataTimeRele.DEY[i] == 0) {
                    dayWikend[i].checked = false;
                    dayWikend[i].previousElementSibling.classList.remove('checked');
                }
            }

        }

        document.querySelectorAll('.rele__item').forEach((parent) => {
            const datetime = parent.querySelectorAll('.datetime');
            const time = parent.querySelectorAll('.time');
            // console.log(parent)
            // console.log(datetime)
            // console.log(time)
            // switchSeting( parent);
            // chekChecedDay(event);
            chekDate(parent, datetime, time);
            chekTime(parent, datetime, time);
            showTimerIcons(parent, datetime, time); //Добавляє іконки таймера
        });
    }


    //************************************************************************************************************** */
    if (message.destinationName === getReleDATATIME) {//Працює
        //получаємо дані про таймери

        const objManualRele = JSON.parse(message.payloadString);
        // console.log('UUUUUUUUUUUUUUUUUUUUUUUUUU')
        // console.log(message.payloadString);
        // console.log(objManualRele);
        // if (tempObj.NUMPACKAGE === 1) {
        //     obj_1 = Object.assign({}, tempObj);
        //     console.log(obj_1);
        // }

        // if (tempObj.NUMPACKAGE === 2) {
        //     obj_2 = Object.assign({}, tempObj);
        //     // console.log('obj_2');
        // }

        // if (tempObj.NUMPACKAGE === 3) {
        //     obj_2.TIME = obj_2.TIME.concat(tempObj.TIME);
        //     console.log(obj_2);
        // }


        // obj_3 = Object.assign({}, tempObj);
        // console.log(obj_3);

        // objManualRele = Object.assign(obj_1, obj_2, obj_3);
        // console.log(objManualRele);
        let namberRele = objManualRele.NUM;
        // console.log("objManualRele")
        // console.log(namberRele)
        // console.log(typeof namberRele)

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
            e.checked = true;
        });

        let delaySecondStart = parseInt(objManualRele.DELAYSECONDSTART);

        if (delaySecondStart < 36000) releControlTimer[namberRele].value = delaySecondStart;
        else releControlTimer[namberRele].value = '0';

        // dateTimeInput[0].value = "2022-05-02T12:55";

        // console.log(objManualRele.DATATIME)
        if (objManualRele.DATATIME)
            for (i = 0; i < 9; i += 2) {
                if (objManualRele.DATATIME[i] != '65535-99-99T99:99' && objManualRele.DATATIME[i + 1] != '65535-99-99T99:99') {
                    // console.log(objManualRele.DATATIME[i]);
                    // console.log(objManualRele.DATATIME[i + 1]);
                    // console.log('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF')
                    dateTimeInput[i].value = objManualRele.DATATIME[i];
                    dateTimeInput[i + 1].value = objManualRele.DATATIME[i + 1];
                    arrayDatetime[namberRele].Datetime[i] = new Date(objManualRele.DATATIME[i]).getTime();
                    arrayDatetime[namberRele].DatetimeReal[i] = new Date(objManualRele.DATATIME[i]);
                    arrayDatetime[namberRele].Datetime[i + 1] = new Date(objManualRele.DATATIME[i + 1]).getTime();
                    arrayDatetime[namberRele].DatetimeReal[i + 1] = new Date(objManualRele.DATATIME[i + 1]);
                }
            }

        // console.log(objManualRele.TIME)
        if (objManualRele.TIME)
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


        // if (eve.target.checked) {
        //     eve.target.previousElementSibling.classList.add('checked');
        // } else {
        //     eve.target.previousElementSibling.classList.remove('checked');
        // }
        // console.log(objManualRele.DEY)
        if (objManualRele.DEY)
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

        releItem.forEach(function (parent, i) {
            const firstDataElement = parent.querySelector('.datetime');
            const firstTimeElement = parent.querySelector('.time');
            const changeEvent = new Event('change'); // создаем событие
            firstDataElement.dispatchEvent(changeEvent); // имитируем клик на кнопку
            firstTimeElement.dispatchEvent(changeEvent); // имитируем клик на кнопку
            // const clickEvent = new Event('click'); // создаем событие
            // firstDataElement.dispatchEvent(clickEvent); // имитируем клик на кнопку
            // firstTimeElement.dispatchEvent(clickEvent); // имитируем клик на кнопку
        });

        document.querySelectorAll('.rele__item').forEach((parent) => {
            const datetime = parent.querySelectorAll('.datetime');
            const time = parent.querySelectorAll('.time');
            // switchSeting( parent);
            // chekChecedDay(event);
            chekDate(parent, datetime, time);
            chekTime(parent, datetime, time);
            showTimerIcons(parent, datetime, time); //Добавляє іконки таймера
        });


        // 2022-5-17T14:26
    }
    //************************************************************************************************************** */
}