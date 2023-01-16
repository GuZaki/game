'use strict';

// const block = document.createElement('div') // создает элемент div
// block.classList.add('block') // добавляет класс в список классов для элемента
// document.body.append(block) //добавляем элемент block в конец body(на страницу)
// console.dir(block) //выводит в консоль все атрибуты элемента
// block.innerText = 'Hello'// передает строку в элемент
// block.innerHTML = '<h1>Hello</h1>'// передает строку с тегами в элемент


//создали универсальную функцию для создания элементов
const factoryElements = (type, dir, className, text = '') =>{ 
    const elem = document.createElement(type);
    elem.classList.add(className)
    elem.innerHTML = text;
    dir.append(elem);
    return elem;
}

const btn = factoryElements('button', document.body,'btn', 'Create') 

const container = factoryElements('div', document.body, 'container')

const summ = factoryElements('div', document.body, 'total');
const sec = 10;
const blockTime =  factoryElements('div', document.body, 'time', sec);

//создали модальное окно
const modalVal = `
    <div class = "modal_window">
        <h2>Вы набрали: </h2>
        <div class = "modal_count_points"><h4 class = "point_sum">0</h4><span> очков</span></div> 
    </div>
`
const modal = factoryElements('div', document.body, 'modal-background', modalVal);

const openModal = (elem, points) =>{
    elem.classList.add('opacity');
    elem.querySelector('.point_sum').innerHTML = points.innerHTML;
}

const createRound = () => {
    const block =  factoryElements('div', container, 'block');
    block.style.backgroundColor = '#' + Math.random().toString(16).substr(-6);
    const blockNum = Math.floor(Math.random()*1000);
    block.innerHTML =`<p class ='text'>${blockNum }</p>`; 

    block.addEventListener('click', () =>{
        block.classList.add('scale');
        summ.innerText = Number(blockNum) + Number(summ.innerText);
    })
}

// создали таймер
const timer = (block, time) =>{
    const interval = setInterval(() => {
        if(block.innerHTML > 0){
            block.innerHTML--;
        } else{
            clearInterval(interval);
            openModal(modal, summ);
        }
    }, 1000)
}

btn.addEventListener('click', () =>{
    for(let i = 0; i < 60; i++){
        createRound();
    }
    timer(blockTime, sec);
    btn.disabled = 'true'
})


