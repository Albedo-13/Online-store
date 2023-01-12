'use strict';

import { generateAboutCard, addSelectorClass } from './modules/generate-dom';
import updateCartSummary from './modules/update';
import addCardActions from './modules/card';
import { DummyItem, LocalStorageItem } from './modules/types';

let currentProduct: DummyItem; // Use this object to work with product from database
const productWrapper = document.getElementById('product-wrapper');

// Entrance
(() => {
  if (!localStorage.getItem('RS-online-cart')) {
    localStorage.setItem('RS-online-cart', JSON.stringify([]));
  }
  getProductById().then((product) => {
    JSON.parse(<string>localStorage.getItem('RS-online-cart')).forEach((x: LocalStorageItem) => {
      if (x.id === product.id) {
        const productAddButton = document.querySelector(`#product-add-${product.id}`);
        addSelectorClass(productAddButton as HTMLElement, 'button-add__active', 'Remove from cart');
      }
    });
    updateCartSummary('.header__cart span', '', '.header__total', 'Cart total:＄');
    addCardActions(productWrapper as HTMLElement, currentProduct as DummyItem);
  });
})();

async function getProductById() {
  const queryId = getIdFromQueryString();

  const responce = (await fetch('https://dummyjson.com/products')) as Response;
  const responceContent = await responce.json();
  const responceContentProduct = await responceContent.products.filter((x: DummyItem) => x.id === queryId)[0];

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
