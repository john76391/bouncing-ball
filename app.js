const c = document.getElementById("myCanvas");
const canvasWidth = c.width;
const canvasHeight = c.height;
const ctx = c.getContext("2d");

function drawCircle() {
  console.log("Draw circle");
}

let myGame = setInterval(drawCircle, 25);
