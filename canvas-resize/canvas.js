var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

// c.fillStyle = 'rgba(255, 0, 0, .5)';
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = 'rgba(0, 0, 255, .5)';
// c.fillRect(400, 100, 100, 100);
// c.fillStyle = 'rgba(0, 255, 0, .5)';
// c.fillRect(300, 300, 100, 100);

// Line
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(400, 300);
// c.strokeStyle = '#fa34a3';
// c.stroke();

var mouse = {
    x: undefined,
    y: undefined
};

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

function Circle(x, y, dx, dy, radius) {
    this.x = x || 200;
    this.y = y || 200;
    this.dx = dx || 4;
    this.dy = dy || 4;
    this.radius = radius || 30;

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = 'lightgreen';
        c.lineWidth = 5;
        c.stroke();
        c.fill();
    }

    this.update = function() {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        // Interactivity
        if ((Math.abs(mouse.x - this.x) < 50) && (Math.abs(mouse.y - this.y) < 50)) {
            this.radius += 1;
        }
        else if (this.radius > 2) {
            this.radius -= 1;
        }

        this.draw();
    }
}


// Arc
var circleArray = [];

for (var i = 0; i < 50; i++) {
    var radius = 50;
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    var dx = (Math.random() - .5) * 8;
    var dy = (Math.random() - .5) * 8;
    circleArray.push(new Circle(x, y, dx, dy, radius));
}

console.log(circleArray);

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}

animate();