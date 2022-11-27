import { fetchImages } from './js/fetchPhoto'
import Notiflix from 'notiflix';


const refs = {
    searchForm: document.querySelector(".search-form"),
    inputData: document.querySelector(".search-form-inp"),
    searchBtn: document.querySelector(".search-form-btn"),
    gallery: document.querySelector(".gallery"),
    loadMoreBtn: document.querySelector(".load-btn"),
};

refs.loadMoreBtn.classList.add('load-btn-none');
let page = 1;

refs.searchForm.addEventListener("submit", onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(evt){
    evt.preventDefault();
    clearImages();
    const searchValue = refs.inputData.value.trim();

    if(searchValue){
        fetchImages(searchValue, page)
        .then(data => {
            if (data.hits.length === 0) {
                refs.loadMoreBtn.style.display = 'none';
                return Notiflix.Notify.warning(
                    'Sorry, there are no images matching your search query. Please try again.'
                );
            }  if(data.hits.length >= 40) {
                renderMarkup(data.hits);
                Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
                refs.loadMoreBtn.style.display = 'block';
            }
            else {
                onLoadMore(data.hits);
                refs.loadMoreBtn.style.display = 'none';
            }
        })
        .catch(function (error) {
            console.log('Error', error.message);
        });
    }
    if(searchValue === ''){
        Notiflix.Notify.failure('Oops, please enter data in the search field');
    }

};

function onLoadMore() {
    refs.loadMoreBtn.classList.remove('load-btn-none');
    page += 1;
    const searchValue = refs.inputData.value.trim();

    fetchImages(searchValue, page).then(data => {
        renderMarkup(data.hits);
        const totalPage = data.totalHits / 40;

        if(totalPage <= page) {
            refs,loadMoreBtn.style.display = 'none';
            Notiflix.Notify.warning("We're sorry, but you've reached the end of search results."
            )
        }
    })
};

function renderMarkup(images) {
    const arraOfImg = images.map(({ webformatURL,largeImageURL,likes,views,comments,downloads}) =>
`<div class='photo-card'>
    <a class='gallery__item' href=${largeImageURL}>
      <img
        class='gallery__image'
        src=${webformatURL}
        alt={{tags}}
        loading='lazy'
      />
    </a>

    <div class='info'>
      <p class='info-item'>
        <b>Likes</b>
        ${likes}
      </p>
      <p class='info-item'>
        <b>Views</b>
        ${views}
      </p>
      <p class='info-item'>
        <b>Comments</b>
        ${comments}
      </p>
      <p class='info-item'>
        <b>Downloads</b>
        ${downloads}
      </p>
    </div>
  </div>`
        ).join("");

    refs.gallery.insertAdjacentHTML('beforeend', arraOfImg);
  }

function clearImages(){
    page = 1;
    refs.loadMoreBtn.style.display = 'none';
    refs.gallery.innerHTML = '';
};