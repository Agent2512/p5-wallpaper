var agents = [];
var n_agents = 180
var n_line = 5
var ellipse_size = 8
var line_size = 1
var startBorder = 50
var speed = .6
var backSpeed = 1

var ele = document.getElementById('container')

var sketch = function (p) {
    p.setup = () => {
        p.createCanvas(ele.offsetWidth, ele.offsetHeight, p.P2D);
        p.pixelDensity(1);
        p.background(0)
        p.stroke(255)
        p.ellipseMode(p.CENTER);
        p.angleMode(p.DEGREES);
        p.colorMode(p.RGB)

        for (var i = 0; i < n_agents; i++) {
            // agents.push(new agnet(p.width / 2, p.height / 2, i, p))
            agents.push(new agnet(p.random(startBorder, p.width - startBorder), p.random(startBorder, p.height - startBorder), i, p))
        }
    };

    p.draw = () => {
        p.background(0)

        for (a of agents) {
            a.update()
            a.show()
        }
    }

    p.windowResized = () => {
        p.resizeCanvas(ele.offsetWidth, ele.offsetHeight);
    }

};



new p5(sketch, "container");

class agnet {
    constructor(x, y, id, p5) {
        this.id = id;
        this.p5 = p5;
        this.pos = this.p5.createVector(x, y);

        this.move = [0, 0]

        setInterval(() => {
            var rx = this.p5.round(this.p5.random(0, 1))
            var ry = this.p5.round(this.p5.random(0, 1))

            if (rx == 0) this.move[0] = -speed;
            else if (rx == 1) this.move[0] = speed;


            if (ry == 0) this.move[1] = -speed;
            else if (ry == 1) this.move[1] = speed;
        }, 1000);
    }

    update() {
        var x = this.pos.x, y = this.pos.y;

        var [moveX, moveY] = this.move

        x += moveX
        y += moveY

        const newPos = this.p5.createVector(x, y)


        this.check(newPos)
        this.pos.set(newPos)


    }

    show() {
        this.p5.strokeWeight(1)
        this.p5.ellipse(this.pos.x, this.pos.y, ellipse_size)
        this.nearby()
    }


    check(pos) {
        if (pos.x <= 0 || pos.x >= this.p5.width || pos.y <= 0 || pos.y >= this.p5.height) {
            // agents[this.id] = new agnet(this.p5.random(startBorder,this.p5.width-startBorder), this.p5.random(startBorder,this.p5.height-startBorder), this.id, this.p5)
            // agents[this.id] = new agnet(this.pos.x, this.pos.y, this.id, this.p5)
        }


        if (pos.x <= 0) {
            this.move[0] = backSpeed
        }
        if (pos.x >= this.p5.width) {
            this.move[0] = -backSpeed

        }
        if (pos.y <= 0) {
            this.move[1] = backSpeed
        }
        if (pos.y >= this.p5.height) {
            this.move[1] = -backSpeed
        }

    }


    nearby() {
        var f_agents = agents.filter(i => i.id != this.id)
        var s_agents = f_agents.sort((a, b) => a.pos.dist(this.pos) - b.pos.dist(this.pos))
        s_agents.length = n_line

        for (a of s_agents) {
            this.p5.strokeWeight(line_size)
            this.p5.line(this.pos.x, this.pos.y, a.pos.x, a.pos.y)
        }
    }
}
