import Popup from './Popup';
export default Popup;

const button = document.getElementById('openPopup');
const popup = document.querySelector('.popup-wrapper');
const closePopupButton = document.getElementById('closePopup');

if (button && popup && closePopupButton) {
    button.addEventListener('click', () => {
        popup.style.display = 'block';
    });

    closePopupButton.addEventListener('click', () => {
        popup.style.display = 'none';
    });
} else {
    console.error('Elementos não encontrados no DOM.');
}
