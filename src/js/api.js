import axios from "axios";
import Notiflix from "notiflix";
import { currentPage, perPage } from './index';

const API_KEY = '37352949-d51cc3913c6f19a152f1908cc';
axios.defaults.baseURL = 'https://pixabay.com/api/'

export async function getData(searchQuery) {
    const res = await axios.get(getRequestUrl(searchQuery));
    if (res.status !== 200) {
        throw new Notiflix.Notify.failure(response.statusText || response.status);
    }
    return res.data;
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