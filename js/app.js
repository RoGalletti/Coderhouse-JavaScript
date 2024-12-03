const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "TU_DOMINIO.firebaseapp.com",
    projectId: "TU_PROJECT_ID",
    storageBucket: "TU_STORAGE_BUCKET.appspot.com",
    messagingSenderId: "TU_MESSAGING_SENDER_ID",
    appId: "TU_APP_ID"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


const nombreAlumnoInput = document.getElementById("nombreAlumno");
const agregarAlumnoBtn = document.getElementById("agregarAlumno");
const notasContenedor = document.getElementById("notas-contenedor");
const notasForm = document.getElementById("notasForm");
const calculadoraNotasBtn = document.getElementById("calcularNotas");
const resultadoDiv = document.getElementById("resultadoDiv");

let alumnoActual = "";

// Función para mostrar el formulario de notas
function mostrarFormularioNotas() {
    // Usando createElement y classList
    const nota1Input = document.createElement("input");
    nota1Input.type = "number";
    nota1Input.id = "nota1";
    nota1Input.placeholder = "Nota 1";
    
    const nota2Input = document.createElement("input");
    nota2Input.type = "number";
    nota2Input.id = "nota2";
    nota2Input.placeholder = "Nota 2";
    
    const nota3Input = document.createElement("input");
    nota3Input.type = "number";
    nota3Input.id = "nota3";
    nota3Input.placeholder = "Nota 3";
    
    // Limpiamos el formulario anterior
    notasForm.innerHTML = "";
    
    // Agregamos los inputs al formulario
    notasForm.appendChild(nota1Input);
    notasForm.appendChild(nota2Input);
    notasForm.appendChild(nota3Input);

    // Mostramos el contenedor de notas
    notasContenedor.style.display = "block";
}

// Cuando se hace clic en "Agregar Alumno"
agregarAlumnoBtn.onclick = function() {
    const nombreAlumno = nombreAlumnoInput.value.trim();

    if (nombreAlumno) {
        alumnoActual = nombreAlumno;
        mostrarFormularioNotas();
        nombreAlumnoInput.value = "";
    } else {
        alert("Por favor, ingresa un nombre de alumno.");
    }
};

// Función para calcular las notas y enviarlas a Firestore
calculadoraNotasBtn.onclick = function() {
    const nota1 = parseFloat(document.getElementById("nota1").value);
    const nota2 = parseFloat(document.getElementById("nota2").value);
    const nota3 = parseFloat(document.getElementById("nota3").value);

    if (!isNaN(nota1) && !isNaN(nota2) && !isNaN(nota3)) {
        const promedio = ((nota1 + nota2 + nota3) / 3).toFixed(2);

        // Enviar datos del alumno a Firebase Firestore
        enviarAlumno(alumnoActual, promedio);

        mostrarResultados();
        notasContenedor.style.display = "none";
        notasForm.innerHTML = "";
    } else {
        alert("Por favor, ingresa todas las notas.");
    }
};

// Función para enviar el alumno y su promedio a Firestore
function enviarAlumno(nombre, promedio) {
    const alumnoRef = db.collection("alumnos").doc();  // Genera un nuevo documento
    alumnoRef.set({
        nombre: nombre,
        promedio: promedio
    })
    .then(() => {
        console.log("Alumno agregado con éxito!");
    })
    .catch(error => {
        console.error("Error al agregar alumno: ", error);
    });
}

// Función para mostrar los resultados desde Firestore
function mostrarResultados() {
    // Recuperar alumnos de Firebase Firestore
    db.collection("alumnos").get()
    .then(querySnapshot => {
        // Limpiar el contenedor de resultados
        resultadoDiv.innerHTML = "<h2>Alumnos y sus notas finales</h2>";

        if (querySnapshot.empty) {
            resultadoDiv.innerHTML += "<p>No hay alumnos registrados.</p>";
            return;
        }

        // Iterar sobre cada documento de alumno
        querySnapshot.forEach(doc => {
            const alumno = doc.data();
            
            // Crear elementos de forma dinámica
            const alumnoElement = document.createElement("p");
            alumnoElement.classList.add("alumno");  // Añadir clase para estilo si lo deseas
            
            // Usar innerText para insertar texto
            alumnoElement.innerText = `${alumno.nombre}: Nota final ${alumno.promedio}`;
            
            // Agregar el nuevo elemento al contenedor de resultados
            resultadoDiv.appendChild(alumnoElement);
        });
    })
    .catch(error => {
        console.error("Error al recuperar los alumnos:", error);
        resultadoDiv.innerHTML = "<p>No se pudo cargar la lista de alumnos.</p>";
    });
}

// Cuando se carga la página, mostrar los resultados
document.addEventListener("DOMContentLoaded", mostrarResultados);






