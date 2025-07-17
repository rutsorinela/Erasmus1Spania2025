/*
Instrucciones para la creacion del juego "Adivina el Numero"//

1. Generar un numero aleatorio

2. Guardar el numero del intento en el que el juagdor se encuentro empezando por el 1

3. Darle all jugador un aforma de adivinar el numero

4. Un vez que se ha introducido el numero, quardarlo en alguna parte para que el juagdor pueda ver sus intentos

5. Comparobar si el numero es correcto

6. Si el numero es correcto:

    - Mostrar un mensaje de felicitacion
    - Hacer que el juagdor no pueda introducir mas numeros/intentos
    - ostrar un control que permita que el juagdor vuelva a e,pezar el juego

7. Si el nomero es incorrecto y al juagador le quedan intentos:

    - Decirle al juagdor que he fallado
    - Dejar que el juagdor lo intente de nuevo 
    - Incrementar el nomero de intentos en 1

8. Si el numero es incorrecto y no quedan intentos:

    - Decirle al jugador que ha terminado (GAMEOVER)
    - Hacer que el jugdor no pueda introducir mas intentos
    - Mostrar un cotrol que permita al jugador empezar de nuevo

9. Una vez que el juego se reinicia, asegurase de que la logica del juego y la interface de usuario (UI) se restablecen por completo para volver al paso 1.

*/

let randomNumber = Math.floor(Math.random() *100) + 1;

// Guadamos las referencias de cada parrafo
const guesses = document.querySelector(".guesses");
const lastResult = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");

// Guardamos las referencias al input y boton de enviar

const guessSubmit = document.querySelector(".guessSubmit");
const guessesField = document.querySelector(".guessField");

// Variable para los intentos
let guessCount = 1;
// Variable para guardar y crear el boton de reset
let resetButton;
// Damos el foco al input
guessField.focus();

//funcion para comproba el numero a adivinar 
function checkGuess(){
    //Guardar el numero ingresado en el input
    //Nos aseguramos que se un Number
    let userGuess = Number(guessField.value);

    //Comprobamos si estamos en el primer intento
    if (guessCount === 1){
        guesses.textContent = "Intentos anteriores";
    }
    guesses.textContent += userGuess + " ";

    //Bloque de comprobacion del numero a adivinar
    //Pasos del 5 la 8
    // Condicion cuando acertamos
    if (userGuess === randomNumber){
        lastResult.textContent = "felicitari, ai castigat!";
        lastResult.style.backgroundColor= "green";
        lowOrHi.textContent = "";
        setGameOver();
    } else if (guessCount === 10){
        //Condicion cuando nu quedan intentos
        lastResult.textContent =" hahaha, ai pierdut, fraiere!!!";
        setGameOver();
    } else {
        // Condicion cuando quendo quendan intentos, entonces comprobamos si es mayor o menor el numero introducido con respecto al numero a adiuvinar
        lastResult.textContent = "gresittttt";
        lastResult.style.backgroundColor = "red";

        if (userGuess < randomNumber){
            lowOrHi.textContent = "nr pream mic";
        } else if(userGuess > randomNumber){
            lowOrHi.textContent = "nr prea mare";
        }
    }
    // Preparamos las variables para el siguienre intento
    guessCount++;
    // Borramos el valor del campo numerico
    guessField.value = "";
    // Aplicamos nuevamente el foco
    guessField.focus();
}

// Agregramos un listener al boton guessSubmit
guessSubmit.addEventListener("click", checkGuess);

//funcion gameover
function setGameOver(){
    guessField.disabled = true; //deshabilita el input
    guessSubmit.disabled = true; //deshabilita el boton enviar

    // Creamos el boton reset para resetear le juego
    resetButton = document.createElement("button");
    resetButton.className = "resetButton";
    resetButton.textContent = "reiniciar el juego";
    //colocamos el boton dentro de contro de contenefor padre, en este caso el body
    document.body.append(resetButton);

    //Creamos el listener del boton creado
    resetButton.addEventListener("click", resetGame);

}

// Creamos la funcion resetGame que reseteara el juego para volver a empezar
function resetGame(){
    guessCount = 1;

    // Reseteamos los parrafos
    const resetParas = document.querySelectorAll(".resultParas");
    for (let i = 0; i < resetParas.length; i++){
        resetParas[i].textContent = "";
        resetParas[i].style.backgroundColor = "black";
    }

    // Elimonamos el boton reset
    resetButton.parentNode.removeChild(resetButton);

    // Reactivamos el input y el submit
    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = "";
    guessField.focus();

    // Cambiamos el background de lastresult par que no se vea
    lastResult.style.backgroundColor = "black";

    // Generamos un nuevo numero aleatorio
    randomNumber = Math.floor(Math.random() * 100) + 1;
}