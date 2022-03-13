// custom extensions for String class

export function getFirst4Chars(str: string): string {
  return str.replaceAll(' ', '').slice(0, 4).toLowerCase()
}

/**
 * Removes all spaces and gets first 4 characters
 */
String.prototype.getFirst4Chars = function () {
  return getFirst4Chars(this.toString())
}

export function normalizeGameName(str: string): string {
  const punctuationRegex = /[ .,\/#!$%\^&\*;:{}=\-_`~()'’]/g
  return str.replaceAll(punctuationRegex, '').toLowerCase()
}

String.prototype.normalizeGameName = function () {
  return normalizeGameName(this.toString())
}
