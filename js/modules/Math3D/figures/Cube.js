class Cube extends Figure {
    constructor(color = "#ff0000", x = 0, y = 0, z = 0) {
        const points = [
            new Point(10 + x, 10 + y, 10 + z),
            new Point(10 + x, -10 + y, 10 + z),
            new Point(-10 + x, 10 + y, 10 + z),
            new Point(10 + x, 10 + y, -10 + z),
            new Point(-10 + x, 10 + y, -10 + z),
            new Point(-10 + x, -10 + y, 10 + z),
            new Point(-10 + x, -10 + y, -10 + z),
            new Point(10 + x, -10 + y, -10 + z),
        ];
        const edges = [
            new Edge(0, 1),
            new Edge(0, 2),
            new Edge(0, 3),
            new Edge(4, 2),
            new Edge(4, 3),
            new Edge(5, 1),
            new Edge(5, 2),
            new Edge(6, 5),
            new Edge(6, 4),
            new Edge(7, 6),
            new Edge(7, 3),
            new Edge(7, 1),
        ];
        const polygons = [
            new Polygon([0, 1, 5, 2], color),
            new Polygon([7, 6, 4, 3], color),
            new Polygon([7, 6, 5, 1], color),
            new Polygon([2, 4, 6, 5], color),
            new Polygon([0, 3, 7, 1], color),
            new Polygon([0, 3, 4, 2], color),
        ];
        super(points, edges, polygons);
    }
}
