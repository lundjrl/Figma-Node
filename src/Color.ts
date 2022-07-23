export class Color {
  data: any;
  name: string;
  rgba: any;
  constructor(data: any, name: string) {
    this.data = data;
    this.name = name;

    if (data?.fills?.length > 0 && data?.fills[0]?.type === 'SOLID') {
      this.rgba = {
        r: this.rgbToInt(data.fills[0].color.r),
        g: this.rgbToInt(data.fills[0].color.g),
        b: this.rgbToInt(data.fills[0].color.b),
        // a: data.fills[0].opacity,
      };
    }
  }

  get hex() {
    if (!(this.rgba?.r && this.rgba?.g && this.rgba?.b)) {
      return null;
    }
    return this.rgbToHex(this.rgba.r, this.rgba.g, this.rgba.b);
  }

  get cssColor() {
    if (this.rgba) {
      // && this.rgba.a < 1
      return `rgba(${this.hex})`; //, ${this.rgba.a.toFixed(2)}
    } else {
      return this.hex;
    }
  }

  get cssVariables() {
    return { [this.name]: this.cssColor };
  }

  rgbToInt(value: number) {
    return Number(value * 255).toFixed(0);
  }

  intToHex(int: number) {
    let hex = Number(int).toString(16);
    if (hex.length < 2) {
      hex = '0' + hex;
    }
    return hex;
  }

  rgbToHex(r: number, g: number, b: number) {
    const red = this.intToHex(r);
    const green = this.intToHex(g);
    const blue = this.intToHex(b);
    return '#' + red + green + blue;
  }
}
