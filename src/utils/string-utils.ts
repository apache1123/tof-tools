export function containsString(text: string, searchString: string) {
  return text.toLowerCase().includes(searchString.toLowerCase());
}

export function indexOfIgnoringCase(text: string, searchString: string) {
  return text.toLowerCase().indexOf(searchString.toLowerCase());
}

export function splitIntoWords(text: string) {
  return text.split(' ').filter((word) => word !== '');
}
