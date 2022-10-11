// массив с данными времени
const time = [
    {fromAtoB: [
        ['18:00'],
        ['18:30'],
        ['18:45'],
        ['19:00'],
        ['19:15']
    ]},
    {fromBtoA: [
        ['18:30'],
        ['18:45'],
        ['19:15'],
        ['19:35'],
        ['21:50'],
        ['21:55']
    ]}
]
// создание элемента даты
const createDate = (item) => {
    return new Date(`2020-10-11 ${item}`)
}


// блок кода получения даты и добавления его в select
const optionListAB = document.querySelector('.timeAB');
const optionListBA = document.querySelector('.timeBA');
const optionListABA = document.querySelector('.timeABA');
const showTime = (arr, list) => {
    arr.map(item =>{
        let date = createDate(item);
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let listItem = document.createElement('option');
        listItem.classList.add('time__item')
        let result = `${hours < 10 ? '0'+ hours: hours}:${minutes < 10 ? '0'+ minutes: minutes}`
        listItem.append(result)
        list.append(listItem)
    })
}
// инициализация даты и добавления его в select
showTime(time[0].fromAtoB, optionListAB)
showTime(time[1].fromBtoA, optionListBA)
showTime(time[1].fromBtoA, optionListABA)


// объявление переменных
const rout = document.querySelector('#route');
const timeBlock = document.querySelector('.time');
const tiketBlock = document.querySelector('.tiket');
const resultBlock = document.querySelector('.result');
const responseRout = document.querySelector('.response__rout');
const responseShipment = document.querySelector('.response__shipment');
const responseTime = document.querySelector('.response__time');
const responseCount = document.querySelector('.response__prise');
const responseTiket = document.querySelector('.response__number');
const responseArrival = document.querySelector('.response__arrival');
const responseArrivalSecond = document.querySelector('.response__arrival-second');
const timeItem = document.querySelectorAll('.time__select');
const countTiket = document.querySelector('#num');

const selectBtn = document.querySelector('.select__btn');
const finalBtn = document.querySelector('.final__btn');


// функция добавления показа селектов со временем
showSelectTime = (item) => {

    switch(item.value) {
        case 'из A в B':
            optionListAB.disabled = false;
            optionListBA.disabled = true;
            optionListABA.disabled = true;
        break;
        case 'из B в A':
            optionListBA.disabled = false;
            optionListAB.disabled = true;
            optionListABA.disabled = true;
        break;
        case 'из A в B и обратно в А':
            optionListABA.disabled = false;
            optionListAB.disabled = false;
            optionListBA.disabled = true;
        break;
    }
}
// функция добавления маршрута в результирующий блок
const setResponseRout = (item) => {
    responseRout.innerHTML = item.value
}
// функция добавления времени в результирующий блок
const setResponseShipment = (item) => {
    item.forEach(item => {
        if (item.disabled == true) {
            return
        } else if (rout.value == 'из A в B и обратно в А')  {
            return responseShipment.innerHTML = `${optionListAB.value} и в ${optionListABA.value}`
        } else {
            return responseShipment.innerHTML = item.value 
        }
    })
}
// Валидация времени
const validateTime = (selectAB, selectABA) => {
    const setValidateDate = (item) => {
        let date = createDate(item.value);
        let validateHours = date.getHours() * 60
        let validateMinutes = date.getMinutes()
        let validateTime = validateHours + validateMinutes
        return validateTime
    }
    selectAB.addEventListener('change', () => {
        for(let i = 0; i < selectABA.length; i++) {
            if(setValidateDate(selectABA[i]) - setValidateDate(selectAB) < 50) {
                selectABA[i].disabled = true;
            }
        }
        for(let i = 0; i < selectABA.length; i++) {
            if(setValidateDate(selectABA[i]) - setValidateDate(selectAB) > 50) {
                selectABA[i].disabled == false
            }
        }
    })
}
validateTime(optionListAB, optionListABA)

// функция добавления времени в результирующий блок
const setResponseTime = (selectAB, selectBA, selectABA, firstTime, secondTime) => {
    let time = 50
    const setDateForArrival = (item) => {
        let date = createDate(item.value);
        let arrivalDate = new Date(date.setMinutes(date.getMinutes() + 50))
        let hours = arrivalDate.getHours();
        let minutes = arrivalDate.getMinutes()
        return result = `${hours < 10 ? '0'+ hours: hours}:${minutes < 10 ? '0'+ minutes: minutes}`
    }
    responseTime.innerHTML = time
    if(rout.value == 'из A в B') {
        firstTime.innerHTML = setDateForArrival(selectAB)
    } else if (rout.value == 'из B в A') {
        firstTime.innerHTML = setDateForArrival(selectBA)
    } else {
        firstTime.innerHTML = setDateForArrival(selectAB)
        secondTime.innerHTML = ` и в ${setDateForArrival(selectABA)}`
    }
}
const setResponseTiket = (item) => {
    responseTiket.innerHTML = item.value
}

// функция добавления цены в результирующий блок
const setResponseCount = (item) => {
    let firstPrise = 700,
        secondPrise = 1200
    if(rout.value == 'из A в B' || rout.value == 'из B в A') {
        responseCount.innerHTML = item.value * firstPrise
    } else {
        responseCount.innerHTML = item.value * secondPrise
    }
}
// событие показа доступного времени от маршрута
rout.addEventListener('change', () => {
    showSelectTime(rout)
    timeBlock.classList.remove('hide')
})
selectBtn.addEventListener('click', () => {
    tiketBlock.classList.remove('hide')
})
// событие подсчета в результирующий блок
finalBtn.addEventListener('click', () => {
    setResponseRout(rout)
    setResponseShipment(timeItem)
    setResponseTiket(countTiket)
    setResponseCount(countTiket)
    setResponseTime(optionListAB, optionListBA, optionListABA, responseArrival, responseArrivalSecond)
    if(countTiket.value == 0 || countTiket.value == '' || countTiket.value == null) {
        alert('Введите количество билетов, пожааалуйста=)') 
        console.log(countTiket.value)
    } else {
        resultBlock.classList.remove('hide')
        
    }
    
})










