const c = document.getElementById("myCanvas");
const canvasWidth = c.width;
const canvasHeight = c.height;
const ctx = c.getContext("2d");
let circle_x = 160;
let circle_y = 60;
let radius = 20;
// 移動的速度
let xSpeed = 20;
let ySpeed = 20;

function drawCircle() {
  // -------------------------確認球有沒有打到邊界-------------------------
  // 確認右邊邊界
  if (circle_x >= canvasWidth - radius) {
    xSpeed *= -1;
  }
  // 確認左邊邊界
  if (circle_x <= radius) {
    xSpeed *= -1;
  }
  // 確認下面邊界
  if (circle_y >= canvasHeight - radius) {
    ySpeed *= -1;
  }
  // 確認上面邊界
  if (circle_y <= radius) {
    ySpeed *= -1;
  }
  // -------------------------確認球有沒有打到邊界-------------------------

  // 更動圓的座標
  circle_x += xSpeed;
  circle_y += ySpeed;

  // 劃出黑色背景
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  // 畫出球
  // x, y 代表圓心座標，radius是半徑，後面是開始跟結束的角度，2 * Math.PI 可以得到360度
  //
  ctx.beginPath();
  ctx.arc(circle_x, circle_y, radius, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fillStyle = "yellow";
  ctx.fill();
}

let game = setInterval(drawCircle, 25);
