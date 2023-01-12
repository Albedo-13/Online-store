// Modal
function addModal() {
  const openModal = document.querySelector('.summary__buy') as HTMLElement;
  const modal = document.querySelector('.modal') as HTMLElement;
  const form = modal.querySelector('.modal-form') as HTMLElement;
  const modalCloseBtn = modal.querySelector('.modal__close') as HTMLElement;
  const cardNumberInput = modal.querySelector('.card-number__number') as HTMLElement;
  const cardValidInput = modal.querySelector('.card-number__valid') as HTMLElement;
  const cardCVVInput = modal.querySelector('.card-number__cvv') as HTMLElement;

  openModal.addEventListener('click', () => {
    if (JSON.parse(<string>localStorage.getItem('RS-online-cart')).length > 0) {
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

  function changePaymentCardIcon(cardNumber: string) {
    const cardIcons = [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkdMZcTxIgmkIGjBHvY_maSuIOIWH79cHpn2LbnYT47YrYxrmCnumq4EEEyQ0sy_ZSSUY&usqp=CAU',
      'https://cdn-icons-png.flaticon.com/512/349/349221.png',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/989px-Mastercard-logo.svg.png',
    ];
    if (cardNumber[0] === '4') {
      (<HTMLImageElement>document.querySelector('.card-number__image')).setAttribute('src', cardIcons[1]);
    } else if (cardNumber[0] === '5') {
      (<HTMLImageElement>document.querySelector('.card-number__image')).setAttribute('src', cardIcons[2]);
    } else {
      (<HTMLImageElement>document.querySelector('.card-number__image')).setAttribute('src', cardIcons[0]);
    }
  }

  cardNumberInput.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      (<HTMLInputElement>e.target).value = '';
    }
  });

  cardNumberInput.addEventListener('input', (e) => {
    changePaymentCardIcon((<HTMLInputElement>e.target).value);

    if (!/^[0-9\s]*$/.test((<HTMLInputElement>e.target).value)) {
      (<HTMLInputElement>e.target).value = '';
      return;
    }
    if (+(<HTMLInputElement>e.target).value.length > 4) {
      const value = (<HTMLInputElement>e.target).value.split(' ').join('');
      const spaced = value.slice(0, 4) + ' ' + value.slice(4, 8) + ' ' + value.slice(8, 12) + ' ' + value.slice(12, 16);
      (<HTMLInputElement>e.target).value = spaced.slice(0, 19);
    }
  });

  cardValidInput.addEventListener('input', (e) => {
    if (!/^[0-9/]*$/.test((<HTMLInputElement>e.target).value)) {
      (<HTMLInputElement>e.target).value = '';
      return;
    }
    if (+(<HTMLInputElement>e.target).value.length >= 2) {
      const validateMonth = +(<HTMLInputElement>e.target).value.split('/')[0];
      if (validateMonth > 12) {
        (<HTMLInputElement>e.target).value = '12';
      }

      const value = (<HTMLInputElement>e.target).value.split('/').join('');
      const spaced = value.slice(0, 2) + '/' + value.slice(2, 4);
      (<HTMLInputElement>e.target).value = spaced.slice(0, 5);
    }
  });

  cardValidInput.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      (<HTMLInputElement>e.target).value = '';
    }
  });

  cardCVVInput.addEventListener('input', (e) => {
    if (+(<HTMLInputElement>e.target).value.length > 2) {
      const value = (<HTMLInputElement>e.target).value;
      (<HTMLInputElement>e.target).value = value.slice(0, 3);
    }
  });

  form.addEventListener('submit', () => {
    localStorage.setItem('RS-online-cart', JSON.stringify([]));
  });
}

export default addModal;
