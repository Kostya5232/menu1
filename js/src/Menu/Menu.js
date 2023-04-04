class Menu extends Component {
    _addEventListeners() {
        document
            .querySelectorAll(".showMenuItem")
            .forEach((button) =>
                button.addEventListener("click", () => this.showMenuItem(button.dataset.component))
            );
    }

    showMenuItem(name) {
        this.callbacks.showMenuItem(name);
    }
}
