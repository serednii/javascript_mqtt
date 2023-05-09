// "use strict";

// window.onload = function() {
// console.log(localStorage.getItem('test'));
// localStorage.setItem('nameDevice', 'miro-benech_1')

// document.querySelector('.releSetingSwitcIhnput').addEventListener('change', ()=>{
//   console.log('lkjj;lk')
// });

// try {
// if (localStorage.getItem('Device') != null || itemDevice.length > 0) { //якщо в LOCALSTORAGE  є щось записано і є списки на екрані 
//   arr = JSON.parse(localStorage.getItem('Device'));
// }
window.addEventListener('resize', showWidth);
function showWidth() {
  document.querySelector('.widthtablet').innerText = document.documentElement.clientWidth;
}
showWidth();
//window.onload = function () {




async function go() {
  await addIdAndFor();
  await startLocalStoreg();
  //await innerHtmlText();
}
go();


























// function convertToBinary1(number) {
//   let num = number;
//   let binary = (num % 2).toString();
//   for (; num > 1;) {
//     num = parseInt(num / 2);
//     binary = (num % 2) + (binary);
//   }
//   // console.log(binary);
// }


const popapInfoWrapper = document.querySelector('.popap-info__wrapper');
$(document).ready(function () {
  $("#menu").on("click", "a", function (event) {
    event.preventDefault();//при нажатии на ссылку, мы переходим по адресу этой ссылки. Вызов preventDefault() отменит это поведение
    var id = $(this).attr('href'),
      top = $(id).offset().top - popapInfoWrapper.clientHeight - 20;
    // top = $(id).offset().top;
    $('body,html').animate({
      scrollTop: top
    }, 1000);
  });
});


//}//window.onload = function  end







let objDevice = {};
let objEeprom = {};
let objSensorEepromUpr = [];
let objSensorVklOtklTemp = {};
let objNameSensor = {};
let objNameRele = {};
let objManualRele = {};

let arrayDatetime = [];
for (let i = 0; i < 8; i++) {
  arrayDatetime.push({
    Datetime: [],
    DatetimeReal: [],
    time: [],
    timeReal: []
  });
}


let downloadedDataEEprom = false;
let downloadedDataDevice = false;
let showEepromFlag = true;
let timeMesage = void 0;
let element = void 0;


//==================================


/************************************************************************************************************** */
setInterval(function () {
  // Провірка на дані прийшли чи ні якщо обєти пусті то відправляємо запрос на повторну загрузку

  if (isEmpty(objEeprom) || isEmpty(objDevice) || isEmpty(objSensorEepromUpr) || isEmpty(objSensorVklOtklTemp)) {
    console.log('Є пусті обкти   ');

    sendMessage(outstartDataSensor, 'ALL');
    // sendMessage(outstartDataSensor, 'readAddressSensor');
    // sendMessage(outstartDataSensor, 'releControl'); //
    // sendMessage(outstartDataSensor, 'ReadTempVklOtkl'); //
    // sendMessage(outstartDataSensor, 'NameSensor');//
    // sendMessage(outstartDataSensor, 'NameRele');
    // sendMessage(outstartDataSensor, 'ReleManual');

    console.log('objEeprom  ');
    console.log(isEmpty(objEeprom));

    console.log('objDevice  ');
    console.log(isEmpty(objDevice));

    console.log('objSensorEepromUpr  ');
    console.log(objSensorEepromUpr);

    console.log('objSensorVklOtklTemp  ');
    console.log(isEmpty(objSensorVklOtklTemp));

    console.log('**************************************************');
    console.log(' ');
  } else {
    console.log('Немає пустих обктів   ');
  }
}, 15000);
//************************************************************************************************************** */

//************************************************************************************************************** */
function isEmpty(obj) {
  //Провірка на пусті обєкти 
  for (let key in obj) {
    return false;
  }
  return true;
}
//************************************************************************************************************** */

//************************************************************************************************************** */

setInterval(function () {
  showEepromFlag = false;
  // console.log(client);
  sendMessage(outstartDataSensor, 'readAddressSensor');
}, 10000);

//************************************************************************************************************** */


//*******************************************************************

setInterval(function () {
  let date = new Date();
  let newDateFormat = date.getFullYear() + '-' +
    addBeforeNullNUmber(date.getMonth() + 1) + '-' +
    addBeforeNullNUmber(date.getDate()) + '  ' +
    addBeforeNullNUmber(date.getHours()) + ':' +
    addBeforeNullNUmber(date.getMinutes()) + ':' +
    addBeforeNullNUmber(date.getSeconds());
  document.querySelector('.popap-info__date-time').innerText = newDateFormat;
}, 1000);

// document.querySelectorAll('.timer-date__item').forEach(e => {
//   e.classList.remove('show-block');
// });

// document.querySelectorAll('.rele-control-timer').forEach(e => {
//   e.classList.add('block__show');
// });

// document.querySelector('.send__message').addEventListener('click',()=>{
//   sendMessage(outstartDataSensor, 'ALL');
//   console.log('SEND MESSAGE');
// });
// function semd_mess(){
//    sendMessage(outstartDataSensor, 'ALL');

// }


// -------------------------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------------------------
function addBeforeNullNUmber(number) {
  if (number > 9) return number;
  else return '0' + number;
}
// -------------------------------------------------------------------------------------------------------


