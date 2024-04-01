import axios, { isAxiosError } from 'axios';

const baseUrl = 'http://localhost:4000';

const Axios = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json'
  }
});

Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (isAxiosError(error)) {
      if (error.response?.status === 404) {
        console.log(error);
        window.Rollbar.warning(error.message, error, {
          request: error.config,
          response: error.response
        });
      }
      if (error.response?.status === 500) {
        window.Rollbar.error(error.message, error, {
          request: error.config,
          response: error.response
        });
        throw error;
      }
    }
  }
);

export default Axios;
