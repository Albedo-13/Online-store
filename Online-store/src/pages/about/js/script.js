'use strict';

let productId; // ?
let productList = document.getElementById('products-list');

// Entrance
(() => {
  if (!localStorage.getItem('RS-online-cart')) {
    localStorage.setItem('RS-online-cart', JSON.stringify([]));
  }
  getProductById();
})();

async function getProductById() {
  const queryId = getIdFromQueryString();
  productId = queryId; // ?

  let responce = await fetch('http://localhost:3000/products');
  let responceContent = await responce.json();
  let responceContentProduct = await responceContent.filter((x) => x.id === queryId)[0];
  console.log(responceContentProduct);
  await generateAboutCard(responceContentProduct);
  return responceContentProduct;
}

function getIdFromQueryString() {
  const url = window.location.href;
  const urlSearchParams = new URLSearchParams(new URL(url).searchParams);
  const res = Object.fromEntries(Array.from(urlSearchParams.entries()));
  return +res.id;
}

function generateAboutCard(item) {
  let div = document.createElement('div');
  div.className = 'products-item';
  div.innerHTML = `
  <!-- <div class="products-item__images">
    <img src="../../assets/img/society-reason.jpg" alt="product image">
    <img src="../../assets/img/society-reason.jpg" alt="product image">
    <img src="../../assets/img/society-reason.jpg" alt="product image">
  </div> -->
  <img class="products-item__image" src=${item.thumbnail} alt="product image">
  <div class="products-item__about">
    <form action="../../pages/main/index.html">
      <button class="products__back-to-main">← Назад</button>
    </form>
    <div class="products-item__name">${item.title}</div>
    <div class="products-item__rating">Rating: ${item.rating}⭐</div>
    <div class="products-item__discount">Discount: ${item.discountPercentage}%</div>
    <div class="products-item__stock">Stock: ${item.stock}🛍</div>
    <div class="products-item__price">Price: ${item.price}＄</div>
    <div class="products-item__descr">${item.description}</div>
  </div>
  <div class="products-item__options">
    <button class="products__add">Add to cart</button>
  </div>`;
  productList.appendChild(div);
}
