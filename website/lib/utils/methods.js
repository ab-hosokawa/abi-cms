/**
 *
 * ゼロ埋め
 * @param {String} num
 * @param {number} digits
 * @returns
 *
 */
export const ToDoubleDigits = (num, digits = 2) => {
  return (Array(digits).join('0') + num).slice(-digits);
};
/**
 *
 * ゼロ詰め
 * @param {String} num
 * @returns {number}
 *
 */
export const ToSingleDigits = (num) => {
  return Number(num);
};
/**
 * brタグを改行文字に変換
 * @param html
 * @returns {string}
 */
export const convertBrToNewline = (html) => {
  // HTMLコード内のすべての<br>タグを改行文字に置換します
  if (html && html !== '') {
    return html.replace(/<br\s*\/?>/gi, '\n');
  } else {
    return '';
  }
};
/**
 * 改行文字をbrタグに変換
 * @param {string} text
 * @returns {string}
 */
export const convertNewlineToBr = (text) => {
  // 改行文字をすべて<br>タグに置換します
  if (text && text !== '') {
    return text.replace(/(\r\n|\n|\r)/gm, '<br />');
  } else {
    return '';
  }
};
