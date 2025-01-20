// select city input
const cityInput = document.querySelector('.city-input');
// select search btn
const searchBtn = document.querySelector('.search-btn');

searchBtn.addEventListener('click', () => {
    if (cityInput.value.trim() != '') {
        updateWeatherInfo()
        cityInput.value = '';
        cityInput.blur()
    }
});

cityInput.addEventListener('keydown', (event) => {
    if (event.key == 'Enter' &&
        cityInput.value.trim() != ''
    ) {
        updateWeatherInfo()
        cityInput.value = '';
        cityInput.blur()
    }
    
})