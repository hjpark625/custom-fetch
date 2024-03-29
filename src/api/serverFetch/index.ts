import { notFound } from 'next/navigation';
import { IDetailData } from '@/utils/fetch_axios';
import FetchInstance, { ClientRequestError, ServerInternalError } from '@/utils/fetchInstance';
import Rollbar from 'rollbar';
import packageJson from '../../../package.json';

const rollbar = new Rollbar({
  accessToken: process.env.NEXT_PUBLIC_ROLLBAR_SERVER_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
  environment: process.env.NODE_ENV === 'development' ? 'local' : 'prod',
  code_version: packageJson.version
});

const baseUrl = 'http://localhost:4000';

const customFetch = new FetchInstance({
  baseUrl,
  interceptors: {
    onRequest: (config) => {
      return config;
    },
    onResponse: async (response) => {
      console.log(response);
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
      }

      throw error;
    },
    onRequestError: (reason) => {
      console.log(reason);
      throw reason;
    }
  }
});

export async function getDetail(engName: string) {
  try {
    const data = await customFetch.get<IDetailData>(`/detail/${engName}`, {
      next: {
        revalidate: 0
      }
    });

    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function getError() {
  try {
    await customFetch.get('/test', {});
  } catch (err) {
    throw err;
  }
}
