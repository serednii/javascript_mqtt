function addDevicesensor(obj) {
    // console.log('*****************************************************');
    const addressDeviceList = document.querySelector('.address-device__list');
    let elements = addressDeviceList.querySelectorAll('.address-device__data');
    // console.log(elements.length);
    // console.log(addressDeviceList);
    // console.log(elements);
    // console.log(obj);
    // console.log('*****************************************************');
    if (elements.length - 1 !== obj.length) {//Якщо кількість підключених датчиків не дорівнює в списку на екрані то повністю обновляємо список

        for (let i = 1; i < elements.length; i++) {//Видаляємо старі елементи
            elements[i].remove();
        }

        // console.log(addressDeviceList);

        obj.forEach(el => {//Добавляємо нові елементи
            addressDeviceList.insertAdjacentHTML('beforeend',
                `<li class="address-device__data">
            <span class="address-device__number">${el.number}</span>
            <span class="address-device__address">${el.address.toLocaleUpperCase()}</span>
            <span class="address-device__temp">${el.temp.toFixed(1)} </span>
          </li>
      `);
        });
    } else {//якщо кількість однакова то просто переписуємо дані
        // console.log('0000000000000000000000')
        obj.forEach((el, i) => {//Добавляємо нові елементи
            elements[i + 1].querySelector('.address-device__number').innerText = el.number;
            elements[i + 1].querySelector('.address-device__address').innerText = el.address.toLocaleUpperCase();
            elements[i + 1].querySelector('.address-device__temp').innerText = el.temp.toFixed(1);
        });
    }

    // console.log(document.querySelectorAll('.address-device__data'))
}

