import { showCounter } from './search.js';
import { getDataArray } from './generate-filters.js';
const product = document.getElementsByClassName('product');
let checkedFilters = [];

function addDisplayStyle(element, displayStyle) {
  return (element.style.display = displayStyle);
}

function saveCheckedFilters(event, item) {
  if (checkedFilters.includes(item.getAttribute('data-filter'))) {
    checkedFilters.splice(checkedFilters.indexOf(item.getAttribute('data-filter')), 1);
  } else {
    if (event) {
      checkedFilters.push(item.getAttribute('data-filter'));
    }
  }
  console.log(checkedFilters);
}

function filterCallSwitcher() {
  if(a >0 && b>0 ) {
    setMultiFilters();
  } else {
    setFilters();
  }
}

function getAttributeText(item, brand) {
  return checkedFilters.includes(item.getAttribute(brand).toLowerCase());
}

//TODO remove code repetition
function setMultiFilters() {
  if (checkedFilters.length) {
    Array.from(product).map((item) => {
      getAttributeText(item, 'data-brand') && getAttributeText(item, 'data-category')
        ? addDisplayStyle(item, 'flex')
        : addDisplayStyle(item, 'none');
    });
  } else {
    Array.from(product).map((item) => {
      addDisplayStyle(item, 'flex');
    });
  }
}

function setFilters() {
  if (checkedFilters.length) {
    Array.from(product).map((item) => {
      getAttributeText(item, 'data-brand') || getAttributeText(item, 'data-category')
        ? addDisplayStyle(item, 'flex')
        : addDisplayStyle(item, 'none');
    });
  } else {
    Array.from(product).map((item) => {
      addDisplayStyle(item, 'flex');
    });
  }
}

function filerProducts() {
  const checkboxes = document.querySelectorAll('.filter-list-item');
  Array.from(checkboxes).map((item) => {
    item.addEventListener('change', (event) => {
      if (event) {
        saveCheckedFilters(event, item);
        checkedFilters.length >=2 ? setMultiFilters() : setFilters();
        showCounter();
      }
    });
  });
}


export function dropFilters() {
  document.getElementById('filters-buttons__reset').addEventListener('click', (event) => {
    if (event) location.reload();
  });
}

// I didn't have time to optimize the code. Sry...
export default filerProducts;
