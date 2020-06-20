const chalk = require('chalk')
const { default: Axios } = require('axios')
const fs = require('fs')
const path = require('path')

require('dotenv').config()

console.log(chalk.green('Weather CLI'))
const URL = 'https://api.weatherbit.io/v2.0/current'

if (process.argv.length > 2) {
  Axios.get(`${URL}?city=${process.argv[2]}&key=${process.env.API_KEY}`)
    .then(r => {
      const response = r.data
      if (response.length !== 0) {
        const cityName = chalk.yellow(response.data[0].city_name)
        const tempCelsius = response.data[0].temp
        const tempFahrenheit = (tempCelsius * 9 / 5) + 32
        const currentWeather = chalk.yellow(response.data[0].weather.description)
        const WeatherInfo = `Current temperature in ${cityName} is ${tempCelsius}C / ${tempFahrenheit}F 
Current Condition is ${currentWeather}`
        console.log('Writing the log to a file')
        console.log('======================================')
        fs.writeFileSync('weatherLog.log', WeatherInfo)
        console.log(`File is located in ${process.cwd()}/${path.basename('weatherLog.log')}`)
        console.log('======================================')
        console.log(WeatherInfo)
      } else {
        console.log(chalk.red('City name does not exists'))
      }
    }).catch(e => console.log(e))
} else {
  console.log(chalk.red('Please enter the city name'))
}
