const checkStringLength = (newString, maxStringLength) => newString.length <= maxStringLength;

checkStringLength('helloy', 6);

const isPolindrome = (newString = '') => {
  const result = newString.toString().replaceAll(' ', '').toUpperCase();
  let reversNewString = '';

  for (let i = 0; i < result; i++) {
    if (result[i] !== result[result.length - i - 1]){
      return false;
    }
  }

  for (let i = result.length - 1; i >= 0; i--) {
    reversNewString += result[i];
  }

  return reversNewString === result;
};

isPolindrome();

// Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа.
// Если в строке нет ни одной цифры, функция должна вернуть NaN:

// console.log(toRetrieveNumber(2023 год'))('2023 год'); // 2023
// имяФункции('ECMAScript 2022'); // 2022
// имяФункции('1 кефир, 0.5 батона'); // 105
// имяФункции('агент 007'); // 7
// имяФункции('а я томат'); // NaN
// имяФункции(2023); // 2023
// имяФункции(-1);   // 1
// имяФункции(1.5);  // 15

// Если хотите усложнить задание, предусмотрите случай, когда вместо строки приходит число.
// Обратите внимание, что возвращать функция по-прежнему должна только целые положительные числа:

// Что использовать?
// Для решения этой задачи вам пригодятся:

// цикл — для перебора полученной строки,
// функция parseInt() — для превращения в число отдельных символов и результирующей строки,
// функция Number.isNaN() — чтобы проверить, получилось ли превратить символ в число,
// метод toString() — на случай, если в качестве параметра пришло число.


const toRetrieveNumber = (newString) => {
  let result = String(newString).replace(/\D/g,' ');

  if (result < 0) {
    result = result * -1;
  }

  return parseInt(result, 10);
};
toRetrieveNumber();

console.log(toRetrieveNumber('2023 год'));
console.log(toRetrieveNumber('ECMAScript 2022'));
console.log(toRetrieveNumber('1 кефир, 0.5 батона'));
console.log(toRetrieveNumber('агент 007'));
console.log(toRetrieveNumber('а я томат'));
console.log(toRetrieveNumber(2023));
console.log(toRetrieveNumber(-1));
console.log(Math.trunc(toRetrieveNumber(1.5)));