function fun1() {

  if (objSensorEepromUpr.obj != undefined) {
    //Якщо не пустий обєкт
    // console.log('ZZZZZZZZZZZZZZZZZZZZZZZZZZ');
    // console.log(objSensorEepromUpr.obj);
    // console.log(objEeprom.obj);
    releItem.forEach(function (e, clickRele) {

      const select = e.querySelector('select');
      const radiochangeRadio = e.querySelectorAll('.rele-temp-change-radio');
      const radioSingle = e.querySelectorAll('.rele-temp-change-single');
      const releError = e.querySelectorAll('.input-control-error');

      k = objSensorEepromUpr.obj[clickRele];
      // k = objSensorEepromUpr.obj[clickRele].number;

      const numSensor = k & 0x0F; // номер сенсора який управляє даним реле
      // console.log('k   +++ ' + clickRele + '  ' + (k &= ~240));
      // console.log('--');
      // console.log(numSensor);
      // convertToBinary1(numSensor);

      if (radioSingle !== null) //якщо не пустий масив

        if (k & 1 << 4) {
          ////1-два діапазона температур включення і відключеня 0-один діапазон температур  включення або відключення
          radioSingle[1].checked = true;
          e.closest('.rele__item').querySelector('.rele-temp-otkl').disabled = false;
        } else {
          e.closest('.rele__item').querySelector('.rele-temp-otkl').disabled = true;
          radioSingle[0].checked = true;
        }

      if (radiochangeRadio !== null) //якщо не пустий масив
        if (k & 1 << 5) {
          //Провірка біт 4 rele_0_eprom_sensor вкл або викл реле при переключені
          radiochangeRadio[0].checked = true;;
          // radiochangeRadio[1].checked = false;
        } else {
          // radiochangeRadio[0].checked = false;
          radiochangeRadio[1].checked = true;
        }

      if (!(releError == null)) //якщо не пустий масив
        if (k & 1 << 6) {
          //біт 6 при несправності термодатчика або неможливість управляти таймером реле залишаємо вкл 1 або відключеним -0
          releError[0].checked = true;
          // releError[1].checked = false;
        } else {
          // releError[0].checked = false;
          releError[1].checked = true;
        }

      //------------------------------------

      const option = select.querySelectorAll('option');

      option.forEach(function (e, i) {
        //видаляємо всі option elements для даного реле крім першого
        if (i > 0) e.remove();
      });

      for (let numEepromSensor = 0; numEepromSensor < 8; numEepromSensor++) {
        //перебираємо всі термодатчики
        let numRele = 15; //номер реле в якому записаний термодатчик
        for (let d = 0; d < 8; d++) {
          //
          z = objSensorEepromUpr.obj[d].number;
          z &= ~240;
          if (z == numEepromSensor) {
            //Нaходимо в масиві для реле номер термодатчика
            numRele = d;
            console.log('numRele - ' + numRele);
            break;
          }
        }

        //якщо адрес не нуль добавляємо  і термодатчика немає в списку реле або він є але записаний в тому реле з яким ми працюємо option з адресом
        if (objEeprom.obj != undefined) {
          if (!(objEeprom.obj[numEepromSensor].address == '0000000000000000' || objEeprom.obj[numEepromSensor].address == 'ffffffffffffffff') && (numRele == clickRele || numRele == 15)) {

            const releSetingSwitchSensor = e.querySelector('.rele__seting-switch__sensor');

            const createOption = document.createElement('option');
            createOption.value = objEeprom.obj[numEepromSensor].number;
            createOption.className = "rele-control-option";

            if (objNameSensor.obj != undefined && objNameSensor.obj[numEepromSensor].nameSensor != '') {
              createOption.innerText = objEeprom.obj[numEepromSensor].number + '--' + objNameSensor.obj[numEepromSensor].nameSensor + ' -- ' + objEeprom.obj[numEepromSensor].temp;
            } else {
              createOption.innerText = objEeprom.obj[numEepromSensor].number + '--' + objEeprom.obj[numEepromSensor].address.toLocaleUpperCase() + ' -- ' + objEeprom.obj[numEepromSensor].temp;
            }

            if (numRele == clickRele) {
              createOption.selected = true; //Добавляємо вибраним реле яке є в списку керованих
            }
            select.appendChild(createOption);
          }

          try {
            if (numSensor != 15) {
              if (objNameSensor.obj != undefined && objNameSensor.obj[numSensor].nameSensor != '') {
                if (numSensor < 8) e.querySelector('.rele__seting-switch__sensor').innerText = objNameSensor.obj[numSensor].nameSensor + '  ' + objEeprom.obj[numSensor].temp;
                else e.querySelector('.rele__seting-switch__sensor').innerText = 'NONE';

              } else {
                if (numSensor < 8) e.querySelector('.rele__seting-switch__sensor').innerText = objEeprom.obj[numSensor].address.toLocaleUpperCase() + '  ' + objEeprom.obj[numSensor].temp;
                else e.querySelector('.rele__seting-switch__sensor').innerText = 'NONE';
              }
            } else {
              e.querySelector('.rele__seting-switch__sensor').innerText = 'NONE';
            }
          } catch (e) {
            console.log('ERROR numSensor  -- ' + numSensor)
          }

        }

      }

    });
  }
}
// rele-temp-change-radio


document.querySelectorAll('.rele__control-manually-on-off').forEach(function (e, i) {
  e.addEventListener('change', function () {
    if (e.checked) s = i + 'x1k';
    else s = i + 'x0k';
    console.log('s----' + s);
    sendMessage(setReleVklOtkl, s);
  });
});

// document.querySelectorAll('.rele__control-manually_off').forEach(function (e, i) {
//   e.addEventListener('click', function () {
//     s = i + 'x0k';
//     console.log('s----' + s);

//     sendMessage(setReleVklOtkl, s);
//   });
// });


// -------------------------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------------------------
document.querySelector('.show_table').addEventListener('change', function (e) {
  const sensorContainer = document.querySelector('.sensor');
  if (e.target.checked == true) sensorContainer.classList.add('sensor-show');
  else sensorContainer.classList.remove('sensor-show');
});
// -------------------------------------------------------------------------------------------------------


document.querySelectorAll('select').forEach(function (e) {
  e.addEventListener('change', function (k) {
    // console.log(e.selectedIndex);
    releItem.forEach(function (k, i) {
      if (k == e.closest('.rele__item')) {
        // опреділяєм в якому блоці ми знаходимося тобто номер реле
        // console.log(i);
        // console.log(e.querySelectorAll('option')[e.selectedIndex].value);
        // objSensorEepromUpr.obj[i] = e.querySelectorAll('option')[e.selectedIndex].value ;
        s = i + 'x' + e.querySelectorAll('option')[e.selectedIndex].value + 'k';
        // console.log('s----' + s);
        sendMessage(setReleEpromUpr, s);
      }
    });
  });
});

// **************************************************************************************




// **************************************************************************************

