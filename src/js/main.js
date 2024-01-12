
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import "simplelightbox/dist/simple-lightbox.min.css";
import "izitoast/dist/css/iziToast.min.css";

const apiKey = "41495993-e4e29dd1119c53de35b82b765";
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const gallery = document.getElementById("gallery");
const loader = document.getElementById("loader");

searchForm.addEventListener("submit", handleSearch);

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
        showError("Sorry, there are no images matching your search query. Please try again!");
      } else {
        renderGallery(data.hits);
        initLightbox();
      }
    })
    .catch((error) => {
      showError("An error occurred while fetching images. Please try again later.");
      console.error("Error fetching images:", error);
    })
    .finally(() => {
      hideLoader();
    });
}

function fetchImages(query) {
  const url = `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`;
  return fetch(url).then((response) => response.json());
}

function renderGallery(images) {
  const galleryHTML = images
    .map(
      (image) => `
        <a href="${image.largeImageURL}" class="gallery-item" data-lightbox="gallery">
          <img src="${image.webformatURL}" alt="${image.tags}">
          <div class="info">
            <p>${image.likes} likes</p>
            <p>${image.views} views</p>
            <p>${image.comments} comments</p>
            <p>${image.downloads} downloads</p>
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
    title: "Error",
    message: message,
    position: "topCenter",
    timeout: 5000,
  });
}

