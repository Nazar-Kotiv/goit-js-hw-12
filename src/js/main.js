
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
    let currentSearchTerm = "";

    searchForm.addEventListener("submit", handleSearch);
    loadMoreBtn.addEventListener('click', loadMore);

    function handleSearch(event) {
      event.preventDefault();
      const searchTerm = searchInput.value.trim();
      if (searchTerm === "") {
        return;
      }

      currentSearchTerm = searchTerm;
      currentPage = 1;
      clearGallery();
      showLoader();

      fetchImages(currentSearchTerm, currentPage)
        .then((data) => {
          if (data.hits.length === 0) {
            showError("No images found for your search. Please try again!");
          } else {
            renderGallery(data.hits);
            initLightbox();
            showLoadMoreButton();
          }
        })
        .catch((error) => {
          showError("Error fetching images. Please try again later.");
          console.error("Error fetching images:", error);
        })
        .finally(() => {
          hideLoader();
        });
    }

    async function fetchImages(query, page = 1) {
      const perPage = 40;
      const url = `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;
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
                <p>${image.likes} likes</p>
                <p>${image.views} views</p>
                <p>${image.comments} comments</p>
                <p>${image.downloads} downloads</p>
              </div>
            </a>
          `
        )
        .join("");
      gallery.innerHTML += galleryHTML;
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

    function showLoadMoreButton() {
      loadMoreBtn.style.display = 'block';
    }

    async function loadMore() {
      showLoader();
      currentPage++;

      try {
        const data = await fetchImages(currentSearchTerm, currentPage);

        if (data.hits.length > 0) {
          renderGallery(data.hits);
          smoothScroll();
        } else {
          hideLoader();
          loadMoreBtn.style.display = 'none';
          showError("No more images available for your search.");
        }
      } catch (error) {
        hideLoader();
        showError("Error fetching additional images. Please try again later.");
        console.error("Error fetching images:", error);
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