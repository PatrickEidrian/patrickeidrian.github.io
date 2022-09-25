(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame ||
    function(callback) {
        window.setTimeout(callback, 1000 / 60);
    };
    window.requestAnimationFrame = requestAnimationFrame;
})();


var flocos = [],
    canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    flakeCount = 400,
    mX = -100,
    mY = -100

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

function neve() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < flakeCount; i++) {
        var floco = flocos[i],
            x = mX,
            y = mY,
            minDist = 150,
            x2 = floco.x,
            y2 = floco.y;

        var dist = Math.sqrt((x2 - x) * (x2 - x) + (y2 - y) * (y2 - y)),
            dx = x2 - x,
            dy = y2 - y;

        if (dist < minDist) {
            var force = minDist / (dist * dist),
                xcomp = (x - x2) / dist,
                ycomp = (y - y2) / dist,
                deltaV = force / 2;

            floco.velX -= deltaV * xcomp;
            floco.velY -= deltaV * ycomp;

        } else {
            floco.velX *= .98;
            if (floco.velY <= floco.speed) {
                floco.velY = floco.speed
            }
            floco.velX += Math.cos(floco.step += .05) * floco.stepSize;
        }

        ctx.fillStyle = "rgba(255,255,255," + floco.opacity + ")";
        floco.y += floco.velY;
        floco.x += floco.velX;
            
        if (floco.y >= canvas.height || floco.y <= 0) {
            reset(floco);
        }


        if (floco.x >= canvas.width || floco.x <= 0) {
            reset(floco);
        }

        ctx.beginPath();
        ctx.arc(floco.x, floco.y, floco.size, 0, Math.PI * 2);
        ctx.fill();
    }
    requestAnimationFrame(neve);
};

function reset(floco) {
    floco.x = Math.floor(Math.random() * canvas.width);
    floco.y = 0;
    floco.size = (Math.random() * 3) + 2;
    floco.speed = (Math.random() * 1) + 0.5;
    floco.velY = floco.speed;
    floco.velX = 0;
    floco.opacity = (Math.random() * 0.5) + 0.3;
}

function init() {
    for (var i = 0; i < flakeCount; i++) {
        var x = Math.floor(Math.random() * canvas.width),
            y = Math.floor(Math.random() * canvas.height),
            size = (Math.random() * 3) + 2,
            speed = (Math.random() * 1) + 0.5,
            opacity = (Math.random() * 0.5) + 0.3;

        flocos.push({
            speed: speed,
            velY: speed,
            velX: 0,
            x: x,
            y: y,
            size: size,
            stepSize: (Math.random()) / 30,
            step: 0,
            opacity: opacity
        });
    }

    neve();
};

canvas.addEventListener("mousemove", function(e) {
    mX = e.clientX,
    mY = e.clientY
});

window.addEventListener("resize",function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

init();
        