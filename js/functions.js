
const isLengthValid = (str, maxLength) => str.length <= maxLength;
isLengthValid('helloy', 6);

const isPolindrome = (str) => {
  str = String(str).toUpperCase().replaceAll(' ', '');
  let reverseStr = '';

  for(let i = str.length - 1; i >= 0; i--) {
    reverseStr += str[i];

    if (str[i] !== str[str.length - i - 1]){
      return false;
    }
  }

  return str === reverseStr;
};
isPolindrome();

const toRetrieveNumber = (str) => {
  str = String(str).replaceAll(/\D+/g, '');

  return parseInt(str, 10);
};
toRetrieveNumber();
