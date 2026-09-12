let jugador;
let imgJugador;
let obstaculos = [];
let puntaje = 0;
let estado = "jugando";
let velBase = 2;
let intervalo = 50;
let contador = 0;

async function setup() {
  createCanvas(600, 400);
  imageMode(CENTER);
  rectMode(CENTER);
  try {
    imgJugador = await loadImage('img/pj.png');
    console.log('pj.png cargada:', imgJugador);
  } catch (e) {
    console.log('pj.png falló:', e);
    imgJugador = null;
  }
  reiniciarJuego();
}

function draw() {
  background(220);
  if (estado == "jugando") {
    crearObstaculo();
    moverJugador();
    moverObstaculos();
    detectarColisiones();
    dibujarJugador();
    mostrarPuntaje();
  } else if (estado == "gameover") {
    mostrarGameOver();
  }
}

//-------------- JUGADOR --------------
class Jugador {
  constructor(x, y, tam) {
    this.x = x;
    this.y = y;
    this.tam = tam;
  }
  mostrar() {
    if (this.imgOk) {
      image(this.img, this.x, this.y, this.tam, this.tam);
    } else {
      push();
      noStroke();
      fill(255, 0, 0);
      rect(this.x, this.y, this.tam, this.tam);
      pop();
    }
  }
}

function dibujarJugador() {
  jugador.img = imgJugador;
  jugador.imgOk = imgJugador != null &&
                  typeof imgJugador.width === 'number' &&
                  imgJugador.width > 0 &&
                  imgJugador.height > 0;
  jugador.mostrar();
}

function moverJugador() {
  if (keyIsDown(65) || key == 'a') {
    jugador.x = jugador.x - 5;
  }
  if (keyIsDown(68) || key == 'd') {
    jugador.x = jugador.x + 5;
  }
  jugador.x = constrain(jugador.x, 25, width - 25);
}

//-------------- OBSTACULOS --------------
class Obstaculo {
  constructor() {
    this.tam = random(25, 50);
    this.x = random(this.tam, width - this.tam);
    this.y = -this.tam;
    if (random() < 0.25) {
      this.vel = random(6, 9); // obstáculos rápidos
    } else {
      this.vel = random(2, 4);
    }
  }
  mover() {
    this.y = this.y + this.vel;
  }
  mostrar() {
    fill(0, 100, 255);
    rect(this.x, this.y, this.tam, this.tam);
  }
}

function crearObstaculo() {
  contador++;
  if (contador >= intervalo) {
    obstaculos.push(new Obstaculo());
    contador = 0;
  }
}

function moverObstaculos() {
  for (let i = obstaculos.length - 1; i >= 0; i--) {
    obstaculos[i].mover();
    obstaculos[i].mostrar();
    if (obstaculos[i].y > height + obstaculos[i].tam) {
      obstaculos.splice(i, 1);
      puntaje++;
    }
  }
}

//-------------- COLISIONES --------------
function detectarColisiones() {
  for (let i = 0; i < obstaculos.length; i++) {
    if (chocan(jugador.x, jugador.y, jugador.tam,
               obstaculos[i].x, obstaculos[i].y, obstaculos[i].tam)) {
      estado = "gameover";
    }
  }
}

function chocan(x1, y1, tam1, x2, y2, tam2) {
  if (x1 - tam1 / 2 < x2 + tam2 / 2 &&
      x1 + tam1 / 2 > x2 - tam2 / 2 &&
      y1 - tam1 / 2 < y2 + tam2 / 2 &&
      y1 + tam2 / 2 > y2 - tam2 / 2) {
    return true;
  }
  return false;
}

//-------------- PUNTAJE Y GAME OVER --------------
function mostrarPuntaje() {
  textAlign(LEFT, BASELINE);
  fill(0);
  textSize(20);
  text("Puntaje: " + puntaje, 20, 30);
}

function mostrarGameOver() {
  background(220);
  fill(255, 0, 0);
  textSize(40);
  textAlign(CENTER, CENTER);
  text("GAME OVER", width / 2, height / 2 - 30);
  fill(0);
  textSize(20);
  text("Puntaje final: " + puntaje, width / 2, height / 2 + 10);
  text("Presioná R para reiniciar", width / 2, height / 2 + 40);
}

function keyPressed() {
  if (estado == "gameover" && (key == 'r' || key == 'R')) {
    reiniciarJuego();
  }
}

//-------------- REINICIO --------------
function reiniciarJuego() {
  obstaculos = [];
  puntaje = 0;
  estado = "jugando";
  velBase = 2;
  intervalo = 50;
  contador = 0;
  jugador = new Jugador(width / 2, height - 40, 50);
}