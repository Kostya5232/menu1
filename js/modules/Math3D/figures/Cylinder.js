class Cylinder extends Figure {
    constructor(r = 5, h = 5, count = 10, color = "ff0000", x = 0, y = 0, z = 0) {
        const points = [];
        const edges = [];
        const polygons = [];
        //точки
        for (let i = 0; i < count; i++) {
            const T = ((2 * Math.PI) / count) * i;
            for (let j = -count / 2; j < count / 2; j++) {
                const p = (h / count) * j;

                points.push(new Point(r * Math.cos(T) + x, p + y, r * Math.sin(T) + z));
            }
        }

        //ребра
        for (let i = 0; i < points.length; i++) {
            if ((i + 1) % count != 0 && i + 1 < points.length) {
                edges.push(new Edge(i, i + 1));
            }
            if (i + count < points.length) {
                edges.push(new Edge(i, i + count));
            }
            if (i < count) {
                edges.push(new Edge(i, points.length - count + i));
            }
        }

        //полигоны
        for (let i = 0; i < points.length; i++) {
            if (i + count + 1 < points.length && (i + 1) % count != 0) {
                polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color));
            }
            if (i < count - 1) {
                polygons.push(
                    new Polygon([i, i + 1, points.length - count + i + 1, points.length - count + i], color)
                );
            }
        }

        super(points, edges, polygons);
    }
}
