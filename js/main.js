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
  document.querySelector('.widthtablet').innerText = 'Ширина екрана' + document.documentElement.clientWidth;
}
showWidth();

async function go() {
  console.log('SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS');

  await innerHtmlText();
  await innerHtmlTextEEPROM();
  await initVariable();
  await initMQTT();
  await addIdAndFor();//Добавл
  await innerHtmlTextEEPROM();
  await startLocalStoreg();
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

$("#menu").on("click", "a", function (event) {
  event.preventDefault();//при нажатии на ссылку, мы переходим по адресу этой ссылки. Вызов preventDefault() отменит это поведение
  var id = $(this).attr('href'),
    top = $(id).offset().top - popapInfoWrapper.clientHeight - 20;
  // top = $(id).offset().top;
  $('body,html').animate({
    scrollTop: top
  }, 1000);
});



//}//window.onload = function  end

let objSensorReleUpr = [];
let objSensorReleFlags = [];

let objDevice = {};
let objEeprom = {};
let objSensorVklOtklTemp = {};
let objNameSensor = {};
let objNameRele = {};
let objManualRele = {};
let arrayDatetime = [];

let downloadedDataEEprom = false;
let downloadedDataDevice = false;
let showEepromFlag = true;
let timeMesage = 0;
let addElementChangeSensor = 0;

for (let i = 0; i < 8; i++) {
  arrayDatetime.push({
    Datetime: [],
    DatetimeReal: [],
    time: [],
    timeReal: []
  });
}



//==================================


/************************************************************************************************************** */
setInterval(function () {
  // Провірка на дані прийшли чи ні якщо обєти пусті то відправляємо запрос на повторну загрузку
  if (isEmpty(objEeprom) || isEmpty(objDevice) || isEmpty(objSensorReleUpr) || isEmpty(objSensorVklOtklTemp)) {
    // console.log('Є пусті обкти   ');
    sendMessage(OUT_START_SENSOR_DATA, 'ALL');
  } else {
    // console.log('Немає пустих обктів   ');
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

// setInterval(function () {// вдправляємо запрос щоб відослали температури
//   showEepromFlag = false;
//   // console.log(client);
//   sendMessage(OUT_START_SENSOR_DATA, 'readAddressSensor');
// }, 10000);

//************************************************************************************************************** */





//************************************************************************************************************** */
function fun1() {

  if (objSensorReleUpr != undefined) {
    //Якщо не пустий обєкт

    releItem.forEach(function (e, numberRele) {

      const select = e.querySelector('select');
      const radiochangeRadio = e.querySelectorAll('.rele-temp-change-radio');
      const radioSingle = e.querySelectorAll('.rele-temp-change-single');
      const releError = e.querySelectorAll('.input-control-error');
      const numSensor = objSensorReleUpr[numberRele];
      const flags = objSensorReleFlags[numberRele];

      //******************************************************* */
      if (radioSingle !== null) //якщо не пустий масив
      {
        if (flags & 1 << 4) {
          ////1-два діапазона температур включення і відключеня 0-один діапазон температур  включення або відключення
          radioSingle[1].checked = true;
          e.closest('.rele__item').querySelector('.rele-temp-otkl').disabled = false;
        } else {
          e.closest('.rele__item').querySelector('.rele-temp-otkl').disabled = true;
          radioSingle[0].checked = true;
        }
      }
      //******************************************************* */

      //******************************************************* */
      if (radiochangeRadio !== null) //якщо не пустий масив
      {
        if (flags & 1 << 5) {
          //Провірка біт 4 rele_0_eprom_sensor вкл або викл реле при переключені
          radiochangeRadio[0].checked = true;;
          // radiochangeRadio[1].checked = false;
        } else {
          // radiochangeRadio[0].checked = false;
          radiochangeRadio[1].checked = true;
        }
      }
      //******************************************************* */

      //******************************************************* */
      if (!(releError == null)) //якщо не пустий масив
      {
        if (flags & 1 << 6) {
          //біт 6 при несправності термодатчика або неможливість управляти таймером реле залишаємо вкл 1 або відключеним -0
          releError[0].checked = true;
          // releError[1].checked = false;
        } else {
          // releError[0].checked = false;
          releError[1].checked = true;
        }
      }
      //******************************************************* */





      //------------------------------------

      const option = select.querySelectorAll('option');

      // option.forEach(function (e, i) {
      //   if (i > 0) e.remove();
      // }); 
      option.forEach((e, i) => (i > 0) && e.remove());//видаляємо всі option elements для даного реле крім першого


      for (let numEepromSensor = 0; numEepromSensor < 12; numEepromSensor++) {  //перебираємо всі термодатчики 



        let numRele = 255; //номер реле в якому записаний термодатчик 
        // for (let d = 0; d < 8; d++) {//перебираємо всі реле і якщо номер сенсора є записаний як управляючий якимось реле 
        //   // z = objSensorReleUpr[d];
        //   // z &= ~240; //обнуляємо старші чотири біта для байта
        //   if (objSensorReleUpr[d] == numEepromSensor) { //Нaходимо в масиві для реле номер термодатчика
        //     numRele = d;//в numRele буде записане реле яке управляється даним сенсором
        //     break;
        //   }
        // }

        const numberTemp = objSensorReleUpr.indexOf(numEepromSensor);//находимо в масиві реле номер сенсоруі якщо номер сенсора є записаний як управляючий якимось реле 
        if (numberTemp !== -1) numRele = numberTemp;



        //якщо адрес не нуль добавляємо  і термодатчика немає в списку реле або він є але записаний в тому реле з яким ми працюємо option з адресом
        // if (!objEeprom.obj) {
        if (objEeprom.obj != undefined) {

          if (!(objEeprom.obj[numEepromSensor].address == '0000000000000000' || objEeprom.obj[numEepromSensor].address == 'ffffffffffffffff') && (numRele == numberRele || numRele == 255)) {//якщо сенсор має адрес і він  керує  даним реле то добавляємо його в випадаючий список

            // const releSetingSwitchSensor = e.querySelector('.rele__seting-switch__sensor');

            const createOption = document.createElement('option');
            createOption.value = objEeprom.obj[numEepromSensor].number;//Добавляємо номер сенсора
            createOption.className = "rele-control-option";
            if (objEeprom.obj != undefined && objEeprom.obj[numEepromSensor].nameSensor != '') {//Якщо  реле має імя то добавляємо імя якщо ні то код сенсора
              createOption.innerText = objEeprom.obj[numEepromSensor].number + '--' + objEeprom.obj[numEepromSensor].nameSensor + ' -- ' + objEeprom.obj[numEepromSensor].temp;
            } else {
              createOption.innerText = objEeprom.obj[numEepromSensor].number + '--' + objEeprom.obj[numEepromSensor].address.toLocaleUpperCase() + ' -- ' + objEeprom.obj[numEepromSensor].temp;
            }

            if (numRele == numberRele) {
              createOption.selected = true; //Добавляємо вибраним реле яке є в списку керованих
            }
            select.appendChild(createOption);
          }

          try {
            if (numSensor != 255) {
              if (objEeprom.obj != undefined && objEeprom.obj[numSensor].nameSensor != '') {
                if (numSensor < 8) e.querySelector('.rele__seting-switch__sensor').innerText = objEeprom.obj[numSensor].nameSensor + '  ' + objEeprom.obj[numSensor].temp;
                else e.querySelector('.rele__seting-switch__sensor').innerText = 'NONE';
              } else {
                if (numSensor < 8) e.querySelector('.rele__seting-switch__sensor').innerText = objEeprom.obj[numSensor].address.toLocaleUpperCase() + '  ' + objEeprom.obj[numSensor].temp;
                else e.querySelector('.rele__seting-switch__sensor').innerText = 'NONE';
              }
            } else {
              e.querySelector('.rele__seting-switch__sensor').innerText = 'NONE';
            }
          } catch (e) {
            // console.log('ERROR numSensor  -- ' + numSensor)
          }

        }

      }




    });
  }
}
//************************************************************************************************************** */

//************************************************************************************************************** */
function fun2() {
  const inputTempVkl = document.querySelectorAll('.rele-temp-vkl');
  const inputTempOtkl = document.querySelectorAll('.rele-temp-otkl');
  const releSetingSwitchTempOn = document.querySelectorAll('.rele__seting-switch__temp-on');
  const releSetingSwitchTempOff = document.querySelectorAll('.rele__seting-switch__temp-off');
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
//************************************************************************************************************** */

//************************************************************************************************************** */
function changeBits(e, numRele, numberBit) {
  if (objSensorReleFlags.length > 0) {
    if (e.value == '0') {
      objSensorReleFlags[numRele] &= ~(1 << numberBit);
    } else if (e.value == '1') {
      objSensorReleFlags[numRele] |= 1 << numberBit;
    }
    // let objTemp = {
    //   "number": ii,
    //   "data": objSensorReleUpr.obj[numRele]
    // };
    return JSON.stringify({ "number": numRele, "data": objSensorReleFlags[numRele] });
  }
}
//************************************************************************************************************** */






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







// } catch (e) {
//   console.log('GLOBAL ERROR >>>  ' + e)
// }

// }


function pr(obj) {
  console.log(obj);
}
