import axios from 'axios';
import { saveFigmaColors } from './src/utils/SaveColorsUtil';
import { saveFigmaBaseFontSize } from './src/utils/SaveBaseFontSizeUtil';
import { saveFigmaTypography } from './src/utils/SaveTypographyUtil';

import 'dotenv/config';

const FIGMA_FILE_ID = process.env.FIGMA_ID;
const FIGMA_ACCESS_TOKEN = process.env.FIGMA_SECRET;
const FIGMA_URL = `https://api.figma.com/v1/files/${FIGMA_FILE_ID}`;

// Get from Figma (body base under typography) later.
const baseFontValue = 16;
const outputDir = 'output';

const filePath = `/${outputDir}/src/styles/figma`;
const baseFontSizePath = `./src/styles/figma/BaseFontSize.js`;
const colorFilePath = `./${outputDir}/src/styles/figma/Colors.js`;
const componentStylesPath = `./${outputDir}/src/styles/figma/ComponentStyles.js`;
const fontSizesPath = `./${outputDir}/src/styles/figma/FontSizes.js`;
const tailwindConfigPath = `./${outputDir}/tailwind.config.js`;

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

    await saveFigmaBaseFontSize(figmaNode, filePath, baseFontSizePath);

    await saveFigmaTypography(figmaNode, filePath, fontSizesPath);

    await saveFigmaColors(figmaNode, filePath, colorFilePath);
  } catch (error) {
    if (error instanceof Error) {
      console.error('ERROR:', error);
    }
  }
};

(async () => await main())();
