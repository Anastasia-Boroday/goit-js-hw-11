import { fetchPhoto } from './js/fetchPhoto'
import Notiflix from 'notiflix';

const refs = {
    form: document.querySelector('.search-form'),
    input:document.querySelector('.search-form-inp'),
    btnSearch: document.querySelector('.search-form-btn'),
    btnLoad: document.querySelector('.load-btn'),
    gallery: document.querySelector('gallery')
}

fetchPhoto("dog",1);
let page = 1;

refs.form.addEventListener('submit', onSearch);



function onSearch(evt){
    evt.preventDefault();
    clearImages();
    const searchValue = refs.input.value.trim();

    if(searchValue){
        fetchPhoto(searchValue, page)
        .then(data => {
            if(data.hits.length === 0) {
                return Notiflix.Notify.warning(
                    'Sorry, there are no images matching your search query. Please try again.'
                );
            } 
            else {
               return renderMarkup(data.hits);
                // Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);

            }
        })
        .catch(function (error) {
            console.log('Error', error.message);
        });
    }


    if(searchValue ===''){
        Notiflix.Notify.failure('Oops, please enter data in the search field');
    }

};

// -----------------------------------------------------------------------------
  
function renderMarkup(images) {
      const arraOfImg = images.map(({ webformatURL,largeImageURL,likes,views,comments,downloads}) =>
        `<div class='photo-card'>
    <a class='gallery__item' href={{largeImageURL}}>
      <img
        class='gallery__image'
        src={{webformatURL}}
        alt={{tags}}
        loading='lazy'
      />
    </a>

    <div class='info'>
      <p class='info-item'>
        <b>Likes</b>
        {{likes}}
      </p>
      <p class='info-item'>
        <b>Views</b>
        {{views}}
      </p>
      <p class='info-item'>
        <b>Comments</b>
        {{comments}}
      </p>
      <p class='info-item'>
        <b>Downloads</b>
        {{downloads}}
      </p>
    </div>
  </div>` 
        ).join("");
    // refs.gallery.innerHTML = arraOfImg;   
    
    refs.gallery.insertAdjacentHTML('beforeend', arraOfImg);

  }



//------------------------------------------------------------------------------
// function clearImages(){
//     page = 1;
//     refs.btnLoad.style.display = 'none';

// };
