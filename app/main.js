import {
  getFilms,
  getPeople,
  getPlanets,
  getSpecies,
  getStarships,
  getVehicles,
  getDetail,
  getPageData,
  searchRequest,
} from "./services.js";
import { renderList, renderDetails, renderSearchResults } from "./render.js";

function renderContent(hash) {
  const mainRender = document.getElementById("mainRender");
  mainRender.innerHTML = "";

  switch (hash) {
    case "#/films":
      handleSection(getFilms, renderList, mainRender, (url) => url);
      break;
    case "#/people":
      handleSection(getPeople, renderList, mainRender, (url) => url);
      break;
    case "#/planets":
      handleSection(getPlanets, renderList, mainRender, (url) => url);
      break;
    case "#/species":
      handleSection(getSpecies, renderList, mainRender, (url) => url);
      break;
    case "#/starships":
      handleSection(getStarships, renderList, mainRender, (url) => url);
      break;
    case "#/vehicles":
      handleSection(getVehicles, renderList, mainRender, (url) => url);
      break;
    default:
      mainRender.innerHTML = "<p>No se encontraron datos para esta ruta.</p>";
  }
}

function handleSection(getData, renderList, mainRender, getDetailUrl) {
  getData()
    .then((data) => {
      const listData = renderList(data.results);
      mainRender.innerHTML = listData;

      const items = document.querySelectorAll("#mainRender li");

      items.forEach((item, index) => {
        const link = document.createElement("a");
        link.href = "#"; // Aquí deberías establecer la URL deseada

        link.addEventListener("click", (event) => {
          event.preventDefault();
          const detailUrl = getDetailUrl(data.results[index].url);
          showDetail(detailUrl);
        });
        item.parentNode.insertBefore(link, item);
        link.appendChild(item);
      });
    })
    .catch((error) => console.error(`Error fetching data: ${error}`));
}

function showDetail(detailUrl) {
  getDetail(detailUrl)
    .then((detail) => {
      const detailHtml = renderDetails(detail);
      const detailContainer = document.getElementById("detailContainer");
      detailContainer.innerHTML = detailHtml;
    })
    .catch((error) => console.error("Error fetching detail:", error));
}

const searchInput = document.getElementById("search");
const searchResults = document.getElementById("searchResults");

async function searchElements() {
  const searchTerm = searchInput.value.trim().toLowerCase();

  if (searchTerm === "") {
    searchResults.innerHTML = "";
    return;
  }

  try {
    const results = await searchRequest(searchTerm);
    renderSearchResults(results, searchResults);
  } catch (error) {
    console.error("Error occurred during search:", error);
  }
}

// Paginación
const paginationContainer = document.getElementById("pagination");

// Definir el estado inicial de la página
let currentPage = 1;
let totalPages = 2;

// Función para actualizar los elementos de la paginación según la página actual
function updatePagination() {
  // Actualizar el texto del span con el número de página actual
  currentPageSpan.textContent = currentPage;

  // Deshabilitar el botón de página previa si estamos en la primera página
  prevPageBtn.disabled = currentPage === 1;

  // Actualizar la lógica para ir a la página siguiente si no estamos en la última página
  nextPageBtn.disabled = currentPage === totalPages; // Ajusta 'totalPages' según tus necesidades
}

const prevPageBtn = document.createElement("button");
prevPageBtn.textContent = "Prev";
prevPageBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--; // Ir a la página anterior
    updatePagination(); // Actualizar la paginación
    // Aquí puedes agregar la lógica para cargar los datos de la página actual
  }
});

const currentPageSpan = document.createElement("span");
currentPageSpan.textContent = "1"; // Puedes establecer el número de página inicial aquí

const nextPageBtn = document.createElement("button");
nextPageBtn.textContent = "Next";
nextPageBtn.addEventListener("click", async () => {
  if (currentPage < totalPages) {
    currentPage++; // Ir a la página siguiente
    updatePagination(); // Actualizar la paginación
  }
});

paginationContainer.appendChild(prevPageBtn);
paginationContainer.appendChild(currentPageSpan);
paginationContainer.appendChild(nextPageBtn);

updatePagination();

searchInput.addEventListener("input", searchElements);

window.addEventListener("hashchange", () => {
  renderContent(window.location.hash);
});

renderContent(window.location.hash);
