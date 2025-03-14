export const getArrayToText = (array = [], value = '', key = 'value', label = 'label') => {
  const item = array.find((element) => element[key] === value)
  return item ? item[label] : ''
}
