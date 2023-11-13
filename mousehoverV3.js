//参考動画：https://www.youtube.com/watch?v=raXW5J1Te7Y&t=646s

//パーティクルの初期位置をずらす
function randomIntFromRange(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
  }
  
  function randomColor(colors) {
	return colors[Math.floor(Math.random() * colors.length)];
  }
 
 
//----------------------------------------------------------

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
let x = innerWidth / 2;
let y = innerHeight / 2;

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#F5CEC7', '#E79796', '#FFB284', '#FFC98B', '#C6C09C'];
// let colorRandom = colors[Math.floor(Math.random() * colors.length)]

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX,
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth,
  canvas.height = innerHeight

  init();
})

// Objects - Class構文
class Particle {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.radian = Math.random() * Math.PI * 2
	  this.speed = 0.05;
	  this.distanceFromCenter = randomIntFromRange(5, 90);
	  this.leftMouse = {x: x, y: y}
  }

  draw(lastPoint) {

    c.beginPath();
    // c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false) ===> 円を描画する場合
	c.strokeStyle = this.color;
	c.lineWidth = this.radius;
	c.lineCap = 'round';

    c.moveTo(lastPoint.x, lastPoint.y);
    c.lineTo(this.x, this.y);
    c.stroke();
	  c.closePath();
  }

  update() {
	const lastPoint = {
		x: this.x,
		y: this.y
	}

	//- mouse effect: マウスを動かしたタイミングでパーティクルにも速度を加えることで滑らかな動きにする
	this.leftMouse.x += (mouse.x - this.leftMouse.x) * 0.05;
	this.leftMouse.y += (mouse.y - this.leftMouse.y) * 0.05;

	this.radian += this.speed;
	//↓ 結果(横に往復)：https://gyazo.com/a94ea72a72d600670708ac79b4fdd7bc
	this.x = this.leftMouse.x + Math.cos(this.radian) * this.distanceFromCenter;
	//- this.xとthis.yどちらもコサインで指定した場合は対角線方向への往復に
	//↓ 結果：https://gyazo.com/cb63348bc7f1092fa433127599f6d731
	this.y = this.leftMouse.y + Math.sin(this.radian) * this.distanceFromCenter;


	this.draw(lastPoint);
  }
}

// Implementation
let particles;
function init() {
	particles = [];

  for (let i = 0; i < 80; i++) {
	// const radius = (Math.random() * 4) + 1
	const radius = Math.random() * 6;

	//パーティクルを中央配置し、サイズと色を指定
    particles.push(new Particle(canvas.width / 2, canvas.height / 2, radius, randomColor(colors) ));
  }
//   console.log(particles);
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
//   c.clearRect(0, 0, canvas.width, canvas.height)
	//今回は残像を薄く残したいからfillRect
	c.fillStyle = "rgba(255, 255, 255, 0.05)";
	c.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach(particle => {
	particle.update();
  })
}

init();
animate();
