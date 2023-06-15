import axios from 'axios';
import Notiflix from 'notiflix';
import simpleLightbox from 'simplelightbox';
import { getData } from './api';

const formEl = document.getElementById('search-form');
const galleryEl = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-more');
export let currentPage = 1;
export const perPage = 40;

formEl.addEventListener('submit', function (e) {
    e.preventDefault();
    clearGallery();
    performSearch();
});

loadBtn.addEventListener('click', performSearch());

let searchQuery = '';


