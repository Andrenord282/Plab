
// Создаем кнопку информация и сервисом при разрешение ниже 657,
// при нажатии на кнопку будет появляться меню сервиса и информаии

if (containerWidth <= 657){

    btnInfoService = document.createElement('button'); // Созадем кнопку
    btnTextInfo = 'Информация'; // Текст внутри кнопку
    btnInfoService.classList.add('header-info-btns__info-srvice','btn','btn__info-srvice','btn-reset'); // Назначаем классы для кнопки
    btnInfoService.textContent = btnTextInfo; // Добавляем текст
    headerMenuBtnsInfo.insertBefore(btnInfoService, btnMeasurer); // Ставим кнопку в блок кнопок хеадера, первой по счету

}

// Работа кнопки, при нажатие либо появляется меню с инфомрацией
// и сервисом или меню скрывается

if (btnInfoService != undefined && btnInfoService.classList.contains('header-info-btns__info-srvice')){ // Проверяем есть ли кнопка синфомрацией и сервисами
    
    btnInfoService.addEventListener('click', ()=>{ // Отслеживает события клик на кнопку
        btnInfoService.classList.toggle('active'); // Добавляем или убираем класс active
        if(listInfoService.classList.contains('show')){ // Проверяем есть ли у списка информации и сервисом класс show
            listInfoService.classList.remove('show'); // Убираем класс show
            listInfoService.style.maxHeight = null; // Ставим в стиле макимальную высота списка 0
        } else {
            listInfoService.classList.add('show'); // Присваиваем списку класс show так как его нет
            listInfoService.style.maxHeight = listInfoService.scrollHeight + 'px'; // Вычисляем высоту блока через scroll что бы дать высоту блока и отобразить его
        }
    })
} 