//import './modules/module';

let db; // Use this array of objects to work with products database
let productList = document.getElementById('products-list');

function generateCart(iterator) {
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
				<li class="info-list__item"><span>Price</span>: ${iterator.price}＄</li>
				<li class="info-list__item"><span>Discount</span>: ${iterator.discountPercentage} %</li>
				<li class="info-list__item"><span>Rating</span>: ${iterator.rating}⭐</li>
				<li class="info-list__item"><span>Stock</span>: ${iterator.stock}🛍</li>
			</ul>
		</div>
    <div class="item-buttons">
      <button class="item-buttons__add" id=product-num-${iterator.id}>Add to cart</button>
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
    await generateCart(responceContentSliced[key]);
  }
  return responceContentSliced;
}

// Entrance
(() => {
  if (!localStorage.getItem('RS-online-cart')) {
    localStorage.setItem('RS-online-cart', JSON.stringify([]));
  }

  getAllProducts().then((array) => {
    // console.log(JSON.parse(JSON.stringify(array)));
    db = JSON.parse(JSON.stringify(array));
    // console.log(db);
    // return db;
  });
})();

// TODO: в корзине выводить добавленные продукты.
// TODO: в корзине изменять кол-во товаров + фиксировать в local storage.
// TODO: в корзине реализовать удаление товаров.
// TODO: пересчитывать на всех страницах сумму товаров в хедере.

// TODO: передавать ID'шник по кнопке details и генерировать описание товара

// Cart (add to cart button)
productList.addEventListener('click', (e) => {
  if (e.target.className === 'item-buttons__add') {
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

    // TODO: не обращаться к серверу на каждое добавление товара
    // TODO: добавлять в корзину, менять стили и текст кнопки.
    // TODO: Кнопка меняется на удаление, после нажатия на удаление -
    // удалять из локального хранилища по id'шнику, удалять стиль к дефолтному и менять текст
  }
});
