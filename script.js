// select city input
const cityInput = document.querySelector('.city-input');
// select search btn
const searchBtn = document.querySelector('.search-btn');
// API key
const apiKey = '992e740f0c6c102df1eead968076d548';

const weatherInfoSection = document.querySelector('.weather-info');
const notFoundSection = document.querySelector('.not-found');
const searchCitySection = document.querySelector('.search-city');

searchBtn.addEventListener('click', () => {
    if (cityInput.value.trim() != '') {
        updateWeatherInfo(cityInput.value)
        cityInput.value = '';
        cityInput.blur()
    }
});

cityInput.addEventListener('keydown', (event) => {
    if (event.key == 'Enter' &&
        cityInput.value.trim() != ''
    ) {
        updateWeatherInfo(cityInput.value)
        cityInput.value = '';
        cityInput.blur()
    }
    
})


async function getFatchData(endPoint, city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(apiUrl);
    return response.json();
}

async function updateWeatherInfo(city) {
    const weatherData = await getFatchData('weather', city);

    if (weatherData.cod != 200) {
        showDisplaySection(notFoundSection)
        return 
    }

    showDisplaySection(weatherInfoSection)

}

function showDisplaySection(section) {
    [weatherInfoSection, searchCitySection, notFoundSection]
        .forEach(section => section.style.display = 'none')
    
    section.style.display = 'flex'
}