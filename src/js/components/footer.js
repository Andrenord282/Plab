const footerNavigationList = document.querySelector('.footer-navigation__list');


if (containerWidth <= 768){






    footerNavigationList.addEventListener('click', (e) =>{
        e.preventDefault();
        const self = e.target;

        if(self.closest('.footer-navigation__link')){
            self.classList.toggle('active');
            self.nextElementSibling.classList.toggle('show');
        }
        console.log(self)
    })




}
