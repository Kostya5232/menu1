class CalculatorComponents extends Component {
    constructor(props) {
        super(props);

        this.calculator = new Calculator();
    }

    _addEventListeners() {
        document.querySelectorAll(".operand-calc").forEach((button) => {
            button.addEventListener("click", () => this.operandHandlerCalc(button.dataset.operand));
        });
        document
            .querySelectorAll(".operand-poly")
            .forEach((button) =>
                button.addEventListener("click", () => this.operandHandlerPoly(button.dataset.operand))
            );

        document
            .querySelectorAll(".operand-result")
            .forEach((button) => button.addEventListener("click", this.operandHandlerResult));
    }

    operandHandlerCalc(operand) {
        const inputA = document.getElementById("inputA");
        const inputB = document.getElementById("inputB");
        let a = this.calculator.getEntity(inputA.value);
        let b = this.calculator.getEntity(inputB.value);
        const c = this.calculator[operand](a, b);
        document.getElementById("CalcResult").innerHTML = c ? c.toString() : "Ошибка!!!";
    }

    operandHandlerPoly(operand) {
        const calc = new PolynomialCalculator();
        const inputP1 = document.getElementById("p1");
        const inputP2 = document.getElementById("p2");
        const a = calc.getPolynomial(inputP1.value);
        const b = calc.getPolynomial(inputP2.value);
        const c = calc[operand](a, b);
        document.getElementById("PolyResult").innerHTML = c ? c.toString() : "Ошибка!!!";
    }

    operandHandlerResult() {
        const calc = new PolynomialCalculator();
        const a = calc.getPolynomial(document.getElementById("p1").value);
        const inputX = document.getElementById("inputX");
        const x = new Calculator().getEntity(inputX.value);
        const res = document.querySelector("#res");
        if (a) {
            res.innerHTML = a.getValue(x).toString();
        }
    }
}
