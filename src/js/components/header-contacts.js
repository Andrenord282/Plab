// Создаем кнопку меню звонка при разрешение ниже 500,
// при нажатии на кнопку будет появляться меню заказа звонка и набора телефона

if (containerWidth <= 500){

    btnMail = document.createElement('a'); // Созадем кнопку для вызова почтового адреса
    btnMail.setAttribute("href", "mailto:pro@peregorodkalab.ru");
    btnMail.classList.add('header-worktime-tel-feedback__mail-btn'); // Назначаем классы для кнопки
    headerMenuCall.appendChild(btnMail); // Ставим кнопку в блок кнопок хеадера, первой по счету
    
    btnCall = document.createElement('button'); // Созадем кнопку для вызова телефона и заказа звонка
    btnCall.innerHTML = `<svg>
                            <use xlink:href="img/sprite.svg#makeCall"></use>
                        </svg>` // Добавляем иконку в кнопку
    btnCall.classList.add('header-worktime-tel-feedback__tel-icon-btn','btn-reset'); // Назначаем классы для кнопки
    headerMenuCall.appendChild(btnCall); // Ставим кнопку в блок кнопок

    btnCloseMenuCall = document.createElement('button'); // Создаем кнопку закрытия контактов
    btnCloseMenuCall.innerHTML = `<svg>
                                    <use xlink:href="img/sprite.svg#cross"></use>
                                    </svg>` // Добавляем элименты для кнопки
    btnCloseMenuCall.classList.add('header-worktime-tel-feedback__close-btn','btn-reset'); // Добавляем класс для кнопки
    headerCallFeedback.appendChild(btnCloseMenuCall); // Ставим кнопку в блок кнопок

}

// Работа кнопки контактов, при нажатие либо появляется меню с
// с вызовом и обратным звоном или исчезает

if (btnCall != undefined && btnCall.classList.contains('header-worktime-tel-feedback__tel-icon-btn')){ // Проверяем есть ли кнопка контактов
    
    btnCall.addEventListener('click', ()=> { // Отслеживает события клик на кнопку
        btnCall.classList.toggle('active'); // Добавляем или убираем класс active
        if(headerCallFeedback.classList.contains('show')){ // Проверяем есть ли у списка информации и сервисом класс show
            headerCallFeedback.classList.remove('show'); // Убираем класс show
            // listInfoService.style.maxHeight = null; // Ставим в стиле макимальную высота списка 0
        } else {
            headerCallFeedback.classList.add('show'); // Присваиваем списку класс show так как его нет
        }
    })

    btnCloseMenuCall.addEventListener('click', () => { // При нажатии на крестик, меню контакты скрывается
        headerCallFeedback.classList.remove('show'); // Убираем класс show скрываем меню
    })
} 