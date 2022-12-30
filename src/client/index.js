import { postData, getData, getPostalCode, getTemperatureUnit } from './js/app.js'

import './styles/style.scss'

import './media/Paris_beetle.jpg'

document.getElementById("enterTrip").addEventListener("click",getPostalCode);

export{ postData, getData, getPostalCode, getTemperatureUnit }
