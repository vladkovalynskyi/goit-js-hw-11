import { getData } from "./api";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const formEl = document.getElementById('search-form');
const galleryEl = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-more');
export let currentPage = 1;
export const perPage = 40;
let currentSearchQuery = '';
let totalHits = 0;

const galleryN = new SimpleLightbox('.gallery a', {
  captions: true,
  captionDelay: 200,
  captionsData: 'alt'
});

formEl.addEventListener('submit', onFormSubmit);
loadBtn.addEventListener('click', loadMore);

async function loadHeadlines(searchQuery) {
  currentSearchQuery = searchQuery;

  const data = await getData(searchQuery);
  if (data.hits && data.hits.length > 0) {
    totalHits = data.totalHits;
    toggleLoadMoreButton();
    return data.hits;
  }
}

function renderHeadLine({ largeImageURL, tags, likes, views, comments, downloads }) {
  return `<div class="photo-card">
    <a class="gallery__link" href="${largeImageURL}">
      <img src="${largeImageURL}" alt="${tags}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes: ${likes}</b>
        </p>
        <p class="info-item">
          <b>Views: ${views}</b>
        </p>
        <p class="info-item">
          <b>Comments: ${comments}</b>
        </p>
        <p class="info-item">
          <b>Downloads: ${downloads}</b>
        </p>
      </div>
    </a>
  </div>`;
}

function renderHeadlinesList(headlines) {
  if (currentPage === 1) {
    galleryEl.innerHTML = '';
  }

  const renderedHTML = headlines
    .map(headline => renderHeadLine(headline))
    .join("");

  galleryEl.insertAdjacentHTML("beforeend", renderedHTML);
  refreshSimpleLightbox();

  const { height: cardHeight } = galleryEl.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 0.75,
    behavior: "smooth",
  });
}

function onFormSubmit(event) {
  event.preventDefault();

  const searchInput = this.searchQuery;
  const searchQuery = searchInput.value.trim();

  if (searchQuery === '') {
    return;
  }

  currentPage = 1;

  loadHeadlines(searchQuery)
    .then(data => {
      renderHeadlinesList(data);
      checkEndOfResults();
    })
    .catch(error => {
      console.error(error);
      Notiflix.Notify.failure('<p>Sorry, there are no images matching your search query. Please try again.</p>');
      hideLoadMoreButton();
    });
}

function loadMore() {
  currentPage++;

  loadHeadlines(currentSearchQuery)
    .then(headlines => {
      renderHeadlinesList(headlines);
      checkEndOfResults();
    });
}

function hideLoadMoreButton() {
  loadBtn.style.display = 'none';
}

function showLoadMoreButton() {
  loadBtn.style.display = 'block';
}

function checkEndOfResults() {
  if (totalHits <= currentPage * perPage) {
    hideLoadMoreButton();
    Notiflix.Notify.failure('We\'re sorry, but you\'ve reached the end of search results.');
  }
}

function toggleLoadMoreButton() {
  totalHits <= currentPage * perPage ? hideLoadMoreButton() : showLoadMoreButton();
}

function refreshSimpleLightbox() {
  galleryN.refresh();
}
