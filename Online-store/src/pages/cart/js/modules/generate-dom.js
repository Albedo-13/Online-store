// DOM generators

let productList = document.querySelector('.products-list');

function generateEmptyCartMsg() {
  productList.innerHTML = `
  <div class="cart-empty">YOUR 🛒 IS EMPTY :)</div>
  `;
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

export { generateEmptyCartMsg, generateCartCard };
