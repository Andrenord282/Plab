
// Работа навигациипри разрешение ширины 769 пикселей  и больше
// при навидении на элимент навигации, если он имеет подменю, то опоказываем его,
// при уходе с элимента, подменю исчезает

if (containerWidth >= 769){ // Условие при каком разрешении работает

    navItem.forEach((item) => { // Перебор элементов с навигационными ссылками

        item.addEventListener('mouseenter', (e) => { // Отслеживание события наведение мышки
            const self = e.currentTarget; // Отслеживание цель события
            navAdditionallist = self.querySelector('.header-navigation__child-list'); // Находим подменю у элимента навигации, если оно есть
            if(navAdditionallist != null){ // Если подменю не равно null (то есть имеет значение определенное с классом)
                navAdditionallist.classList.add('show'); // Даем подменю класс show
            }
        })

        item.addEventListener('mouseleave', (e) => { // Отслеживание события покидание мышки с элиммента
            const self = e.currentTarget; // Отслеживание цель события
            navAdditionallist = self.querySelector('.header-navigation__child-list'); // Находим подменю у элимента навигации, если оно есть
            if(navAdditionallist != null){ // Если подменю не равно null (то есть имеет значение определенное с классом)
                navAdditionallist.classList.remove('show'); // Убираем у подменю класс show
            }
        })
    })
}

// Работа навигации при разрешении ширины 768 пикселей и меньше
// при таких разрешениях появляется кнопка бургер, нажимая на нее
// появляется меню навигации, если у элимента есть подменю, то при нажатии
// на элимент, его подменю появляется в виде аккордеона

if (containerWidth <= 768){ // Условие при каком разрешении работает

    btnBurger.addEventListener('click', () => {
        btnLine = btnBurger.querySelectorAll('.burger-nav__line');
        btnLine.forEach((line) => {
            line.classList.toggle('active');
        })
        navList.classList.toggle('show');
    });

    // Работа аккордиона

    navItemPerent.forEach(navItemPerent => {
        navItemPerent.addEventListener('click', (e) => {
            const self = e.currentTarget;
            self.classList.toggle('active');
            navAdditionallist = self.querySelector('.header-navigation__child-list'); // Находим подменю у элимента навигации, если оно есть

            if(navAdditionallist.classList.contains('show') == false){ // Если подменю не равно null (то есть имеет значение определенное с классом)
                navAdditionallist.classList.add('show'); // Даем подменю класс active
                navAdditionallist.style.maxHeight = navAdditionallist.scrollHeight + 'px';
            } else if (navAdditionallist != null && navAdditionallist.classList.contains('show')){
                navAdditionallist.classList.remove('show'); // Даем подменю класс active
                navAdditionallist.style.maxHeight = '0';
            }
        })
        }
    )
}


