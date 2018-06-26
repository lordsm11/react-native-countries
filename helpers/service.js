import axios from 'axios';

const serviceUrl = "https://restcountries.eu/rest/v2/";

function getAllCountries() {
    return axios.get('https://restcountries.eu/rest/v2/all?fields=name;flag');
}

export default {
    getAllCountries
}