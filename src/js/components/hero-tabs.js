
    let num = 0;


// Цикл прокрутки табов и слайдов через каждые 5 секунд

startTabsSlades(tabNavItem,tabContentItem)

// Основная работа табов вместе с слайдами

function startTabsSlades(tabs, slades) {
    console.log(num);
    tabs[num].classList.add('active');
    slades[num].classList.add('show');
    num++;
    // cycleChangeAfterClick;
    clickTabNav(tabNavItem, tabContentItem);    
}



// При клике на элимент, он становиться активный
// и показывается слайд соответсвующий индексу

function clickTabNav(tabs, slades) { // Кидаем название элимента
    tabs.forEach((item, i) => { // Перебираем коллекцию элиментов
        item.addEventListener('click', (e) => { // Событие клик мышки
            num = i;
            console.log(num);
            resetClass(tabs, 'active'); // Сбрасываем класс active у всех элиментов
            resetClass(slades, 'show'); // Сбрасываем класс active у всех элиментов
            item.classList.add('active'); // Добавляем класс active конкретному элименту с кликом мышки
            slades[num].classList.add('show'); // Добавляем класс show слайду, согласно индексу элимента
            if(num < tabs.length){
                num ++;
            }
            console.log(num);
        })
    })
}



// Сбросить класс у элиментов

function resetClass(element, className) {
    element.forEach((el) => {
        el.classList.remove(className)
    })    
}

// const cycleChangeAfterClick = setInterval(() => {
//     if(num == tabNavItem.length){
//         num = 0;
//     }
//     resetClass(tabNavItem, 'active'); // Сбрасываем класс active у всех элиментов
//     resetClass(tabContentItem, 'show'); // Сбрасываем класс active у всех элиментов
//     tabNavItem[num].classList.add('active')
//     tabContentItem[num].classList.add('show')
//     num++;
//     console.log(num);
//     if(num == tabNavItem.length){
//         num = 0;
//     }
// }, 5000, num);

