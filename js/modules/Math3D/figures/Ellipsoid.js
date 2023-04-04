class Ellipsiloid extends Figure {
    constructor(a = 10, b = 5, c = 7, count = 20, color = "lightgreen", x = 0, y = 0, z = 0) {
        const points = [];
        const edges = [];
        const polygons = [];
        for (let i = 0; i <= count; i++) {
            const T = ((2 * Math.PI) / count) * i;
            for (let j = 0; j < count; j++) {
                const p = ((2 * Math.PI) / count) * j;
                points.push(
                    new Point(
                        a * Math.sin(T) * Math.cos(p) + x,
                        c * Math.cos(T) + y,
                        b * Math.sin(T) * Math.sin(p) + z
                    )
                );
            }
        }

        for (let i = 0; i < points.length; i++) {
            if (i + 1 < points.length && (i + 1) % count !== 0) {
                edges.push(new Edge(i, i + 1));
            } else if ((i + 1) % count === 0) {
                edges.push(new Edge(i, i + 1 - count));
            }
            if (i < points.length - count) {
                edges.push(new Edge(i, i + count));
            }
        }
        for (let i = 0; i < points.length; i++) {
            if (i + 1 + count < points.length && (i + 1) % count !== 0) {
                polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color));
            } else if (i + count < points.length && (i + 1) % count === 0) {
                polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color));
            }
        }

        super(points, edges, polygons);
    }
}
