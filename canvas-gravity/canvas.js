// Utils.js
function randomIntFromRange(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
	return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2) {
	const xDist = x2 - x1;
	const yDist = y2 - y1;

	return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

// Canvas.js
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
	x: innerWidth / 2,
	y: innerHeight / 2
};

const colors = ['#2185c5', '#7ecefd', '#fff6e5', '#ff7f66'];
const gravity = 1;
const frictionX = .99;
const frictionY = .75;
// Event listeners for desktop
// document.addEventListener('touchmove', event => {
// 	mouse.x = event.clientX;
// 	mouse.y = event.clientY;
// 	console.log(mouse.x, mouse.y);
// });

// Event listners for touch device
document.addEventListener('touchstart', event => {
	mouse.x = event.touches[0].clientX;
	mouse.y = event.touches[0].clientY;
}, false);

// Event listners for touch device
document.addEventListener('touchmove', event => {
	mouse.x = event.touches[0].clientX;
	mouse.y = event.touches[0].clientY;
}, false);

// Event listners for touch device
document.addEventListener('touchend', event => {
	mouse.x = event.changedTouches[0].clientX;
	mouse.y = event.changedTouches[0].clientY;
}, false);

document.addEventListener('resize', () => {
	canvas.width = innerWidth;
	canvas.height = innerHeight;

	init();
});

document.addEventListener('touchstart', () => {
	init();
});

// Objects
function Ball(x, y, dx, dy, radius, color) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.color = color;
	
	this.update = function() {
		if (this.y + this.radius + this.dy >= canvas.height) {
			this.dy = -this.dy * frictionY;
			this.dx *= frictionX;
		}
		else {
			this.dy += gravity;
		}
		if (this.x + this.radius + this.dx >= canvas.width || this.x - this.radius < 0) {
			this.dx = -this.dx * frictionX;
		}
		this.x += this.dx;
		this.y += this.dy;
		this.draw();
	}
	
	this.draw = function() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.fillStyle = this.color;
		c.fill();
		c.stroke();
		c.closePath();
	}
}

//Object.prototype.update = function() {
	//this.draw();
//}

// Implementation
//let ball;
let ballArray = [];

function init() {
	ballArray = [];
	for (let i = 0; i < 400; i++) {
		const radius = randomIntFromRange(8, 20);
		const x = randomIntFromRange(radius, canvas.width - radius);
		const y = randomIntFromRange(0, canvas.height - radius);
		const dx = randomIntFromRange(-4, 4);
		const color = randomColor(colors);
		ballArray.push(new Ball(x, y, dx, 2, radius, color));
	}
	//ball = new Ball(canvas.width / 2, canvas.height / 2, 2, 30, 'red');
	//console.log(ballArray);
}

// Animation Loop
function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, canvas.width, canvas.height);
	
	for (let i = 0; i < ballArray.length; i++) {
		ballArray[i].update();
	}

	//c.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y);
	
	//ball.update();
}

init();
animate();