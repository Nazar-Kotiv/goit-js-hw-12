
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from 'axios'; 

const apiKey = "41495993-e4e29dd1119c53de35b82b765";
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const gallery = document.getElementById("gallery");
const loader = document.getElementById("loader");
const loadMoreBtn = document.getElementById('load-more');

let currentPage = 1;

searchForm.addEventListener("submit", handleSearch);
loadMoreBtn.addEventListener('click', loadMore);

function handleSearch(event) {
  event.preventDefault();
  const searchTerm = searchInput.value.trim();
  if (searchTerm === "") {
    return;
  }

  clearGallery();
  showLoader();

  fetchImages(searchTerm)
    .then((data) => {
      if (data.hits.length === 0) {
        showError("Вибачте, за вашим запитом не знайдено зображень. Будь ласка, спробуйте ще раз!");
      } else {
        renderGallery(data.hits);
        initLightbox();
      }
    })
    .catch((error) => {
      showError("Виникла помилка під час отримання зображень. Будь ласка, спробуйте пізніше.");
      console.error("Помилка отримання зображень:", error);
    })
    .finally(() => {
      hideLoader();
    });
}

async function fetchImages(query, page = 1) {
  const url = `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
}

function renderGallery(images) {
  const galleryHTML = images
    .map(
      (image) => `
        <a href="${image.largeImageURL}" class="gallery-item" data-lightbox="gallery">
          <img src="${image.webformatURL}" alt="${image.tags}">
          <div class="info">
            <p>${image.likes} лайків</p>
            <p>${image.views} переглядів</p>
            <p>${image.comments} коментарів</p>
            <p>${image.downloads} завантажень</p>
          </div>
        </a>
      `
    )
    .join("");
  gallery.innerHTML = galleryHTML;
}

function clearGallery() {
  gallery.innerHTML = "";
}

function initLightbox() {
  const lightbox = new SimpleLightbox(".gallery a");
  lightbox.refresh();
}

function showLoader() {
  loader.style.display = "block";
}

function hideLoader() {
  loader.style.display = "none";
}

function showError(message) {
  iziToast.error({
    title: "Помилка",
    message: message,
    position: "topCenter",
    timeout: 5000,
  });
}

async function loadMore() {
  showLoader();
  currentPage++;
  const searchTerm = searchInput.value.trim();

  try {
    const data = await fetchImages(searchTerm, currentPage);

    if (data.hits.length > 0) {
      renderGallery(data.hits);
      smoothScroll();
    } else {
      hideLoader();
      loadMoreBtn.style.display = 'none';
      showError("Вибачте, ви досягли кінця результатів пошуку.");
    }
  } catch (error) {
    hideLoader();
    showError("Виникла помилка під час отримання додаткових зображень. Будь ласка, спробуйте пізніше.");
    console.error("Помилка отримання зображень:", error);
  }
   finally {
    hideLoader();
  }
}

function smoothScroll() {
  const cardHeight = document.querySelector('.gallery-item').getBoundingClientRect().height;

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

