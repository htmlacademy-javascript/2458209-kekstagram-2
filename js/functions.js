// Функция для проверки длины строки.

function checkStringLength(string, stringLength) {
  return string.length <= stringLength;
}
checkStringLength('helloy', 6);

// палиндром?

const isPolindrome = (string = '') => {
  string = string.replaceAll(' ', '').toUpperCase();
  let reverseString = '';
  for (let i = string.length - 1; i >= 0; i--) {
    reverseString += string[i];
  }
  return string === reverseString;
};
isPolindrome();
