const btn = document.querySelectorAll('.time__item');
const btnShow = document.querySelector('.time__btn');

if(btn.length > 4) {
    for(let i = 3; i < btn.length; i++) {
        btn[i].classList.add('hide')
    }
} else {
    btnShow.classList.remove('time__btn')
    btnShow.classList.add('hide')
}
btnShow.addEventListener('click', () => {
    btn.forEach(item => {
        item.classList.remove('hide')
    })
    btnShow.classList.remove('time__btn')
    btnShow.classList.add('hide')
})