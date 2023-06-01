// const { map } = require("jquery");



//=====================================

// parentListDevice.forEach(function (e) {
//   //добавляємо датчики яких немає в списку EEPROM
//   e.addEventListener('click', function () {
//     if (e.classList.contains('red') && e.classList.contains('click')) {
//       addElementChangeSensor.querySelector('.address-eeprom__address').innerText = e.querySelector('.address-device__address').textContent;
//       compareSensorAddressHtml();
//       // CheckClickDevices();
//     }
//   });
// });


// ------------------------------


function compareSensorAddress() {
    compareSensorAddressHtml();
}

function compareSensorAddressHtml() {//
    // console.log('=========================================================================')
    // console.log(objDevice)
    // console.log(tableDeviceAddress)
    // console.log('=========================================================================')

    // for (let i = 1; i < objDevice.obj.length + 1; i++) {
    //     tableDeviceAddress[i].closest('.address-device__data').classList.add('red');
    //     for (let n = 1; n < 9; n++) {
    //         if (tableDeviceAddress[i].textContent == tableEepromAddress[n].textContent) {
    //             tableDeviceAddress[i].closest('.address-device__data').classList.remove('red');
    //             tableDeviceAddress[i].closest('.address-device__data').classList.remove('click');
    //             break;
    //         }
    //     }
    // }
    const arr = Array.from(tableDeviceAddress);
    arr.forEach((e, i) => i > 0 && e.closest('.address-device__data').classList.add('red'));//добавляємо на всі елементи червоний колір
    arrKod = arr.map(e => e.textContent);

    tableEepromAddress.forEach((e, i) => {
        if (i > 0) {
            // console.log(arrKod.includes(e.textContent))
            // console.log(arr.includes(e.textContent))
            let fidnIndex = arrKod.indexOf(e.textContent);
            console.log(fidnIndex)
            if (fidnIndex !== -1) {
                tableDeviceAddress[fidnIndex].closest('.address-device__data').classList.remove('red');
                tableDeviceAddress[fidnIndex].closest('.address-device__data').classList.remove('click');
            }
        }
    })





    CheckClickDevices();
}


function CheckClickDevices() {
    let flag = false;
    parentListEeprom.forEach(function (e) {
        if (e.classList.contains('active')) {
            //Якщо  вже є клас Activ то ми датчики що  немає в списку  робимо клікабельним
            flag = true;
        }
    });
    // console.log("+-+-+-+-+-+-+-+-+-+-")
    // console.log(flag)

    if (flag) {
        //Якщо  вже є клас Activ то ми датчики що  немає в списку  робимо клікабельним
        Array.from(parentListDevice).forEach(function (e, i) {
            if (i > 0 && e.classList.contains('red')) {
                //якщо датчика немає в списку то ми його робимо клікабельним
                console.log('click')
                e.classList.add('click');
            }
        });
    } else {
        Array.from(parentListDevice).forEach(function (e, i) {
            if (i > 0) {
                //якщо датчика немає в списку то ми його робимо клікабельним
                e.classList.remove('click');
            }
        });
    }
}