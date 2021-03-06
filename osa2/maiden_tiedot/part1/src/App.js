import React, { useState, useEffect } from 'react'
import Country from './components/Country'
import axios from 'axios'



const App = () => {

  const [ countries, setCountries] = useState([])
  const [ filter, setFilter] = useState('')
  

  
  const len = countries.filter(function(country) {
    return country.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1
  })

  

  function funktio(country) {
    setFilter(country.name)
    return (
      <div>
        <Country country={country}/>
      </div>
      
    )
    
  }

  const koukku = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }
  useEffect(koukku, [])

  




function filterCountries(countries) {
    return filter.length === 0  ? countries.map(country => <div key={country.name}>{country.name}</div>)
         : len.length >= 10     ? <p> Liikaa maita, tarkenna hakua</p>
         : len.length === 1     ? len.map(country => <div key={country.name}> {country.name}<Country country={country}/></div>)
         : len.map(country => <div key={country.name}>{country.name} <button onClick={() => funktio(country)}>show</button> </div>)
 
         
}




  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }
    return (
      <div>   
      <div>filter with: <input value={filter} 
        onChange={handleFilterChange}
        /></div>
      <ul>
      {filterCountries(countries)}
      </ul>
    </div>
    )
  }


export default App
