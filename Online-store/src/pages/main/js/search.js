let searchInput = document.getElementById('products__search');
let product = document.getElementsByClassName('item-title');

function reduceSpacesToAtoms(stringWithSpaces) {
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
  return (element.parentElement.style.display = displayStyle);
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

export default getCollection;
