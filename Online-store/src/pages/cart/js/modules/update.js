// Updates on actions
function updateProductsCount() {
  const cartArray = JSON.parse(localStorage.getItem('RS-online-cart'));
  cartArray.forEach((product) => {
    document.querySelector(`#product-counter-${product.id}`).textContent = product.count;
  });
}

// same module in each page
function updateCartSummary(totalProductsSelector, productsLabel, totalPriceSelector, priceLabel) {
  const totalProducts = document.querySelector(totalProductsSelector);
  const totalPrice = document.querySelector(totalPriceSelector);
  const cartArray = JSON.parse(localStorage.getItem('RS-online-cart'));

  totalProducts.textContent = productsLabel + cartArray.reduce((accum, product) => accum + product.count, 0);
  totalPrice.textContent = priceLabel + cartArray.reduce((accum, product) => accum + product.count * product.price, 0);
}

export { updateProductsCount, updateCartSummary };
