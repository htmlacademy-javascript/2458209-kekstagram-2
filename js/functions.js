
const isStrLengthValid = (str, maxLength) => str.length <= maxLength;
isStrLengthValid('helloy', 6);

const isPolindrome = (str)=> {
  const normilizedStr = String(str).toLowerCase().replaceAll(' ', '');

  for(let i = 0; i < normilizedStr.length / 2; i++) {

    if (normilizedStr[i] !== normilizedStr[normilizedStr.length - i - 1]){
      return false;
    }
  }

  return true;
};
isPolindrome('121 А роза упала на лапу Азора 121');

const retrieveNumber = (str) => {
  const formattedStr = String(str).replaceAll(/\D+/g, '');

  return parseInt(formattedStr, 10);
};
retrieveNumber('Next year - 2025!!!');

const convertInMinutes = (time) => {
  const conversionTime = time.split(':').map((data) => Number(data));

  return conversionTime[0] * 60 + conversionTime[1];
};

const checkTime = (startWorkingDay, endWorkingDay, beginningMeeting, time) => {
  const startWorkingDayMinutes = convertInMinutes(startWorkingDay);
  const endWorkingDayMinutes = convertInMinutes(endWorkingDay);
  const beginningMeetingMinutes = convertInMinutes(beginningMeeting);

  return startWorkingDayMinutes <= beginningMeetingMinutes && (beginningMeetingMinutes + time) <= endWorkingDayMinutes;
};

checkTime('08:30', '18:30', '17:00', 91);
