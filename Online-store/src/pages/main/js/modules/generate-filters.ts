import { DummyItem } from './types';

export function getDataArray(element: Array<HTMLElement>, data: string) {
  return element.reduce((acc: Array<string>, curVal: HTMLElement) => {
    return acc.includes((<string>curVal.getAttribute(data)).toLowerCase())
      ? acc
      : [...acc, (<string>curVal.getAttribute(data)).toLowerCase()];
  }, []);
}

export function getBrand(product: Array<HTMLElement>) {
  return getDataArray(product, 'data-brand');
}

export function getCategory(product: Array<HTMLElement>) {
  return getDataArray(product, 'data-category');
}

export function createFilter(iterator: DummyItem) {
  const product = Array.from(document.querySelectorAll('.product'));
  const filtersList = document.getElementById('filter-brand');
  const filerCategoryList = document.getElementById('filter-category');
  const div = document.createElement('div');
  div.className = `filter__list-item`;
  div.innerHTML = `
  <div class="filter-list-item" data-filter="${iterator}">
  <div>
    <label>
      <input class="filter-list-item__checkbox" type="checkbox">
      ${iterator}
    </label>
  </div>
</div>`;
  if (getDataArray(product as Array<HTMLElement>, 'data-brand').includes(`${iterator}`))
    (<HTMLElement>filtersList).appendChild(div);
  if (getDataArray(product as Array<HTMLElement>, 'data-category').includes(`${iterator}`))
    (<HTMLElement>filerCategoryList).appendChild(div);
}

// function createFiltersCategory(){
//   let filerCategoryList = document.getElementById('filter-category');
//   createFilter(filerCategoryList.appendChild(div))
// }

export function generateFilters(filters: Array<DummyItem>) {
  for (const key in filters) {
    createFilter(filters[key]);
  }
}

export default getBrand;
