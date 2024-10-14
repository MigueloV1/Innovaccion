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
  let jobDisability = document.getElementById("job-disability").value; // Tipo de discapacidad admitida

  // Crear un objeto con los datos de la vacante
  let newVacancy = {
    companyName,
    jobTitle,
    jobLocation,
    jobDescription,
    jobDisability // Agregar el campo discapacidad
  };

  // Recuperar las vacantes existentes del Local Storage
  let vacancies = JSON.parse(localStorage.getItem("vacancies")) || [];

  // Agregar la nueva vacante al array
  vacancies.push(newVacancy);

  // Guardar las vacantes actualizadas en el Local Storage
  localStorage.setItem("vacancies", JSON.stringify(vacancies));

  // Mensaje de confirmación
  alert("Vacante registrada correctamente.");

  // Limpiar el formulario
  document.getElementById("vacancy-form").reset();
});

// Función para buscar vacantes
function searchJobs() {
  // Obtener los criterios de búsqueda del formulario
  let searchTitle = document.getElementById("search-title").value.toLowerCase();
  let searchLocation = document.getElementById("search-location").value.toLowerCase();
  let searchDisability = document.getElementById("search-disability").value.toLowerCase();

  // Recuperar las vacantes almacenadas en el Local Storage
  let vacancies = JSON.parse(localStorage.getItem("vacancies")) || [];

  // Filtrar las vacantes según los criterios ingresados
  let filteredVacancies = vacancies.filter(vacancy => {
    let matchTitle = vacancy.jobTitle.toLowerCase().includes(searchTitle);
    let matchLocation = vacancy.jobLocation.toLowerCase().includes(searchLocation);
    let matchDisability = (searchDisability === 'todas') || (vacancy.jobDisability.toLowerCase() === searchDisability);
    
    return matchTitle && matchLocation && matchDisability;
  });

  // Mostrar los resultados en el contenedor de resultados
  let resultsContainer = document.getElementById("results-list");
  resultsContainer.innerHTML = ""; // Limpiar los resultados anteriores

  // Si hay vacantes que coinciden, crear elementos HTML para cada una
  if (filteredVacancies.length > 0) {
    filteredVacancies.forEach(vacancy => {
      // Crear un nuevo elemento <li> para cada vacante
      let vacancyItem = document.createElement("li");
      vacancyItem.innerHTML = `
        <strong>${vacancy.jobTitle}</strong> en <strong>${vacancy.jobLocation}</strong><br>
        <em>${vacancy.companyName}</em><br>
        <p>${vacancy.jobDescription}</p>
        <p><strong>Discapacidad Admitida:</strong> ${vacancy.jobDisability}</p>
      `;
      resultsContainer.appendChild(vacancyItem);
    });
  } else {
    // Si no se encuentran resultados, mostrar un mensaje
    resultsContainer.innerHTML = "<p>No se encontraron vacantes para los criterios de búsqueda especificados.</p>";
  }
}

// Función para leer texto en voz alta usando SpeechSynthesis
function readText(text) {
  console.log("Función readText llamada con el siguiente texto: ", text); // Mensaje de depuración

  // Verificar que el navegador soporte la API de lectura
  if ('speechSynthesis' in window) {
    // Crear una nueva instancia de SpeechSynthesisUtterance con el texto proporcionado
    let utterance = new SpeechSynthesisUtterance(text);

    // Configurar propiedades de la voz (puedes ajustar la velocidad, tono, etc.)
    utterance.rate = 1; // Velocidad de lectura (1 es la velocidad normal)
    utterance.pitch = 1; // Tono de la voz (1 es el tono normal)

    // Iniciar la lectura
    window.speechSynthesis.speak(utterance);
    console.log("Iniciando lectura en voz alta..."); // Mensaje de depuración
  } else {
    alert('Lo siento, tu navegador no soporta la lectura en voz alta.');
  }
}
