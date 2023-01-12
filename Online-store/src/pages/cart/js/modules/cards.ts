import { updateCartSummary } from './update';
import { generateEmptyCartMsg } from './generate-dom';
import { DummyItem, LocalStorageItem } from './types';

function addCardActions(productList: HTMLElement, db: Array<DummyItem>) {
  // Changing & deleting added cart products
  productList.addEventListener('click', (e) => {
    const targetId = +(<HTMLElement>e.target).id.split('-')[2];
    let cartArray = JSON.parse(<string>localStorage.getItem('RS-online-cart'));

    if ((<HTMLElement>e.target).classList.contains('products-item__add')) {
      cartArray.forEach((product: LocalStorageItem) => {
        if (product.id === targetId && product.count < (db.find((x) => x.id === targetId) as DummyItem).stock) {
          ++product.count;
          (<HTMLDivElement>document.querySelector(`#product-counter-${targetId}`)).textContent = `${product.count}`;
        }
      });
    }
    if ((<HTMLElement>e.target).classList.contains('products-item__remove')) {
      cartArray.forEach((product: LocalStorageItem) => {
        if (product.id === targetId) {
          --product.count;
          if (product.count <= 0) {
            cartArray = cartArray.filter((x: LocalStorageItem) => x.id !== targetId);
            removeFromCartById(targetId);
          } else {
            (<HTMLDivElement>document.querySelector(`#product-counter-${targetId}`)).textContent = `${product.count}`;
          }
        }
      });
    }
    if ((<HTMLElement>e.target).classList.contains('products-item__delete')) {
      cartArray = cartArray.filter((x: LocalStorageItem) => x.id !== targetId);
      removeFromCartById(targetId);
    }

    if (!cartArray.length) {
      generateEmptyCartMsg();
    }
    localStorage.setItem('RS-online-cart', JSON.stringify(cartArray));
    updateCartSummary('.header__cart span', '', '.header__total', 'Cart total:＄');
    updateCartSummary('.summary__total-products', 'Total products: ', '.summary__total-price', 'Total price: ＄');
  });

  function removeFromCartById(id: number) {
    const domElementToRemove = document.querySelector(`#cart-item-${id}`);
    (<HTMLDivElement>domElementToRemove).remove();
  }
}

export default addCardActions;
