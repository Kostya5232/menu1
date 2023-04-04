class MatrixCalculator {
    constructor(calc = new ComplexCalculator()) {
        this.calc = calc;
    }

    add(a, b) {
        return new Matrix(
            a.values.map((arr, i) => arr.map((elem, j) => this.calc.add(elem, b.values[i][j])))
        );
    }

    sub(a, b) {
        return new Matrix(a.values.map((arr, i) => arr.map((elem, j) => elem - b.values[i][j])));
    }

    mult(a, b) {
        const values = [];
        for (let i = 0; i < a.values.length; i++) {
            values.push([]);
            for (let j = 0; j < a.values[i].length; j++) {
                let s = 0;
                let s2 = 0;
                for (let k = 0; k < a.values[i].length; k++) {
                    if (a.values[i][k].im != 0 && b.values[k][j].im != 0) {
                        s2 =
                            s2 +
                            a.values[i][k].re * b.values[k][j].im +
                            a.values[i][k].im * b.values[k][j].re;
                        s = s + a.values[i][k].re * b.values[k][j].re - a.values[i][k].im * b.values[k][j].im;
                    }
                    if (a.values[i][k].im == 0 && b.values[k][j].im != 0) {
                        s2 = s2 + a.values[i][k].re * b.values[k][j].im;
                        console.log(s2);
                        s = s + a.values[i][k].re * b.values[k][j].re;
                    }
                    if (a.values[i][k].im != 0 && b.values[k][j].im == 0) {
                        s2 = s2 + a.values[i][k].im * b.values[k][j].re;
                        console.log(s2);
                        s = s + a.values[i][k].re * b.values[k][j].re;
                    }
                    if (a.values[i][k].im == 0 && b.values[k][j].im == 0) {
                        s = s + a.values[i][k].re * b.values[k][j].re;
                        s2 = s2;
                        console.log(s2);
                    }
                }

                values[i][j] = new Complex(s, s2);
            }
        }
        return new Matrix(values);
    }

    prod(p, a) {
        return new Matrix(a.values.map((arr) => arr.map((elem) => this.calc.mult(elem, p))));
    }

    pow(a, p) {
        let c = this.one(a.values.length, a.values[0][0]);
        for (let i = 0; i < p; i++) {
            c = this.mult(c, a);
        }

        return c;
    }

    one(length) {
        const values = [];
        for (let i = 0; i < length; i++) {
            values.push([]);
            for (let j = 0; j < length; j++) {
                values[i][j] = i === j ? this.calc.one() : this.calc.zero();
            }
        }
        return new Matrix(values);
    }

    zero(length) {
        const values = [];
        for (let i = 0; i < length; i++) {
            values.push([]);
            for (let j = 0; j < length; j++) {
                values[i][j] = this.calc.zero();
            }
        }
        return new Matrix(values);
    }
}
