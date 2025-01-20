// select city input
const cityInput = document.querySelector('.city-input');
// select search btn
const searchBtn = document.querySelector('.search-btn');
// API key
const apiKey = '992e740f0c6c102df1eead968076d548';

const weatherInfoSection = document.querySelector('.weather-info');
const notFoundSection = document.querySelector('.not-found');
const searchCitySection = document.querySelector('.search-city');

const countryTxt = document.querySelector('.country-txt');
const tempTxt = document.querySelector('.temp-txt');
const conditionTxt = document.querySelector('.condition-txt');
const humidityValueTxt = document.querySelector('.humidity-value-txt');
const windValueTxt = document.querySelector('.wind-value-txt');
const weatherSummeryImg = document.querySelector('.weather-summary-img');
const currentDateTxt = document.querySelector('.current-date-txt');

const forecastItemsContainer = document.querySelector('.forecast-item-container');


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

function getWeatherIcon(id) {
    console.log(id);
    if(id <= 232) return 'thunderstorm.svg'
    if(id <= 321) return 'drizzle.svg'
    if(id <= 531) return 'rain.svg'
    if(id <= 622) return 'snow.svg'
    if(id <= 781) return 'atmosphere.svg'
    if (id <= 800) return 'clean.svg'
    else return 'clouds.svg'
}

function getCurrentDate(){
    const currentDate = new Date()
    const options = {
        weekday: 'short',
        day: '2-digit',
        month: 'short'
    }

    return currentDate.toLocaleDateString('en-GB', options )
}

async function updateWeatherInfo(city) {
    const weatherData = await getFatchData('weather', city);

    if (weatherData.cod != 200) {
        showDisplaySection(notFoundSection)
        return 
    }
    
    console.log(weatherData)
    const{
        name: country,
        main: { temp, humidity },
        weather: [{ id, main }],
        wind: {speed}
    } = weatherData

    countryTxt.textContent = country
    tempTxt.textContent = Math.round(temp) + ' ℃'
    conditionTxt.textContent = main
    humidityValueTxt.textContent = humidity + '%'
    windValueTxt.textContent = speed + ' M/s'

    weatherSummeryImg.src = `assets/weather/${getWeatherIcon(id)}`
    currentDateTxt.textContent = getCurrentDate()

    await updateForecastsInfo(city)
    showDisplaySection(weatherInfoSection)

}


 async function updateForecastsInfo(city){
    const forecastData = await getFatchData('forecast', city );

    const timeTaken = '12:00:00';
    const todayDate = new Date().toISOString().split('T')[0];

    console.log(forecastData)
    console.log(todayDate)

    forecastItemsContainer.innerHTML = '';
    forecastData.list.forEach(forecastWeather => {
        if(forecastWeather.dt_txt.includes(timeTaken) &&
             !forecastWeather.dt_txt.includes(todayDate)){
              updateForecastItems(forecastWeather)
        }

    } )
}


function updateForecastItems(weatherData){
    console.log(weatherData)
    const {
        dt_txt: date,
        weather: [{ id}],
        main: { temp}
    } = weatherData


    const dateTaken = new Date(date)
    const dateOption = {
        day: '2-digit',
        month: 'short'
    }

    const dateResult = dateTaken.toLocaleDateString('en-US', dateOption )


    const forecastItem = `
          <div class="forecast-item">
                        <h5 class="forecast-item-date regular-txt">${dateResult}</h5>
                        <img src="assets/weather/${getWeatherIcon(id)}" class="forecast-item-img" alt="">
                        <h5 class="forecast-item-temp">${Math.round(temp)} ℃</h5>
           </div>
    `

        forecastItemsContainer.insertAdjacentHTML('beforeend', forecastItem)

}

function showDisplaySection(section) {
    [weatherInfoSection, searchCitySection, notFoundSection]
        .forEach(section => section.style.display = 'none')
    
    section.style.display = 'flex'
}