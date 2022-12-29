// import '../css/styles.css';
//import './modules/module';
let productList = document.getElementById('products-list');

function generateEl(iterator) {
  let div = document.createElement('div');
  div.className = 'product';
  div.innerHTML = `
		<div id="element1" class="element"
		style="background: url(${iterator.thumbnail}) no-repeat left; background-size: auto;">
		<div class="item-title">${iterator.title}</div>
		<div class="element-info">
			<ul class="info-list">
				<li class="info-list__item"><span>Category: </span> ${iterator.category}</li>
				<li class="info-list__item"><span>Brand</span>: ${iterator.brand}</li>
				<li class="info-list__item"><span>Price</span>: ${iterator.price}</li>
				<li class="info-list__item"><span>Discount</span>: ${iterator.discountPercentage}%</li>
				<li class="info-list__item"><span>Rating</span>: ${iterator.rating}</li>
				<li class="info-list__item"><span>Stock</span>: ${iterator.stock}</li>
			</ul>
		</div>
	</div>`;
  productList.appendChild(div);
}

async function getAllProducts() {
  let responce = await fetch('http://localhost:3000/products');
  let responceContent = await responce.json();
  let responceContentSliced = responceContent.slice(0, 40);
  for (let key in responceContentSliced) {
    await generateEl(responceContentSliced[key]);
  }
}

getAllProducts();
