const btnPopapAddNewDeviceOpen = document.querySelector('.popap-menu__btn-local-storage');
btnPopapAddNewDeviceClose.addEventListener('click', () => {
  document.querySelector('.popap-local-storage').classList.remove('popap-local-storage__show');
});

document.querySelector('.popap-local-storage__top-list').addEventListener('click', selectItem)

document.querySelector('.popap-local-storage__btn-add').addEventListener('click', checkForm)
document.querySelector('.popap-local-storage__btn-remove').addEventListener('click', removeItemList)
document.querySelector('.popap-local-storage__btn-close').addEventListener('click', closeForm)


const startLocalStoreg = () => {
  return new Promise(resolve => {
    const language = localStorage.getItem('Language');
    if (language) {
      if (language == 'ua' || language == 'en' || language == 'cz') {
        languageChange(language); //langugage  write in localStrarage 
      }
    } else {
      languageChange('ua'); //default language
    }
    console.log('startLocalStoreg()')
    resolve();
  })

}

function selectItem(event) {
  event.preventDefault();
  const dev = event.target.closest('.popap-local-storage__top-item').querySelector('.popap-local-storage__top-device').innerText;
  const nam = event.target.closest('.popap-local-storage__top-item').querySelector('.popap-local-storage__top-name').innerText;
  if (dev != 'Name Device' || nam != 'Name') {
    console.log(dev);
    console.log(nam);
    event.target.closest('.popap-local-storage__top-item').classList.toggle('click');
  }

}




{
  let arr = [];
  if (localStorage.getItem('DeviceArr') != null) {
    arr = JSON.parse(localStorage.getItem('DeviceArr'));
  }
  removeList();
  printListDevuci(arr);
}



////////////////////////////////////////////////////
function removeItemList(event) { //удаляємо видалені пристрої
  event.preventDefault();
  let arr = [];
  const itemDevice = document.querySelectorAll('.popap-local-storage__top-item');
  if (localStorage.getItem('DeviceArr') != null || itemDevice.length > 0) { //якщо в LOCALSTORAGE  є щось записано і є списки на екрані 
    arr = JSON.parse(localStorage.getItem('DeviceArr'));

    let newArr = [];
    let flafClick = false;
    itemDevice.forEach((e, i) => {
      if (i > 0) {
        console.log(arr);
        if (e.classList.contains('click')) {
          flafClick = true
          const deleteDevice = e.querySelector('.popap-local-storage__top-device').innerText;
          arr.forEach((ee) => {
            if (ee != null && ee.NameDevice != deleteDevice) {
              newArr.push(ee);
            }
          });
        }
      }
    });

    // console.log(newArr);
    if (flafClick == true) {
      localStorage.setItem('DeviceArr', JSON.stringify(newArr));
      removeList();
      printListDevuci(newArr);
    }

  } else return false;
}

//////////////////////////////////////////////////////////

function closeForm(event) {
  event.preventDefault();
}

function checkForm(event) {
  event.preventDefault();
  let arr = [];
  let obj = {
    // NameDevice: "",
    // Name: "",
  }

  const form = document.querySelector('.popap-local-storage__form');
  let nameDevice = form.device.value;
  let name = form.name.value;
  let fail
  if (localStorage.getItem('DeviceArr') != null) {
    arr = JSON.parse(localStorage.getItem('DeviceArr'));
  }


  if ((nameDevice == '' || name == '') && (nameDevice != 'Name Device' || name == 'Name'))
    fail = 'Заповніть всі поля';
  else if (arr != '') {
    arr.forEach(e => {
      if (e.NameDevice === nameDevice) {
        fail = 'Такий пристрій вже є';
      }
    })
  }

  if (fail != undefined) {
    alert(fail);
    return;
  }



  obj.NameDevice = nameDevice;
  obj.Name = name;
  arr.push(obj);
  localStorage.setItem('DeviceArr', JSON.stringify(arr));
  removeList();
  printListDevuci(arr);
}

function removeList() {
  const item = document.querySelectorAll('.popap-local-storage__top-item, .popap-local-storage-menu__item')
  item.forEach((e, i) => {
    if (i > 0) e.remove();
  })
}

function printListDevuci(arr) {
  //******************************************** */  
  arr.forEach((e) => {
    if (e != null) {
      const ul = document.querySelector('.popap-local-storage__top-list');
      const ulMenu = document.querySelector('.popap-local-storage-menu__list');
      let li = document.createElement('li');
      // let a = document.createElement('a');
      let p = document.createElement('p');
      let p1 = document.createElement('p');


      li.className = 'popap-local-storage__top-item';
      // a.href = "#";
      p.className = 'popap-local-storage__top-device';
      p.innerText = e.NameDevice;
      //  a.append(p);
      p1.className = 'popap-local-storage__top-name';
      p1.innerText = e.Name;
      // a.append(p1);
      li.append(p);
      li.append(p1);

      ul.append(li);

      let limenu = document.createElement('li');
      // let amenu = document.createElement('a');
      let pmenu = document.createElement('p');
      let p1menu = document.createElement('p');

      limenu.className = 'popap-local-storage-menu__item';
      // amenu.href = "#";
      pmenu.className = 'popap-local-storage-menu__device';
      pmenu.innerText = e.NameDevice;
      // amenu.append(pmenu);
      p1menu.className = 'popap-local-storage-menu__name';
      p1menu.innerText = e.Name;
      // amenu.append(p1menu);
      limenu.append(pmenu);

      limenu.append(p1menu);
      ulMenu.append(limenu);
    }
  });

  //******************************************** */
}