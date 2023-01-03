'use strict';

let db; // Use this array of objects to work with products database
let productList = document.querySelector('.products-list');

// Entrance
(() => {
  if (!localStorage.getItem('RS-online-cart')) {
    localStorage.setItem('RS-online-cart', JSON.stringify([]));
  }
  getAllProducts().then((productsArray) => {
    db = JSON.parse(JSON.stringify(productsArray));
    JSON.parse(localStorage.getItem('RS-online-cart')).forEach((x) => {
      if (db.find((y) => y.id === x.id)) {
        generateCartCard(db.find((y) => y.id === x.id));
      }
    });
  });
})();

async function getAllProducts() {
  let responce = await fetch('http://localhost:3000/products');
  let responceContent = await responce.json();
  let responceContentSliced = responceContent.slice(0, 20);
  return responceContentSliced;
}

function generateCartCard(iterator) {
  let div = document.createElement('div');
  div.className = 'products-item';
  div.innerHTML = `
    <div class="products-item__image">
      <img src="${iterator.thumbnail}" alt="product image">
    </div>
    <div class="products-item__about">
      <div class="products-item__name">${iterator.title}</div>
      <div class="products-item__rating">Rating: ${iterator.rating}⭐</div>
      <div class="products-item__discount">Discount: ${iterator.discountPercentage}%</div>
    </div>
    <div class="products-item__scale">
      <div class="products-item__stock">Stock: ${iterator.stock}🛍</div>
      <button class="products-item__add">+</button>
      <div class="products-item__count">1</div>
      <button class="products-item__remove">-</button>
      <div class="products-item__price">Price per item: ${iterator.price}＄</div>
      <button class="products-item__delete">X</button>
    </div>`;
  productList.appendChild(div);
}

// TODO: в корзине изменять кол-во товаров + фиксировать в local storage.
// TODO: в корзине реализовать удаление товаров.
// TODO?: При клике по товару в корзине перекидывать на about товара.
