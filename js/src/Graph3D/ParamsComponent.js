class ParamsComponent extends Component {
    constructor(options) {
        super(options);
        this.i = 0;
        this.scene = [new Figure()];
    }

    _addEventListeners() {
        document.getElementById("figures").addEventListener("change", () => {
            let value = document.getElementById("figures").value;
            this.value = value;
            this.createElement();
        });

        document.querySelectorAll(".checkboxGraph").forEach((elem) => {
            elem.addEventListener("click", () => {
                this.checkbox(event.target.value);
            });
        });
    }
    checkbox(name) {
        this.callbacks.checkbox(name);
    }
    animation(figure, i) {
        if (figure.constructor.name == "Figure") {
            return;
        }
        const animOption = document.querySelector(`#animOptions${i}`);
        let str = animOption.value.split(",");
        const c = [];
        str.forEach((elem) => {
            c.push(elem.split(" ").filter((el) => el !== ""));
        });
        str = c;
        figure.dropAnimation();
        str.forEach((elem) => {
            if (
                (elem[0] == "rotateOx" || elem[0] == "rotateOy" || elem[0] == "rotateOz") &&
                !isNaN(elem[1]) &&
                elem.length == 2
            ) {
                figure.setAnimation(elem[0], elem[1] - 0);
            }
        });
        animOption.addEventListener("keyup", () => {
            let str = animOption.value.split(",");
            const c = [];
            str.forEach((elem) => {
                c.push(elem.split(" ").filter((el) => el !== ""));
            });
            str = c;
            figure.dropAnimation();
            str.forEach((elem) => {
                if (
                    (elem[0] == "rotateOx" || elem[0] == "rotateOy" || elem[0] == "rotateOz") &&
                    !isNaN(elem[1]) &&
                    elem.length == 2
                ) {
                    figure.setAnimation(elem[0], elem[1] - 0);
                }
            });
        });
    }
    applyParam(figure, k) {
        this.scene[k] = figure;
        for (let i = 0; i < this.scene.length; i++) {
            if (this.scene[i].points.length != 0 && i != k) {
                const value = this.scene[i].constructor.name;
                const inputs = document.querySelectorAll(`.${value}${i}`);
                const color = document.querySelector(`#color${value}${i}`).value;
                this.scene[i] = this.figuresChanger(
                    value,
                    inputs[0].value - 0,
                    inputs[1].value - 0,
                    inputs[2].value - 0,
                    inputs[3].value - 0,
                    color,
                    inputs[4].value - 0,
                    inputs[5].value - 0,
                    inputs[6].value - 0
                ).figure;
            }
            this.animation(this.scene[i], i);
        }
        this.callbacks.applyParam(this.scene);
    }

    createElement() {
        if (this.value == "SolarSystem") {
            document.querySelectorAll(".paramsFigures").forEach((elem) => elem.remove());
            this.solarSystem();
            this.scene = [new Figure()];
            this.i = 0;
            return;
        }
        const div = document.createElement("div");
        const delFigur = document.createElement("button");
        const descriptionFigur = document.createElement("div");
        const color = document.createElement("input");
        const x = document.createElement("input");
        const y = document.createElement("input");
        const z = document.createElement("input");
        const paramADiscpt = document.createElement("div");
        const paramBDiscpt = document.createElement("div");
        const paramCDiscpt = document.createElement("div");
        const countDiscpt = document.createElement("div");
        const colorDiscpt = document.createElement("div");
        const xDiscpt = document.createElement("div");
        const yDiscpt = document.createElement("div");
        const zDiscpt = document.createElement("div");
        const paramA = document.createElement("input");
        const paramB = document.createElement("input");
        const paramC = document.createElement("input");
        const option = document.createElement("input");
        const paramCount = document.createElement("input");

        div.setAttribute("id", `${this.value}${this.i}`);
        div.setAttribute("class", "paramsFigures");

        delFigur.setAttribute("id", `del${this.value}${this.i}`);
        delFigur.innerHTML = "Удалить фигуру";

        color.setAttribute("type", "color");
        color.setAttribute("value", "#3eb8d0");
        color.setAttribute("id", `color${this.value}${this.i}`);

        x.setAttribute("class", `${this.value}${this.i}`);
        x.setAttribute("value", 0);
        y.setAttribute("class", `${this.value}${this.i}`);
        y.setAttribute("value", 0);
        z.setAttribute("class", `${this.value}${this.i}`);
        z.setAttribute("value", 0);

        const params = this.figuresChanger(this.value);
        descriptionFigur.innerHTML = `Фигура номер: ${this.i}, ${this.value}`;
        paramADiscpt.innerHTML = params.descriptionParam[0];
        paramBDiscpt.innerHTML = params.descriptionParam[1];
        paramCDiscpt.innerHTML = params.descriptionParam[2];
        countDiscpt.innerHTML = "Плотность точек:";
        colorDiscpt.innerHTML = "Цвет полигонов";
        xDiscpt.innerHTML = "Начальный x:";
        yDiscpt.innerHTML = "Начальный y:";
        zDiscpt.innerHTML = "Начальный z:";

        paramA.setAttribute("value", params.start[0]);
        paramA.setAttribute("class", `${this.value}${this.i}`);
        paramB.setAttribute("value", params.start[1]);
        paramB.setAttribute("class", `${this.value}${this.i}`);
        paramC.setAttribute("value", params.start[2]);
        paramC.setAttribute("class", `${this.value}${this.i}`);
        paramCount.setAttribute("value", params.start[3]);
        paramCount.setAttribute("class", `${this.value}${this.i}`);
        
        option.setAttribute("id", `animOptions${this.i}`);
        option.setAttribute("placeholder", "rotateOx 0.11 , ...");

        div.appendChild(descriptionFigur);
        div.appendChild(paramADiscpt);
        div.appendChild(paramA);
        div.appendChild(paramBDiscpt);
        div.appendChild(paramB);
        div.appendChild(paramCDiscpt);
        div.appendChild(paramC);

        paramB.classList.add("hide");
        paramC.classList.add("hide");
        paramBDiscpt.classList.add("hide");
        paramCDiscpt.classList.add("hide");
        if (this.value == "Cube") {
            paramA.classList.add("hide");
            paramCount.classList.add("hide");
            countDiscpt.classList.add("hide");
        }
        if (
            this.value == "Tor" ||
            this.value == "HyperbolicParaboloid" ||
            this.value == "Cylinder" ||
            this.value == "EllipticalParabaloid" ||
            this.value == "ParabalidCylinder"
        ) {
            paramB.classList.remove("hide");
            paramBDiscpt.classList.remove("hide");
        }
        if (
            this.value == "Ellipsiloid" ||
            this.value == "TwoWayHyperboloid" ||
            this.value == "OneWayHyperboloid"
        ) {
            paramB.classList.remove("hide");
            paramC.classList.remove("hide");
            paramBDiscpt.classList.remove("hide");
            paramCDiscpt.classList.remove("hide");
        }

        const figur = document.getElementById("selectFigur");

        
        div.appendChild(countDiscpt);
        div.appendChild(paramCount);
        div.appendChild(xDiscpt);
        div.appendChild(x);
        div.appendChild(yDiscpt);
        div.appendChild(y);
        div.appendChild(zDiscpt);
        div.appendChild(z);
        div.appendChild(option);
        div.appendChild(color);
        div.appendChild(delFigur);
        figur.appendChild(div);

        const numberFigur = this.i;
        const value = this.value;

        document.querySelectorAll(`.${this.value}${this.i}`).forEach((elem) =>
            elem.addEventListener("keyup", () => {
                this.applyParam(
                    this.figuresChanger(
                        value,
                        paramA.value - 0,
                        paramB.value - 0,
                        paramC.value - 0,
                        paramCount.value - 0,
                        color.value,
                        x.value - 0,
                        y.value - 0,
                        z.value - 0
                    ).figure,
                    numberFigur
                );
            })
        );

        document.getElementById(`color${this.value}${numberFigur}`).addEventListener("change", () => {
            this.applyParam(
                this.figuresChanger(
                    value,
                    paramA.value - 0,
                    paramB.value - 0,
                    paramC.value - 0,
                    paramCount.value - 0,
                    color.value,
                    x.value - 0,
                    y.value - 0,
                    z.value - 0
                ).figure,
                numberFigur
            );
        });

        this.applyParam(
            this.figuresChanger(
                value,
                paramA.value - 0,
                paramB.value - 0,
                paramC.value - 0,
                paramCount.value - 0,
                color.value,
                x.value - 0,
                y.value - 0,
                z.value - 0
            ).figure,
            numberFigur
        );
        document.getElementById(`del${this.value}${this.i}`).addEventListener("click", () => {
            this.scene[numberFigur] = new Figure();
            figur.removeChild(div);
        });

        this.i++;
    }

    figuresChanger(value, paramA, paramB, paramC, paramCount, color, x, y, z) {
        switch (value) {
            case "Cube":
                return {
                    figure: new Cube(color, x, y, z),
                    start: [0, 0, 0, 0],
                    descriptionParam: ["", "", ""],
                };

            case "Sphere":
                return {
                    figure: new Sphere(paramA, paramCount, color, x, y, z),
                    start: [10, 0, 0, 10],
                    descriptionParam: ["Радиус:", "", ""],
                };

            case "Cone":
                return {
                    figure: new Cone(paramA, paramCount, color, x, y, z),
                    start: [2, 0, 0, 8],
                    descriptionParam: ["Радиус:", "", ""],
                };

            case "Ellipsiloid":
                return {
                    figure: new Ellipsiloid(paramA, paramB, paramC, paramCount, color, x, y, z),
                    start: [10, 5, 7, 10],
                    descriptionParam: ["Коэффициент a:", "Коэффициент b:", "Коэффициент c:"],
                };

            case "Tor":
                return {
                    figure: new Tor(paramA, paramB, paramCount, color, x, y, z),
                    start: [13, 5, 0, 15],
                    descriptionParam: ["Наружный радиус:", "Внутренний радиус:", ""],
                };

            case "HyperbolicParaboloid":
                return {
                    figure: new HyperbolicParaboloid(paramA, paramB, paramCount, color, x, y, z),
                    start: [1, 1, 0, 10],
                    descriptionParam: ["Коэффициент p:", "Коэффициент q:", ""],
                };

            case "Cylinder":
                return {
                    figure: new Cylinder(paramA, paramB, paramCount, color, x, y, z),
                    start: [5, 10, 0, 10],
                    descriptionParam: ["Радиус:", "Высота:", ""],
                };
            case "OneWayHyperboloid":
                return {
                    figure: new OneWayHyperboloid(paramA, paramB, paramC, paramCount, color, x, y, z),
                    start: [1, 1, 1, 10],
                    descriptionParam: ["Коэффициент a:", "Коэффициент b:", "Коэффициент c:"],
                };

            case "TwoWayHyperboloid":
                return {
                    figure: new TwoWayHyperboloid(paramA, paramB, paramC, paramCount, color, x, y, z),
                    start: [1, 1, 1, 10],
                    descriptionParam: ["Коэффициент a:", "Коэффициент b:", "Коэффициент c:"],
                };
            case "EllipticalParabaloid":
                return {
                    figure: new EllipticalParabaloid(paramA, paramB, paramCount, color, x, y, z),
                    start: [3, 3, 0, 10],
                    descriptionParam: ["Коэффициент a:", "Коэффициент b:"],
                };
            case "ParabalidCylinder":
                return {
                    figure: new ParabalidCylinder(paramA, paramB, paramCount, color, x, y, z),
                    start: [5, 5, 1, 10],
                    descriptionParam: ["Коэффициент a:", "Коэффициент b:", "Коэффициент k:"],
                };

            default:
                return {
                    figure: new Figure(),
                    start: [0, 0, 0, 0],
                    descriptionParam: ["", "", ""],
                };
        }
    }
    solarSystem() {
        this.scene = [];
        const sun = new Sphere(69.5, 10, "ffff00");
        const mercury = new Sphere(0.24, 10, "ffff00", 70);
        const venus = new Sphere(0.6, 10, "ffff00", 108);
        const earth = new Sphere(0.63, 10, "00ff00", 149);
        const mars = new Sphere(0.33, 10, "ffff00", 227);
        const jupiter = new Sphere(7, 10, "ffff00", 778);
        const saturn = new Sphere(5.8, 10, "ffff00", 1400);
        const uranus = new Sphere(2.5, 10, "ffff00", 2900);
        const neptune = new Sphere(2.4, 10, "ffff00", 4500);
        sun.setAnimation("rotateOy", 0.024);
        mercury.setAnimation("rotateOy", 0.0037);
        venus.setAnimation("rotateOy", 0.0035);
        earth.setAnimation("rotateOy", 0.0029);
        mars.setAnimation("rotateOy", 0.0024);
        jupiter.setAnimation("rotateOy", 0.0013);
        saturn.setAnimation("rotateOy", 0.0009);
        uranus.setAnimation("rotateOy", 0.0007);
        neptune.setAnimation("rotateOy", 0.0005);

        this.scene.push(sun, mercury, venus, earth, mars, jupiter, saturn, uranus, neptune);
        this.callbacks.applyParam(this.scene);
    }
}
