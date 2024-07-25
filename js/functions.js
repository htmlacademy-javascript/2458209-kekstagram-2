
const isStrLengthValid = (str, maxLength) => str.length <= maxLength;
isStrLengthValid('helloy', 6);

const isPolindrome = (str)=> {
  const normilizedStr = String(str).toLowerCase().replaceAll(/\s|[,.!?"/-]/g, '');

  return normilizedStr === normilizedStr.split('').reverse().join('');
};
isPolindrome('121 А роза упала на лапу Азора 121');

const getRetrieveNumber = (str) => {
  const formattedStr = String(str).replaceAll(/\D+/g, '');

  return parseInt(formattedStr, 10);
};
getRetrieveNumber('Next year - 2025!!!');
