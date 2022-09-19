


//Toggle Units
const fahrenheitBtn = document.querySelector('#fahrenheit-btn');
const celsiusBtn = document.querySelector('#celsius-btn');
const unitSwitch = document.querySelector('.weather__unit-switch');

unitSwitch.addEventListener('click', toggleUnits);

function toggleUnits(e){
    if (e.target.id === 'celsius-btn'){
        fahrenheitBtn.classList.remove('active');
        celsiusBtn.classList.add('active');
    } else if (e.target.id === 'fahrenheit-btn') {
        celsiusBtn.classList.remove('active');
        fahrenheitBtn.classList.add('active');
    }
}
