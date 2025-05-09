// ofuscador css https://www.phpkobo.com/css-obfuscator
// ofuscador js https://obfuscator.io/
// subir al servidor https://125mb.com/

// declarar variavbles globales
var contador = 0;

//    el utilizar   `` permite concatenar variables sin necesidad de utilizar el signo + y con salto de linea incluido
    //    el utilizar '' o "" concatenacion indivitual, utiliza el + y no permite salto de linea


   // Variable global para almacenar la imagen actual de la reina
let reinaActual = './img/queen.png'; // Imagen predeterminada (Reina Gold)

function cambiarReina(valor) {
    // Cambia la imagen de la reina según la opción seleccionada
    switch (valor) {
        case 'gold':
            reinaActual = './img/queen.png'; // Reina Gold (predeterminada)
            break;
        case 'white':
            reinaActual = './img/queenB.png'; // Reina Blanca
            break;
        case 'dark':
            reinaActual = './img/queenN.png'; // Reina Dark
            break;
        default:
            reinaActual = './img/queen.png'; // Por defecto, Reina Gold
            break;
    }

    // Reemplaza todas las reinas en el tablero con la nueva imagen
    const filas = document.querySelectorAll('#tablero tr');
    filas.forEach(fila => {
        const celdas = fila.querySelectorAll('td');
        celdas.forEach(celda => {
            if (window.getComputedStyle(celda).backgroundImage !== 'none') {
                // Si la celda tiene una reina, actualiza la imagen
                celda.style = `
                    background-image: url('${reinaActual}');
                    background-size: cover;
                    background-repeat: no-repeat;
                    background-position: center;
                `;
            }
        });
    });
}
// Variable global para controlar si ya se aplicó una solución
let solucionAplicada = false;

// Modifica la función mostrarReina para bloquear la colocación de más reinas si ya se aplicó una solución
function mostrarReina(celda) {
    if (solucionAplicada) {
        alert("No puedes colocar más reinas después de aplicar una solución.");
        return;
    }

    if (window.getComputedStyle(celda).backgroundImage === 'none') {
        if (contador < 8) {
            celda.style = `
                background-image: url('${reinaActual}');
                background-size: cover;
                background-repeat: no-repeat;
                background-position: center;
            `;
            contador++;
        }
    } else {
        celda.style.backgroundImage = 'none';
        contador--;

        // Restaurar el color de la celda según su posición
        const fila = celda.parentElement.rowIndex;
        const columna = celda.cellIndex;
        if ((fila + columna) % 2 === 0) {
            celda.style.backgroundColor = color1; // Color seleccionado para las celdas claras
        } else {
            celda.style.backgroundColor = color2; // Color seleccionado para las celdas oscuras
        }
    }
}


// Variables globales para almacenar los colores seleccionados
let color1 = "#fece9e"; // Color predeterminado 1
let color2 = "#d18b47"; // Color predeterminado 2
let colorBloqueo = "#EF4B4B"; // Color predeterminado para el bloqueo

// Función para seleccionar colores
function selectColor() {
    // Actualiza los colores seleccionados
    color1 = document.getElementById('colorPicker1').value;
    color2 = document.getElementById('colorPicker2').value;
    colorBloqueo = document.getElementById('colorPicker3').value;

    // Aplica los colores seleccionados a todas las celdas
    const filas = document.querySelectorAll('#tablero tr');
    filas.forEach((fila, filaIndex) => {
        const celdas = fila.querySelectorAll('td');
        celdas.forEach((celda, celdaIndex) => {
            if ((filaIndex + celdaIndex) % 2 === 0) {
                celda.style.backgroundColor = color1; // Color para celdas claras
            } else {
                celda.style.backgroundColor = color2; // Color para celdas oscuras
            }
        });
    });
}

