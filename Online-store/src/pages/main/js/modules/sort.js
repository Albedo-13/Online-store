const ascSort = document.getElementById('products__droplist-asc');
const descSort = document.getElementById('products__droplist-desc');
const select = document.getElementById('products__droplist');

function sortAsc(prodList) {
  Array.from(prodList.children).sort((a, b) => {
    return +a.getAttribute('data-sort') > b.getAttribute('data-sort') ? prodList.insertBefore(a, b) : -1;
  });
}

function sortDesc(prodList) {
  Array.from(prodList.children).sort((a, b) => {
    return +a.getAttribute('data-sort') < b.getAttribute('data-sort') ? prodList.insertBefore(a, b) : -1;
  });
}

function sortByPrice() {
  const prodList = document.getElementById('products-list');
  select.addEventListener('change', function () {
    let optionText = this.options[this.selectedIndex].text;
    if (optionText === ascSort.text) {
      sortAsc(prodList);
    }
    if (optionText === descSort.text) {
      sortDesc(prodList);
    }
  });
}

export default sortByPrice;
