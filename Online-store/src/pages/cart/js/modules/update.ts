import { LocalStorageItem } from './types';

// Updates on actions
function updateProductsCount(): void {
  const cartArray = JSON.parse(<string>localStorage.getItem('RS-online-cart'));
  cartArray.forEach((product: LocalStorageItem) => {
    (<HTMLDivElement>document.querySelector(`#product-counter-${product.id}`)).textContent = `${product.count}`;
  });
}

// same module in each page
function updateCartSummary(
  totalProductsSelector: string,
  productsLabel: string,
  totalPriceSelector: string,
  priceLabel: string
): void {
  const totalProducts = document.querySelector(totalProductsSelector);
  const totalPrice = document.querySelector(totalPriceSelector);
  const cartArray = JSON.parse(<string>localStorage.getItem('RS-online-cart'));

  (<HTMLDivElement>totalProducts).textContent =
    productsLabel + cartArray.reduce((accum: number, product: LocalStorageItem) => accum + product.count, 0);
  (<HTMLDivElement>totalPrice).textContent =
    priceLabel +
    cartArray.reduce((accum: number, product: LocalStorageItem) => accum + product.count * product.price, 0);
}

export { updateProductsCount, updateCartSummary };
