// Función para renderizar listas
function renderList(list) {
  let html = "<ul>";
  list.forEach((item) => {
    html += `<li>${item.name || item.title}</li>`;
  });
  html += "</ul>";
  return html;
}

// Función para renderizar detalles
function renderDetails(detail) {
  let html = "<div>";
  for (const [key, value] of Object.entries(detail)) {
    if (key !== "created" && key !== "edited" && key !== "url") {
      html += `<p><strong>${key}:</strong> ${value}</p>`;
    }
  }
  html += "</div>";
  return html;
}

//Función para renderizar los resultados de búsqueda
function renderSearchResults(results, container) {
  container.innerHTML = "";

  if (results.length === 0) {
    const noResultsMessage = document.createElement("p");
    noResultsMessage.textContent =
      "No se encontraron resultados para la búsqueda.";
    container.appendChild(noResultsMessage);
  } else {
    results.forEach((character) => {
      const li = document.createElement("li");
      li.textContent = character.name;
      container.appendChild(li);
    });
  }
}

export { renderList, renderDetails, renderSearchResults };
