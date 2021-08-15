import axios from 'axios'



const baseUrl = '/api/persons'

const haeKaikki = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}


const luoP = nameObject => {
    const request = axios.post(baseUrl, nameObject)
    return request.then(response => response.data)
}
  

const poistaP = (id, nameObject) => {
    const request = axios.delete(`${baseUrl}/${id}`, nameObject)
    console.log(request)
    return request.then(response => response.data)
    
}

const muokkaaP = (id, nameObject) => {
    const request = axios.put(`${baseUrl}/${id}`, nameObject)
    console.log(request)
    return request.then(response => response.data)
    
}


export default { haeKaikki,luoP,poistaP, muokkaaP }