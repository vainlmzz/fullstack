import React from 'react'
import {useState, useEffect } from 'react'
import axios from 'axios'



const Weather = ({country}) => {

    const [ weather, setWeather] = useState(null);
    const access_key = process.env.YOUR_ACCESS_KEY

    const sääkoukku = () => {
        axios
          .get(
            `http://api.weatherstack.com/current?access_key=${access_key}&query=${country.name}`)
          .then((response) => {
            setWeather(response.data)
            
          })
          
      }
  
      useEffect(sääkoukku, [access_key,country.name])

   return weather !== null && (
       <div>
          <div> <strong>temperature:</strong> {weather.current.temperature} celcius</div>
           <img src={weather.current.weather_icons} alt="weather icon" width="250" height="200"></img>
           <div><strong>wind:</strong> {weather.current.wind_speed} mph in direction {weather.current.wind_dir}</div>
    
       </div>
   ) 
}


export default Weather