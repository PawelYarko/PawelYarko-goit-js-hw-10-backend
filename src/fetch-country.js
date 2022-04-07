export default {fetchCountry}

function fetchCountry(countryName){
    const url = `https://restcountries.com/v3.1/name/${countryName}?fields=name,capital,population,flags,languages`;
    return fetch(url)
.then(response => {
    return response.json();
})
}