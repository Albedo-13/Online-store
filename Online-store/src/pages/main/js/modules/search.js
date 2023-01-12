let searchInput = document.getElementById('products__search');
let product = document.getElementsByClassName('item-title');

export function reduceSpacesToAtoms(stringWithSpaces) {
  return stringWithSpaces.toLowerCase().replace(/\s/g, '').trim();
}

searchInput.oninput = function () {
  let searchData = document.getElementById('products__search').value;
  console.log(searchData);
  if (searchData) {
    getCollection(reduceSpacesToAtoms(searchData));
  }
  if (!searchData) location.reload();
};

function addDisplayStyle(element, displayStyle) {
  element.parentElement.style.display = displayStyle;
}

function getCollection(searchData) {
  if (searchData) {
    Array.from(product).filter((item) => {
      reduceSpacesToAtoms(item.innerHTML).includes(searchData)
        ? addDisplayStyle(item, 'flex')
        : addDisplayStyle(item, 'none');
    });
  }
}

export function showCounter() {
  let allCart = document.getElementsByClassName('product');
  let results = document.getElementById('products__total-find');
  let counter = 0;
  Array.from(allCart).forEach((element) => {
    if (element.style.display === 'flex') {
      ++counter;
    }
  });
  results.innerText = `Results: ${counter}`;
}

export default getCollection;
