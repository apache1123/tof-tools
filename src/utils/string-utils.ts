export function containsString(text: string, searchString: string) {
  return text.toLowerCase().includes(searchString.toLowerCase());
}

export function indexOfIgnoringCase(text: string, searchString: string) {
  return text.toLowerCase().indexOf(searchString.toLowerCase());
}

export function splitIntoWords(text: string) {
  return text.split(' ').filter((word) => word !== '');
}

export function pascalCaseToCamelCase(text: string) {
  return `${text[0].toLowerCase()}${text.slice(1)}`;
}

/** e.g. 'Normal case' -> 'normal-case' */
export function normalCaseToKebabCase(text: string) {
  return text.toLowerCase().replaceAll(' ', '-');
}

/** e.g. 'PascalCase' -> 'pascal-case' */
export function pascalCaseToKebabCase(text: string) {
  return normalCaseToKebabCase(text);
}
