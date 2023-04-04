class Figure {
    constructor(points = [], edges = [], polygons = [], center = new Point()) {
        this.points = points;
        this.edges = edges;
        this.polygons = polygons;
        this.center = center;
        this.animations = [];
    }
    
    dropAnimation() {
        this.animations = [];
    }

    setAnimation(method, value, center) {
        this.animations.push({ method, value, center: center ? center : this.center });
    }

    doAnimation(math3D) {
        this.animations.forEach((anim) => {
            const T2 = math3D.getTransformMatrix(math3D[anim.method](anim.value));
            const T1 = math3D.getTransformMatrix(math3D.move(-anim.center.x, -anim.center.y, -anim.center.z));
            const T3 = math3D.getTransformMatrix(math3D.move(anim.center.x, anim.center.y, anim.center.z));

            const matrix = math3D.getTransformMatrix(T1, T2, T3);

            this.points.forEach((point) => {
                math3D.transform(matrix, point);
                math3D.transform(matrix, this.center);
            });
        });
    }
}
