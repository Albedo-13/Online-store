import { addSelectorClass, removeSelectorClass } from './generate-dom';
import { DummyItem } from './types';
import updateCartSummary from './update';

function addCardActions(productList: HTMLElement, db: Array<DummyItem>) {
  // Add to cart & details buttons
  productList.addEventListener('click', (e) => {
    const targetId = +(<HTMLElement>e.target).id.split('-')[2];
    let cartArray = JSON.parse(<string>localStorage.getItem('RS-online-cart'));
    if ((<HTMLElement>e.target).classList.contains('item-buttons__details')) {
      window.location.href = generateDetailsQueryString(targetId);
    }

    if ((<HTMLElement>e.target).classList.contains('button-add__active')) {
      cartArray = cartArray.filter((x: DummyItem) => x.id !== targetId);
      removeSelectorClass(<HTMLElement>e.target, 'button-add__active', 'Add to cart');
    } else if ((<HTMLElement>e.target).classList.contains('item-buttons__add')) {
      const pickedProduct = db.find((x: DummyItem) => x.id === targetId) as DummyItem;
      const objectToAdd = {
        id: pickedProduct.id,
        price: pickedProduct.price,
        count: 1,
      };
      cartArray.push(objectToAdd);
      addSelectorClass(<HTMLElement>e.target, 'button-add__active', 'Remove from cart');
    }

    localStorage.setItem('RS-online-cart', JSON.stringify(cartArray));
    updateCartSummary('.header__cart span', '', '.header__total', 'Cart total:＄');
  });

  function generateDetailsQueryString(productId: number) {
    const query = new URLSearchParams({
      id: `${productId}`,
    });
    const path = window.location.pathname.replace('main', 'about');
    const url = window.location.origin + path + '?' + query.toString();
    return url;
  }
}

export default addCardActions;
