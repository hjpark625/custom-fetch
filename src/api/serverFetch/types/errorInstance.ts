import { ApiError } from 'next/dist/server/api-utils';
import { FetchOptions } from '@/api/serverFetch/fetchInstance';

export class NoResponseError extends Error {
  request?: FetchOptions;
  constructor(message: string, options?: FetchOptions) {
    super(message);
    this.request = options;
  }
}

export class UnknownError extends Error {
  response!: Response;
  request?: FetchOptions;
  constructor(message: string, response: Response, options?: FetchOptions) {
    super(message);
    this.name = this.constructor.name;
    this.response = response;
    this.request = options;
  }
}

export class ClientRequestError extends ApiError {
  response!: Response;
  request?: FetchOptions;
  constructor(statusCode: number, message: string, response: Response, request?: FetchOptions) {
    super(statusCode, message);
    this.name = this.constructor.name;
    this.response = response;
    this.request = request;
  }
}

export class ServerInternalError extends ApiError {
  response!: Response;
  request?: FetchOptions;
  constructor(statusCode: number, message: string, response: Response, request?: FetchOptions) {
    super(statusCode, message);
    this.name = this.constructor.name;
    this.response = response;
    this.request = request;
  }
}

export class UnExpectedServerError extends ApiError {
  response!: Response;
  request?: FetchOptions;
  constructor(statusCode: number, message: string, res: Response, request?: FetchOptions) {
    super(statusCode, message);
    this.name = this.constructor.name;
    this.response = res;
    this.request = request;
  }
}
