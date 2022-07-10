export class Color {
  constructor(data, name) {
    this.data = data;
    this.name = name;

    if (data.fills && data.fills[0].type === 'SOLID') {
      //   console.log('rgba:', this.name, data.fills[0], data.background[0]);
      this.rgba = {
        r: this.rgbToInt(data.fills[0].color.r),
        g: this.rgbToInt(data.fills[0].color.g),
        b: this.rgbToInt(data.fills[0].color.b),
        a: data.fills[0].opacity,
      };
    }
  }

  get hex() {
    if (!(this.rgba.r && this.rgba.g && this.rgba.b)) {
      return null;
    }
    return this.rgbToHex(this.rgba.r, this.rgba.g, this.rgba.b);
  }

  get cssColor() {
    // console.log(this.name, this.rgba, this.hex);
    if (this.rgba && this.rgba.a < 1) {
      return `rgba(${this.hex}, ${this.rgba.a.toFixed(2)})`;
    } else {
      return this.hex;
    }
  }

  get cssVariables() {
    return { [this.name]: this.cssColor };
  }

  rgbToInt(value) {
    // console.log('value:', this.name, value);
    return Number(value * 255).toFixed(0);
  }

  intToHex(int) {
    let hex = Number(int).toString(16);
    if (hex.length < 2) {
      hex = '0' + hex;
    }
    return hex;
  }

  rgbToHex(r, g, b) {
    const red = this.intToHex(r);
    const green = this.intToHex(g);
    const blue = this.intToHex(b);
    return '#' + red + green + blue;
  }
}
