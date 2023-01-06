const ascSort = document.getElementById('products__droplist-asc');
const descSort = document.getElementById('products__droplist-desc');
const select = document.getElementById('products__droplist');
const products = document.getElementsByClassName('product');

function hideAllCards(){
  Array.from(products).map(item => item.style.display = 'none');
}

function sortByPrice(db) {
  //db.sort((a,b) => a.price > b.price? 1: -1);
  select.addEventListener('change', function () {
    hideAllCards();
    let optionText = this.options[this.selectedIndex].text;
    if (optionText === ascSort.text) {
      console.log(db);
      return db.sort((a, b) => (a.price > b.price ? 1 : -1));
    }
    if (optionText === descSort.text) {
      console.log(db);
      return db.sort((a, b) => (a.price < b.price ? 1 : -1));
    }
  });
}

export default sortByPrice;
