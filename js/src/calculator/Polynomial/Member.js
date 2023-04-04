class Member {
    constructor(value = 0, power = 0) {
        this.value = value - 0;
        this.power = power - 0;
    }

    toString() {
        if (this.value === 0) return "";
        if (this.power === 0) return `${this.value}`;
        if (this.power === 1 && this.value === 1) return "x";
        if (this.power === 1 && this.value === -1) return `-x`;
        if (this.power === 1) return `${this.value}*x`;
        if (this.value === 1) return `x^${this.power}`;
        if (this.value === -1) return `-x^${this.power}`;
        return `${this.value}*x^${this.power}`;
    }
}
