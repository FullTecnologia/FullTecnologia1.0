import Popup from './Popup';
export default Popup;

const button = document.getElementById('button');
const popup = document.querySelector('.popup-wrapper');

button.addEventListener('click', () => {
    popup.computedStyleMap.display = 'block'
})
popup.addEventListener('click', event => {
    const classNameClickedElement = event.target.classList[0]
    const className = ['popup-close', 'popup-wrapper', 'popup-link']
    const shouldClosePopup = className.some(className => className === classNameClickedElement)

    if(shouldClosePopup){
        popup.style.display = 'none'
    }
})
