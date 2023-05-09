let userName;
if (localStorage.getItem('Device') != null) {
    console.log(localStorage.getItem('nameDevice'));
    arr = JSON.parse(localStorage.getItem('Device'));
    document.querySelector('.info__local-storage').innerText = arr.NameDevice + '  ---   ' + arr.Name;
    userName = arr.NameDevice;
} else {
    console.log('none');
    document.querySelector('.popap-local-storage').classList.add('popap-local-storage__show');
}

const monitor = document.querySelectorAll('.data-topic');
let client = new Paho.MQTT.Client("broker.hivemq.com", 8000, "userName-" + parseInt(Math.random() * 100, 10));
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;
const printAnalogInput = document.querySelector('.popap-info__analog-input');
const parentListEeprom = document.querySelectorAll('.address-eeprom__data');
const tableEepromNumber = document.querySelectorAll('.address-eeprom__number');
const tableEepromAddress = document.querySelectorAll('.address-eeprom__address');
const tableEepromNameSensor = document.querySelectorAll('.address-eeprom-name');

//input and label class
const inputDey = document.querySelectorAll('.day');
const labelDey = document.querySelectorAll('.label-day');

const inputControlError = document.querySelectorAll('.input-control-error');
const inputControlErrorLabel = document.querySelectorAll('.input-control-error__label');

const releTempChangeRadio = document.querySelectorAll('.rele-temp-change-radio');
const releTempChangeLabel = document.querySelectorAll('.rele-temp-change__label');

const releSetingSensorSelectLabel = document.querySelectorAll('.rele__seting-sensor__select-label');
const releSetingSensorSelect = document.querySelectorAll('.rele__seting-sensor__select');

const releTempVklStartLabel = document.querySelectorAll(' .rele-temp-vkl-start-label');
const releTempVkl = document.querySelectorAll('.rele-temp-vkl');

const releSetingSwitcIhnput = document.querySelectorAll('.rele__seting-switch__input');
const releSetingSwitchLabel = document.querySelectorAll('.rele__seting-switch__label');

const tableEepromTemp = document.querySelectorAll('.address-eeprom__temp');
const btnClear = document.querySelectorAll('.address-eeprom__btn.clear');
const btnChange = document.querySelectorAll('.address-eeprom__btn.change');
const btnDefineDevice = document.querySelector('.popap-menu__btn-define-device');
const parentListDevice = document.querySelectorAll('.address-device__data');
const tableDeviceNumber = document.querySelectorAll('.address-device__number');
const tableDeviceAddress = document.querySelectorAll('.address-device__address');
const tableDeviceTemp = document.querySelectorAll('.address-device__temp');
const releItem = document.querySelectorAll('.rele__item');
const btnSave = document.querySelector('.address-eeprom__save');
const releNameInput = document.querySelectorAll('.rele__name-input');
const releTempChangeSingle = document.querySelectorAll('.rele-temp-change-single');
const delayWhenTurned = document.querySelectorAll('.delay-when-turned');
const releControlTimer = document.querySelectorAll('.delay-when-turned');
const popapTemp = document.querySelectorAll('.popap-info__temp-item');
const popapInfoTempItem = document.querySelectorAll('.popap-info__lamp-link');

//**************************************************************************************** */

const CONNECT_SSID = userName + '_ssid';
const LOCAL_IP = userName + '_ip';
const getanaloInputA0 = userName + 'analogInputA0';
const stanRele = userName + '_stanRele';
const getEepromSensorData = userName + '_esp_to_brouser_eeprom_sensor_data';
const getDeviceSensorData = userName + '_esp_to_brouser_device_sensor_data';
const outstartDataSensor = userName + '_start-data-sensor-eepromAndDevice';
const outSaveDataSensorEeprom = userName + '_brouser_to_esp__hex_address_sensor_eeprom';
const outSaveNameSensorEeprom = userName + '_save-name-sensor-eeprom';
const outCleareEPROM = userName + '_cleareEPROM';

const outSaveDataSensorTemp = userName + '_save-data-sensor-temp';
const outSaveReleName = userName + '_save-rele-name';

const getReleEpromUpr = userName + '_esp_to_brouser_rele_eprom_upr';
const setReleEpromUpr = userName + '_rele_eprom_upr-set_number_sensor';
const setReleEpromUprErorrReleVklVukl = userName + '_brouser_to_esp_rele_erorr_vkl_vukl';
const setReleEpromUprOneOrTwoRangeTemp = userName + '_brouser_to_esp_rele_set_one_or_two_range_temp';
const setReleEpromUprChangeOnOrOff = userName + '_brouser_to_esp_rele__set_change_on_or_off';
const setReleEpromUprManual = userName + '_rele-get-eprom_upr-manual';
const setReleVklOtkl = userName + '_set-rele-vkl-otkl';
const setReleDATATIME = userName + '_set-rele-data-time';
const setDefineDevice = userName + '_define_device';
const setResetFunction = userName + '_resetFunction';


const getReleDATATIME = userName + '_out-web-rele-data-time';
const getSensorName = userName + '_sensor-name';
const getReleName = userName + '_rele-name';
const getReleEpromUprManual = userName + '_rele-out-eprom_upr-manual';
const getSensorVklOtklTemp = userName + '_sensor-vkl-otkl';