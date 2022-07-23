import * as fs from 'fs';

export const createDir = async (dirPath: string) => {
  await fs.mkdir(
    process.cwd() + dirPath,
    { recursive: true },
    (error: Error) => {
      if (error) {
        console.error('Directory Init Error:', error);
      } else {
        console.log('folder was made!');
      }
    }
  );
};

export const createFile = async (filePath: string, fileContent: unknown) => {
  await fs.writeFileSync(filePath, fileContent);
};
