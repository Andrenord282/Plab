


navigationCatalogPrew();
setCaruselHeight();

if(containerWidth <= 500){
  
    createNavCarusel();
    paginationCarusel();
    addBtnPagCarusel();
    carusel();

}

// Настрйоки высоты карусели

function setCaruselHeight() { // Определяем какой блок с продуктами самый высокий
    const productsHeights =[]; // Создаем массив с высотами
    
    productsCaruselItems.forEach((productCarusel, i) =>{
        productsHeights.push(productCarusel.scrollHeight); // Записываем высоту каждого списка с продуктами в массив
    })

    const caruselHeight = maxNum(productsHeights); // Выбираем самую большую высоту списка продуктов
    productsCarusel.style.minHeight = `${caruselHeight}px`;
}

// Наибольшее число в массиве

function maxNum(list) {
    let maxHeight = list[0];
    list.forEach(function(e) {
      if (e > maxHeight) maxHeight = e;
    });
    return maxHeight;
}

// Работа навигации категория продуктов

function navigationCatalogPrew() {
    
    navBtnsMenu.addEventListener('click', (e) =>{ // Отслеживаем клилк событие по навигации
        const self = e.target; // Переменная с целью собития
        const perentSelf = self.closest('.catalog-preview-nav__item') // Есть ли у цели родитель с нужным классом
    
        resetClass(navBtnMenu, 'active') // Сбросить класс active на всех кнопках
        perentSelf.classList.add('active') // Добавить кнопке которая является родителем цели класс active
    
        navBtnMenu.forEach((navBtn, i) =>{
            if(navBtn.classList.contains('active')){
                resetClass(productsCaruselItems, 'active')
                productsCaruselItems[i].classList.add('active');
                if(productsCaruselItems[i].classList.contains('active') != true){
                    productsCaruselItems[i].style.transform = 'null';
                }
            }
        })
        carusel()
    })
    
}

// Создаем кнопки навигации для разрешения 500 пикселей и меньше

function createNavCarusel() {
    productNavBtn = document.createElement('div');
    productNavBtn.classList.add('catalog-preview__nav-btn')
    productBtnPrev = document.createElement('button');
    productBtnPrev.classList.add('catalog-preview__btn','catalog-preview__btn_prev','btn-reset');
    productNavBtn.append(productBtnPrev);
    productsBtnNext = document.createElement('button');
    productsBtnNext.classList.add('catalog-preview__btn','catalog-preview__btn_next','btn-reset');
    productNavBtn.append(productsBtnNext);
}

// Создаем меню пагинации для разрешение 500 пикселей и меньше

function paginationCarusel () {
    for (let index = 0; index < productsCaruselItems.length; index++) {
        paginationNav = document.createElement('div');
        paginationNav.classList.add('catalog-preview__pagination-nav')
        let listChildren = productsCaruselItems[index].children;
        let quantity = listChildren.length;
        console.log(productsCaruselItems.length)
        console.log(index)
        productBtnPrev.after(paginationNav);

            for (let index = 0; index < quantity; index++) {

                paginationItem = document.createElement('span');
                paginationItem.classList.add('catalog-preview__pagination-item')
                paginationNav.append(paginationItem);
            }
    }
}

// Добавляем пагинацию и кнопки прокрутки карусели для разрешения 500 пикселей и меньше

function addBtnPagCarusel() {
    // productNavBtn.append(productBtnPrev);
    // productNavBtn.append(paginationNav);
    // productNavBtn.append(productsBtnNext);
    productsContent.append(productNavBtn);
}


// Работа карусели для разрешения 500 пикселей и меньше
function carusel() {
    productsCaruselItemsActive = document.querySelector('.catalog-preview__products.active');
    countItemsCarusel = productsCaruselItemsActive.children.length;
    productsCaruselItemsActiveWidth = productsCaruselItemsActive.scrollWidth;
    itemCaruselWidth = productsCaruselItemsActive.scrollWidth / countItemsCarusel;
    itemCaruselCurrentWidth = itemCaruselWidth;
    console.log(productsCaruselItemsActive);
    console.log(productsCaruselItemsActiveWidth);
    console.log(itemCaruselWidth);
    console.log(itemCaruselWidth);



    productNavBtn.addEventListener('click', (e) => {
        const self = e.target;
        let btnNext;
        productsCaruselItemsActive = document.querySelector('.catalog-preview__products.active');
        if(self.closest('.catalog-preview__btn_next')){
    
            productsCaruselItemsActive.style.transform = `translate(-${itemCaruselCurrentWidth}px, 0px)`;
            itemCaruselCurrentWidth += itemCaruselWidth;
            if(itemCaruselCurrentWidth == productsCaruselItemsActiveWidth) {
                itemCaruselCurrentWidth = productsCaruselItemsActive.scrollWidth / countItemsCarusel;
            }
        }
    
        if(self.closest('.catalog-preview__btn_prev')){
            if(itemCaruselCurrentWidth <= itemCaruselWidth) {
                productsCaruselItemsActive.style.transform = `translate(-${productsCaruselItemsActiveWidth - itemCaruselWidth}px, 0px)`;
                itemCaruselCurrentWidth = productsCaruselItemsActiveWidth - itemCaruselWidth;
            } else {
                itemCaruselCurrentWidth -= itemCaruselWidth;
                productsCaruselItemsActive.style.transform = `translate(-${itemCaruselCurrentWidth}px, 0px)`;
            }
    
        }
    })
    
}



