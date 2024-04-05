const BASE_URL = "https://swapi.dev/api/";

// Función para obtener los datos de la API
async function makeRequest(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error en la solicitud");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

async function getFilms() {
  return makeRequest(`${BASE_URL}films/`);
}

async function getPeople() {
  return makeRequest(`${BASE_URL}people/`);
}

async function getPlanets() {
  return makeRequest(`${BASE_URL}planets/`);
}

async function getSpecies() {
  return makeRequest(`${BASE_URL}species/`);
}

async function getStarships() {
  return makeRequest(`${BASE_URL}starships/`);
}

async function getVehicles() {
  return makeRequest(`${BASE_URL}vehicles/`);
}

async function getDetail(detailUrl) {
  return makeRequest(detailUrl);
}

async function getPageData(pageUrl) {
  try {
    const data = await makeRequest(pageUrl);
    return data;
  } catch (error) {
    console.error("Error fetching data for page:", error);
    throw error;
  }
}

// Definir la función de búsqueda
async function searchRequest(searchTerm) {
  try {
    const searchResponse = await fetch(
      `https://swapi.dev/api/people/?search=${searchTerm}`,
    );
    const data = await searchResponse.json();
    return data.results;
  } catch (error) {
    console.error("Error with searching element:", error);
    throw error;
  }
}

export {
  makeRequest,
  getFilms,
  getPeople,
  getPlanets,
  getSpecies,
  getStarships,
  getVehicles,
  getDetail,
  getPageData,
  searchRequest,
};