document.querySelectorAll('.input-control-manually__input').forEach(function (e, num) {
  e.addEventListener('click', function (a) {
    const parent = e.closest('.rele__item');
    if (a.target.checked) {
      parent.querySelector('.rele__control-manually').classList.add('block__show'); //Добавляємо клас відкриваємо Select
      parent.querySelector('.rele__seting-sensor-timer').classList.add('block__hidden'); //Добавляємо клас відкриваємо Select
      // console.log('num  ' + num);
      s = num + 'x' + '1' + 'k';
      console.log('s----' + s);
      sendMessage(setReleEpromUprManual, s);
    } else {
      parent.querySelector('.rele__control-manually').classList.remove('block__show');
      parent.querySelector('.rele__seting-sensor-timer').classList.remove('block__hidden'); //Добавляємо клас відкриваємо Select
      // console.log(e.name);
      s = num + 'x' + '0' + 'k';
      console.log('s----' + s);
      sendMessage(setReleEpromUprManual, s);
    }
  });
});

// **************************************************************************************

document.querySelectorAll('.rele-temp-vkl, .rele-temp-otkl').forEach(function (e) {
  e.addEventListener('keyup', function () { //при вводі даних перевірка на мінімальне і максимальне значення
    // console.log(e.value);
    if (e.value > 120) e.value = 120;
    if (e.value < -50) e.value = -50;
  });
});

document.querySelectorAll('.rele-temp-btn').forEach(function (e, i) {
  //
  e.addEventListener('click', function () {
    s = i + 'v' + e.closest('.rele__item').querySelector('.rele-temp-vkl').value + 'o' + e.closest('.rele-temp-change').querySelector('.rele-temp-otkl').value + 'k';

    sendMessage(outSaveDataSensorTemp, s);
    console.log(s);
  });
});

document.querySelectorAll('.rele__name-btn').forEach(function (e, i) {
  e.addEventListener('click', function () {
    s = i + '*#*' + e.closest('.rele__item').querySelector('.rele__name-input').value + '*&*';

    sendMessage(outSaveReleName, s);
    console.log(s);
  });
});

// const inputControlError = document.querySelectorAll('.input-control-error');
// const releTempChangeRadio = document.querySelectorAll('.rele-temp-change-radio');
// const releTempChangeSingle = document.querySelectorAll('.rele-temp-change-single');

// **************************************************************************************************************************************************
// **************************************************************************************************************************************************
// **************************************************************************************************************************************************
// **************************************************************************************************************************************************

// *************************************************************************
// // При несправності термодатчика або таймера реле залишаємо вкл або викл
inputControlError.forEach(function (e, i) {

  e.addEventListener('change', function () {
    // try {
    let ii = Math.trunc(i / 2);
    // console.log('i = ' + i + '  ' + 'e  = ' + e.value);
    // console.log('ii = ' + ii + '  ' + 'e  = ' + e.value);
    // let temp = objSensorEepromUpr.obj[ii].number;

    if (e.value == '0') {
      // console.log('000');
      objSensorEepromUpr.obj[ii] &= ~(1 << 6);
    } else if (e.value == '1') {
      // console.log('111');
      objSensorEepromUpr.obj[ii] |= 1 << 6;
    }
    let objTemp = {
      "number": ii,
      "data": objSensorEepromUpr.obj[ii]
    };
    // s = ii + 'x' + objSensorEepromUpr.obj[ii].number + 'k';
    console.log('setReleEpromUprErorrReleVklVukl----' + JSON.stringify(objTemp));
    // convertToBinary1(objSensorEepromUpr.obj[ii].number)

    sendMessage(setReleEpromUprErorrReleVklVukl, JSON.stringify(objTemp));
    // } catch (e) {
    //   console.log('ERROR  ' + e);
    // }
  });
});

// //  / Включаємо реле або Виключаємо реле  при зміні температури або часу
releTempChangeRadio.forEach(function (e, i) {
  e.addEventListener('change', function () {
    // try {
    let ii = Math.trunc(i / 2);
    // console.log('i = ' + i + '  ' + 'e  = ' + e.value);
    // console.log('ii = ' + ii + '  ' + 'e  = ' + e.value);
    //  let temp = objSensorEepromUpr.obj[ii].number;

    if (e.value == '0') {
      // console.log('000');
      objSensorEepromUpr.obj[ii] &= ~(1 << 5);
    } else if (e.value == '1') {
      // console.log('111');
      objSensorEepromUpr.obj[ii] |= 1 << 5;
    }
    let objTemp = {
      "number": ii,
      "data": objSensorEepromUpr.obj[ii]
    };
    // let s = ii + 'x' + objSensorEepromUpr.obj[ii].number + 'k';
    console.log('setReleEpromUprOneOrTwoRangeTemp----' + JSON.stringify(objTemp));
    // convertToBinary1(objSensorEepromUpr.obj[ii].number)

    sendMessage(setReleEpromUprChangeOnOrOff, JSON.stringify(objTemp));
    // } catch (e) {
    //   console.log('ERROR  ' + e);
    // }
  });
});

// Один діапазон температур або два
releTempChangeSingle.forEach(function (e, i) {
  e.addEventListener('change', function () {
    // try {
    let ii = Math.trunc(i / 2);
    // console.log('i = ' + i + '  ' + 'e  = ' + e.value);
    // console.log('ii = ' + ii + '  ' + 'e  = ' + e.value);
    // let temp = objSensorEepromUpr.obj[ii].number;

    if (e.value == '1') {
      // console.log('000');
      objSensorEepromUpr.obj[ii] &= ~(1 << 4);
    } else if (e.value == '0') {
      // console.log('111');
      objSensorEepromUpr.obj[ii] |= 1 << 4;
    }
    let objTemp = {
      "number": ii,
      "data": objSensorEepromUpr.obj[ii]
    };
    // s = ii + 'x' + objSensorEepromUpr.obj[ii].number + 'k';
    console.log('setReleEpromUprOneOrTwoRangeTemp----' + JSON.stringify(objTemp));
    // convertToBinary1(objSensorEepromUpr.obj[ii].number)

    sendMessage(setReleEpromUprOneOrTwoRangeTemp, JSON.stringify(objTemp));
    // } catch (e) {
    //   console.log('ERROR  ' + e);
    // }
  });
});
// **************************************************************************************************************************************************
// **************************************************************************************************************************************************
// **************************************************************************************************************************************************
// **************************************************************************************************************************************************



