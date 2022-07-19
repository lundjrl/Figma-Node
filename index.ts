import axios from 'axios';
import { createDir, createFile } from './src/fileSystemUtil';
import { Color } from './src/Color';
import { formatName } from './src/NameUtils';
import 'dotenv/config';

const FIGMA_FILE_ID = process.env.FIGMA_ID;
const FIGMA_ACCESS_TOKEN = process.env.FIGMA_SECRET;
const FIGMA_URL = `https://api.figma.com/v1/files/${FIGMA_FILE_ID}`;

const filePath = '/src/figma';
const baseFontSizePath = './src/figma/BaseFontSize.ts';
const colorFilePath = './src/figma/Colors.ts';
const componentStylesPath = './src/figma/ComponentStyles.ts';
const fontSizesPath = './src/figma/FontSizes.ts';

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

    const colors = figmaNode.filter((child) => child.name === 'Colors');

    const typography = figmaNode.filter((child) => child.name === 'Typography');

    const things = colors[0].children.filter(
      (el) => el.type === 'COMPONENT' || el.type === 'FRAME'
    );

    const filteredData = things.filter(
      (el) => !el.name.toLowerCase().includes('gradient')
    );

    const colorsArray = filteredData.map((el) => {
      const name = formatName(el.name);

      return new Color(el?.children[0], name);
    });

    const Obj = {};
    colorsArray.forEach((element) => {
      const key = Object.keys(element.cssVariables)[0];
      const val = Object.values(element.cssVariables)[0];
      Obj[key] = val;
    });

    const content = `export const Colors = ${JSON.stringify(Obj)}`;
    await createDir(filePath);
    await createFile(colorFilePath, content);
  } catch (error) {
    if (error instanceof Error) {
      console.error('ERROR:', error);
    }
  }
};

(async () => await main())();
