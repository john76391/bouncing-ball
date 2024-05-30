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
// 設定地板位置
let ground_x = 100;
let ground_y = 500;
let ground_height = 5;
let brickArray = [];
// 用來判斷是否結束遊戲，當10個磚塊都被球撞到後結束
let count = 0;

// 取得介於某兩數字之間的值
function getRandomArbitrary(min, max) {
  return min + Math.floor(Math.random() * (max - min));
}

// 製作磚塊
class Brick {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    brickArray.push(this);
    this.visible = true;
  }

  drawBrick() {
    ctx.fillStyle = "lightgreen";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  touchingBall(ballX, ballY) {
    return (
      ballX >= this.x - radius &&
      ballX <= this.x + this.width + radius &&
      ballY >= this.y - radius &&
      ballY <= this.y + this.height + radius
    );
  }
}

// 製作所有的brick
for (let i = 0; i < 10; i++) {
  new Brick(getRandomArbitrary(0, 950), getRandomArbitrary(0, 550));
}

// 追蹤滑鼠位置，但只在canvas裡面追蹤，而非整個window
c.addEventListener("mousemove", (e) => {
  ground_x = e.clientX;
  // 限制地板不能超過右邊邊界
  //   if (ground_x >= 800) {
  //     ground_x = 800;
  //   }
});

function drawCircle() {
  // TODO -------------------------確認球是否打到磚塊-------------------------
  brickArray.forEach((v, i) => {
    if (v.visible && v.touchingBall(circle_x, circle_y)) {
      count++;
      v.visible = false;
      // 改變x, y方向速度，並且將brick從brickArray中移除
      // 判斷球是從哪個方向撞到brick
      // 從下方撞擊
      if (circle_y >= v.y + v.height) {
        ySpeed *= -1;
      }
      // 從上方撞擊
      else if (circle_y <= v.y) {
        ySpeed *= -1;
      }
      // 從左方撞擊
      else if (circle_x <= v.x) {
        xSpeed *= -1;
      }
      // 從右方撞擊
      else if (circle_x >= v.x + v.width) {
        xSpeed *= -1;
      }
      // 刪除掉撞擊到的brick
      // brickArray.splice(i, 1); // 會有時間複雜度的問題 O(n)

      // 遊戲結束判定
      //   if (brickArray.length == 0) {
      //     alert("遊戲結束");
      //     clearInterval(game);
      //   }
      if (count == 10) {
        alert("遊戲結束");
        clearInterval(game);
      }
    }
  });

  // TODO -------------------------確認球是否打到磚塊-------------------------

  // -------------------------確認球是否打到橘色地板-------------------------
  // 球的x介於地板之間才反彈
  if (
    circle_x >= ground_x - radius &&
    circle_x <= ground_x + 200 + radius &&
    circle_y >= ground_y - radius &&
    circle_y <= ground_y + radius
  ) {
    // 代表球是往下掉的 (從上方打到橘色地板)
    if (ySpeed > 0) {
      // 直接讓球向上移動
      circle_y -= 40;
    } else {
      // 從下方彈到橘色地板
      circle_y += 40;
    }
    ySpeed *= -1;
  }
  // -------------------------確認球是否打到橘色地板-------------------------

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

  // 畫出黑色背景
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  // 畫出所有的brick
  brickArray.forEach((v) => {
    if (v.visible) {
      v.drawBrick();
    }
  });

  // 畫出可控制的地板
  ctx.fillStyle = "orange";
  ctx.fillRect(ground_x, ground_y, 200, ground_height);

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
