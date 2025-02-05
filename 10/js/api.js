const BASE_URL = 'https://32.javascript.htmlacademy.pro/kekstagram';
const ROUTE = {
  GET_DATA: '/data',
  SEND_DATA: '/'
};
const METHODS = {
  GET: 'GET',
  POST: 'POST'
};
const TEXT_ERROR = {
  GET_DATA: 'Не удаётся загрузить данные.',
  SEND_DATA: 'Не удаётся отправить форму'
};
const loadingData = (route, errorText, method = METHODS.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, { method, body })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status}: ${response.statusText}`);
    })
    .catch(() => {
      throw new Error(errorText);
    });

export const getData = () => loadingData(ROUTE.GET_DATA, TEXT_ERROR.GET_DATA);
export const sendData = (body) => loadingData(ROUTE.SEND_DATA, TEXT_ERROR.SEND_DATA, METHODS.POST, body);
