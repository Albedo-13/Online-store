import { updateCartSummary } from './update.js';
import { generateEmptyCartMsg } from './generate-dom.js';

function addCardActions(productList, db) {
  // Changing & deleting added cart products
  productList.addEventListener('click', (e) => {
    const targetId = +e.target.id.split('-')[2];
    let cartArray = JSON.parse(localStorage.getItem('RS-online-cart'));

    if (e.target.classList.contains('products-item__add')) {
      cartArray.forEach((product) => {
        if (product.id === targetId && product.count < db.find((x) => x.id === targetId).stock) {
          ++product.count;
          document.querySelector(`#product-counter-${targetId}`).textContent = product.count;
        }
      });
    }
    if (e.target.classList.contains('products-item__remove')) {
      cartArray.forEach((product) => {
        if (product.id === targetId) {
          --product.count;
          if (product.count <= 0) {
            cartArray = cartArray.filter((x) => x.id !== targetId);
            removeFromCartById(targetId);
          } else {
            document.querySelector(`#product-counter-${targetId}`).textContent = product.count;
          }
        }
      });
    }
    if (e.target.classList.contains('products-item__delete')) {
      cartArray = cartArray.filter((x) => x.id !== targetId);
      removeFromCartById(targetId);
    }

    if (!cartArray.length) {
      generateEmptyCartMsg();
    }
    localStorage.setItem('RS-online-cart', JSON.stringify(cartArray));
    updateCartSummary('.header__cart span', '', '.header__total', 'Cart total:＄');
    updateCartSummary('.summary__total-products', 'Total products: ', '.summary__total-price', 'Total price: ＄');
  });

  function removeFromCartById(id) {
    const domElementToRemove = document.querySelector(`#cart-item-${id}`);
    domElementToRemove.remove();
  }
}

export default addCardActions;