// *************************************************************************
function fun2() {
  const inputTempVkl = document.querySelectorAll('.rele-temp-vkl');
  const inputTempOtkl = document.querySelectorAll('.rele-temp-otkl');
  const releSetingSwitchTempOn = document.querySelectorAll('.rele__seting-switch__temp-on')
  const releSetingSwitchTempOff = document.querySelectorAll('.rele__seting-switch__temp-off')
  try {


    for (let _i = 0; _i < inputTempVkl.length; _i++) {
      // if (releSetingSwitchTempOn != null && releSetingSwitchTempOn != undefined) releSetingSwitchTempOn[_i].innerText = 'TEMP_ON  ' + objSensorVklOtklTemp.obj[_i].vkl;
      // if (releSetingSwitchTempOff != null && releSetingSwitchTempOff != undefined) releSetingSwitchTempOff[_i].innerText = 'TEMP_OFF  ' + objSensorVklOtklTemp.obj[_i].otkl;
      if (releSetingSwitchTempOn) releSetingSwitchTempOn[_i].innerText = 'TEMP_ON  ' + objSensorVklOtklTemp.obj[_i].vkl;
      if (releSetingSwitchTempOff) releSetingSwitchTempOff[_i].innerText = 'TEMP_OFF  ' + objSensorVklOtklTemp.obj[_i].otkl;
      inputTempVkl[_i].value = objSensorVklOtklTemp.obj[_i].vkl;
      inputTempOtkl[_i].value = objSensorVklOtklTemp.obj[_i].otkl;
    }
  } catch (e) {
    console.log('ERROR  ' + e);
  }
}

btnChange.forEach(function (e) {
  e.addEventListener('click', function (k) {
    parentListEeprom.forEach(function (m) {
      //Видаляємо клас activ  на вісх елементах окрім тих наякі ми зробили клік і вони вже мають activ
      if (!k.currentTarget.closest('.address-eeprom__data').classList.contains('active')) {
        //Якщо ми клікаємо по елементу де вже є клас Activ то ми його не видаляємо
        m.classList.remove('active');
      }
    });
    e.closest('.address-eeprom__data').classList.toggle('active'); //інверсія класу
    CheckClickDevices();
    if (e.closest('.address-eeprom__data').classList.contains('active')) {
      element = e.closest('.address-eeprom__data');
    }
  });
});

//=====================================

parentListDevice.forEach(function (e) {
  //добавляємо датчики яких немає в списку EEPROM
  e.addEventListener('click', function () {
    if (e.classList.contains('red') && e.classList.contains('click')) {
      element.querySelector('.address-eeprom__address').innerText = e.querySelector('.address-device__address').textContent;
      compareSensorAddressHtml();
      // CheckClickDevices();
    }
  });
});

// ------------------------------

btnClear.forEach(function (e) {
  e.addEventListener('click', function () {
    const parent = e.closest('.address-eeprom__data');
    console.log(parent);
    parent.querySelector('.address-eeprom__address').innerText = '0000000000000000';
    parent.querySelector('.address-eeprom__temp').innerText = '';
    compareSensorAddressHtml();
    //CheckClickDevices();
  });
});

// -------------------------------

// -------------------------------
btnSave.addEventListener('click', function () {

  let s = { obj: [] };
  tableEepromAddress.forEach(function (e, i) {
    if (i > 0) {
      s.obj.push(e.textContent.toLocaleUpperCase());
    };
  });
  console.log(JSON.stringify(s));

  sendMessage(outSaveDataSensorEeprom, JSON.stringify(s));





  // let s = '';
  // tableEepromAddress.forEach(function (e, i) {
  //   if (i > 0) {
  //     s += 'na' + e.textContent.toLocaleUpperCase();
  //   };
  // });
  // console.log(s);

  // sendMessage(outSaveDataSensorEeprom, s);
  // s = '';



  tableEepromNameSensor.forEach(function (e, i) {
    if (i > 0) {
      s += '*&' + e.value;
    };
  });
  console.log(s);

  sendMessage(outSaveNameSensorEeprom, s);
});


//*********************************************************************** */
// popapClearDevice.classList.add('disable__global');
// popapClearDeviceItem.forEach((e) => e.classList.add('disable__global'));

btnDefineDevice.onclick = () => {
  let rezult = prompt("Підтвердіть введіть (ok)");
  if (rezult === 'ok') {
    // popapClearDevice.classList.remove('disable__global');
    sendMessage(setDefineDevice, 'setDefineDevice');
    console.log('DEFAULT_DEVICE');
  }

};
//*********************************************************************** */



function CheckClickDevices() {
  let flag = false;
  parentListEeprom.forEach(function (e) {
    if (e.classList.contains('active')) {
      //Якщо  вже є клас Activ то ми датчики що  немає в списку  робимо клікабельним
      flag = true;
    }
  });

  if (flag) {
    //Якщо  вже є клас Activ то ми датчики що  немає в списку  робимо клікабельним
    parentListDevice.forEach(function (e, i) {
      if (i > 0 && e.classList.contains('red')) {
        //якщо датчика немає в списку то ми його робимо клікабельним
        e.classList.add('click');
      }
    });
  } else {
    parentListDevice.forEach(function (e, i) {
      if (i > 0) {
        //якщо датчика немає в списку то ми його робимо клікабельним
        e.classList.remove('click');
      }
    });
  }
}

function compareSensorAddress() {
  compareSensorAddressHtml();
}

function compareSensorAddressHtml() {
  for (let _k3 = 1; _k3 < objDevice.obj.length + 1; _k3++) {
    tableDeviceAddress[_k3].closest('.address-device__data').classList.add('red');
    for (let _n = 1; _n < 9; _n++) {
      if (tableDeviceAddress[_k3].textContent == tableEepromAddress[_n].textContent) {
        tableDeviceAddress[_k3].closest('.address-device__data').classList.remove('red');
        tableDeviceAddress[_k3].closest('.address-device__data').classList.remove('click');
        break;
      }
    }
  }
  CheckClickDevices();
}

// document.querySelector('.time__btn').addEventListener('click', function () {});

// ************************************************************************************************************************************************************************************************************************************************************************************************************************
// ************************************************************************************************************************************************************************************************************************************************************************************************************************
// ************************************************************************************************************************************************************************************************************************************************************************************************************************
// ************************************************************************************************************************************************************************************************************************************************************************************************************************
// ************************************************************************************************************************************************************************************************************************************************************************************************************************
// ************************************************************************************************************************************************************************************************************************************************************************************************************************
// ************************************************************************************************************************************************************************************************************************************************************************************************************************
// ************************************************************************************************************************************************************************************************************************************************************************************************************************




