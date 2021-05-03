var sketch = function (p) {
    var agents = [];

    p.setup = () => {
        p.createCanvas(400, 400);
        p.pixelDensity(1);
        p.background(0)

        for (var i = 0; i < 1; i++) {
            agents.push(new agnet(p))
        }

        setTimeout(() => {
            // p.noLoop()
        }, 1000);
    };

    p.draw = () => {

        p.ellipseMode(p.CENTER);
        p.angleMode(p.DEGREES);
        p.colorMode(p.RGB)

        for (let a of agents) {
            a.update()
            a.show()
            a.fade()
        }

    }
};
new p5(sketch, "container");

class agnet {

    constructor(p5) {
        this.p5 = p5
        this.width = this.p5.width
        this.height = this.p5.height

        this.r_angle = 15
        this.moveSpeed = 1
        this.angle = this.p5.random(0, 360)
        this.pos = this.p5.createVector(this.width / 2, this.height / 2)


        this.trails = []

    }

    update = () => {
        var cos = this.p5.cos(this.angle)
        var sin = this.p5.sin(this.angle)
        var dir = this.p5.createVector(cos, sin)
        var newPos = this.pos.add(dir).mult(this.moveSpeed)

        // console.log(dir, newPos);

        if (newPos.x < 0 || newPos.x >= this.width || newPos.y < 0 || newPos.y >= this.height) {
            newPos.x = this.p5.min(this.width - 0.01, this.p5.max(0, newPos.x))
            newPos.y = this.p5.min(this.height - 0.01, this.p5.max(0, newPos.y))


            this.angle = this.angle + this.p5.random(100, 260)
        }

        this.angle = this.angle + this.p5.random(-this.r_angle, this.r_angle)

        this.angle >= 360 && (this.angle = this.angle % 360)
        this.pos = newPos

        this.trails.push({
            x: this.p5.floor(newPos.x),
            y: this.p5.floor(newPos.y)
        })

        // console.log(this.angle);
        // console.log(newPos);
    }

    show = () => {
        this.p5.stroke(255)
        this.p5.strokeWeight(1)
        this.p5.noFill()


        // this.p5.point(this.pos.x, this.pos.y);
        let c = this.p5.color(255);
        this.p5.set(this.pos.x, this.pos.y, c)
        this.p5.updatePixels();
    }


    fade = () => {

        for (let i = 0; i < this.trails.length; i++) {
            const pixel_v = this.trails[i];
            const pixel = this.p5.get(pixel_v.x, pixel_v.y)

            let c = this.p5.color(pixel[0] - 1);
                this.p5.set(pixel_v.x, pixel_v.y, c)

            if (pixel[0] <= 150) {
                let c = this.p5.color(0);
                this.p5.set(pixel_v.x, pixel_v.y, c)
                // console.log(pixel[0]);
                this.trails.splice(i, 1)
            } 

            this.p5.updatePixels();
        }
    }
}

