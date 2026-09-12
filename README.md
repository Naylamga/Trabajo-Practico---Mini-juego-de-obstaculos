# Trabajo-Practico---Mini-juego-de-obstaculos
 7.4 - P.I.S.W.D - Gomez Nayla
 
# Mini Juego de Esquivar Obstáculos 

Mini juego hecho con **p5.js**. Controlás un personaje y esquivás obstáculos que caen desde arriba.

## Funcionalidad

- Movimiento horizontal del personaje con las teclas **A** (izquierda) y **D** (derecha).
- Obstáculos que caen desde la parte superior a velocidades aleatorias (a veces aparecen obstáculos rápidos).
- **Puntuación**: sumás +1 por cada obstáculo que esquivas (cuando sale del canvas).
- **Game Over**: si un obstáculo golpea al personaje, se muestra la pantalla de fin de juego con el puntaje final.
- **Reinicio**: presioná **R** en la pantalla de Game Over para volver a jugar.
- Fallback automático: si la imagen del personaje no puede cargarse, se dibuja como un cuadrado rojo.

## Requerimientos

- Navegador web moderno.
- Visual Studio Code con la extensión **Live Server**.

## Cómo ejecutar

1. Instalá la extensión **Live Server** en Visual Studio Code.
2. Abrí la carpeta del proyecto en VS Code.
3. Clic derecho sobre `index.html` → **Open with Live Server**.

## Estructura

```
├── index.html        # Página principal
├── sketch/
│   └── sketch.js     # Lógica del juego
└── img/
    └── pj.png        # Imagen del personaje
```
