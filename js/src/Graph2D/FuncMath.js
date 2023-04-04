class FuncMath {
  constructor({WIN, canvas}) {
    this.WIN = WIN;
    this.canvas = canvas;
  }
  
  getDerivative(f, x0, dx = 0.00001) {return(f(x0 + dx) - f(x0)) / dx;}

  printTangent(f, x0) {
    const k = this.getDerivative(f, x0);
    let b = f(x0) - k * x0;
    let x1 = this.WIN.LEFT;
    let x2 = this.WIN.LEFT + this.WIN.WIDTH;
    let y = k * x1 + b;
    let y2 = k * x2 + b;
    this.canvas.line(x1, y, x2, y2, 'black', 1, (9, 5));
  }

  getIntegral(f, a, b, n = 100) {
    const dx = (b - a) / n;
    let x = a;
    let s = 0;
    while (x < b) {
      s +=  ((f(x) + f(x + dx)) / 2) * dx;
      x += dx
    }
    return s;
  }

  getZero(f, a, b, eps) {
    if (f(a) * f(b) > 0) {
      return null;
    }
    if (Math.abs(f(a) - f(b)) <= eps) {
      return (a + b) / 2;
    }
    var half = (a + b) / 2
    if (f(a) * f(half) <= 0) {
      return this.getZero(f, a, half, eps);
    }
    if ((f(half) * f(b)) <= 0) {
      return this.getZero(f, half, b, eps);
    }
  }

  getCross(f, g, a, b, eps) {
    if ((f(a) - g(a)) * (f(b) - g(b)) > 0) {
      return null;
    }
    if (Math.abs(f(a) - g(a)) <= eps) {
      return a
    }
    var half = (a + b) / 2
    if ((f(a) - g(a)) * (f(half) - g(half)) <= 0) {
      return this.getCross(f, g, a, half, eps);
    }
    if ((f(half) - g(half)) * (f(b) - g(b)) <= 0) {
      return this.getCross(f, g, half, b, eps);
    }
  }
}

function sin(x) {return Math.sin(x);}
function cos(x) {return Math.cos(x);}
