import { postData, getData, getWeather, adaptMetric, adaptCountry, getTemperatureUnit } from './js/app.js'

import './styles/style.scss'

document.getElementById("submitMood").addEventListener("click",getWeather);
document.getElementById("unitSelector").addEventListener("change",adaptMetric);
document.getElementById("countrySelector").addEventListener("change",adaptCountry);

export{ postData, getData, getWeather, adaptMetric, adaptCountry, getTemperatureUnit }
