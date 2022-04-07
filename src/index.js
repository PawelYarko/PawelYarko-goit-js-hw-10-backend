const debounce = require('lodash.debounce');
import API from './fetch-country'
import Notiflix from 'notiflix';
import './css/styles.css';
import countryCardTpl from './countries';
import countryNameList from './countries-list';

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

searchBox.addEventListener('input', debounce(onSearchBoxClick, DEBOUNCE_DELAY));

function onSearchBoxClick(e){
    const searchBoxValue = e.target.value.trim();
    
    API.fetchCountry(searchBoxValue)
.then(renderSerchResult)
.catch(error => {
    console.log(error)
});
// .finaly(() => );
}

function renderSerchResult(country){
    console.log(country)
    if(country.length > 10){
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");      
    }

    if(country.length >= 2 && country.length <= 10){
        renderCoutryList(country);
    }
    if(country.length === 1){
        countryList.remove();
        renderCoutryCard(country);
    }
    if(country.length === undefined){
        Notiflix.Notify.failure("Oops, there is no country with that name");
    }

}

function renderCoutryList(country){
    const countriesName = countryNameList(country);
    countryList.innerHTML = countriesName;
}

function renderCoutryCard(country){
    const markup = countryCardTpl(country);
    countryInfo.innerHTML = markup;
}