// ********************************************************************************************************************************************************************
// document.querySelectorAll('.datetime, .time').forEach(function (e) {


document.querySelectorAll('.rele__item').forEach((parent, num) => {

  parent.addEventListener('change', function (event) {
    event.stopPropagation ? event.stopPropagation() : (event.cancelBubble = true);
    const datetime = parent.querySelectorAll('.datetime');
    const time = parent.querySelectorAll('.time');
    //при зміні на .datetime і  .time визивати обробку
    // const parent = parent.closest('.rele__item');
    // console.log(e)
    // console.log(event.target)
    // console.log(parent)
    if (event.target.classList.contains('day')) chekChecedDay(event);
    if (event.target.classList.contains('datetime')) chekDate(parent, datetime, time);
    if (event.target.classList.contains('time')) chekTime(parent, datetime, time);
    showTimerIcons(parent, datetime, time); //Добавляє іконки таймера
  });

  parent.addEventListener('click', function (event) {
    event.stopPropagation ? event.stopPropagation() : (event.cancelBubble = true);
    console.log(event.target);
    if (event.target.classList.contains('rele__seting-switch__input')) showSectionTimeAndSeting(event, parent, '.rele__seting-svg', '.rele__section-seting');
    if (event.target.classList.contains('rele__timer-seting-show__input')) showSectionTimeAndSeting(event, parent, '.rele__timer-seting-svg', '.rele-control-timer');
    if (event.target.classList.contains('rele__control-manually-show')) showSectionTimeAndSeting(event, parent, '.input-control-manually-svg', '.rele__control-manually', num);
  });

});


function showSectionTimeAndSeting(event, parent, classLink, classShowSection, num) { //Покузує або скриває блок з настройками
  event.preventDefault();
  if (event.target.classList.contains('on')) {
    parent.querySelector(classLink).classList.remove(classLink.substring(1) + '-on');
    parent.querySelector(classShowSection).classList.remove('show-block');
    if (event.target.classList.contains('rele__control-manually-show')) {
      parent.querySelector('.rele__seting-sensor-timer').classList.remove('block__hidden'); //Добавляємо клас відкриваємо Select
      s = num + 'x' + '0' + 'k';
      console.log('s----' + s);
      sendMessage(setReleEpromUprManual, s);
    }
    event.target.classList.remove('on');
  } else {
    parent.querySelector(classLink).classList.add(classLink.substring(1) + '-on');
    parent.querySelector(classShowSection).classList.add('show-block');
    if (event.target.classList.contains('rele__control-manually-show')) {
      parent.querySelector('.rele__seting-sensor-timer').classList.add('block__hidden'); //Добавляємо клас відкриваємо Select
      s = num + 'x' + '1' + 'k';
      console.log('s----' + s);
      sendMessage(setReleEpromUprManual, s);
    }
    event.target.classList.add('on');
  }
}

// function switchSeting(event, parent) { //Покузує або скриває блок з настройками
//   console.log('testtest')
//   if (event.target.classList.contains('on')) {
//     parent.querySelector('.rele__seting-svg').classList.add('rele__seting-svg-on');
//     parent.querySelector('.rele__section-seting').classList.add('show-block');
//     event.target.classList.remove('on');
//   } else {
//     parent.querySelector('.rele__seting-svg').classList.remove('rele__seting-svg-on');
//     parent.querySelector('.rele__section-seting').classList.remove('show-block');
//     event.target.classList.add('on');
//   }
// }

// function showSectionTime(event, parent) {
//   if (event.target.classList.contains('on')) {
//     parent.querySelector('.rele__timer-seting-svg').classList.add('rele__timer-seting-svg-on');
//     parent.querySelector('.rele-control-timer').classList.add('block__show'); //Добавляємо клас
//     event.target.classList.remove('on');
//   } else {
//     parent.querySelector('.rele__timer-seting-svg').classList.remove('rele__timer-seting-svg-on');
//     parent.querySelector('.rele-control-timer').classList.remove('block__show');
//     event.target.classList.add('on');
//   }
// }
// ********************************************************************************************************************************************************************
function showTimerIcons(parent, datetime, time) {
  const timerIcons = parent.querySelectorAll('.rele__timer-seting-icon');
  for (let d = 0, t = 0; d < 10; d += 2, t += 10) {
    const datetimeValue = new Date(datetime[d].value).getTime();
    const timeValue = time[t].value;
    if (d == 0) {
      if (!Number.isNaN(datetimeValue) || timeValue != '') timerIcons[0].classList.add('show-block');
      else timerIcons[0].classList.remove('show-block');
    }
    if (d == 2) {
      if (!Number.isNaN(datetimeValue) || timeValue != '') timerIcons[1].classList.add('show-block');
      else timerIcons[1].classList.remove('show-block');
    }
    if (d == 4) {
      if (!Number.isNaN(datetimeValue) || timeValue != '') timerIcons[2].classList.add('show-block');
      else timerIcons[2].classList.remove('show-block');
    }
    if (d == 6) {
      if (!Number.isNaN(datetimeValue) || timeValue != '') timerIcons[3].classList.add('show-block');
      else timerIcons[3].classList.remove('show-block');
    }
    if (d == 8) {
      if (!Number.isNaN(datetimeValue) || timeValue != '') timerIcons[4].classList.add('show-block');
      else timerIcons[4].classList.remove('show-block');
    }
  }
}






//       parent.querySelector('.rele-control-timer').classList.add('block__show'); //Добавляємо клас відкриваємо Select
//     } else {
//       parent.querySelector('.rele-control-timer').classList.remove('block__show');



function chekChecedDay(event) { //Включає виключає дні тижня
  event.target.previousElementSibling.classList.toggle('checked');
  if (event.target.checked) {
    event.target.previousElementSibling.classList.add('checked');
  } else {
    event.target.previousElementSibling.classList.remove('checked');
  }
}

