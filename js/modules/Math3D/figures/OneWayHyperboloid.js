class OneWayHyperboloid extends Figure {
  constructor(
    a = 2,
    b = 3,
    c = 4,
    count = 20,
    color = 'lightgreen',
    x = 0,
    y = 0,
    z = 0
  ) {
    const points = [];
    const edges = [];
    const polygons = [];
    for (let i = 0; i < count; i++) {
      const u = (Math.PI / count) * i;
      for (let j = 0; j < count; j++) {
        const v = ((2 * Math.PI) / count) * j;
        points.push(
          new Point(
            a * Math.cosh(u) * Math.cos(v) + x,
            c * Math.sinh(u) + y,
            b * Math.cosh(u) * Math.sin(v) + z
          )
        );
      }
    }

    for (let i = 0; i < count; i++) {
      const u = (Math.PI / count) * i;
      for (let j = 0; j < count; j++) {
        const v = ((2 * Math.PI) / count) * j;
        points.push(
          new Point(
            a * Math.cosh(u) * Math.cos(v) + x,
            -c * Math.sinh(u) + y,
            b * Math.cosh(u) * Math.sin(v) + z
          )
        );
      }
    }

    for (let i = 0; i < points.length - count; i++) {
      if ((i + 1) % count !== 0) {
        edges.push(new Edge(i, i + 1));
      }
      if (i < count * count - count || i >= count * count) {
        edges.push(new Edge(i, count + i));
      }
    }

    for (let i = 0; i < count; i++) {
      const bottomLeft = count * count - (i + 1) * count;
      const bottomRight = count * count - 1 - count * i;
      const topLeft = points.length - 1 - count * i;
      const topRight = count * count + count * count - count * (i + 1);

      edges.push(new Edge(bottomLeft, bottomRight));
      edges.push(new Edge(topLeft, topRight));
    }

    for (let i = 0; i < points.length - count - 1; i++) {
      if (
        (i + 1) % count !== 0 &&
        (i < count * count - count || i >= count * count)
      ) {
        polygons.push(new Polygon([i, i + 1, i + count + 1, i + count], color));
      }
    }

    for (let i = 0; i < count - 1; i++) {
      const topLeft = count * count - 1 - count * i;
      const topRight = count * count - count * (i + 1);
      const bottomLeft = count * count - (i + 2) * count;
      const bottomRight = count * count - 1 - count * (i + 1);

      polygons.push(
        new Polygon([topLeft, topRight, bottomLeft, bottomRight], color)
      );
      polygons.push(
        new Polygon(
          [
            points.length - 1 - count * i,
            points.length - count * (i + 1),
            points.length - (i + 2) * count,
            points.length - 1 - count * (i + 1),
          ],
          color
        )
      );
    }

    super(points, edges, polygons);
  }
}
