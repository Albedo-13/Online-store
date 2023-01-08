'use strict';

let db; // Use this array of objects to work with products database
let productList = document.querySelector('.products-list');

// TODO: (3) Добавить пагинацию

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
  });
})();

async function getAllProducts() {
  let responce = await fetch('http://localhost:3000/products');
  let responceContent = await responce.json();
  let responceContentSliced = responceContent.slice(0, 20);
  return responceContentSliced;
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

// Changing & deleting added cart products
productList.addEventListener('click', (e) => {
  const targetId = +e.target.id.split('-')[2];
  let cartArray = JSON.parse(localStorage.getItem('RS-online-cart'));

  if (e.target.classList.contains('products-item__add')) {
    cartArray.forEach((product) => {
      if (product.id === targetId && product.count < db.find((x) => x.id === targetId).stock) {
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

  if (!cartArray.length) {
    generateEmptyCartMsg();
  }
  localStorage.setItem('RS-online-cart', JSON.stringify(cartArray));
  updateCartSummary('.header__cart span', '', '.header__total', 'Cart total:＄');
  updateCartSummary('.summary__total-products', 'Total products: ', '.summary__total-price', 'Total price: ＄');
});

// DOM generators
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

  // Modal
  const openModal = document.querySelector('.summary__buy');
  const modal = document.querySelector('.modal');
  const modalCloseBtn = modal.querySelector('.modal__close');
  const cardNumberInput = modal.querySelector('.card-number__number');
  const cardValidInput = modal.querySelector('.card-number__valid');
  const cardCVVInput = modal.querySelector('.card-number__cvv');
  const cardSubmitBtn = modal.querySelector('.card-submit');

  openModal.addEventListener('click', () => {
    if (JSON.parse(localStorage.getItem('RS-online-cart')).length > 0) {
      modal.classList.remove('hide');
    }
  });

  modalCloseBtn.addEventListener('click', () => {
    modal.classList.add('hide');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hide');
    }
  });

  function changePaymentCardIcon(cardNumber) {
    const cardIcons = [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkdMZcTxIgmkIGjBHvY_maSuIOIWH79cHpn2LbnYT47YrYxrmCnumq4EEEyQ0sy_ZSSUY&usqp=CAU',
      'https://cdn-icons-png.flaticon.com/512/349/349221.png',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/989px-Mastercard-logo.svg.png',
    ];
    if (cardNumber[0] === '4') {
      document.querySelector('.card-number__image').setAttribute('src', cardIcons[1]);
    } else if (cardNumber[0] === '5') {
      document.querySelector('.card-number__image').setAttribute('src', cardIcons[2]);
    } else {
      document.querySelector('.card-number__image').setAttribute('src', cardIcons[0]);
    }
  }

  cardNumberInput.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      e.target.value = '';
    }
  });

  cardNumberInput.addEventListener('input', (e) => {
    changePaymentCardIcon(e.target.value);

    if (!/^[0-9\s]*$/.test(e.target.value)) {
      e.target.value = '';
      return;
    }
    if (+e.target.value.length > 4) {
      const value = e.target.value.split(' ').join('');
      const spaced = value.slice(0, 4) + ' ' + value.slice(4, 8) + ' ' + value.slice(8, 12) + ' ' + value.slice(12, 16);
      e.target.value = spaced.slice(0, 19);
    }
  });

  cardValidInput.addEventListener('input', (e) => {
    console.log(+e.target.value.length);
    console.log(+e.target.getAttribute('max'));

    if (!/^[0-9/]*$/.test(e.target.value)) {
      e.target.value = '';
      return;
    }
    if (+e.target.value.length >= 2) {
      const validateMonth = +e.target.value.split('/')[0];
      if (validateMonth > 12) {
        e.target.value = '12';
      }

      const value = e.target.value.split('/').join('');
      const spaced = value.slice(0, 2) + '/' + value.slice(2, 4);
      e.target.value = spaced.slice(0, 5);
    }
  });

  cardValidInput.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      e.target.value = '';
    }
  });

  cardCVVInput.addEventListener('input', (e) => {
    console.log(+e.target.value.length);
    console.log(+e.target.getAttribute('max'));
    if (+e.target.value.length > 2) {
      const value = e.target.value;
      e.target.value = value.slice(0, 3);
    }
  });

  cardSubmitBtn.addEventListener('click', (e) => {
    localStorage.setItem('RS-online-cart', []);
  });
}
