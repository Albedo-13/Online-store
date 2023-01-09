'use strict';
import { updateProductsCount, updateCartSummary } from './modules/update.js';
import addModal from './modules/modal.js';
import { generateEmptyCartMsg, generateCartCard } from './modules/generate-dom.js';
import addCardActions from './modules/cards.js';

let db; // Use this array of objects to work with products database
let productList = document.querySelector('.products-list');

// Entrance
(() => {
  if (!localStorage.getItem('RS-online-cart')) {
    localStorage.setItem('RS-online-cart', JSON.stringify([]));
  }
  if (JSON.parse(localStorage.getItem('RS-online-cart')).length === 0) {
    generateEmptyCartMsg();
  }

  getAllProducts().then((productsArray) => {
    db = JSON.parse(JSON.stringify(productsArray));
    JSON.parse(localStorage.getItem('RS-online-cart')).forEach((x) => {
      if (db.find((y) => y.id === x.id)) {
        generateCartCard(db.find((y) => y.id === x.id));
      }
    });
    updateProductsCount();
    updateCartSummary('.summary__total-products', 'Total products: ', '.summary__total-price', 'Total price: ＄');
    updateCartSummary('.header__cart span', '', '.header__total', 'Cart total:＄');
    addModal();
    addCardActions(productList, db);
  });
})();

async function getAllProducts() {
  let responce = await fetch('http://localhost:3000/products');
  let responceContent = await responce.json();
  let responceContentSliced = responceContent.slice(0, 20);
  return responceContentSliced;
}