// ********************************************************************************************************************************************************************
function chekDate(parent, datetime, time) {
  //обробка дати 
  const numberReleClick = parent.getAttribute('data-rele');
  const timerBlock = parent.querySelectorAll('.timer-date__item');

  datetime.forEach(function (k, i) {
    let dateInput = new Date(k.value).getTime();
    // console.log("curentDate");
    // console.log(numberReleClick);
    // console.log(new Date().getTime());

    arrayDatetime[numberReleClick].Datetime[i] = dateInput; //В секундах
    arrayDatetime[numberReleClick].DatetimeReal[i] = new Date(k.value); //нермальний формат

    if (arrayDatetime[numberReleClick].DatetimeReal[i] != 'Invalid Date') { //Якщо введена дата
      // console.log('************  '+numberReleClick+'  ****************  '+i+'  *********')
      // console.log(arrayDatetime[numberReleClick].DatetimeReal[i] )
      // console.log(time[i * 5].value)
      if (i % 2 == 0) {
        //neparnyy element
        if (time[i * 5].value != '') { //Якщо введений час
          datetime[i].value = formatDataAndTime(arrayDatetime[numberReleClick].DatetimeReal[i], 'start'); //Міняємо в даті годину на 00:00
          if (datetime[i].value != 'Invalid Date') arrayDatetime[numberReleClick].DatetimeReal[i] = new Date(datetime[i].value); //записуємо в елемент datatime
        }
      } else {
        //parnyy elemen
        if (time[(i - 1) * 5].value != '') {
          datetime[i].value = formatDataAndTime(arrayDatetime[numberReleClick].DatetimeReal[i], 'end'); //Міняємо в даті годину на 23:59
          if (datetime[i].value != 'Invalid Date') arrayDatetime[numberReleClick].DatetimeReal[i] = new Date(datetime[i].value); //записуємо в елемент datatime
        }
      }
    }


    for (let _n2 = 0; _n2 < 9; _n2 += 2) {
      if (arrayDatetime[numberReleClick].Datetime[_n2] >= arrayDatetime[numberReleClick].Datetime[_n2 + 1]) {
        //Якщо в одному рядку друга дата менша або дорівнює першій
        datetime[_n2].classList.add('date-red__color');
        datetime[_n2 + 1].classList.add('date-red__color');
      } else {
        datetime[_n2].classList.remove('date-red__color');
        datetime[_n2 + 1].classList.remove('date-red__color');
      }

      if (datetime[_n2].value == '' && datetime[_n2 + 1].value !== '' || datetime[_n2].value !== '' && datetime[_n2 + 1].value == '') {
        //Якщо в рядку незаповнене одне з полів
        if (datetime[_n2].value == '') datetime[_n2].classList.add('date-blue__backround');
        else datetime[_n2 + 1].classList.add('date-blue__backround');
      } else {
        datetime[_n2].classList.remove('date-blue__backround');
        datetime[_n2 + 1].classList.remove('date-blue__backround');
      }

      for (let _n3 = 0, _nn = 1; _n3 < 7; _n3 += 2, _nn++) {
        // n= [0 1 2 3 4 5 6 7 ]    nn = [1 3 ]
        if (datetime[_n3].value != '' && datetime[_n3 + 1].value != '' && !datetime[_n3].classList.contains('date-red__color')) {
          //Для розблокіровки для дальших блоків
          // console.log('checkDaTETRUE');
          timerBlock[_nn].classList.add('date-show-block');
          // timerBlock[nn].classList.add('date-show-block');

          // block1[nn] = true;
        } else {
          // console.log('checkDaTEFALSE');

          // block1[nn] = false;

          timerBlock[_nn].classList.remove('date-show-block');
          // timerBlock[nn].classList.remove('date-show-block');
        }
      }
    }

    // ********************************************************************************************************************************************************************
    // } else {
    //   // k.value = '';
    //   // console.log('date error');
    // }
  });
}
// ********************************************************************************************************************************************************************


// function checkDataAndTime(datetime, time, numberReleClick){  // Якщо є вибрано поля дата і поля час то поле дата годину старт ставимо 00:00 а кінець 23:59
//   datetime.forEach(function (k, i) {
//     if (arrayDatetime[numberReleClick].DatetimeReal[i]  != 'Invalid Date') {//Якщо введена дата
//       console.log('************  '+numberReleClick+'  ****************  '+i+'  *********')
//       console.log(arrayDatetime[numberReleClick].DatetimeReal[i] )
//       console.log(time[i * 5].value)
//       if (i % 2 == 0) {
//         //neparnyy element
//         if (time[i * 5].value != '') {//Якщо введений час
//           datetime[i].value = formatDataAndTime(arrayDatetime[numberReleClick].DatetimeReal[i] , 'start');//Міняємо в даті годину на 00:00
//           if (datetime[i].value != 'Invalid Date') arrayDatetime[numberReleClick].DatetimeReal[i] = new Date(datetime[i].value);//записуємо в елемент datatime
//         }
//       } else {
//        //parnyy elemen
//         if (time[(i-1) * 5].value != '') {
//           console.log(formatDataAndTime(arrayDatetime[numberReleClick].DatetimeReal[i] , 'end'));
//           datetime[i].value = formatDataAndTime(arrayDatetime[numberReleClick].DatetimeReal[i] , 'end');//Міняємо в даті годину на 23:59
//           if (datetime[i].value != 'Invalid Date') arrayDatetime[numberReleClick].DatetimeReal[i] = new Date(datetime[i].value);//записуємо в елемент datatime
//         }
//       }
//     }
//   });
// }


