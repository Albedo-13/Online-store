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
    updateProductsCount();
    updateCartSummary('.summary__total-products', 'Total products: ', '.summary__total-price', 'Total price: ＄');
    updateCartSummary('.header__cart span', '', '.header__total', 'Cart total:＄');
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
  div.id = `cart-item-${iterator.id}`;
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
      <button class="products-item__add" id=product-increase-${iterator.id}>+</button>
      <div class="products-item__count" id=product-counter-${iterator.id}>1</div>
      <button class="products-item__remove" id=product-decrease-${iterator.id}>-</button>
      <div class="products-item__price">Price per item: ${iterator.price}＄</div>
      <button class="products-item__delete" id=product-delete-${iterator.id}>X</button>
    </div>`;
  productList.appendChild(div);
}

function updateProductsCount() {
  const cartArray = JSON.parse(localStorage.getItem('RS-online-cart'));
  cartArray.forEach((product) => {
    document.querySelector(`#product-counter-${product.id}`).textContent = product.count;
  });
}

function updateCartSummary(totalProductsSelector, productsLabel, totalPriceSelector, priceLabel) {
  const totalProducts = document.querySelector(totalProductsSelector);
  const totalPrice = document.querySelector(totalPriceSelector);
  const cartArray = JSON.parse(localStorage.getItem('RS-online-cart'));

  totalProducts.textContent = productsLabel + cartArray.reduce((accum, product) => accum + product.count, 0);
  totalPrice.textContent = priceLabel + cartArray.reduce((accum, product) => accum + product.count * product.price, 0);
}

function removeFromCartById(id) {
  const domElementToRemove = document.querySelector(`#cart-item-${id}`);
  domElementToRemove.remove();
}

// TODO?: При клике по товару в корзине перекидывать на about товара.

// Cart (change & delete local storage count)
productList.addEventListener('click', (e) => {
  // TODO: вынести дублирование кода за условие
  const targetId = +e.target.id.split('-')[2];
  let cartArray = JSON.parse(localStorage.getItem('RS-online-cart'));

  if (e.target.classList.contains('products-item__add')) {
    cartArray.forEach((product) => {
      if (product.id === targetId) {
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

  localStorage.setItem('RS-online-cart', JSON.stringify(cartArray));
  updateCartSummary('.header__cart span', '', '.header__total', 'Cart total:＄');
  updateCartSummary('.summary__total-products', 'Total products: ', '.summary__total-price', 'Total price: ＄');
});
