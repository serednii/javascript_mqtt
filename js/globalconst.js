let userName;
if (localStorage.getItem('Device') != null) {
    console.log(localStorage.getItem('nameDevice'));
    const ARR = JSON.parse(localStorage.getItem('Device'));
    document.querySelector('.info__local-storage').innerText = ARR.NameDevice + '  ---   ' + ARR.Name;
    userName = ARR.NameDevice;
} else {
    console.log('none');
    document.querySelector('.popap-local-storage').classList.add('popap-local-storage__show');
}

// const releItemTitlePin = document.querySelectorAll('.rele__item-title-pin');

// releItemTitlePin[0].textContent = 'PIN 5'
// releItemTitlePin[1].textContent = 'PIN 4'
// releItemTitlePin[2].textContent = 'PIN 0'
// releItemTitlePin[3].textContent = 'PIN 2'
// releItemTitlePin[4].textContent = 'PIN 12'
// releItemTitlePin[5].textContent = 'PIN 13'
// releItemTitlePin[6].textContent = 'PIN 3'
// releItemTitlePin[7].textContent = 'PIN 1'

let countDeviceSensors = 0;
console.log('WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW')

let monitor;
let client;


let printAnalogInput;
let parentListEeprom;
let tableEepromNumber;
let tableEepromAddress;
let tableEepromNameSensor;


//input and label class
let inputDey;
let labelDey;


let inputControlError;
let inputControlErrorLabel;


let releTempChangeRadio;
let releTempChangeLabel;


let releSetingSensorSelectLabel;
let releSetingSensorSelect;


let releTempVklStartLabel;
let releTempVkl;


let releSetingSwitcIhnput;
let releSetingSwitchLabel;


let tableEepromTemp;
let btnClear;
let btnChange;
let btnDefineDevice;
let parentListDevice;
let tableDeviceNumber;
let tableDeviceAddress;
let tableDeviceTemp;


let releItem;
let btnSave;
let releNameInput;
let releTempChangeSingle;
let delayWhenTurned;
let releControlTimer;
let popapTemp;
let popapInfoTempItem;
let parentRealDeviceSensor;


//**************************************************************************************** */

const CONNECT_SSID = userName + '_ssid';
const LOCAL_IP = userName + '_ip';
const outSaveDataSensorEeprom = userName + '_brouser_to_esp__hex_address_sensor_eeprom';

const GET_ANALOG_INPUT_A0 = userName + 'analogInputA0';
const STAN_RELE = userName + '_esp_to_brouser_stan_rele';
const GET_EEPROM_SENSOR_DATA = userName + '_esp_to_brouser_eeprom_sensor_data';
const GET_DEVICE_SENSOR_DATA = userName + '_esp_to_brouser_device_sensor_data';
const OUT_START_SENSOR_DATA = userName + '_start-data-sensor-eepromAndDevice';
const OUT_SAVE_DATA_SENSOER_EEPROM = userName + '_brouser_to_esp__hex_address_sensor_eeprom';


// console.log(CONNECT_SSID)
// console.log(LOCAL_IP)
// console.log(GET_ANALOG_INPUT_A0)
// console.log(STAN_RELE)
// console.log(GET_EEPROM_SENSOR_DATA)
// console.log(GET_DEVICE_SENSOR_DATA)
// console.log(OUT_START_SENSOR_DATA)
// console.log(OUT_SAVE_DATA_SENSOER_EEPROM)

// const outSaveNameSensorEeprom = userName + '_save-name-sensor-eeprom';
const OUT_CLEAR_EEPRORM = userName + '_cleareEPROM';
// console.log(OUT_CLEAR_EEPRORM)

const OUT_SAVE_DATE_SENSOR_TEMP = userName + '_brouser_to_esp_save_data_sensor_temp';
const OUT_SAVE_RELE_NAME = userName + '_save-rele-name';//nONE
// console.log(OUT_SAVE_DATE_SENSOR_TEMP)
// console.log(OUT_SAVE_RELE_NAME)

// const getReleEpromUpr GET_RELE_EEPROM_UPR = userName + '_esp_to_brouser_rele_eprom_upr';//NONE
// const setReleEpromUpr SET_RELE_EEPROM_UPR = userName + '_brouser_to_esp_rele_eprom_upr_set_number_sensor';//NONE
const SET_RELE_EEPROM_UPR_ERROR_RELE_ON_OFF = userName + '_brouser_to_esp_rele_erorr_vkl_vukl';//OK
const SET_RELE_EEPROM_UPR_ON_OR_TWOrANGE_TEMP = userName + '_brouser_to_esp_rele_set_one_or_two_range_temp';//OK
const SET_RELE_EEPROM_UPR_CHANGE_ON_OR_OFF_ = userName + '_brouser_to_esp_rele__set_change_on_or_off';//OK
const SET_RELE_EEPROM_UPR_MANUAL = userName + '_brouser_to_esp_rele_get_eprom_upr_manual';//OK
const SET_RELE_EEPROM_UPR = userName + '_brouser_to_esp_set_rele_vkl_otkl';//OK
const SET_RELE_DATA_TIME = userName + '_set-rele-data-time';//OK
const SET_DEFINE_DEVICE = userName + '_define_device';//OK
const SET_RESET_FUNCTION = userName + '_resetFunction';
// console.log(GET_RELE_EEPROM_UPR)
// console.log(SET_RELE_EEPROM_UPR)
// console.log(SET_RELE_EEPROM_UPR_ERROR_RELE_ON_OFF)
// console.log(SET_RELE_EEPROM_UPR_ON_OR_TWOrANGE_TEMP)
// console.log(SET_RELE_EEPROM_UPR_CHANGE_ON_OR_OFF_)
// console.log(SET_RELE_EEPROM_UPR_MANUAL)
// console.log(SET_RELE_EEPROM_UPR)
// console.log(SET_RELE_DATA_TIME)
// console.log(SET_DEFINE_DEVICE)
// console.log(SET_RESET_FUNCTION)



