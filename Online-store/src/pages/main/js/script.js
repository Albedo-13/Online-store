'use strict';
import getCollection from './modules/search';
import sortByPrice from './modules/sort';
import { generateMainCard, addSelectorClass } from './modules/generate-dom';
import updateCartSummary from './modules/update';
import addCardActions from './modules/cards';
import getBrand from './modules/generate-filters';
import { generateFilters } from './modules/generate-filters';
import { getCategory } from './modules/generate-filters';
import filerProducts from './modules/filters.js';
import { dropFilters } from './modules/filters.js';

let db; // Use this array of objects to work with products database
let productList = document.getElementById('products-list');

// Entrance
(() => {
  if (!localStorage.getItem('RS-online-cart')) {
    localStorage.setItem('RS-online-cart', JSON.stringify([]));
  }

  getAllProducts().then((productsArray) => {
    db = JSON.parse(JSON.stringify(productsArray));
    JSON.parse(localStorage.getItem('RS-online-cart')).forEach((x) => {
      if (db.find((y) => y.id === x.id)) {
        const productsAddedItem = db.find((y) => y.id === x.id);
        const productsAddedItemButton = document.querySelector(`#product-add-${productsAddedItem.id}`);
        addSelectorClass(productsAddedItemButton, 'button-add__active', 'Remove from cart');
      }
    });
    const product = Array.from(document.querySelectorAll('.product'));
    updateCartSummary('.header__cart span', '', '.header__total', 'Cart total:＄');
    getCollection();
    addCardActions(productList, db);
    sortByPrice();
    generateFilters(getBrand(product));
    generateFilters(getCategory(product));
    filerProducts();
    dropFilters();
  });
})();

async function getAllProducts() {
  let responce = await fetch('https://dummyjson.com/products');
  let responceContent = await responce.json();
  let responceContentSliced = responceContent.products;
  for (let key in responceContentSliced) {
    await generateMainCard(responceContentSliced[key]);
  }
  return responceContentSliced;
}
