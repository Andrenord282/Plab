

if (containerWidth >= 769){

    navItem.forEach((item) => {

        item.addEventListener('mouseenter', (e) => {
            const self = e.currentTarget;
            navAdditionallist = self.querySelector('.header-navigation__child-list');
            if(navAdditionallist != null){
                navAdditionallist.classList.add('show');
            }
        })

        item.addEventListener('mouseleave', (e) => {
            const self = e.currentTarget;
            navAdditionallist = self.querySelector('.header-navigation__child-list');
            if(navAdditionallist != null){
                navAdditionallist.classList.remove('show');
            }
        })
    })
}

if (containerWidth <= 768){

    btnBurger.addEventListener('click', () => {
        btnLine = btnBurger.querySelectorAll('.burger-nav__line');
        btnLine.forEach((line) => {
            line.classList.toggle('active');
        })
    });
}