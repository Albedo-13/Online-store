import { addSelectorClass, removeSelectorClass } from './generate-dom';
import { DummyItem, LocalStorageItem } from './types';
import updateCartSummary from './update';

function addCardActions(productWrapper: HTMLElement, currentProduct: DummyItem): void {
  productWrapper.addEventListener('click', (e) => {
    let cartArray = JSON.parse(<string>localStorage.getItem('RS-online-cart'));
    if ((<HTMLElement>e.target).classList.contains('button-add__active')) {
      cartArray = cartArray.filter((x: LocalStorageItem) => x.id !== currentProduct.id);
      removeSelectorClass(<HTMLElement>e.target, 'button-add__active', 'Add to cart');
    } else if ((<HTMLElement>e.target).classList.contains('product__add')) {
      const objectToAdd = {
        id: currentProduct.id,
        price: currentProduct.price,
        count: 1,
      };
      cartArray.push(objectToAdd);
      addSelectorClass(<HTMLElement>e.target, 'button-add__active', 'Remove from cart');
    }
    localStorage.setItem('RS-online-cart', JSON.stringify(cartArray));
    updateCartSummary('.header__cart span', '', '.header__total', 'Cart total:＄');
  });
}

export default addCardActions;
