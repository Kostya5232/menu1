class App extends Component {
    constructor(props) {
        super(props);

        this.menu = new Menu({
            id: "menu",
            parent: this.id,
            template: template.MenuTemplate,
            callbacks: {
                showMenuItem: (name) => this.showMenuItem(name),
            },
        });
        this.calculator = new CalculatorComponents({
            id: "calc",
            parent: this.id,
            template: template.calculatorTemplate,
        });
        this.graph2D = new Graph2DComponent({
            id: "graph2D",
            parent: this.id,
            template: template.graph2DTemplate,
        });
        this.graph3D = new Graph3DComponent({
            id: "graph3D",
            parent: this.id,
            template: template.Graph3DTemplate,
        });

        this.showMenuItem("graph3D");
    }

    showMenuItem(name) {
        this.calculator.hide();
        this.graph2D.hide();
        this.graph3D.hide();

        this[name].show();
    }
}
