import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ country }) => {
    const [ weather, setWeather ] = useState(null)

    const api = process.env.REACT_APP_WEATHER_API
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${country.capital}&APPID=${api}&units=metric`

    useEffect(() => {
     axios.get(url)
          .then(response => {
              setWeather(response.data)
          })
    }, [country.capital,url])

    if (!weather) {
        return (
            <div>
                Loading..
            </div>
        )
    }

    return(
        <>
            <h3>Weather in {country.capital} </h3>
            <p><b>temperature:</b> {weather.main.temp}<span>&#8451;</span> - <b>Feels like: </b> {weather.main.feels_like}<span>&#8451;</span></p>
            <p><b>temperature min: </b> {weather.main.temp_min}<span>&#8451;</span> <b>temperature max: </b> {weather.main.temp_max}<span>&#8451;</span></p>
            <p><b>{weather.weather[0].main}</b></p>
            <p><img alt="icon" src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} /></p>
            <p><b>wind: </b> {weather.wind.speed} kph </p>
        </>
    )
}

export default Weather