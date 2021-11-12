
function setIndexItem(items, index) {
    items.forEach((item, i) => {
        item.setAttribute(`data-${index}`, i)
    });
}