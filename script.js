/*
Guardamos el estado del elemento para permitirnos usarlo más facilmente después
*/
const despliegueEstado = document.querySelector(".estado--juego");
/*
Declaramos algunas variables que utilizaremos para trackear el estado del juego
*/
let juegoActivo = true;
/*
Guardaremos el jugador actual aquí, de manera que sepamos de quién es el turno
*/
let jugadorActual = "X";
/*
Guardaremos el estado del juego actual aquí, el formulario de strings vacios en un arreglo 
nos permitirá trackear facilmente las casillas y validar el estado del juego posteriormente
*/
let estadoJuego = ["", "", "", "", "", "", "", "", ""];
/*
Aquí declaramos algunos mensajes que mostraremos al usuario durante el juego
*/
const mensajeDelGanador = () => `¡Jugador ${jugadorActual} ha ganado!`;
const mensajeEmpate = () => `¡La partida acabó en empate!`;
const turnoActual = () => `Es el turno de ${jugadorActual}`;
/*
Ponemos un mensaje inicial para que los jugadores sepan de quién es el turno
*/
despliegueEstado.innerHTML = turnoActual();

const condicionesVictoria = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function tratarCambioJugador() {
  jugadorActual = jugadorActual === "X" ? "O" : "X";
  despliegueEstado.innerHTML = turnoActual();
}

function tratarValidacionResultado() {
  let rondaGanada = false;
  for (let i = 0; i <= 7; i++) {
    const condicionVictoria = condicionesVictoria[i];
    let a = estadoJuego[condicionVictoria[0]];
    let b = estadoJuego[condicionVictoria[1]];
    let c = estadoJuego[condicionVictoria[2]];
    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      rondaGanada = true;
      break;
    }
  }
  if (rondaGanada) {
    despliegueEstado.innerHTML = mensajeDelGanador();
    juegoActivo = false;
    return;
  }
  /* 
  Vamos a commprobar si hay valores en nuestro arreglo de estado de juego que todavía no se halla rellenado con un jugador
  */
  let empate = !estadoJuego.includes("");
  if (empate) {
    despliegueEstado.innerHTML = mensajeEmpate();
    juegoActivo = false;
    return;
  }
  /*
  Si llegamos aquí sabemos que el juego todavía no ha terminado, y que hay todavía movimientos por ser jugados,
  así que continuamos por cambiar el jugador actual
  */
  tratarCambioJugador();
}

function tratarCasillaClickada(eventoCasillaClickada) {
  /*
  Guardaremos el elemento html clickado en una variable para posterior uso
  */
  const casillaClickada = eventoCasillaClickada.target;
  /*
    Aquí agarraremos el indiceCasilla de la casilla clickada para identificar donde está la casilla en nuestro grid. Debemos parsear el valor del getAttribute ya que nos devuelve un string.
  */
  indiceCasillaClickada = parseInt(
    casillaClickada.getAttribute("indiceCasilla")
  );
  /* 
    A continuación comprobamos si la llamada ya ha sido realizada o si el juego está pausado
    Si alguno de ellos es true ignoraremos el click
  */
  if (estadoJuego[indiceCasillaClickada] !== "" || !juegoActivo) {
    return;
  }
  /*
  Si todo está en orden procederemos con el flujo del juego
  */
  tratarCasillaJugada(casillaClickada, indiceCasillaClickada);
  tratarValidacionResultado();
}
function tratarCasillaJugada(casillaClickada, indiceCasillaClickada) {
  /*
  Actualizamos el estado del juego interno para reflejar el movimiento jugado,
  así como actualizar el interfaz de usuario para reflejar el movimiento jugado
  */
  estadoJuego[indiceCasillaClickada] = jugadorActual;
  casillaClickada.innerHTML = jugadorActual;
}

function tratarReinicioJuego() {
  juegoActivo = true;
  jugadorActual = "X";
  estadoJuego = ["", "", "", "", "", "", "", "", ""];
  despliegueEstado.innerHTML = turnoActual();
  document
    .querySelectorAll(".casilla")
    .forEach((casilla) => (casilla.innerHTML = ""));
}

/*
Finalmente añadimos "addEventListener's" a las actuales casillas, así como al botón de reiniciar
*/
document
  .querySelectorAll(".casilla")
  .forEach((casilla) =>
    casilla.addEventListener("click", tratarCasillaClickada)
  );
document
  .querySelector(".reiniciar")
  .addEventListener("click", tratarReinicioJuego);
