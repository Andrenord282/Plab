
let index = 0;

// Цикл прокрутки табов и слайдов через каждые 5 секунд



startTabsSlades(tabNavItem,tabContentItem)

// Основная работа табов вместе с слайдами

function startTabsSlades(tabs, slades) {

    tabs[index].classList.add('active');
    slades[index].classList.add('show');
    index++;
    cycleChangeTabsSlades;
    clickTabNav(tabNavItem, tabContentItem);    
}



// При клике на элимент, он становиться активный
// и показывается слайд соответсвующий индексу

function clickTabNav(tabs, slades) { // Кидаем название элимента
    tabs.forEach((item, i) => { // Перебираем коллекцию элиментов
        item.addEventListener('click', (e) => { // Событие клик мышки
            let index = i;
            resetClass(tabs, 'active'); // Сбрасываем класс active у всех элиментов
            resetClass(slades, 'show'); // Сбрасываем класс active у всех элиментов
            item.classList.add('active'); // Добавляем класс active конкретному элименту с кликом мышки
            slades[index].classList.add('show'); // Добавляем класс show слайду, согласно индексу элимента
            clearInterval(cycleChangeTabsSlades);
            console.log(index);
            cycleChangeTabsSlades;
        })
    })
    cycleChangeTabsSlades;
}

// Сбросить класс у элиментов

function resetClass(element, className) {
    element.forEach((el) => {
        el.classList.remove(className)
    })    
}


const cycleChangeTabsSlades = setInterval(() => {
    resetClass(tabNavItem, 'active'); // Сбрасываем класс active у всех элиментов
    resetClass(tabContentItem, 'show'); // Сбрасываем класс active у всех элиментов
    tabNavItem[index].classList.add('active')
    tabContentItem[index].classList.add('show')
    index++;
    if(index == tabNavItem.length){
        index = 0;
    }
}, 5000);