// ********************************************************************************************************************************************************************
function chekTime(parent, datetime, time) {
  //обробка часу
  const numberReleClick = parent.getAttribute('data-rele');
  const timerBlock = parent.querySelectorAll('.timer-date__item');
  const checkedDey = parent.querySelectorAll('.day');


  time.forEach(function (k, i) {
    t2 = new Date(0);
    str = k.value;
    // console.log(k)

    if (k.value != '') {
      t2.setHours(str.substr(0, str.indexOf(':')), str.substr(str.indexOf(':') + 1));
      arrayDatetime[numberReleClick].timeReal[i] = t2;
      t2 = t2.getTime();
      arrayDatetime[numberReleClick].time[i] = t2;
    } else {
      arrayDatetime[numberReleClick].timeReal[i] = '';
      arrayDatetime[numberReleClick].time[i] = '';
    }

    //   // ********************************************************************************************************************************************************************

    for (let _n4 = 0; _n4 < 49; _n4 += 2) {

      if (arrayDatetime[numberReleClick].time[_n4] >= arrayDatetime[numberReleClick].time[_n4 + 1] && arrayDatetime[numberReleClick].time[_n4 + 1] !== '') {
        //Якщо в одному рядку друга дата менша або дорівнює першій
        time[_n4].classList.add('time-red__color');
        time[_n4 + 1].classList.add('time-red__color');
      } else {
        time[_n4].classList.remove('time-red__color');
        time[_n4 + 1].classList.remove('time-red__color');
      }

      if (time[_n4].value == '' && time[_n4 + 1].value !== '' || time[_n4].value !== '' && time[_n4 + 1].value == '') {
        //Якщо в рядку незаповнене одне з полів
        if (time[_n4].value == '') time[_n4].classList.add('time-blue__backround');
        else time[_n4 + 1].classList.add('time-blue__backround');
      } else {
        time[_n4].classList.remove('time-blue__backround');
        time[_n4 + 1].classList.remove('time-blue__backround');
      }
    }

    for (let u = 1; u < 49; u += 10) {

      for (let _n5 = u; _n5 < u + 8; _n5 += 2) {
        if (arrayDatetime[numberReleClick].time[_n5] + 1 > arrayDatetime[numberReleClick].time[_n5 + 1] && arrayDatetime[numberReleClick].time[_n5 + 1] !== '') {
          //Якщо  другий рядок є менший за перший рядок 
          time[_n5].classList.add('time-red__backround');
          time[_n5 + 1].classList.add('time-red__backround');
        } else {
          time[_n5].classList.remove('time-red__backround');
          time[_n5 + 1].classList.remove('time-red__backround');
        }
      }
    }
    //  checkDataAndTime(datetime, time, numberReleClick);
    //********************************************************************************************** */
    // console.log("MMMMMMMMMMMMMMMMMMMMMMAAAAAAAAAAAAAA");
    // console.log(k);
    // console.log(eve.currentTarget);

    if (i === 0 || i === 10 || i === 20 || i === 30 || i === 40) {

      // console.log('************  ' + numberReleClick + '  ****************  ' + i + '  *********')
      // console.log(arrayDatetime[numberReleClick].DatetimeReal[i] )
      // console.log(time[i].value)

      if (arrayDatetime[numberReleClick].DatetimeReal[i / 5] != 'Invalid Date' && arrayDatetime[numberReleClick].DatetimeReal[i / 5] != undefined && time[i].value != '') {
        datetime[i / 5].value = formatDataAndTime(arrayDatetime[numberReleClick].DatetimeReal[i / 5], 'start');
        arrayDatetime[numberReleClick].DatetimeReal[i / 5] = new Date(datetime[i / 5].value);
        // console.log("KKKKKKKKKKKKKKKKKKKKKKKKKKKKK");

      }

      if (arrayDatetime[numberReleClick].DatetimeReal[i / 5 + 1] != 'Invalid Date' && arrayDatetime[numberReleClick].DatetimeReal[i / 5 + 1] != undefined && time[i].value != '') {
        datetime[i / 5 + 1].value = formatDataAndTime(arrayDatetime[numberReleClick].DatetimeReal[i / 5 + 1], 'end');
        arrayDatetime[numberReleClick].DatetimeReal[i / 5 + 1] = new Date(datetime[i / 5 + 1].value);
        // console.log("NNNNNNNNNNNNNNNNNNNNNNNNNN");
      }
    }


    for (let _u = 0, _nn2 = 1, nnn = 0; _u < 45; _u += 10, _nn2++, nnn += 7) {
      //u number section first element 0 10 20 30 40  nn вказує на номер секції 1 2 3 4 5


      for (let _n6 = _u; _n6 < _u + 9; _n6 += 2) {
        // n  перебираємо  парні  елементи в секції 0 2 4 6 8    10 12 14 16 18  20 22 24 26 28  30 32 34 36 38  40 42 44 46 48 
        if (_n6 < _u + 7)
          if (time[_n6].value !== '' && time[_n6 + 1].value !== '') {
            //Для розблокіровки для дальших рядків
            time[_n6 + 2].classList.remove('hiden-time');
            time[_n6 + 1 + 2].classList.remove('hiden-time');
          } else {
            time[_n6 + 2].classList.add('hiden-time');
            time[_n6 + 1 + 2].classList.add('hiden-time');
          }
      }

      if (_nn2 < 5) {
        if (time[_u + 8].value != '' && time[_u + 9].value != '') {
          //Для розблокіровки для дальших блоків//розблокувати
          if (!timerBlock[_nn2].classList.contains('date-show-block')) timerBlock[_nn2].classList.add('time-show-block');

          // timerBlock[nn].classList.remove('time-show-block');
        } else {
          timerBlock[_nn2].classList.remove('time-show-block');

          // timerBlock[nn].classList.add('time-show-block');
        }
      }

      //   const error_class = parent.querySelectorAll('.time-red__color');
      // console.log('length error  ' + error_class.length);
      // if ((time[u].value != '' && !time[u].classList.contains('time-red__color')) ) { //Для розблокіровки сhecked element даного блоку


      if (time[_u].value != '' && !time[_u].classList.contains('time-red__color')) {
        // if (time[_u].value != '' && time[_u] === eve.currentTarget && !time[_u].classList.contains('time-red__color')) {

        //Для розблокіровки сhecked element даного блоку
        for (f = 0; f < 7; f++) {
          // checkedDey[nnn + f].disabled = false;//ttt
          // checkedDey[nnn + f].checked = true;//ttt
        }
      } else {
        if (time[_u].value == '')
          for (f = 0; f < 7; f++) {
            // checkedDey[nnn + f].disabled = true;//ttt
          }
      }
    }
    //   // ********************************************************************************************************************************************************************

  });
}
// ********************************************************************************************************************************************************************


function formatDataAndTime(date, typ) {

  let strDate = date.getFullYear() + '-';
  strDate += date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
  strDate += '-';
  strDate += date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

  if (typ == 'start') strDate += 'T00:00';
  else if ('end') strDate += 'T23:59';
  // console.log('strDatestrDatestrDate  ' + strDate);
  return strDate;
}

