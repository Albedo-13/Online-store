'use strict';

let db; // Use this array of objects to work with products database
let productList = document.getElementById('products-list');

// TODO: (1) Написать 2 dual-slider'а (https://medium.com/@predragdavidovic10/native-dual-range-slider-html-css-javascript-91e778134816)
// TODO: (3) разбить код на модули

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
    updateCartSummary('.header__cart span', '', '.header__total', 'Cart total:＄');
  });
})();

function generateDetailsQueryString(productId) {
  const query = new URLSearchParams({
    id: productId,
  });
  const path = window.location.pathname.replace('main', 'about');
  const url = window.location.origin + path + '?' + query.toString();
  console.log(url);
  return url;
}

async function getAllProducts() {
  let responce = await fetch('http://localhost:3000/products');
  let responceContent = await responce.json();
  let responceContentSliced = responceContent.slice(0, 20);
  for (let key in responceContentSliced) {
    await generateMainCard(responceContentSliced[key]);
  }
  return responceContentSliced;
}

function updateCartSummary(totalProductsSelector, productsLabel, totalPriceSelector, priceLabel) {
  const totalProducts = document.querySelector(totalProductsSelector);
  const totalPrice = document.querySelector(totalPriceSelector);
  const cartArray = JSON.parse(localStorage.getItem('RS-online-cart'));

  totalProducts.textContent = productsLabel + cartArray.reduce((accum, product) => accum + product.count, 0);
  totalPrice.textContent = priceLabel + cartArray.reduce((accum, product) => accum + product.count * product.price, 0);
}

function addSelectorClass(selector, newClass, textContent) {
  selector.classList.add(newClass);
  selector.textContent = textContent;
}

function removeSelectorClass(selector, newClass, textContent) {
  selector.classList.remove(newClass);
  selector.textContent = textContent;
}

// Add to cart button
productList.addEventListener('click', (e) => {
  const targetId = +e.target.id.split('-')[2];
  let cartArray = JSON.parse(localStorage.getItem('RS-online-cart'));
  if (e.target.classList.contains('item-buttons__details')) {
    window.location.href = generateDetailsQueryString(targetId);
  }

  if (e.target.classList.contains('button-add__active')) {
    cartArray = cartArray.filter((x) => x.id !== targetId);
    removeSelectorClass(e.target, 'button-add__active', 'Add to cart');
  } else if (e.target.classList.contains('item-buttons__add')) {
    console.log(`${e.target.id}`);
    const pickedProduct = db.find((x) => x.id === targetId);
    const objectToAdd = {
      id: pickedProduct.id,
      price: pickedProduct.price,
      count: 1,
    };
    cartArray.push(objectToAdd);
    addSelectorClass(e.target, 'button-add__active', 'Remove from cart');
  }

  localStorage.setItem('RS-online-cart', JSON.stringify(cartArray));
  updateCartSummary('.header__cart span', '', '.header__total', 'Cart total:＄');
});

// DOM generator
function generateMainCard(iterator) {
  let div = document.createElement('div');
  div.className = 'product';
  div.id = `product-item-${iterator.id}`;
  div.innerHTML = `
		<div id="element1" class="element"
		style="background: url(${iterator.thumbnail}) no-repeat left; background-size: auto;">
		<div class="item-title">${iterator.title}</div>
		<div class="element-info">
			<ul class="info-list">
				<li class="info-list__item"><span>Category: </span> ${iterator.category}</li>
				<li class="info-list__item"><span>Brand</span>: ${iterator.brand}</li>
				<li class="info-list__item"><span>Price</span>: ${iterator.price}＄</li>
				<li class="info-list__item"><span>Discount</span>: ${iterator.discountPercentage}%</li>
				<li class="info-list__item"><span>Rating</span>: ${iterator.rating}⭐</li>
				<li class="info-list__item"><span>Stock</span>: ${iterator.stock}🛍</li>
			</ul>
		</div>
    <div class="item-buttons">
      <button class="item-buttons__add" id=product-add-${iterator.id}>Add to cart</button>
      <button class="item-buttons__details" id=product-details-${iterator.id}>Details</button>
    </div>
	</div>`;
  productList.appendChild(div);
}

// Dual slider (честно скопированный код)
function controlFromInput(fromSlider, fromInput, toInput, controlSlider) {
  const [from, to] = getParsed(fromInput, toInput);
  fillSlider(fromInput, toInput, '#C6C6C6', '#25daa5', controlSlider);
  if (from > to) {
    fromSlider.value = to;
    fromInput.value = to;
  } else {
    fromSlider.value = from;
  }
}

function controlToInput(toSlider, fromInput, toInput, controlSlider) {
  const [from, to] = getParsed(fromInput, toInput);
  fillSlider(fromInput, toInput, '#C6C6C6', '#25daa5', controlSlider);
  setToggleAccessible(toInput);
  if (from <= to) {
    toSlider.value = to;
    toInput.value = to;
  } else {
    toInput.value = from;
  }
}

function controlFromSlider(fromSlider, toSlider, fromInput) {
  const [from, to] = getParsed(fromSlider, toSlider);
  fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
  if (from > to) {
    fromSlider.value = to;
    fromInput.value = to;
  } else {
    fromInput.value = from;
  }
}

function controlToSlider(fromSlider, toSlider, toInput) {
  const [from, to] = getParsed(fromSlider, toSlider);
  fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
  setToggleAccessible(toSlider);
  if (from <= to) {
    toSlider.value = to;
    toInput.value = to;
  } else {
    toInput.value = from;
    toSlider.value = from;
  }
}

function getParsed(currentFrom, currentTo) {
  const from = parseInt(currentFrom.value, 10);
  const to = parseInt(currentTo.value, 10);
  return [from, to];
}

function fillSlider(from, to, sliderColor, rangeColor, controlSlider) {
  const rangeDistance = to.max - to.min;
  const fromPosition = from.value - to.min;
  const toPosition = to.value - to.min;
  controlSlider.style.background = `linear-gradient(
    to right,
    ${sliderColor} 0%,
    ${sliderColor} ${(fromPosition / rangeDistance) * 100}%,
    ${rangeColor} ${(fromPosition / rangeDistance) * 100}%,
    ${rangeColor} ${(toPosition / rangeDistance) * 100}%, 
    ${sliderColor} ${(toPosition / rangeDistance) * 100}%, 
    ${sliderColor} 100%)`;
}

function setToggleAccessible(currentTarget) {
  const toSlider = document.querySelector('#toSlider');
  if (Number(currentTarget.value) <= 0) {
    toSlider.style.zIndex = 2;
  } else {
    toSlider.style.zIndex = 0;
  }
}

const fromSlider = document.querySelector('#fromSlider');
const toSlider = document.querySelector('#toSlider');
const fromInput = document.querySelector('#fromInput');
const toInput = document.querySelector('#toInput');
fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
setToggleAccessible(toSlider);

fromSlider.oninput = () => controlFromSlider(fromSlider, toSlider, fromInput);
toSlider.oninput = () => controlToSlider(fromSlider, toSlider, toInput);
fromInput.oninput = () => controlFromInput(fromSlider, fromInput, toInput, toSlider);
toInput.oninput = () => controlToInput(toSlider, fromInput, toInput, toSlider);