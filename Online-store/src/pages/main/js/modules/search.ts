const searchInput = document.getElementById('products__search') as HTMLInputElement;
const product = document.getElementsByClassName('item-title');

export function reduceSpacesToAtoms(stringWithSpaces: string) {
  return stringWithSpaces.toLowerCase().replace(/\s/g, '').trim();
}

searchInput.oninput = function () {
  const searchData = (<HTMLInputElement>document.getElementById('products__search')).value as string;
  console.log(searchData);
  if (searchData) {
    getCollection(reduceSpacesToAtoms(searchData));
  }
  if (!searchData) location.reload();
};

function addDisplayStyle(element: HTMLElement, displayStyle: string) {
  (<HTMLElement>element.parentElement).style.display = displayStyle;
}

function getCollection(searchData: string) {
  if (searchData) {
    Array.from(product).filter((item) => {
      reduceSpacesToAtoms((<HTMLElement>item).innerHTML).includes(searchData)
        ? addDisplayStyle(<HTMLElement>item, 'flex')
        : addDisplayStyle(<HTMLElement>item, 'none');
    });
  }
}

export function showCounter() {
  const allCart = document.getElementsByClassName('product');
  const results = document.getElementById('products__total-find');
  let counter = 0;
  Array.from(allCart).forEach((element) => {
    if ((<HTMLElement>element).style.display === 'flex') {
      ++counter;
    }
  });
  (<HTMLElement>results).innerText = `Results: ${counter}`;
}

export default getCollection;
