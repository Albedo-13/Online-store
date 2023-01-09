// Modal
function addModal() {
  const openModal = document.querySelector('.summary__buy');
  const modal = document.querySelector('.modal');
  const form = modal.querySelector('.modal-form');
  const modalCloseBtn = modal.querySelector('.modal__close');
  const cardNumberInput = modal.querySelector('.card-number__number');
  const cardValidInput = modal.querySelector('.card-number__valid');
  const cardCVVInput = modal.querySelector('.card-number__cvv');

  openModal.addEventListener('click', () => {
    if (JSON.parse(localStorage.getItem('RS-online-cart')).length > 0) {
      modal.classList.remove('hide');
    }
  });

  modalCloseBtn.addEventListener('click', () => {
    modal.classList.add('hide');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hide');
    }
  });

  function changePaymentCardIcon(cardNumber) {
    const cardIcons = [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkdMZcTxIgmkIGjBHvY_maSuIOIWH79cHpn2LbnYT47YrYxrmCnumq4EEEyQ0sy_ZSSUY&usqp=CAU',
      'https://cdn-icons-png.flaticon.com/512/349/349221.png',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/989px-Mastercard-logo.svg.png',
    ];
    if (cardNumber[0] === '4') {
      document.querySelector('.card-number__image').setAttribute('src', cardIcons[1]);
    } else if (cardNumber[0] === '5') {
      document.querySelector('.card-number__image').setAttribute('src', cardIcons[2]);
    } else {
      document.querySelector('.card-number__image').setAttribute('src', cardIcons[0]);
    }
  }

  cardNumberInput.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      e.target.value = '';
    }
  });

  cardNumberInput.addEventListener('input', (e) => {
    changePaymentCardIcon(e.target.value);

    if (!/^[0-9\s]*$/.test(e.target.value)) {
      e.target.value = '';
      return;
    }
    if (+e.target.value.length > 4) {
      const value = e.target.value.split(' ').join('');
      const spaced = value.slice(0, 4) + ' ' + value.slice(4, 8) + ' ' + value.slice(8, 12) + ' ' + value.slice(12, 16);
      e.target.value = spaced.slice(0, 19);
    }
  });

  cardValidInput.addEventListener('input', (e) => {
    console.log(+e.target.value.length);
    console.log(+e.target.getAttribute('max'));

    if (!/^[0-9/]*$/.test(e.target.value)) {
      e.target.value = '';
      return;
    }
    if (+e.target.value.length >= 2) {
      const validateMonth = +e.target.value.split('/')[0];
      if (validateMonth > 12) {
        e.target.value = '12';
      }

      const value = e.target.value.split('/').join('');
      const spaced = value.slice(0, 2) + '/' + value.slice(2, 4);
      e.target.value = spaced.slice(0, 5);
    }
  });

  cardValidInput.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      e.target.value = '';
    }
  });

  cardCVVInput.addEventListener('input', (e) => {
    console.log(+e.target.value.length);
    console.log(+e.target.getAttribute('max'));
    if (+e.target.value.length > 2) {
      const value = e.target.value;
      e.target.value = value.slice(0, 3);
    }
  });

  form.addEventListener('submit', () => {
    localStorage.setItem('RS-online-cart', []);
  });
}

export default addModal;