// Modificación de la función cambiarColor para usar el color de bloqueo
function cambiarColor(fila, columna) {
    const tablero = document.getElementById('tablero');

    // Colorear la fila y la columna
    for (let i = 0; i < 8; i++) {
        tablero.rows[fila].cells[i].style.backgroundColor = colorBloqueo; // Fila
        tablero.rows[i].cells[columna].style.backgroundColor = colorBloqueo; // Columna
    }

    // Colorear las diagonales
    let r1 = fila, c1 = columna;
    let r2 = fila, c2 = columna;
    let r3 = fila, c3 = columna;
    let r4 = fila, c4 = columna;

    while (r1 < 8 && c1 < 8) tablero.rows[r1++].cells[c1++].style.backgroundColor = colorBloqueo; // Diagonal ↘
    while (r2 >= 0 && c2 < 8) tablero.rows[r2--].cells[c2++].style.backgroundColor = colorBloqueo; // Diagonal ↗
    while (r3 >= 0 && c3 >= 0) tablero.rows[r3--].cells[c3--].style.backgroundColor = colorBloqueo; // Diagonal ↖
    while (r4 < 8 && c4 >= 0) tablero.rows[r4++].cells[c4--].style.backgroundColor = colorBloqueo; // Diagonal ↙
}

  
 
// Función para limpiar el color al salir del mouse (modificada)
function limpiar() {
    const filas = document.querySelectorAll('#tablero tr');
    filas.forEach((fila, filaIndex) => {
        const celdas = fila.querySelectorAll('td');
        celdas.forEach((celda, celdaIndex) => {
            if ((filaIndex + celdaIndex) % 2 === 0) {
                celda.style.backgroundColor = color1; // Usa el color seleccionado
            } else {
                celda.style.backgroundColor = color2; // Usa el color seleccionado
            }
        });
    });
}
    function limpiarIMagen(){
        var celdas=document.getEselectorAll("td");
        for (let i = 0; i < celdas.length; i++) {
            celdas[i].style.backgroundColor="";
        }
    }   

// Función para mostrar la solución seleccionada

 // Modifica la función mostrarSolucion para bloquear la colocación de más reinas
function mostrarSolucion(valor) {
    // Limpia el tablero
    limpiarTablero();

    // Marca que se aplicó una solución
    solucionAplicada = true;

    // Obtén el tablero
    const celdas = document.getElementById("tablero");

    // Estilo para la reina seleccionada
    const style = `
        background-image: url('${reinaActual}');
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
    `;

    // Muestra la solución seleccionada
    switch (valor) {
        case "1":
            // Solución 1
            celdas.rows[0].cells[3].style = style;
            celdas.rows[1].cells[6].style = style;
            celdas.rows[2].cells[2].style = style;
            celdas.rows[3].cells[7].style = style;
            celdas.rows[4].cells[1].style = style;
            celdas.rows[5].cells[4].style = style;
            celdas.rows[6].cells[0].style = style;
            celdas.rows[7].cells[5].style = style;
            break;
        case "2":
            // Solución 2
            celdas.rows[6].cells[0].style = style;
            celdas.rows[4].cells[1].style = style;
            celdas.rows[2].cells[2].style = style;
            celdas.rows[0].cells[3].style = style;
            celdas.rows[1].cells[6].style = style;
            celdas.rows[7].cells[5].style = style;
            celdas.rows[5].cells[4].style = style;
            celdas.rows[3].cells[7].style = style;
            break;
        case "3":
            // Solución 3
            celdas.rows[0].cells[2].style = style;
            celdas.rows[7].cells[1].style = style;
            celdas.rows[6].cells[6].style = style;
            celdas.rows[3].cells[0].style = style;
            celdas.rows[2].cells[3].style = style;
            celdas.rows[1].cells[5].style = style;
            celdas.rows[5].cells[4].style = style;
            celdas.rows[4].cells[7].style = style;
            break;
        default:
            // Si no se selecciona ninguna solución, no hacer nada
            break;
    }
}

// Función para limpiar el tablero
function limpiarTablero() {
    // Limpia todas las celdas del tablero
    const filas = document.querySelectorAll('#tablero tr');
    filas.forEach(fila => {
        const celdas = fila.querySelectorAll('td');
        celdas.forEach(celda => {
            celda.style = ""; // Elimina cualquier estilo aplicado
        });
    });
    contador = 0; // Reinicia el contador de reinas
    solucionAplicada = false; // Permite colocar reinas nuevamente
}