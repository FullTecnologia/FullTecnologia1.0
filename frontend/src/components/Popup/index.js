export { default } from './Popup'

const button = document.getElementById('button');
const popup = document.querySelector('.popup-wrapper');
const closePopupButton = document.getElementById('.popup-close');

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
