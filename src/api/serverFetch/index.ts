import 'server-only';
import { notFound } from 'next/navigation';
import FetchInstance from '@/api/serverFetch/fetchInstance';
import { ClientRequestError, ServerInternalError } from '@/api/serverFetch/types/errorInstance';
import rollbarLogger from '@/lib/rollbarLogger';

const Fetch = new FetchInstance({
  baseUrl: 'http://localhost:4000',
  interceptors: {
    onRequest: (config) => {
      return config;
    },
    onResponse: async (response) => {
      return response;
    },
    onResponseError: async (error) => {
      if (error instanceof ClientRequestError) {
        rollbarLogger.warning(error.message, error, {
          request: error.request,
          cause: error.cause,
          response: error.response
        });
        notFound();
      }
      if (error instanceof ServerInternalError) {
        rollbarLogger.error(error.message, error, {
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
