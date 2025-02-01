import { BASE_URL, ROUTE, METHODS, TEXT_ERROR } from './constants.js';

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
