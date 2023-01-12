'use strict';
import { updateProductsCount, updateCartSummary } from './modules/update';
import addModal from './modules/modal';
import { generateCartCard, generateEmptyCartMsg } from './modules/generate-dom';
import addCardActions from './modules/cards';
import { DummyItem, LocalStorageItem } from './modules/types';

let db: Array<DummyItem>; // Use this array of objects to work with products database
const productList = document.querySelector('.products-list');

// Entrance
(() => {
  if (!localStorage.getItem('RS-online-cart')) {
    localStorage.setItem('RS-online-cart', JSON.stringify([]));
  }
  if (!JSON.parse(<string>localStorage.getItem('RS-online-cart')).length) {
    generateEmptyCartMsg();
  }

  getAllProducts().then((productsArray) => {
    db = JSON.parse(JSON.stringify(productsArray));
    JSON.parse(<string>localStorage.getItem('RS-online-cart')).forEach((x: LocalStorageItem) => {
      if (db.find((y) => y.id === x.id)) {
        generateCartCard(db.find((y) => y.id === x.id) as DummyItem);
      }
    });
    updateProductsCount();
    updateCartSummary('.summary__total-products', 'Total products: ', '.summary__total-price', 'Total price: ＄');
    updateCartSummary('.header__cart span', '', '.header__total', 'Cart total:＄');
    addModal();
    addCardActions(productList as HTMLElement, db);
  });
})();

async function getAllProducts() {
  const responce = (await fetch('https://dummyjson.com/products')) as Response;
  const responceContent = await responce.json();
  const responceContentSliced = responceContent.products;
  return responceContentSliced;
}
