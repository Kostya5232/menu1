class Tor extends Figure {
    constructor(R = 13, r = 5, count = 15, color = "lightgreen", x = 0, y = 0, z = 0) {
        const points = [];
        const edges = [];
        const polygons = [];
        for (let i = 0; i < count; i++) {
            const T = ((2 * Math.PI) / count) * i;
            for (let j = 0; j < count; j++) {
                const p = ((2 * Math.PI) / count) * j;
                points.push(
                    new Point(
                        (R + r * Math.cos(T)) * Math.cos(p) + x,
                        r * Math.sin(T) + y,
                        (R + r * Math.cos(T)) * Math.sin(p) + z
                    )
                );
            }
        }

        for (let i = 0; i < points.length; i++) {
            if ((i + 1) % count === 0) {
                edges.push(new Edge(i, i + 1 - count));
            } else {
                edges.push(new Edge(i, i + 1));
            }
            if (points[i + count]) {
                edges.push(new Edge(i, i + count));
            } else {
                edges.push(new Edge(i, count - (points.length - i)));
            }
        }

        for (let i = 0; i < points.length; i++) {
            if (i + 1 + count < points.length && (i + 1) % count !== 0) {
                polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color));
            }
            if (i + count < points.length && (i + 1) % count === 0) {
                polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color));
            }
            if (!points[i + count] && i + 1 < points.length) {
                polygons.push(
                    new Polygon(
                        [i, i + 1, count - (points.length - i) + 1, count - (points.length - i)],
                        color
                    )
                );
            }
        }
        polygons.push(new Polygon([0, count - 1, points.length - 1, points.length - count], color));

        super(points, edges, polygons);
    }
}
