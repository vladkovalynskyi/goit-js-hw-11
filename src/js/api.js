import axios from "axios";
import Notiflix from "notiflix";
import { currentPage, perPage } from './index';

const API_KEY = '37352949-d51cc3913c6f19a152f1908cc';
axios.defaults.baseURL = 'https://pixabay.com/api/'

export async function getData(searchQuery) {
    try {
        const res = await axios.get(getRequestUrl(searchQuery));
        return res.data;
    } catch(error) {
        throw Error(error.response?.statusText || error.message);
    }
}

export function getRequestUrl(searchQuery) {
    const params = {
        key: API_KEY,
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page: currentPage,
        per_page: perPage
    }
    const queryString = new URLSearchParams(params).toString();
    return `?${queryString}`;
}