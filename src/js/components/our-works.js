const ourWorksItems = document.querySelectorAll('.our-works-list-item');
const ourWorksRights = document.querySelector('.our-works-list__right');
const ourWorksLeft= document.querySelector('.our-works-list__left');



 setSrcImgItem(ourWorksItems, 'src');


function setSrcImgItem(items, value) {
    items.forEach((item, i) => {
        item.setAttribute(`data-${value}`, `../img/ourWorks0${i + 1}.jpg`)
        item.style.backgroundImage = `url('${item.dataset.src}')`;
    });
}



console.dir(ourWorksItems[0])