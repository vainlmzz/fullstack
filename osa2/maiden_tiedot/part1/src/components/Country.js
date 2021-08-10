//import {React, useState, useEffect } from 'react'
//import axios from 'axios'
import Weather from './Weather'
import React from 'react'





const Country = ({country}) => {
    

  return (
    <div> 
        <h1> {country.name} </h1>
        <div> capital: {country.capital}</div>
        <div> population: {country.population}</div>
        <h2> languages </h2>
        <ul>
            {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
        </ul>
        <p>
        <img src={country.flag} alt="flag" width="300" height="200"></img>
        </p>
        <h2> Weather in {country.capital} </h2>
        <Weather country={country}/>
    </div>
  )
  
}

export default Country