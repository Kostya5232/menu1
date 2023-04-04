class UIComponent extends Component {
    constructor(options) {
        super(options);
        this.num = 0;
    }

    _addEventListeners() {
        document.getElementById("addFunction").addEventListener("click", () => this.addFunction());
    }

    addFunction() {
        console.log(1)
        const button = document.createElement("button");
        button.setAttribute("id", "delete");
        button.innerHTML = "Delete";
        button.addEventListener("click", () => {
            this.callbacks.delFunction(input.dataset.num);
            div.removeChild(input);
            div.removeChild(button);
            div.removeChild(width);
            div.removeChild(color);
            div.removeChild(startLine);
            div.removeChild(endLine);
            div.removeChild(checkbox);
            div.removeChild(derivativeSpan);
        });

        const startLine = document.createElement("input");
        startLine.setAttribute("placeholder", "Start line");
        startLine.setAttribute("class", "params");
        startLine.setAttribute("id", "startLine" + this.num);
        startLine.dataset.num = this.num;
        startLine.addEventListener("keyup", () => this.getValue(startLine));

        const endLine = document.createElement("input");
        endLine.setAttribute("placeholder", "End line");
        endLine.setAttribute("class", "params");
        endLine.setAttribute("id", "endLine" + this.num);
        endLine.dataset.num = this.num;
        endLine.addEventListener("keyup", () => this.getValue(endLine));

        const width = document.createElement("input");
        width.setAttribute("placeholder", "Width");
        width.setAttribute("id", "width" + this.num);
        width.setAttribute("class", "params");
        width.dataset.num = this.num;
        width.addEventListener("keyup", () => this.getValue(width));

        const color = document.createElement("input");
        color.setAttribute("placeholder", "Color");
        color.setAttribute("id", "color" + this.num);
        color.setAttribute("class", "params");
        color.dataset.num = this.num;
        color.addEventListener("keyup", () => this.getValue(color));

        const input = document.createElement("input");
        input.setAttribute("placeholder", `Function №${this.num}`);
        input.setAttribute("id", "inp" + this.num);
        input.setAttribute("class", "params");
        input.dataset.num = this.num;
        input.addEventListener("keyup", () => this.keyup(input));

        const checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("class", "check2D");

        checkbox.setAttribute("id", "checkbox" + this.num);
        checkbox.dataset.num = this.num;
        const derivativeDiv = document.createElement("div");
        derivativeDiv.innerHTML = "Показывать касательную";
        checkbox.addEventListener("click", () => {
            if (checkbox.hasAttribute("cheked")) {
                checkbox.removeAttribute("cheked");
            } else checkbox.setAttribute("cheked", "");
            this.getValue(checkbox);
        });

        const div = document.createElement("div");

        const funcsInputs = document.getElementById("funcsInputs");
        funcsInputs.appendChild(div);
        div.appendChild(input);
        div.appendChild(width);
        div.appendChild(color);
        div.appendChild(startLine);
        div.appendChild(endLine);
        div.appendChild(button);
        div.appendChild(checkbox);
        div.appendChild(derivativeDiv);

        this.num++;
    }

    keyup(elem) {
        try {
            let f;
            eval(`f = function (x) {return ${elem.value};}`);

            let width = document.getElementById(`width${elem.dataset.num}`);
            let color = document.getElementById(`color${elem.dataset.num}`);

            let startLine = document.getElementById(`startLine${elem.dataset.num}`);
            let endLine = document.getElementById(`endLine${elem.dataset.num}`);

            let check = document.getElementById(`checkbox${elem.dataset.num}`);
            const flag = check.hasAttribute("cheked");

            this.callbacks.addFunction(
                f,
                elem.dataset.num,
                width.value,
                color.value,
                startLine.value,
                endLine.value,
                flag
            );
        } catch (e) {}
    }

    getValue(elem) {
        try {
            let f;
            let graph = document.getElementById(`inp${elem.dataset.num}`);
            eval(`f = function (x) {return ${graph.value};}`);

            let check = document.getElementById(`checkbox${elem.dataset.num}`);
            const flag = check.hasAttribute("cheked");

            let width = document.getElementById(`width${elem.dataset.num}`);
            let color = document.getElementById(`color${elem.dataset.num}`);

            let startLine = document.getElementById(`startLine${elem.dataset.num}`);
            let endLine = document.getElementById(`endLine${elem.dataset.num}`);

            this.callbacks.addFunction(
                f,
                elem.dataset.num,
                width.value,
                color.value,
                startLine.value,
                endLine.value,
                flag
            );
        } catch (e) {}
    }
}
