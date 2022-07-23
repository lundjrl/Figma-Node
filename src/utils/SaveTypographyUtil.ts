import { createDir, createFile } from './fileSystemUtil';
import { formatName } from './NameUtils';

export const saveFigmaTypography = async (
  figmaNode: any,
  folderPath: string,
  baseFontFilePath: string
) => {
  try {
    const typographyNode = figmaNode.find(
      (child) => child.name === 'Typography (web)'
    );

    const Obj = {};

    typographyNode.children.map((item) => {
      const letterspacing = item.style.letterSpacing * 0.0625;

      if (!isNaN(parseInt(item.characters))) {
        return null;
      } else if (item.characters.length > 40) {
        return null;
      }

      const name = formatName(item.characters);
      const formattedName = name.split('');

      return (Obj[name] = {
        fontSize: item.style.fontSize,
        fontWeight: item.style.fontWeight,
        lineHeight: parseInt(item.style.lineHeightPx),
        letterSpacing: letterspacing.toFixed(3) + 'em',
      });
    });

    const content = JSON.stringify(Obj);

    // Save BaseFontSize to BaseFontSize.ts file.
    const baseFontContent = `const BaseFontSize = require('./BaseFontSize')\n\nconst FontSizes = ${content} \n\nmodule.exports = FontSizes;`;
    await createDir(folderPath);
    await createFile(baseFontFilePath, baseFontContent);
  } catch (error) {
    console.error('COLORS ERROR:', error);
  }
};