const GET_RELE_DATA_TIME = userName + '_esp_to_brouser_rele_data_time';//OK
const GET_RELE_DATA_TIME_ALL = userName + '_esp_to_brouser_rele_data_time_all';//OK
// console.log(GET_RELE_DATA_TIME)
// console.log(GET_RELE_DATA_TIME_ALL)

// const getSensorName = userName + '_sensor-name';
const GET_RELE_NAME = userName + '_rele-name';//OK
const GET_RELE_EEPROM_UPR_MANUAL = userName + '_rele-out-eprom_upr-manual';//OK
const GET_SENSOR_ON_OFF_TEMP = userName + '_sensor-vkl-otkl';
// console.log(GET_RELE_NAME)
// console.log(GET_RELE_EEPROM_UPR_MANUAL)
// console.log(GET_SENSOR_ON_OFF_TEMP)

console.log('WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW')



function initVariable() {
    return new Promise(resolve => {
        monitor = document.querySelectorAll('.data-topic');
        console.log(monitor)
        client = new Paho.MQTT.Client("broker.hivemq.com", 8000, "userName-" + parseInt(Math.random() * 100, 10));
        client.onConnectionLost = onConnectionLost;
        client.onMessageArrived = onMessageArrived;


        printAnalogInput = document.querySelector('.popap-info__analog-input');
        parentListEeprom = document.querySelectorAll('.address-eeprom__data');
        tableEepromNumber = document.querySelectorAll('.address-eeprom__number');
        tableEepromAddress = document.querySelectorAll('.address-eeprom__address');
        tableEepromNameSensor = document.querySelectorAll('.address-eeprom-name');
        console.log(printAnalogInput)
        console.log(parentListEeprom)
        console.log(tableEepromNumber)
        console.log(tableEepromAddress)
        console.log(tableEepromNameSensor)

        //input and label class
        inputDey = document.querySelectorAll('.day');
        labelDey = document.querySelectorAll('.label-day');
        console.log(inputDey)
        console.log(labelDey)

        inputControlError = document.querySelectorAll('.input-control-error');
        inputControlErrorLabel = document.querySelectorAll('.input-control-error__label');
        console.log(inputControlError)
        console.log(inputControlErrorLabel)

        releTempChangeRadio = document.querySelectorAll('.rele-temp-change-radio');
        releTempChangeLabel = document.querySelectorAll('.rele-temp-change__label');
        console.log(releTempChangeRadio)
        console.log(releTempChangeLabel)

        releSetingSensorSelectLabel = document.querySelectorAll('.rele__seting-sensor__select-label');
        releSetingSensorSelect = document.querySelectorAll('.rele__seting-sensor__select');
        console.log(releSetingSensorSelectLabel)
        console.log(releSetingSensorSelect)

        releTempVklStartLabel = document.querySelectorAll(' .rele-temp-vkl-start-label');
        releTempVkl = document.querySelectorAll('.rele-temp-vkl');
        console.log(releTempVklStartLabel)
        console.log(releTempVkl)

        releSetingSwitcIhnput = document.querySelectorAll('.rele__seting-switch__input');
        releSetingSwitchLabel = document.querySelectorAll('.rele__seting-switch__label');
        console.log(releSetingSwitcIhnput)
        console.log(releSetingSwitchLabel)

        tableEepromTemp = document.querySelectorAll('.address-eeprom__temp');
        btnClear = document.querySelectorAll('.address-eeprom__btn.clear');
        btnChange = document.querySelectorAll('.address-eeprom__btn.change');
        btnDefineDevice = document.querySelector('.popap-menu__btn-define-device');
        parentListDevice = document.getElementsByClassName('address-device__data');
        tableDeviceNumber = document.querySelectorAll('.address-device__number');
        tableDeviceAddress = document.getElementsByClassName('address-device__address');
        tableDeviceTemp = document.querySelectorAll('.address-device__temp');
        console.log(tableEepromTemp)
        console.log(btnClear)
        console.log(btnChange)
        console.log(btnDefineDevice)
        console.log(parentListDevice)
        console.log(tableDeviceNumber)
        console.log(tableDeviceAddress)
        console.log(tableDeviceTemp)


        releItem = document.querySelectorAll('.rele__item');
        btnSave = document.querySelector('.address-eeprom__save');
        releNameInput = document.querySelectorAll('.rele__name-input');
        reempChangeSingle = document.querySelectorAll('.rele-temp-change-single');
        delayWhenTurned = document.querySelectorAll('.delay-when-turned');
        releControlTimer = document.querySelectorAll('.delay-when-turned');
        popapTemp = document.querySelectorAll('.popap-info__temp-item');
        popapInfoTempItem = document.querySelectorAll('.popap-info__lamp-link');
        parentRealDeviceSensor = document.querySelector('.address-device__list');
        console.log(releItem)
        console.log(btnSave)
        console.log(releNameInput)
        console.log(releTempChangeSingle)
        console.log(delayWhenTurned)
        console.log(releControlTimer)
        console.log(popapTemp)
        console.log(popapInfoTempItem)
        console.log(parentRealDeviceSensor)
        resolve();
    });
}