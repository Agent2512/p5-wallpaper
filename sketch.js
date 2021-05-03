var agents = [];
var trails = [];
var moveSpeed = 1
var r_angle = 15


var sketch = function (p) {
    p.setup = () => {
        p.createCanvas(800, 800, p.P2D);
        p.pixelDensity(1);
        p.background(0)

        for (var i = 0; i < 75; i++) {
            agents.push(new agnet2(p.random(p.width), p.random(p.height), p.random(360)))
        }

        setTimeout(() => {
            // console.log(interval);
            // p.noLoop()
            // console.log(p);
        }, 1000);

    };

    p.draw = () => {
        p.background(0)
        

        p.ellipseMode(p.CENTER);
        p.angleMode(p.DEGREES);
        p.colorMode(p.RGB)

        test()
        // fade()

        // p.filter(p.BLUR, 1.3)
    }

    fade = () => {

        for (let i = 0; i < trails.length; i++) {
            const pixel_v = trails[i];
            const pixel = p.get(pixel_v.x, pixel_v.y)

            let c = p.color(pixel[0] - 9);
            p.set(pixel_v.x, pixel_v.y, c)

            if (pixel[0] <= 50) {
                let c = p.color(0);
                p.set(pixel_v.x, pixel_v.y, c)
                // console.log(pixel[0]);
                trails.splice(i, 1)
            }

            p.updatePixels();
        }
    }
    update = () => {
        for (let a of agents) {
            var cos = p.cos(a.angle)
            var sin = p.sin(a.angle)
            var dir = p.createVector(cos, sin)
            var pos = p.createVector(a.pos.x, a.pos.y)
            var newPos = pos.add(dir).mult(moveSpeed)

            if (newPos.x < 0 || newPos.x >= p.width || newPos.y < 0 || newPos.y >= p.height) {
                newPos.x = p.min(p.width - 0.01, p.max(0, newPos.x))
                newPos.y = p.min(p.height - 0.01, p.max(0, newPos.y))

                a.angle = a.angle + p.random(100, 260)
            }

            a.angle = a.angle + p.random(-r_angle, r_angle)

            a.angle >= 360 && (a.angle = a.angle % 360)

            a.pos = newPos

            if (trails.find(i => i.id == `${p.floor(newPos.x)}${p.floor(newPos.y)}`) == undefined) {
                trails.push({ x: p.floor(newPos.x), y: p.floor(newPos.y), id: `${p.floor(newPos.x)}${p.floor(newPos.y)}` })
            }

            // a.pos = { x: p.floor(newPos.x), y: p.floor(newPos.y) }
        }
    }
    show = () => {
        for (let a of agents) {
            let c = p.color(255);
            p.set(a.pos.x, a.pos.y, c)
            p.updatePixels();
        }
    }


    test = () => {
        for (let a of agents) {
            // pos
            var cos = p.cos(a.angle) 
            var sin = p.sin(a.angle) 
            var dir = p.createVector(cos, sin).mult(moveSpeed)
            var pos = p.createVector(a.pos.x, a.pos.y)
            var newPos = pos.add(dir)

            if (newPos.x < 0 || newPos.x >= p.width || newPos.y < 0 || newPos.y >= p.height) {
                newPos.x = p.min(p.width - 0.01, p.max(0, newPos.x))
                newPos.y = p.min(p.height - 0.01, p.max(0, newPos.y))

                a.angle = a.angle + p.random(100, 260)
            }

            a.angle = a.angle + p.random(-r_angle, r_angle)

            a.angle >= 360 && (a.angle = a.angle % 360)

            a.pos = newPos

            var id = `${newPos.x}${newPos.y}`
            if (trails.find(i => i.id == id) == undefined) {
                trails.push({x: newPos.x, y:newPos.y, id})
            }

            // show
            let c = p.color(255);
            p.set(a.pos.x, a.pos.y, c)
            p.updatePixels();
        }
    }
};



new p5(sketch, "container");

class agnet2 {
    constructor(x, y, angle) {
        this.angle = angle
        this.pos = { x, y }
    }
}
