import axios from 'axios';
import { createDir, createFile } from './src/utils/fileSystemUtil';
import { Color } from './src/Color';
import { formatName } from './src/utils/NameUtils';
import 'dotenv/config';

const FIGMA_FILE_ID = process.env.FIGMA_ID;
const FIGMA_ACCESS_TOKEN = process.env.FIGMA_SECRET;
const FIGMA_URL = `https://api.figma.com/v1/files/${FIGMA_FILE_ID}`;

// Get from Figma (body base under typography) later.
const baseFontValue = 16;

const filePath = '/src/styles/figma';
const baseFontSizePath = './src/styles/figma/BaseFontSize.js';
const colorFilePath = './src/styles/figma/Colors.js';
const componentStylesPath = './src/styles/figma/ComponentStyles.js';
const fontSizesPath = './src/styles/figma/FontSizes.js';

const main = async () => {
  const options = {
    method: 'GET',
    url: FIGMA_URL,
    headers: {
      'X-Figma-Token': FIGMA_ACCESS_TOKEN,
    },
  };

  try {
    const result = await axios(options);

    const figmaNode = result.data.document.children[0].children;

    const colorsNode = figmaNode.find((child) => child.name === 'UI Colors');

    const typography = figmaNode.filter(
      (child) => child.name === 'Typography (web)'
    );

    const figmaColorsArray = colorsNode.children.filter(
      (el) =>
        el.type === 'RECTANGLE' && !el.name.toLowerCase().includes('gradient')
    );

    // things.map((item) => {
    //   if (item.fills) {
    //     console.log('item fills:', item.fills);
    //   }
    // });

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
    const colorsContent = `export const Colors = ${JSON.stringify(Obj)}`;
    await createDir(filePath);
    await createFile(colorFilePath, colorsContent);

    // Save BaseFontSize to BaseFontSize.ts file.
    const baseFontContent = `export const BaseFontSize = ${baseFontValue}`;
  } catch (error) {
    if (error instanceof Error) {
      console.error('ERROR:', error);
    }
  }
};

(async () => await main())();
