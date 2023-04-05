// x^2/p - y^2/q = 2z
class HyperbolicParaboloid extends Figure {
  constructor(
    p = 3,
    q = 4,
    count = 10,
    color = 'lightgreen',
    x = 0,
    y = 0,
    z = 0
  ) {
    const points = [];
    const edges = [];
    const polygons = [];

    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        const x1 = i - count / 2;
        const y1 = j - count / 2;
        const z1 = ((x1 * x1) / p - (y1 * y1) / q) / 2;
        points.push(new Point(x1 + x, z1 + y, y1 + z));
      }
    }

    for (let i = 0; i < points.length; i++) {
      if (points[i + 1]) {
        if ((i + 1) % count !== 0) {
          edges.push(new Edge(i, i + 1));
        }
      }
      if (points[i + count]) {
        edges.push(new Edge(i, i + count));
      }
    }

    for (let i = 0; i < points.length; i++) {
      if (points[i + 1 + count]) {
        if ((i + 1) % count !== 0) {
          polygons.push(
            new Polygon([i, i + 1, i + 1 + count, i + count], color)
          );
        }
      }
    }

    super(points, edges, polygons);
  }
}
