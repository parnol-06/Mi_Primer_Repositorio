let matrizX = [];
let matrizY = [];
let tam = 0;

function cargarTamano() {
    tam = parseInt(document.getElementById('tamano').value);
    cargarMatrices(matrizX, 'matrizX');
    cargarMatrices(matrizY, 'matrizY');
}

function cargarMatrices(matriz, divId) {
    if (tam > 0) {
        matriz.length = tam; // Asegurarse de que la longitud de la matriz sea correcta
        for (let i = 0; i < tam; i++) {
            matriz[i] = new Array(tam);
        }
        document.getElementById('longitud').innerText = `El tamaño de las matrices es: ${tam} x ${tam}`;
        generarMatrices(matriz, divId); // Pasar la matriz y el div correspondiente
    } else {
        document.getElementById('longitud').innerText = "Por favor, introduce un tamaño válido.";
    }
}

function generarMatrices(matriz, divId) {
    let matrizDiv = document.getElementById(divId); // Obtener el div correspondiente
    
    matrizDiv.innerHTML = ''; // Limpiar el contenido anterior

    let formulario = "<table border='1' cellspacing='0' cellpadding='5'>"; // Iniciar la tabla

    for (let i = 0; i < tam; i++) {
        formulario += "<tr>"; // Iniciar una nueva fila
        for (let j = 0; j < tam; j++) {
            formulario += `<td><input type='text' id='${divId.charAt(divId.length - 1)}_${i}_${j}' size='3'></td>`; // Entrada para la matriz
        }
        formulario += "</tr>"; // Cerrar la fila
    }

    formulario += "</table>"; // Cerrar la tabla
    matrizDiv.innerHTML = formulario; // Mostrar tabla
}

function mostrarMatrices() {
    for (let i = 0; i < tam; i++) {
        for (let j = 0; j < tam; j++) {
            let valorX = parseFloat(document.getElementById(`X_${i}_${j}`).value);
            let valorY = parseFloat(document.getElementById(`Y_${i}_${j}`).value);
            matrizX[i][j] = isNaN(valorX) ? 0 : valorX; // Almacenar valores en matriz X, usar 0 si no es un número
            matrizY[i][j] = isNaN(valorY) ? 0 : valorY; // Almacenar valores en matriz Y, usar 0 si no es un número
        }
    }
    imprimirMatriz(matrizX, 'resultadoX'); // Imprimir matriz X
    imprimirMatriz(matrizY, 'resultadoY'); // Imprimir matriz Y
    let matrizZ = sumarMatrices(matrizX, matrizY); // Sumar matrices
    imprimirMatriz(matrizZ, 'resultadoZ'); // Imprimir matriz Z
}

function imprimirMatriz(matriz, resultadoId) {
    let resultadoDiv = document.getElementById(resultadoId);
    resultadoDiv.innerHTML = ''; // Limpiar el contenido anterior

    let resultadoHTML = "<table border='1' cellspacing='0' cellpadding='5'>"; // Iniciar la tabla

    for (let i = 0; i < tam; i++) {
        resultadoHTML += "<tr>"; // Iniciar una nueva fila
        for (let j = 0; j < tam; j++) {
            resultadoHTML += `<td>${matriz[i][j]}</td>`; // Imprimir valor de la matriz en una celda
        }
        resultadoHTML += "</tr>"; // Cerrar la fila
    }

    resultadoHTML += "</table>"+"<br>"; // Cerrar la tabla
    resultadoDiv.innerHTML = resultadoHTML; // Mostrar la tabla en el div de resultado
}

function sumarMatrices(matriz1, matriz2) {
    let matrizZ = new Array(tam);
    for (let i = 0; i < tam; i++) {
        matrizZ[i] = new Array(tam);
        for (let j = 0; j < tam; j++) {
            matrizZ[i][j] = matriz1[i][j] + matriz2[i][j]; // Sumar elementos
        }
    }
    return matrizZ; // Devolver matriz Z
}

function multiplicarMatrices(matriz1, matriz2) {
    let tam = matriz1.length; // Asumiendo que las matrices son cuadradas
    let matrizZ = new Array(tam);
    
    for (let i = 0; i < tam; i++) {
        matrizZ[i] = new Array(tam);
        for (let j = 0; j < tam; j++) {
            matrizZ[i][j] = 0;
            for (let k = 0; k < tam; k++) {
                matrizZ[i][j] += matriz1[i][k] * matriz2[k][j]; // Multiplicar y sumar elementos
            }
        }
    }
    
    return matrizZ; // Devolver matriz Z
}


function multiplicar() {
    for (let i = 0; i < tam; i++) {
        for (let j = 0; j < tam; j++) {
            let valorX = parseFloat(document.getElementById(`X_${i}_${j}`).value);
            let valorY = parseFloat(document.getElementById(`Y_${i}_${j}`).value);
            matrizX[i][j] = isNaN(valorX) ? 0 : valorX; // Almacenar valores en matriz X, usar 0 si no es un número
            matrizY[i][j] = isNaN(valorY) ? 0 : valorY; // Almacenar valores en matriz Y, usar 0 si no es un número
        }
    }
    imprimirMatriz(matrizX, 'resultadoX'); // Imprimir matriz X
    imprimirMatriz(matrizY, 'resultadoY'); // Imprimir matriz Y
    let matrizZ = multiplicarMatrices(matrizX, matrizY); // Sumar matrices
    imprimirMatriz(matrizZ, 'resultadoZ'); // Imprimir matriz Z
}


function determinanteMatriz(matrizX) {
    let tam = matrizX.length;

    // Caso base: si la matriz es de 1x1
    if (tam === 1) {
        return matrizX[0][0];
    }

    // Caso base: si la matriz es de 2x2
    if (tam === 2) {
        return matrizX[0][0] * matrizX[1][1] - matrizX[0][1] * matrizX[1][0];
    }

    let det = 0;

    for (let i = 0; i < tam; i++) {
        let subMatriz = matrizX.slice(1).map(row => row.filter((_, j) => j !== i));
        det += (i % 2 === 0 ? 1 : -1) * matrizX[0][i] * determinanteMatriz(subMatriz);
    }

    return det;
    
}

function mostrarDeterminante() {

    let det = determinanteMatriz(matrizX);
    document.getElementById('valorDeterminante').textContent = det;
}


function determinanteMatrizy(matrizY) {
    let tam = matrizY.length;

    // Caso base: si la matriz es de 1x1
    if (tam === 1) {
        return matrizY[0][0];
    }

    // Caso base: si la matriz es de 2x2
    if (tam === 2) {
        return matrizY[0][0] * matrizY[1][1] - matrizY[0][1] * matrizY[1][0];
    }

    let det = 0;

    for (let i = 0; i < tam; i++) {
        let subMatriz = matrizY.slice(1).map(row => row.filter((_, j) => j !== i));
        det += (i % 2 === 0 ? 1 : -1) * matrizY[0][i] * determinanteMatriz(subMatriz);
    }

    return det;
    
}

function mostrarDeterminantey() {

    let det = determinanteMatriz(matrizY);
    document.getElementById('valorDeterminantey').textContent = det;
}



