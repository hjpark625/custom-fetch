import { notFound } from 'next/navigation';
import Rollbar from 'rollbar';
import FetchInstance from '@/api/serverFetch/fetchInstance';
import { ClientRequestError, ServerInternalError } from '@/api/serverFetch/types/errorInstance';
import packageJson from '../../../package.json';

const rollbar = new Rollbar({
  accessToken: process.env.NEXT_PUBLIC_ROLLBAR_SERVER_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
  environment: process.env.NODE_ENV === 'development' ? 'local' : 'prod',
  code_version: packageJson.version
});

const Fetch = new FetchInstance({
  baseUrl: 'http://localhost:4000/detail',
  interceptors: {
    onRequest: (config) => {
      return config;
    },
    onResponse: async (response) => {
      return response;
    },
    onResponseError: async (error) => {
      if (error instanceof ClientRequestError) {
        rollbar.warning(error.message, error, {
          request: error.request,
          cause: error.cause,
          response: error.response
        });
        notFound();
      }

      if (error instanceof ServerInternalError) {
        rollbar.error(error.message, error, {
          request: error.request,
          cause: error.cause,
          response: error.response
        });
        throw error;
      }

      throw error;
    },
    onRequestError: (reason) => {
      throw reason;
    }
  }
});

export default Fetch;
