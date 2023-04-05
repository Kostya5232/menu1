class HyperbolicCylinder extends Figure {
  constructor(
    a = 10,
    b = 10,
    count = 20,
    color = 'lightgreen',
    x = 0,
    y = 0,
    z = 0
  ) {
    const points = [];
    const edges = [];
    const polygons = [];

    for (let i = -count / 2; i <= count / 2; i++) {
      const T = (Math.PI / count) * i;
      for (let j = 0; j < count; j++) {
        const p = ((3 * Math.PI) / count) * j;
        points.push(
          new Point(b * Math.sinh(T) + x, a * Math.cosh(T) + y, p * 2 + z)
        );
      }
    }

    for (let i = -count / 2; i <= count / 2; i++) {
      const T = (Math.PI / count) * i;
      for (let j = 0; j < count; j++) {
        const p = ((3 * Math.PI) / count) * j;
        points.push(
          new Point(b * Math.sinh(T) + x, -a * Math.cosh(T) + y, p * 2 + z)
        );
      }
    }

    for (let i = 0; i < points.length; i++) {
      if (i + 1 < points.length && (i + 1) % count != 0) {
        edges.push(new Edge(i, i + 1));
      }
      if (i + count < points.length && i < count * count) {
        edges.push(new Edge(i, i + count));
      }
      if (i + count < points.length && i >= count * count + count) {
        edges.push(new Edge(i, i + count));
      }
    }

    for (let i = 0; i < points.length; i++) {
      if (
        i + count + 1 < points.length &&
        (i + 1) % count != 0 &&
        i < count * count
      ) {
        polygons.push(new Polygon([i, i + 1, count + i + 1, count + i], color));
      }
      if (
        i + count + 1 < points.length &&
        (i + 1) % count != 0 &&
        i >= count * count + count
      ) {
        polygons.push(new Polygon([i, i + 1, count + i + 1, count + i], color));
      }
    }

    super(points, edges, polygons);
  }
}
