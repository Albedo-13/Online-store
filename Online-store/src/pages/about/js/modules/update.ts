import { LocalStorageItem } from './types';
function updateCartSummary(
  totalProductsSelector: string,
  productsLabel: string,
  totalPriceSelector: string,
  priceLabel: string
): void {
  const totalProducts = document.querySelector(totalProductsSelector) as HTMLElement;
  const totalPrice = document.querySelector(totalPriceSelector) as HTMLElement;
  const cartArray = JSON.parse(<string>localStorage.getItem('RS-online-cart')) as Array<LocalStorageItem>;

  totalProducts.textContent = productsLabel + cartArray.reduce((accum, product) => accum + product.count, 0);
  totalPrice.textContent = priceLabel + cartArray.reduce((accum, product) => accum + product.count * product.price, 0);
}

export default updateCartSummary;
