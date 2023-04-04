class Canvas {
    constructor({ WIN, id, width = 700, height = 700, callbacks = {} }) {
        this.WIN = WIN;
        this.canvas = document.getElementById(id);
        this.canvas.width = width;
        this.canvas.height = height;
        this.context = this.canvas.getContext(`2d`);
        this.canvas.addEventListener("wheel", callbacks.wheel);
        this.canvas.addEventListener("mousemove", callbacks.mouseMove);
        this.canvas.addEventListener("mouseup", callbacks.mouseUp);
        this.canvas.addEventListener("mousedown", callbacks.mouseDown);
        this.canvas.addEventListener("mouseleave", callbacks.mouseLeave);
        this.math3D = new Math3D({ WIN: this.WIN });
    }

    xs(x) {
        return (this.canvas.width * (x - this.WIN.LEFT)) / this.WIN.WIDTH;
    }
    ys(y) {
        return this.canvas.height - (this.canvas.height * (y - this.WIN.BOTTOM)) / this.WIN.HEIGHT;
    }
    sx(x) {
        return (x * this.WIN.WIDTH) / this.canvas.width;
    }
    sy(y) {
        return (-y * this.WIN.HEIGHT) / this.canvas.height;
    }
    x(xs) {
        return (xs * this.WIN.WIDTH) / this.canvas.width + this.WIN.LEFT;
    }
    y(ys) {
        return (-ys * this.WIN.HEIGHT) / this.canvas.height + this.WIN.BOTTOM + this.WIN.HEIGHT;
    }

    clear() {
        this.context.fillStyle = "#fffff1";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    line(x1, y1, x2, y2, color = "#191970", width = 2, isDash) {
        this.context.beginPath();
        this.context.strokeStyle = color;
        this.context.lineWidth = width;
        this.context.setLineDash([isDash ? isDash : ""]);
        this.context.moveTo(this.xs(x1), this.ys(y1));
        this.context.lineTo(this.xs(x2), this.ys(y2));
        this.context.stroke();
    }
    text(text, x, y, color = "black", font) {
        this.context.fillStyle = color;
        this.context.font = font || "italic 15px Arial";
        this.context.fillText(text, this.xs(x), this.ys(y));
    }

    point(x, y, color = "red", size = 2) {
        this.context.beginPath();
        this.context.strokeStyle = color;
        this.context.arc(this.xs(x), this.ys(y), size, 0, 2 * Math.PI);
        this.context.stroke();
    }

    polygon(points, color = "#0806") {
        this.context.fillStyle = color;
        this.context.beginPath();
        this.context.moveTo(this.xs(points[0].x), this.ys(points[0].y));
        for (let i = 1; i < points.length; i++) {
            this.context.lineTo(this.xs(points[i].x), this.ys(points[i].y));
        }
        this.context.lineTo(this.xs(points[0].x), this.ys(points[0].y));
        this.context.closePath();
        this.context.fill();
    }

    drawRect(x, y, width, height, color) {
        const heightRect = (height * this.canvas.height) / this.WIN.HEIGHT;
        const widthRect = (width * this.canvas.width) / this.WIN.WIDTH;

        this.context.fillStyle = color;
        this.context.fillRect(this.xs(x), this.ys(y), widthRect, heightRect);
    }
}
