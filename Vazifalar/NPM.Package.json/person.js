
export class Person {
  constructor(name, yili) {
    this._name = name;
    this._yili = yili;
  }

  get age() {
    const currentYear = new Date().getFullYear();
    return currentYear - this._yili;
  }

  getInfo() {
    return `${this._name} - ${this.age} yoshda`;
  }
}
