import { postData, getData, getPostalCode, getTemperatureUnit, sayHello } from './js/app.js'

import './styles/style.scss'

import './media/Paris_beetle.jpg'

document.getElementById("enterTrip").addEventListener("click",sayHello);

export{ postData, getData, getPostalCode, getTemperatureUnit, sayHello }
