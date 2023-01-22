'use strict';

//создаем универсальную функцию для создания элементов
const factoryElements = (type, dir, className, text = '') =>{ 
    const elem = document.createElement(type);
    dir.append(elem);
    elem.classList.add(className)
    elem.innerHTML = text;
    
    return elem;
};

//получаем элементы
const btn = factoryElements('button', document.body,'btn', 'Create'); 
const container = factoryElements('div', document.body, 'container');
const summ = factoryElements('div', document.body, 'total');
const blockTime =  factoryElements('div', document.body, 'time', sec);

const sec = 10;

//создаем модальное окно
const modalVal = `
    <div class ="modal_window">
        <h2>Вы набрали: </h2>
        <div class ="modal_count_points"><h4 class ="point_sum">0 </h4><span>очков</span></div> 
    </div>
`
const modal = factoryElements('div', document.body, 'modal-background', modalVal);

const openModal = (elem, points) =>{
    elem.classList.add('opacity');
    elem.querySelector('.point_sum').innerHTML = points.innerHTML;
};

// создаем таймер
const timer = (block, time) =>{
    const interval = setInterval(() => {
        if(block.innerHTML > 0){
            block.innerHTML--;
        } else{
            clearInterval(interval);
            openModal(modal, summ);
        }
    }, 1000)
};

//создаем новые шарики
const createRound = () => {
    const block =  factoryElements('div', container, 'block');
    block.style.backgroundColor = '#' + Math.random().toString(16).substr(-6);
    const blockNum = Math.floor(Math.random()*1000);
    block.innerHTML =`<p class ='text'>${blockNum}</p>`; 

    block.addEventListener('click', () =>{
        block.classList.add('scale');
        summ.innerText = Number(blockNum) + Number(summ.innerText);
    })
};

//запускаем новый раунд
btn.addEventListener('click', () =>{
    for(let i = 0; i < 60; i++){
        createRound();
    }
    timer(blockTime, sec);
    btn.disabled = 'true';
});


