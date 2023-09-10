export default function toCase(str: string, caseType: 'pascal'|'camel'|'snake' = 'camel') {
  if (!str) return str;
  const strArray: string[] = (str.includes(' ')) ? str.split(' ') : [str];
  const newStrArray: string[] = [];
  strArray.forEach((word) => {
    if (caseType === 'pascal') {
      newStrArray.push(word.charAt(0).toUpperCase() + word.slice(1));
    } else if (caseType === 'camel') {
      newStrArray.push(word.charAt(0).toLowerCase() + word.slice(1));
    } else if (caseType === 'snake') {
      newStrArray.push(word.toLowerCase());
    }
  });

  return (caseType === 'snake')
    ? (newStrArray.join('_'))
    : (newStrArray.join(''));
}
