const ascSort = document.getElementById('products__droplist-asc') as HTMLOptionElement;
const descSort = document.getElementById('products__droplist-desc') as HTMLOptionElement;
const select = document.getElementById('products__droplist') as HTMLSelectElement;

function sortAsc(prodList: HTMLElement) {
  Array.from(prodList.children).sort((a, b) => {
    return +(<string>a.getAttribute('data-sort')) > +(<string>b.getAttribute('data-sort'))
      ? +prodList.insertBefore(a, b)
      : -1;
  });
}

function sortDesc(prodList: HTMLElement) {
  Array.from(prodList.children).sort((a, b) => {
    return +(<string>a.getAttribute('data-sort')) < +(<string>b.getAttribute('data-sort'))
      ? +prodList.insertBefore(a, b)
      : -1;
  });
}

function sortByPrice() {
  const prodList = document.getElementById('products-list');
  select.addEventListener('change', function () {
    const optionText = this.options[this.selectedIndex].text;
    if (optionText === ascSort.text) {
      sortAsc(prodList as HTMLElement);
    }
    if (optionText === descSort.text) {
      sortDesc(prodList as HTMLElement);
    }
  });
}

export default sortByPrice;
