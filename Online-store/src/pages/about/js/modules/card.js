import { addSelectorClass, removeSelectorClass } from './generate-dom.js';
import updateCartSummary from './update.js';

function addCardActions(productWrapper, currentProduct) {
  productWrapper.addEventListener('click', (e) => {
    let cartArray = JSON.parse(localStorage.getItem('RS-online-cart'));
    if (e.target.classList.contains('button-add__active')) {
      cartArray = cartArray.filter((x) => x.id !== currentProduct.id);
      removeSelectorClass(e.target, 'button-add__active', 'Add to cart');
    } else if (e.target.classList.contains('product__add')) {
      const objectToAdd = {
        id: currentProduct.id,
        price: currentProduct.price,
        count: 1,
      };
      cartArray.push(objectToAdd);
      addSelectorClass(e.target, 'button-add__active', 'Remove from cart');
    }
    localStorage.setItem('RS-online-cart', JSON.stringify(cartArray));
    updateCartSummary('.header__cart span', '', '.header__total', 'Cart total:＄');
  });
}

export default addCardActions;
