import axios from 'axios';
import { notFound } from 'next/navigation';
import FetchInstance, { ClientRequestError, ServerInternalError } from './fetchInstance';
import Rollbar from 'rollbar';
import packageJson from '../../package.json';

const rollbar = new Rollbar({
  accessToken: process.env.NEXT_PUBLIC_ROLLBAR_SERVER_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
  environment: process.env.NODE_ENV === 'development' ? 'local' : 'prod',
  code_version: packageJson.version
});

const detailInstance = axios.create({
  baseURL: 'http://localhost:4000/detail',
  headers: {
    'Content-Type': 'application/json'
  }
});
const Fetch = new FetchInstance({
  baseUrl: 'http://localhost:4000/detail',
  interceptors: {
    onRequest: (config) => {
      return config;
    },
    onResponse: async (response) => {
      console.log(response);
      return response;
    },
    onResponseError: async (error) => {
      console.log('??');

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
      console.log(reason);
      throw reason;
    }
  }
});

export interface IDetailData {
  storeId: string;
  name: string;
  engName: string;
  socialLink: string | null;
  category?: string;
  address: string;
  detailAddress: string | null;
  nearestRoute: {
    subwayLine: string[] | null;
    routeInfo: string | null;
  } | null;
  operationTime: {
    day: string;
    startTime: string | null;
    endTime: string | null;
  }[];
  introduce: string | null;
  phoneNumber: string | null;
  coord: { lat: number; lng: number };
  description: string | null;
  concept: string[];
  updatedAt: Date;
  storeImages: {
    file_path: string;
    photoId: string;
    width: number;
    height: number;
  }[];
}

export async function getDetail(engName: string) {
  const response = await detailInstance.get<{ data: IDetailData }>(`/${engName}`);
  const data = response.data;
  return data;
}

export async function getDetailFetch(engName: string): Promise<IDetailData> {
  const data = await Fetch.get<{ data: IDetailData }>(`/${engName}`, {
    headers: {
      Accept: 'application/json'
    },
    next: { revalidate: 0 }
  });
  return data.data;
}
