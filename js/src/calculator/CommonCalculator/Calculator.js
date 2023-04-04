class Calculator {
    complex(re, im) {
        return new Complex(re, im);
    }
    vector(values) {
        return new Vector(values);
    }
    matrix(values) {
        return new Matrix(values);
    }

    getComplex(str) {
        const arr = str.split("i");
        if (arr.length === 2) {
            const ch = arr[0].substr(arr[0].length - 1);
            arr[0] = arr[0].slice(0, -1);
            arr[1] = arr[1] ? arr[1] : "1";

            if (ch === "-") {
                arr[1] = ch + arr[1];
            }
            if (arr[0]) {
                return new Complex(arr[0] - 0, arr[1] - 0);
            }
            return new Complex(0, arr[1] - 0);
        }
        return new Complex(str - 0);
    }

    getVector(str) {
        const arr = str.slice(1, str.length - 1).split(",");
        return new Vector(arr.map((elem) => this.getEntity(elem)));
    }

    getMatrix(str) {
        const arr = str.slice(1, str.length - 1).split("|");
        return new Matrix(arr.map((elems) => elems.split(";").map((elem) => this.getEntity(elem))));
    }

    getEntity(str) {
        str = str.replaceAll(" ", "").replaceAll("\n", "");
        if (str.includes("[")) {
            return this.getMatrix(str);
        }
        if (str.includes("(")) {
            return this.getVector(str);
        }
        if (str.includes("i")) {
            return this.getComplex(str);
        }
        return this.complex(str - 0);
    }

    add(a, b) {
        return this.get(a).add(a, b);
    }

    sub(a, b) {
        return this.get(a).sub(a, b);
    }

    mult(a, b) {
        return this.get(a).mult(a, b);
    }

    div(a, b) {
        return this.get(a).div(a, b);
    }

    prod(p, a) {
        return this.get(a).prod(p, a);
    }

    pow(a, p) {
        return this.get(a).pow(a, p);
    }

    zero(elem) {
        const type = elem ? elem.constructor.name : null;
        switch (type) {
            case "Vector":
                return this.get(this.vector()).zero(elem.values.length);
            case "Matrix":
                return this.get(this.matrix()).zero(elem.values.length);
            default:
                return this.get(this.complex()).zero();
        }
    }

    one(elem) {
        const type = elem ? elem.constructor.name : null;
        switch (type) {
            case "Vector":
                return this.get(this.vector()).one(elem.values.length);
            case "Matrix":
                return this.get(this.matrix()).one(elem.values.length);
            default:
                return this.get(this.complex()).one();
        }
    }

    get(elem) {
        if (elem instanceof Matrix) return new MatrixCalculator(this.get(elem.values[0][0]));
        if (elem instanceof Vector) return new VectorCalculator(this.get(elem.values[0]));
        if (elem instanceof Polynomial) return new PolynomialCalculator(this.get(elem.values[0]));
        return new ComplexCalculator();
    }
}
