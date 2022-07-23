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

  return formattedArray.join('');
};
