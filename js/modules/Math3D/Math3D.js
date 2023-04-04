class Math3D {
  constructor({ WIN }) {
    this.WIN = WIN;
  }

  xs(point) {
    const zs = this.WIN.FOCUS.z;
    const zo = this.WIN.CAMERA.z;
    const xo = this.WIN.CAMERA.x;
    return ((point.x - xo) / (point.z - zo)) * (zs - zo) + xo;
  }
  ys(point) {
    const zs = this.WIN.FOCUS.z;
    const zo = this.WIN.CAMERA.z;
    const yo = this.WIN.CAMERA.y;
    return ((point.y - yo) / (point.z - zo)) * (zs - zo) + yo;
  }

  calcCenter(figure) {
    figure.polygons.forEach((polygon) => {
      const points = polygon.points;
      let x = 0;
      let y = 0;
      let z = 0;
      for (let j = 0; j < points.length; j++) {
        x += figure.points[points[j]].x;
        y += figure.points[points[j]].y;
        z += figure.points[points[j]].z;
      }
      polygon.center.x = x / points.length;
      polygon.center.y = y / points.length;
      polygon.center.z = z / points.length;
    });
  }

  calcDisctance(figure, endPoint, name) {
    figure.polygons.forEach((polygon) => {
      polygon[name] = Math.sqrt(
        Math.pow(endPoint.x - polygon.center.x, 2) +
          Math.pow(endPoint.y - polygon.center.y, 2) +
          Math.pow(endPoint.z - polygon.center.z, 2)
      );
    });
  }

  sortByArtistAlgorithm(polygons) {
    polygons.sort((a, b) => b.distance - a.distance);
  }

  calcIllumination(distance, lumen) {
    const res = distance ? lumen / Math.pow(distance, 3) : 1;
    return res > 1 ? 1 : res;
  }

  mult(T, m) {
    const c = [0, 0, 0, 0];
    for (let i = 0; i < T.length; i++) {
      let s = 0;
      for (let j = 0; j < m.length; j++) {
        s += T[j][i] * m[j];
      }
      c[i] = s;
    }
    return c;
  }

  multMatrix(a, b) {
    const c = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        let s = 0;
        for (let k = 0; k < 4; k++) {
          s += a[i][k] * b[k][j];
        }
        c[i][j] = s;
      }
    }
    return c;
  }

  getTransformMatrix(...args) {
    const result = args.reduce(
      (s, t) => this.multMatrix(s, t),
      [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1],
      ]
    );
    return result;
  }

  zoom(delta) {
    return [
      [delta, 0, 0, 0],
      [0, delta, 0, 0],
      [0, 0, delta, 0],
      [0, 0, 0, delta],
    ];
  }

  transform(matrix, point) {
    const result = this.mult(matrix, [point.x, point.y, point.z, 0]);
    point.x = result[0];
    point.y = result[1];
    point.z = result[2];
  }

  rotateOx(alpha) {
    return [
      [1, 0, 0, 0],
      [0, Math.cos(alpha), Math.sin(alpha), 0],
      [0, -Math.sin(alpha), Math.cos(alpha), 0],
      [0, 0, 0, 1],
    ];
  }

  rotateOy(alpha) {
    return [
      [Math.cos(alpha), 0, -Math.sin(alpha), 0],
      [0, 1, 0, 0],
      [Math.sin(alpha), 0, Math.cos(alpha), 0],
      [0, 0, 0, 1],
    ];
  }

  rotateOz(alpha) {
    return [
      [Math.cos(alpha), Math.sin(alpha), 0, 0],
      [-Math.sin(alpha), Math.cos(alpha), 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1],
    ];
  }

  move(x, y, z) {
    return [
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [x, y, z, 1],
    ];
  }

  calcVector(a, b) {
    return {
      x: b.x - a.x,
      y: b.y - a.y,
      z: b.z - a.z,
    };
  }

  vectorProd(a, b) {
    return {
      x: a.y * b.z - a.z * b.y,
      y: -a.x * b.z + a.z * b.x,
      z: a.x * b.y - a.y * b.x,
    };
  }

  calcVectorModule(a) {
    return Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z);
  }

  calcRadius(figure) {
    const points = figure.points;
    figure.polygons.forEach((polygon) => {
      const center = polygon.center;
      const p1 = points[polygon.points[0]];
      const p2 = points[polygon.points[1]];
      const p3 = points[polygon.points[2]];
      const p4 = points[polygon.points[3]];
      polygon.R =
        this.calcVectorModule(this.calcVector(center, p1)) +
        this.calcVectorModule(this.calcVector(center, p2)) +
        this.calcVectorModule(this.calcVector(center, p3)) +
        this.calcVectorModule(this.calcVector(center, p4));
    });
  }

  calcShadow(polygon, figures, LIGHT) {
    const M1 = polygon.center;
    const r = polygon.R;
    const s = this.calcVector(M1, LIGHT);
    const module = this.calcVectorModule(s);
    for (let i = 0; i < figures.length; i++) {
      if (polygon.figureIndex === i) {
        continue;
      }
      for (let j = 0; j < figures[i].polygons.length; j++) {
        const polygonZ = figures[i].polygons[j];
        const M0 = polygonZ.center;
        if (polygonZ.lumen > polygon.lumen) {
          continue;
        }
        const dark =
          this.calcVectorModule(this.vectorProd(this.calcVector(M0, M1), s)) /
          module;
        if (dark < r) {
          return {
            isShadow: true,
            dark: dark / r,
          };
        }
      }
    }
    return { isShadow: false };
  }
}
