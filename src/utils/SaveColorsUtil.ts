import { createDir, createFile } from './fileSystemUtil';
import { formatName } from './NameUtils';
import { Color } from '../Color';

export const saveFigmaColors = async (
  figmaNode: any,
  folderPath: string,
  colorFilePath: string
) => {
  try {
    const colorsNode = figmaNode.find((child) => child.name === 'UI Colors');

    const figmaColorsArray = colorsNode.children.filter(
      (el) =>
        el.type === 'RECTANGLE' && !el.name.toLowerCase().includes('gradient')
    );

    const colorsArray = figmaColorsArray.map((el) => {
      const name = formatName(el.name);

      return new Color(el, name);
    });

    const Obj = {};
    colorsArray.forEach((element) => {
      const key = Object.keys(element.cssVariables)[0];
      const val = Object.values(element.cssVariables)[0];
      Obj[key] = val;
    });

    // Save colors to Colors.ts file.
    const colorsContent = `const Colors = ${JSON.stringify(
      Obj
    )} \n\nmodule.exports = Colors;`;
    await createDir(folderPath);
    await createFile(colorFilePath, colorsContent);
  } catch (error) {
    console.error('COLORS ERROR:', error);
  }
};
