'use strict';

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
    updateCartSummary('.header__cart span', '', '.header__total', 'Cart total:＄');
  });
})();

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
      <form action="../../pages/about/index.html">
        <button class="item-buttons__details">Details</button>
      </form>
    </div>
	</div>`;
  productList.appendChild(div);
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
// TODO: изменить генерируемую верстку DOM дерева (переработать лишние вложенности)
// TODO: пересчитывать на всех страницах сумму и кол-во товаров в хедере.

// TODO: передавать ID'шник по кнопке details и генерировать описание товара

// Cart (add to cart button)
productList.addEventListener('click', (e) => {
  // TODO: вынести дублирование кода за условие
  if (e.target.classList.contains('button-add__active')) {
    const cartArray = JSON.parse(localStorage.getItem('RS-online-cart'));
    const cartArrayWithoutRemovedProduct = cartArray.filter((x) => x.id !== +e.target.id.split('-')[2]);
    localStorage.setItem('RS-online-cart', JSON.stringify(cartArrayWithoutRemovedProduct));
    removeSelectorClass(e.target, 'button-add__active', 'Add to cart');
  } else if (e.target.classList.contains('item-buttons__add')) {
    console.log(`${e.target.id}`);
    const pickedProduct = db.find((x) => x.id === +e.target.id.split('-')[2]);
    const objectToAdd = {
      id: pickedProduct.id,
      price: pickedProduct.price,
      count: 1,
    };
    const cartArray = JSON.parse(localStorage.getItem('RS-online-cart'));
    cartArray.push(objectToAdd);
    localStorage.setItem('RS-online-cart', JSON.stringify(cartArray));
    addSelectorClass(e.target, 'button-add__active', 'Remove from cart');
  }
});
