const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const socket = io();

let player = { x: 100, y: 100 };
let players = {};

socket.on("players", data => {
  players = data;
});

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") player.y -= 5;
  if (e.key === "ArrowDown") player.y += 5;
  if (e.key === "ArrowLeft") player.x -= 5;
  if (e.key === "ArrowRight") player.x += 5;

  socket.emit("move", player);
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let id in players) {
    let p = players[id];
    ctx.fillStyle = "white";
    ctx.fillRect(p.x, p.y, 20, 20);
  }

  requestAnimationFrame(draw);
}
draw();
