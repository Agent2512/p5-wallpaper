var agents = [];
var trails = [];
var moveSpeed = 4
var r_angle = 15
var ellipse_size = 10

setInterval(() => {
    // moveSpeed = moveSpeed == 1 ? 4 : 1
}, 1000 * 3);

var sketch = function (p) {
    p.setup = () => {
        p.createCanvas(800, 800, p.P2D);
        p.pixelDensity(1);
        p.background(0)

        for (var i = 0; i < 50; i++) {
            agents.push(new agnet2(p.width / 2, p.height / 2, p.random(360)))
            // agents.push(new agnet2(p.random(p.width), p.random(p.height), p.random(360)))
        }
    };

    p.draw = () => {
        // p.background(0)


        p.ellipseMode(p.CENTER);
        p.angleMode(p.DEGREES);
        p.colorMode(p.RGB)

        test()
        fade()
    }

    fade = () => {

        for (let i = 0; i < trails.length; i++) {
            const pixel_v = trails[i];
            const pixel = p.get(pixel_v.x, pixel_v.y)

            var color_removeI = 2
            let c = p.color(pixel[0] - color_removeI, pixel[1] - color_removeI, pixel[2] - color_removeI);
            p.stroke(c)
            p.fill(c)
            p.ellipse(pixel_v.x, pixel_v.y, ellipse_size)

            var color_limit = 20
            if (pixel[0] <= color_limit && pixel[1] <= color_limit && pixel[2] <= color_limit) {
                let c = p.color(0);
                p.stroke(c)
                p.fill(c)
                p.ellipse(pixel_v.x, pixel_v.y, ellipse_size + 1)

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
    var color_state;


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

                // color_state = [
                //     p.random(20, 200), 
                //     p.random(20, 200), 
                //     p.random(20, 200)
                // ]
            }

            a.angle = a.angle + p.random(-r_angle, r_angle)

            a.angle >= 360 && (a.angle = a.angle % 360)

            a.pos = newPos

            var id = `${newPos.x}${newPos.y}`
            if (trails.find(i => i.id == id) == undefined) {
                trails.push({ x: newPos.x, y: newPos.y, id })
            }

            // show
            let c = p.color(255);
            p.stroke(c)
            p.fill(c)
            p.ellipse(a.pos.x, a.pos.y, ellipse_size)
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
