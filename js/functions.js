
const isLengthValid = (str, maxLength) => str.length <= maxLength;
isLengthValid('helloy', 6);

const isPolindrome = (str) => {
  const normilizedStr = String(str).toLowerCase().replaceAll(' ', '');
  let reverseStr = '';

  for(let i = normilizedStr.length - 1; i >= 0; i--) {
    reverseStr += normilizedStr[i];
  }

  return normilizedStr === reverseStr;
};
isPolindrome('А роза упала на лапу Азора');


const getRetrieveNumber = (str) => {
  const formattedStr = String(str).replaceAll(/\D+/g, '');

  return parseInt(formattedStr, 10);
};
getRetrieveNumber('Next year - 2025!!!');
