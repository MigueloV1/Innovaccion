// Función para mostrar la sección seleccionada
function showSection(sectionId) {
  // Oculta todas las secciones
  let sections = document.querySelectorAll('.main-section');
  sections.forEach(section => {
    section.style.display = 'none';
  });

  // Muestra la sección seleccionada
  document.getElementById(sectionId).style.display = 'block';
}

// Función para registrar una nueva vacante
document.getElementById("vacancy-form").addEventListener("submit", function (e) {
  e.preventDefault();

  // Obtener los valores del formulario de vacantes
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

  // Mensaje de confirmación
  alert("Vacante registrada correctamente.");

  // Limpia el formulario
  document.getElementById("vacancy-form").reset();
});

// Función para buscar vacantes
function searchJobs() {
  // Obtiene los criterios de búsqueda del formulario
  let searchTitle = document.getElementById("search-title").value.toLowerCase();
  let searchLocation = document.getElementById("search-location").value.toLowerCase();

  // Recupera las vacantes almacenadas en el Local Storage
  let vacancies = JSON.parse(localStorage.getItem("vacancies")) || [];

  // Filtra las vacantes según los criterios ingresados
  let filteredVacancies = vacancies.filter(vacancy => {
    return vacancy.jobTitle.toLowerCase().includes(searchTitle) &&
           vacancy.jobLocation.toLowerCase().includes(searchLocation);
  });

  // Muestra los resultados en el contenedor de resultados
  let resultsContainer = document.getElementById("results-list");
  resultsContainer.innerHTML = ""; // Limpia los resultados anteriores

  // Si hay vacantes que coinciden, crea elementos HTML para cada una
  if (filteredVacancies.length > 0) {
    filteredVacancies.forEach(vacancy => {
      // Crea un nuevo elemento <li> para cada vacante
      let vacancyItem = document.createElement("li");
      vacancyItem.innerHTML = `
        <strong>${vacancy.jobTitle}</strong> en <strong>${vacancy.jobLocation}</strong><br>
        <em>${vacancy.companyName}</em><br>
        <p>${vacancy.jobDescription}</p>
        <button class="btn" onclick="readText('Título del trabajo: ${vacancy.jobTitle}, Ubicación: ${vacancy.jobLocation}, Empresa: ${vacancy.companyName}. Descripción: ${vacancy.jobDescription}')">Escuchar Vacante</button>
      `;
      resultsContainer.appendChild(vacancyItem);
    });
  } else {
    // Si no se encuentran resultados, muestra un mensaje
    resultsContainer.innerHTML = "<p>No se encontraron vacantes para los criterios de búsqueda especificados.</p>";
  }

  // Muestra un mensaje de resumen de la búsqueda
  alert(`Se encontraron ${filteredVacancies.length} vacantes.`);
}

// Función para leer texto en voz alta usando SpeechSynthesis
function readText(text) {
  // Verificar que el navegador soporte la API de lectura
  if ('speechSynthesis' in window) {
    // Crear una nueva instancia de SpeechSynthesisUtterance con el texto proporcionado
    let utterance = new SpeechSynthesisUtterance(text);

    // Configurar propiedades de la voz (puedes ajustar la velocidad, tono, etc.)
    utterance.rate = 1; // Velocidad de lectura (1 es la velocidad normal)
    utterance.pitch = 1; // Tono de la voz (1 es el tono normal)

    // Iniciar la lectura
    window.speechSynthesis.speak(utterance);
  } else {
    alert('Lo siento, tu navegador no soporta la lectura en voz alta.');
  }
}
