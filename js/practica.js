
let alumnos = [];

while(true){
    let nombreAlumno = prompt ("Ingrese el nombre del alumno");

    alumnos.push ({
        nombre: nombreAlumno,
        notaFinal: 0
    })

    let opcion = prompt ("Desea agregar otro alumno? \n 1- Si \n 2- No");

    if(opcion ==2 ){
        break;
    }
};

for (let i = 0; i < alumnos.length; i++) {
    let alumno = alumnos[i]

    let nota1 = parseFloat(prompt(`Ingrese la primera nota de ${alumno.nombre}:`));
    let nota2 = parseFloat(prompt(`Ingrese la segunda nota de ${alumno.nombre}:`));
    let nota3 = parseFloat(prompt(`Ingrese la tercera nota de ${alumno.nombre}:`));

    
    if (nota1 < 0 || nota1 > 10 || nota2 < 0 || nota2 > 10 || nota3 < 0 || nota3 > 10) {
        console.log("Las notas de ${alumnos.nombre} deben estar entre 0 y 10.");
        i--;
        continue;
    }

    let notaFinal = (nota1 + nota2 + nota3) / 3;
    alumno.notaFinal = notaFinal;

    alumnos[i]= alumnos       
        
        
}