let checkedFilters = [];

function addDisplayStyle(element, displayStyle) {
  return (element.style.display = displayStyle);
}

function saveCheckedFilters(event, item) {
  if (checkedFilters.includes(item.getAttribute('data-filter'))) {
    checkedFilters.splice(checkedFilters.indexOf(item.getAttribute('data-filter')));
  } else {
    if (event) {
      checkedFilters.push(item.getAttribute('data-filter'));
    }
  }
  filter();
  console.log(checkedFilters);
}

function filter() {
  const product = document.getElementsByClassName('product');
  if (checkedFilters.length) {
    Array.from(product).map((item) => {
      checkedFilters.includes(item.getAttribute('data-category').toLowerCase())
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
