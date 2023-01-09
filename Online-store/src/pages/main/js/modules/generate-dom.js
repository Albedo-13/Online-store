// DOM generator (layout)
let productList = document.getElementById('products-list');

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

function addSelectorClass(selector, newClass, textContent) {
  selector.classList.add(newClass);
  selector.textContent = textContent;
}

function removeSelectorClass(selector, newClass, textContent) {
  selector.classList.remove(newClass);
  selector.textContent = textContent;
}

export { generateMainCard, addSelectorClass, removeSelectorClass };
