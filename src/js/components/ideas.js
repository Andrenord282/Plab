// IDEAS
// работа табов и слайдеров идей

const navBarIdeas = document.querySelector('.nav-bar-ideas');



const navItemIdeas = document.querySelectorAll('.nav-bar-ideas__item');
const caruselsSlider = document.querySelectorAll('.ideas-sliders__carusel');
const caruselsSliderInItem = document.querySelectorAll('.idea-item__carusel');   
const ideaItems = document.querySelectorAll('.idea-item');
const navItems = document.querySelectorAll('.idea-item__nav-slider');
const itemsSliders = document.querySelector('.ideas-sliders__items');
let currentIndexNavItem = 0;
let currentIndexArrowItems = 0;
let currentIndexcCaruselsSlider = 0;

let caruselsSlidercrollWidth;
let widthItemCarusel;
let translateX;


// Настрйоки высоты ideaItems

function setIdeaItemsHeight() { // Определяем какой блок с идеей самый высокий
    const ideaHeights =[]; // Создаем массив с высотами
    
    ideaItems.forEach((ideaItem, i) =>{
        ideaHeights.push(ideaItem.offsetHeight); // Записываем высоту каждой идеи в массив
    })

    const caruselHeight = maxNum(ideaHeights); // Выбираем самую большую высоту идеи
    itemsSliders.style.minHeight = `${caruselHeight}px`;
}





setIndexItem(navItemIdeas); // Навигационным кнопкам добавляем их индекс
pickIdea();


if (containerWidth >= 769){ // Условие при каком разрешении работает
    workCaruselsSlider(caruselsSlider, navItems);
}
if (containerWidth <= 768){ // Условие при каком разрешении работает
    setIdeaItemsHeight()
    workCaruselsSlider(caruselsSliderInItem, navItems);

}

function workCaruselsSlider(carusels, parentArrowNav) {
    caruselsSlidercrollWidth = carusels[currentIndexcCaruselsSlider].scrollWidth;
    widthItemCarusel = caruselsSlidercrollWidth / carusels[currentIndexcCaruselsSlider].children.length;
    translateX = 0;

    parentArrowNav.forEach((arrow, i)=> {

        arrow.addEventListener('click', (e) => {
            const self = e.target;
            const currentArrow = self.closest('.idea-item__btn-arrow ');

            if(currentArrow.matches('.idea-item__btn-arrow_next')){
                
                carusels.forEach((carusel, i) => {
                    if(i == currentIndexNavItem){
                            translateX += widthItemCarusel;
                            carusel.style =`transform:translateX(-${translateX}px)`;

                        if(translateX == caruselsSlidercrollWidth){
                            translateX = 0;
                            console.log(translateX)

                            carusel.style =`transform:translateX(${translateX}px)`;
                        }
                    }

                    if(i != currentIndexNavItem){
                        carusel.style =`transform:translateX(0px)`;
                    } 
                })
            }

            if(currentArrow.matches('.idea-item__btn-arrow_prew')){
                carusels.forEach((carusel, i) => {

                    if(i == currentIndexNavItem){

                        if(translateX == 0){
                            translateX = caruselsSlidercrollWidth;
                            carusel.style =`transform:translateX(${translateX}px)`;
                        }

                        translateX = translateX - widthItemCarusel;
                        carusel.style =`transform:translateX(-${translateX}px)`;
                    }

                    if(i != currentIndexNavItem){
                        carusel.style =`transform:translateX(0px)`;
                    } 
                })
            }
        })
    })
}



function setIndexItem(items) {

    items.forEach((item, i) => {
        item.setAttribute('data-index', i)
    });
}

function pickIdea() {

    caruselsSlider.forEach((carusel, i) => {
        carusel.style =`transform:translateX(0)`;
    })

    navBarIdeas.addEventListener('click', (e) => {
        const self = e.target;
        const currentNavItem = self.closest('.nav-bar-ideas__item');
        if(currentNavItem){
            currentIndexNavItem = currentNavItem.dataset.index;
            currentIndexArrowItems = currentIndexNavItem;
            translateX = 0;


            navItemIdeas.forEach((navItem, i) => {
    
                if(i == currentIndexNavItem){
                    navItem.classList.add('active');
                    ideaItems[currentIndexNavItem].classList.add('show');
                    caruselsSlider[currentIndexNavItem].classList.add('show');
                    caruselsSlider[currentIndexNavItem].setAttribute('data-visible', 'true');
    
                } else {
                    navItem.classList.remove('active')
                    ideaItems[i].classList.remove('show');
                    caruselsSlider[i].classList.remove('show');
                    caruselsSlider[i].setAttribute('data-visible', 'false');
                }
            })
        }
    })
}