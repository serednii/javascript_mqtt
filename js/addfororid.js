//Добавляємо для кожного input і label id


let arrayClass = [
  //   {
  //   labelData: '.rele__seting-switch__label',
  //   inputData: '.rele__seting-switch__input',
  //   nameData: 'seting-'
  // },
  {
    labelData: '.label-day',
    inputData: '.day',
    nameData: 'time-id-'
  },
  {
    labelData: '.input-control-error__label',
    inputData: '.input-control-error',
    nameData: 'err_on_'
  },
  {
    labelData: '.rele-temp-change__label',
    inputData: '.rele-temp-change-radio',
    nameData: 'on_'
  },
  {
    labelData: '.rele__seting-sensor__select-label',
    inputData: '.rele__seting-sensor__select',
    nameData: 'cars'
  },
  {
    labelData: '.rele-temp-vkl-start-label',
    inputData: '.rele-temp-vkl',
    nameData: 'temp_start_'
  },
  {
    labelData: '.rele-temp-vkl-end-label',
    inputData: '.rele-temp-otkl',
    nameData: 'temp_end_'
  },
  {
    labelData: '.rele-temp-change-single__label',
    inputData: '.rele-temp-change-single',
    nameData: 'one_range_'
  },
  {
    labelData: '.rele__timer-seting-show__label',
    inputData: '.rele__timer-seting-show__input',
    nameData: 'show-time_'
  }
  // {
  //   labelData: '.input-control-manually__label',
  //   inputData: '.input-control-manually__input',
  //   nameData: 'manual-'
  // }
];
//Призначаємо for and id for label and input
// setIdAndFor(releSetingSwitchLabel, releSetingSwitcIhnput,'seting-switch-');
// setIdAndFor(labelDey, inputDey,'time-id-' );
// setIdAndFor(inputControlErrorLabel, inputControlError,'err_on_' );
// setIdAndFor(releTempChangeLabel, releTempChangeRadio,'on_' );
// setIdAndFor(releSetingSensorSelectLabel, releSetingSensorSelect,'cars' );


const addIdAndFor = () => arrayClass.forEach(e => {
  return new Promise(resolve => {
    let L = document.querySelectorAll(e.labelData);
    let I = document.querySelectorAll(e.inputData);
    if (L && I) setIdAndFor(L, I, e.nameData);
    resolve();
  });

});


function setIdAndFor(classLabel, clasInput, nameId) {
  clasInput.forEach((e, i) => {
    if (classLabel[i] && e) {
      e.setAttribute('id', (nameId + i));
      classLabel[i].setAttribute('for', ((nameId + i)));
    }
    // console.log(classLabel[i])
  });
}

