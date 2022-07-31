export const formatName = (name: string) => {
  // Remove glypth's
  const str = name.replace('🎨 ', '').replace('•', '');

  // Separate the words and set the first one to lowercase.
  const strArr = str.split(' ');
  const formattedArray = strArr.map((word, index) => {
    if (index === 0) {
      return word.toLowerCase();
    }
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  const joinedWord = formattedArray.join('');
  return;
  const result = wordWithoutParen(joinedWord);
  console.log('result:', result);
  return result;
};

export const wordWithoutParen = (word: string) => {
  let res = word;
  for (let i = 0; i < word.length; i++) {
    const firstParenIndex = word.indexOf('(');
    const lastParenIndex = word.indexOf(')');
    const minusSignIndex = word.indexOf('-');
    const slashIndex = word.indexOf('/');

    res = mapAndFormatWord(res, '', firstParenIndex);
    res = mapAndFormatWord(res, '', lastParenIndex);
    res = mapAndFormatWord(res, '', minusSignIndex);
    res = mapAndFormatWord(res, '', slashIndex);
  }

  return res;
};

export const mapAndFormatWord = (
  word: string,
  replacementChar: string,
  index: number
) => {
  if (index < 0) {
    return word;
  }

  const chars = word.split('');
  const upperCaseChar = chars[index + 1]?.toUpperCase() ?? ',';
  const replaceStr =
    replacementChar?.length > 0 ? replacementChar : upperCaseChar;
  chars[index + 1] = replaceStr;
  chars[index] = ',';

  const joinedWord = chars.filter((letter) => letter !== ',').join('');
  console.log('word:', joinedWord);
  return joinedWord;
};
