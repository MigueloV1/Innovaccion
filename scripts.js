// Mostrar la sección seleccionada
function showSection(sectionId) {
  let sections = document.querySelectorAll('.main-section');
  sections.forEach(section => {
    section.style.display = 'none';
  });
  document.getElementById(sectionId).style.display = 'block';
}

// Función para registrar una nueva vacante
document.getElementById("vacancy-form").addEventListener("submit", function (e) {
  e.preventDefault();

  // Obtener los valores del formulario
  let companyName = document.getElementById("company-name").value;
  let jobTitle = document.getElementById("job-title").value;
  let jobLocation = document.getElementById("job-location").value;
  let jobDescription = document.getElementById("job-description").value;

  // Crear un objeto con los datos de la vacante
  let newVacancy = {
    companyName,
    jobTitle,
    jobLocation,
    jobDescription
  };

  // Recuperar las vacantes existentes del Local Storage
  let vacancies = JSON.parse(localStorage.getItem("vacancies")) || [];

  // Agregar la nueva vacante al array
  vacancies.push(newVacancy);

  // Guardar las vacantes actualizadas en el Local Storage
  localStorage.setItem("vacancies", JSON.stringify(vacancies));

  // Mostrar mensaje de confirmación y limpiar el formulario
  alert("Vacante registrada correctamente.");
  document.getElementById("vacancy-form").reset();
});

// Función para buscar vacantes
function searchJobs() {
  let searchTitle = document.getElementById("search-title").value.toLowerCase();
  let searchLocation = document.getElementById("search-location").value.toLowerCase();

  let vacancies = JSON.parse(localStorage.getItem("vacancies")) || [];

  // Filtrar las vacantes según los criterios ingresados
  let filteredVacancies = vacancies.filter(vacancy => {
    return vacancy.jobTitle.toLowerCase().includes(searchTitle) &&
           vacancy.jobLocation.toLowerCase().includes(searchLocation);
  });

  // Mostrar los resultados en el contenedor de resultados
  let resultsContainer = document.getElementById("results-list");
  resultsContainer.innerHTML = ""; // Limpia los resultados anteriores

  if (filteredVacancies.length > 0) {
    filteredVacancies.forEach(vacancy => {
      let vacancyItem = document.createElement("li");
      vacancyItem.innerHTML = `
        <strong>${vacancy.jobTitle}</strong> en <strong>${vacancy.jobLocation}</strong><br>
        <em>${vacancy.companyName}</em><br>
        <p>${vacancy.jobDescription}</p>
      `;
      resultsContainer.appendChild(vacancyItem);
    });
  } else {
    resultsContainer.innerHTML = "<p>No se encontraron vacantes para los criterios de búsqueda especificados.</p>";
  }

  alert(`Se encontraron ${filteredVacancies.length} vacantes.`);
}
