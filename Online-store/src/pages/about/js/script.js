'use strict';

let currentProduct; // Use this object to work with product from database
let productWrapper = document.getElementById('product-wrapper');

// TODO: (2) Добавить кнопку быстрой покупки (на модульное окно)
// TODO: (3) Добавить другие изображения товара, переключаться между ними
// TODO: (3) Переписать увеличение изображения при hover эффекте

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
  });
})();

async function getProductById() {
  const queryId = getIdFromQueryString();

  let responce = await fetch('http://localhost:3000/products');
  let responceContent = await responce.json();
  let responceContentProduct = await responceContent.filter((x) => x.id === queryId)[0];

  currentProduct = responceContentProduct;
  await generateAboutCard(responceContentProduct);
  return responceContentProduct;
}

function addSelectorClass(selector, newClass, textContent) {
  selector.classList.add(newClass);
  selector.textContent = textContent;
}

function removeSelectorClass(selector, newClass, textContent) {
  selector.classList.remove(newClass);
  selector.textContent = textContent;
}

function getIdFromQueryString() {
  const url = window.location.href;
  const urlSearchParams = new URLSearchParams(new URL(url).searchParams);
  const res = Object.fromEntries(Array.from(urlSearchParams.entries()));
  return +res.id;
}

function updateCartSummary(totalProductsSelector, productsLabel, totalPriceSelector, priceLabel) {
  const totalProducts = document.querySelector(totalProductsSelector);
  const totalPrice = document.querySelector(totalPriceSelector);
  const cartArray = JSON.parse(localStorage.getItem('RS-online-cart'));

  totalProducts.textContent = productsLabel + cartArray.reduce((accum, product) => accum + product.count, 0);
  totalPrice.textContent = priceLabel + cartArray.reduce((accum, product) => accum + product.count * product.price, 0);
}

productWrapper.addEventListener('click', (e) => {
  let cartArray = JSON.parse(localStorage.getItem('RS-online-cart'));

  if (e.target.classList.contains('button-add__active')) {
    cartArray = cartArray.filter((x) => x.id !== currentProduct.id);
    removeSelectorClass(e.target, 'button-add__active', 'Add to cart');
  } else if (e.target.classList.contains('product__add')) {
    const objectToAdd = {
      id: currentProduct.id,
      price: currentProduct.price,
      count: 1,
    };
    cartArray.push(objectToAdd);
    addSelectorClass(e.target, 'button-add__active', 'Remove from cart');
  }

  localStorage.setItem('RS-online-cart', JSON.stringify(cartArray));
  updateCartSummary('.header__cart span', '', '.header__total', 'Cart total:＄');
});

// DOM generator
function generateAboutCard(item) {
  let div = document.createElement('div');
  div.className = 'product-item';
  div.innerHTML = `
  <!-- <div class="product-item__images">
    <img src="../../assets/img/society-reason.jpg" alt="product image">
    <img src="../../assets/img/society-reason.jpg" alt="product image">
    <img src="../../assets/img/society-reason.jpg" alt="product image">
  </div> -->
  <div class="product-item__image">
    <img src=${item.thumbnail} alt="product image">
  </div>
  <div class="product-item__about">
    <form action="../../pages/main/index.html">
      <button class="product__back-to-main">← Back</button>
    </form>
    <ul class="product-breadcrumbs">
      <li><a class="product-breadcrumbs__store" href="../../pages/main/index.html">Store</a></li>
      >>
      <li>${item.category}</li>
      >>
      <li>${item.brand}</li>
      >>
      <li>${item.title}</li>
    </ul>
    <div class="product-item__name">${item.title}</div>
    <div class="product-item__rating">Rating: ${item.rating}⭐</div>
    <div class="product-item__discount">Discount: ${item.discountPercentage}%</div>
    <div class="product-item__stock">Stock: ${item.stock}🛍</div>
    <div class="product-item__price">Price: ${item.price}＄</div>
    <div class="product-item__price">Category: ${item.category}</div>
    <div class="product-item__price">Brand: ${item.brand}</div>
    <div class="product-item__descr">${item.description}</div>
  </div>
  <div class="product-item__options">
    <button class="product__add" id="product-add-${item.id}">Add to cart</button>
  </div>`;
  productWrapper.appendChild(div);
}
