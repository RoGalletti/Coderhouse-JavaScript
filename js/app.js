let alumnos = [];
let numAlumnos = 30;

for (let i = 0; i < numAlumnos; i++) {
    let nombre = prompt(`Ingrese el nombre del alumno ${i + 1}:`);
    let nota1 = parseFloat(prompt(`Ingrese la primera nota de ${nombre}:`));
    let nota2 = parseFloat(prompt(`Ingrese la segunda nota de ${nombre}:`));
    let nota3 = parseFloat(prompt(`Ingrese la tercera nota de ${nombre}:`));

    // Validar que las notas estén en el rango correcto
    if (nota1 < 0 || nota1 > 10 || nota2 < 0 || nota2 > 10 || nota3 < 0 || nota3 > 10) {
        console.log(`Las notas de ${nombre} deben estar entre 0 y 10.`);
        i--; // Para no contar este intento
        continue;
    }

    let notaFinal = (nota1 + nota2 + nota3) / 3;
    alumnos.push({ nombre: nombre, notaFinal: notaFinal.toFixed(2) });
}

console.log("Notas finales de los alumnos:");
for (let i = 0; i < alumnos.length; i++) {
    console.log(`${alumnos[i].nombre}: ${alumnos[i].notaFinal}`);
}



