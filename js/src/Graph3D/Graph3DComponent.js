window.requestAnimFrame = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callbacks) {
      window.setTimeout(callbacks, 1000, 160);
    }
  );
})();

class Graph3DComponent extends Component {
  constructor(param) {
    super(param);

    this.WIN = {
      LEFT: -5,
      BOTTOM: -5,
      WIDTH: 10,
      HEIGHT: 10,
      FOCUS: new Point(0, 0, 30),
      CAMERA: new Point(0, 0, 40),
    };
    this.canRotate = false;

    this.LIGHT = new Light(-30, 30, 10, 30000);
    this.scene = [new Sphere(), new Sphere(3, 20, '#ffff00', -15, 12, -7)];

    this.pointsCheckbox = true;
    this.edgesCheckbox = true;
    this.polygonsCheckbox = true;
    this.lumenCheckbox = true;
    this.oneFigurCheckbox = false;
    this.animationCheckbox = true;

    this.canvas = new Canvas({
      WIN: this.WIN,
      id: 'canvas3D',
      width: 600,
      height: 600,
      callbacks: {
        wheel: (event) => this.wheel(event),
        mouseMove: (event) => this.mouseMove(event),
        mouseUp: () => this.mouseUp(),
        mouseDown: () => this.mouseDown(),
      },
    });
    this.ParamsComponent = new ParamsComponent({
      id: 'ParamsComponent',
      parent: this.id,
      callbacks: {
        applyParam: (scene, i) => this.applyParam(scene),
        DelParam: (i) => this.DelParam(i),
        checkbox: (name) => this.checkbox(name),
      },
    });

    this.math3D = new Math3D({
      WIN: this.WIN,
    });

    setInterval(() => {
      this.scene.forEach((figure) => figure.doAnimation(this.math3D));
    }, 50);
    let FPS = 0;
    this.FPS = 0;
    let lastTimestamp = Date.now();

    const animLoop = () => {
      FPS++;
      const timestamp = Date.now();
      if (timestamp - lastTimestamp >= 1000) {
        this.FPS = FPS;
        FPS = 0;
        lastTimestamp = timestamp;
      }
      window.requestAnimFrame(animLoop);
      this.scene.forEach((elem) => elem.doAnimation(this.math3D));

      this.renderScene();
    };

    animLoop();
  }

  checkbox(name) {
    this[name] = !this[name];
  }
  applyParam(scene) {
    this.scene = scene;
  }

  wheel(event) {
    const delta = event.wheelDelta > 0 ? 1 : -1;
    this.WIN.CAMERA.z += delta;
    this.WIN.FOCUS.z += delta;
  }

  mouseUp() {
    this.canRotate = false;
  }
  mouseDown() {
    this.canRotate = true;
  }
  mouseMove(event) {
    if (this.canRotate) {
      this.scene.forEach((elem) =>
        elem.points.forEach((point) => {
          const { movementX, movementY } = event;
          this.math3D.transform(this.math3D.rotateOy(movementX / 180), point);
          this.math3D.transform(this.math3D.rotateOx(movementY / 180), point);
        })
      );
    }
  }

  renderScene() {
    this.canvas.clear();
    if (this.polygonsCheckbox) {
      const polygons = [];
      this.scene.forEach((figure, index) => {
        this.math3D.calcCenter(figure);
        this.math3D.calcRadius(figure);
        this.math3D.calcDisctance(figure, this.WIN.CAMERA, 'distance');
        this.math3D.calcDisctance(figure, this.LIGHT, 'lumen');
        figure.polygons.forEach((polygon) => {
          polygon.figureIndex = index;
          polygons.push(polygon);
        });
      });
      this.math3D.sortByArtistAlgorithm(polygons);
      polygons.forEach((polygon) => {
        const figure = this.scene[polygon.figureIndex];
        const points = [
          figure.points[polygon.points[0]],
          figure.points[polygon.points[1]],
          figure.points[polygon.points[2]],
          figure.points[polygon.points[3]],
        ];
        let { r, g, b } = polygon.color;
        const { isShadow, dark } = this.math3D.calcShadow(
          polygon,
          this.scene,
          this.LIGHT
        );
        let lumen = this.math3D.calcIllumination(
          polygon.lumen,
          this.LIGHT.lumen * (isShadow ? dark : 1)
        );
        r = Math.round(r * lumen);
        g = Math.round(g * lumen);
        b = Math.round(b * lumen);
        this.canvas.polygon(
          points.map((point) => {
            return {
              x: this.math3D.xs(point),
              y: this.math3D.ys(point),
            };
          }),
          polygon.rgbToHex(r, g, b)
        );
      });
    }
    if (this.edgesCheckbox) {
      this.scene.forEach((elem) =>
        elem.edges.forEach((edge) => {
          const point1 = elem.points[edge.p1];
          const point2 = elem.points[edge.p2];
          this.canvas.line(
            this.math3D.xs(point1),
            this.math3D.ys(point1),
            this.math3D.xs(point2),
            this.math3D.ys(point2)
          );
        })
      );
    }
    if (this.pointsCheckbox) {
      this.scene.forEach((elem) =>
        elem.points.forEach((point) => {
          this.canvas.point(this.math3D.xs(point), this.math3D.ys(point));
        })
      );
    }
    this.canvas.text(`FPS:${this.FPS}`, -4, 4);
  }
}
