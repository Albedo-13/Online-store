import { addSelectorClass, removeSelectorClass } from './generate-dom.js';
import updateCartSummary from './update-info.js';

function addCardActions(productList, db) {
  // Add to cart & details buttons
  productList.addEventListener('click', (e) => {
    const targetId = +e.target.id.split('-')[2];
    let cartArray = JSON.parse(localStorage.getItem('RS-online-cart'));
    if (e.target.classList.contains('item-buttons__details')) {
      window.location.href = generateDetailsQueryString(targetId);
    }

    if (e.target.classList.contains('button-add__active')) {
      cartArray = cartArray.filter((x) => x.id !== targetId);
      removeSelectorClass(e.target, 'button-add__active', 'Add to cart');
    } else if (e.target.classList.contains('item-buttons__add')) {
      const pickedProduct = db.find((x) => x.id === targetId);
      const objectToAdd = {
        id: pickedProduct.id,
        price: pickedProduct.price,
        count: 1,
      };
      cartArray.push(objectToAdd);
      addSelectorClass(e.target, 'button-add__active', 'Remove from cart');
    }

    localStorage.setItem('RS-online-cart', JSON.stringify(cartArray));
    updateCartSummary('.header__cart span', '', '.header__total', 'Cart total:＄');
  });

  function generateDetailsQueryString(productId) {
    const query = new URLSearchParams({
      id: productId,
    });
    const path = window.location.pathname.replace('main', 'about');
    const url = window.location.origin + path + '?' + query.toString();
    return url;
  }
}

export default addCardActions;
