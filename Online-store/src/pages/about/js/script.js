'use strict';

import { generateAboutCard, addSelectorClass } from './modules/generate-dom.js';
import updateCartSummary from './modules/update.js';
import addCardActions from './modules/card.js';

let currentProduct; // Use this object to work with product from database
let productWrapper = document.getElementById('product-wrapper');

// Entrance
(() => {
  if (!localStorage.getItem('RS-online-cart')) {
    localStorage.setItem('RS-online-cart', JSON.stringify([]));
  }
  getProductById().then((product) => {
    JSON.parse(localStorage.getItem('RS-online-cart')).forEach((x) => {
      if (x.id === product.id) {
        const productAddButton = document.querySelector(`#product-add-${product.id}`);
        addSelectorClass(productAddButton, 'button-add__active', 'Remove from cart');
      }
    });
    updateCartSummary('.header__cart span', '', '.header__total', 'Cart total:＄');
    addCardActions(productWrapper, currentProduct);
  });
})();

async function getProductById() {
  const queryId = getIdFromQueryString();

  let responce = await fetch('https://dummyjson.com/products');
  let responceContent = await responce.json();
  let responceContentProduct = await responceContent.products.filter((x) => x.id === queryId)[0];

  currentProduct = responceContentProduct;
  await generateAboutCard(responceContentProduct);
  return responceContentProduct;
}

function getIdFromQueryString() {
  const url = window.location.href;
  const urlSearchParams = new URLSearchParams(new URL(url).searchParams);
  const res = Object.fromEntries(Array.from(urlSearchParams.entries()));
  return +res.id;
}
