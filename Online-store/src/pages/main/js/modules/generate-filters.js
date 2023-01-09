function getDataArray(element, data) {
  return element.reduce((acc, curVal) => {
    return acc.includes(curVal.getAttribute(data).toLowerCase())
      ? acc
      : [...acc, curVal.getAttribute(data).toLowerCase()];
  }, []);
}

export function getBrand(product) {
  return getDataArray(product, 'data-brand');
}

export function getCategory(product) {
  return getDataArray(product, 'data-category');
}

export function createFilter(iterator) {
  const product = Array.from(document.querySelectorAll('.product'));
  let filtersList = document.getElementById('filter-brand');
  let filerCategoryList = document.getElementById('filter-category');
  let div = document.createElement('div');
  div.className = `filter__list-item`;
  div.innerHTML = `
  <div class="filter-list-item" data-filter="${iterator}">
  <div>
    <label>
      <input class="filter-list-item__checkbox" type="checkbox">
      ${iterator}
    </label>
  </div>
  <span>(0/0)</span>
</div>`;
  if (getDataArray(product, 'data-brand').includes(iterator)) filtersList.appendChild(div);
  if (getDataArray(product, 'data-category').includes(iterator)) filerCategoryList.appendChild(div);
}

// function createFiltersCategory(){
//   let filerCategoryList = document.getElementById('filter-category');
//   createFilter(filerCategoryList.appendChild(div))
// }

export function generateFilters(filters) {
  for (let key in filters) {
    createFilter(filters[key]);
  }
}

export default getBrand;
