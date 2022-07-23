import { createDir, createFile } from './fileSystemUtil';

export const saveFigmaBaseFontSize = async (
  figmaNode: any,
  folderPath: string,
  baseFontFilePath: string
) => {
  try {
    const typographyNode = figmaNode.find(
      (child) => child.name === 'Typography (web)'
    );

    const baseFontChildArray = typographyNode.children.filter(
      (item) =>
        item?.name.toLowerCase().includes('body') &&
        item?.characters.toLowerCase().includes('body base')
    );

    const baseFontValue =
      (baseFontChildArray?.length > 0 &&
        baseFontChildArray[0]?.style?.fontSize) ||
      16;

    // Save BaseFontSize to BaseFontSize.ts file.
    const baseFontContent = `const BaseFontSize = ${baseFontValue} \n\nmodule.exports = BaseFontSize;`;
    await createDir(folderPath);
    await createFile(baseFontFilePath, baseFontContent);
  } catch (error) {
    console.error('COLORS ERROR:', error);
  }
};
