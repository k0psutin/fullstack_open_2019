import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Weather = ( {query} ) => {
    const [city, setCity] = useState('')
    const [temperature, setTemperature] = useState('')
    const [wind, setWind] = useState('')
    const [pic, setPic] = useState('')

    const cityWeather = `http://api.weatherstack.com/current?access_key=047a2626b00a1360ba82640b2c9e0fb7&query=${query}`

  useEffect(() => {
    axios
     .get(cityWeather)
     .then(response => {
       const wth = response.data

       setCity(wth.location.name)
       setTemperature(wth.current.temperature)
       setPic(wth.current.weather_icons[0])
       setWind(`${wth.current.wind_speed} kph direction ${wth.current.wind_dir}`)
     })
    },[cityWeather])

    return(
        <div>
            <h3>Weather in {city} </h3>
            <p><b>temperature:</b> {temperature} Celsius</p>
            <p><img alt={city} src={pic}></img></p>
            <p><b>wind: </b> {wind}</p>
        </div>
    )
}

export default Weather