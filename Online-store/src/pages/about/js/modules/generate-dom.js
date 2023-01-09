// DOM generator

let productWrapper = document.getElementById('product-wrapper');

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

function addSelectorClass(selector, newClass, textContent) {
  selector.classList.add(newClass);
  selector.textContent = textContent;
}

function removeSelectorClass(selector, newClass, textContent) {
  selector.classList.remove(newClass);
  selector.textContent = textContent;
}

export { generateAboutCard, addSelectorClass, removeSelectorClass };