function formatDataAndTimeFull(date) {

  let strDate = date.getFullYear() + '-';
  strDate += date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
  strDate += '-';
  strDate += date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

  strDate += 'T';
  strDate += date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  strDate += ':';
  strDate += date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();

  // console.log('strDatestrDatestrDate  ' + strDate);
  return strDate;
}

// document.querySelectorAll('.day ').forEach(function (e, i) {
//   e.addEventListener('click', function (ee) {
//     const parent = e.closest('.rele__item');
//   });
// });


// 2022-06-12T00:00 format input date set


document.querySelectorAll('.time__btn ').forEach(function (e, i) {

  e.addEventListener('click', function (ee) {
    const parent = e.closest('.rele__item');
    // let numberReleClick = parent.getAttribute('data-rele');
    // console.log(i);
    const error_class = parent.querySelectorAll('.date-red__color, .time-red__color, .date-blue__backround, .time-blue__backround,  .time-red__backround');

    // console.log('length error  ' + error_class.length);

    if (error_class.length > 0) {

      //Якщо є класи з помилками

      const popapError = document.querySelector('.popap_error');
      popapError.classList.add('popap_error-show');
      let counter = 0;

      let timerId = setInterval(function () {
        error_class.forEach(function (e) {
          if (counter % 2 == 0) e.classList.add('blink__eror-red');
          if (counter % 2 != 0) e.classList.remove('blink__eror-red');
        });

        counter++;
        // console.log('counter  ' + counter);
        if (counter > 9) {
          clearTimeout(timerId);
          popapError.classList.remove('popap_error-show');
        }
      }, 300);
    } else {
      //Якщо нема класів з помилками то відправляємо повідомлення
      //Відправляємо дані
      // console.log(delayWhenTurned[i].value);

      const dayElement = parent.querySelectorAll('.day');
      let _s = 'RELE' + i + '-' + delayWhenTurned[i].value + '-';

      for (nn = 0; nn < 10; nn++) {
        // console.log('dayElement  ' + arrayDatetime[i].DatetimeReal[nn]);

        if (arrayDatetime[i].DatetimeReal[nn] != 'Invalid Date') {
          // console.log('dayElement  ' + arrayDatetime[i].DatetimeReal[nn]);
          let dateInput = new Date(arrayDatetime[i].DatetimeReal[nn]).getTime();
          dateInput = dateInput / 1000;
          console.log("ZZZZZZZZZZZZ");
          console.log(arrayDatetime[i].DatetimeReal[nn]);
          _s += dateInput + '-'; //Рік  v minute
          _s += arrayDatetime[i].DatetimeReal[nn].getFullYear() + '-'; //Рік
          _s += arrayDatetime[i].DatetimeReal[nn].getMonth() + 1 + '-'; //Місяць
          _s += arrayDatetime[i].DatetimeReal[nn].getDate() + '-'; //день 1-31
          _s += arrayDatetime[i].DatetimeReal[nn].getHours() + '-'; //Година
          _s += arrayDatetime[i].DatetimeReal[nn].getMinutes() + '-'; //Хвилина
          _s += arrayDatetime[i].DatetimeReal[nn].getDay() + '-'; //День тижня 0-6
        } else {
          _s += '4294967295-65535-99-99-99-99-99-'; //День тижня 0-6
        }
      }

      for (nn = 0; nn < 50; nn++) {
        // console.log( "HHHHHHHHH  " ); 

        console.log(arrayDatetime[i].timeReal[nn]);

        if (arrayDatetime[i].timeReal[nn] != undefined && arrayDatetime[i].timeReal[nn] != '') {
          _s += arrayDatetime[i].timeReal[nn].getHours() + "-" + arrayDatetime[i].timeReal[nn].getMinutes() + '-';
        } else _s += '99-99-';
      }

      // s += 'DAY---';
      dayElement.forEach(function (e) {
        if (e.checked) {
          _s += '1-';
        } else {
          _s += '0-';
        }
      });
      console.log(_s);

      sendMessage(setReleDATATIME, _s);

    }
  });
});

document.querySelectorAll('.time__btn-clear').forEach(function (e, i) {
  e.addEventListener('click', function () {
    messageDate(i);
    releItem[i].querySelectorAll('.datetime, .time').forEach(function (e) {
      e.value = '';
    });
  });
});

function messageDate(inter) {
  s = 'RELE' + inter + '-65535-\
4294967295-65535-99-99-99-99-99-\
4294967295-65535-99-99-99-99-99-\
4294967295-65535-99-99-99-99-99-\
4294967295-65535-99-99-99-99-99-\
4294967295-65535-99-99-99-99-99-\
4294967295-65535-99-99-99-99-99-\
4294967295-65535-99-99-99-99-99-\
4294967295-65535-99-99-99-99-99-\
4294967295-65535-99-99-99-99-99-\
4294967295-65535-99-99-99-99-99-\
99-99-99-99-99-99-99-99-99-99-\
99-99-99-99-99-99-99-99-99-99-\
99-99-99-99-99-99-99-99-99-99-\
99-99-99-99-99-99-99-99-99-99-\
99-99-99-99-99-99-99-99-99-99-\
99-99-99-99-99-99-99-99-99-99-\
99-99-99-99-99-99-99-99-99-99-\
99-99-99-99-99-99-99-99-99-99-\
99-99-99-99-99-99-99-99-99-99-\
99-99-99-99-99-99-99-99-99-99-\
1-1-1-1-1-1-1-\
1-1-1-1-1-1-1-\
1-1-1-1-1-1-1-\
1-1-1-1-1-1-1-\
1-1-1-1-1-1-1-';
  console.log(s);

  sendMessage(setReleDATATIME, s);

}

//*********************************************************************** */
//show menu local storage

// } // end fuction addEventListenerClick

const releItemTitlePin = document.querySelectorAll('.rele__item-title-pin');
releItemTitlePin[0].textContent = 'PIN 5'
releItemTitlePin[1].textContent = 'PIN 4'
releItemTitlePin[2].textContent = 'PIN 0'
releItemTitlePin[3].textContent = 'PIN 2'
releItemTitlePin[4].textContent = 'PIN 12'
releItemTitlePin[5].textContent = 'PIN 13'
releItemTitlePin[6].textContent = 'PIN 3'
releItemTitlePin[7].textContent = 'PIN 1'
// } catch (e) {
//   console.log('GLOBAL ERROR >>>  ' + e)
// }

// }