import {
  ClientRequestError,
  NoResponseError,
  ServerInternalError,
  UnExpectedServerError
} from '@/api/serverFetch/types/errorInstance';

interface Interceptor {
  // 응답 요청 전에 config를 가로채서 수정을 한다.
  onModifyConfig?: (config: FetchOptions) => FetchOptions;
  // config 변환과정 에러가 발생했을때 실행된다.
  onConfigError?: (reason: any) => any | Promise<any>;
  // fetch실행 후 응답을 가로챈뒤 응답을 반환한다.
  onResponse?: (response: Response) => Response | PromiseLike<Response>;
  // fetch실행 후 과정에서 에러가 발생했을때 실행된다.
  onResponseError?: (reason: any) => any | Promise<any>;
}

export interface FetchOptions extends RequestInit {
  params?: {
    [key: string]: string | number;
  };
  body?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  interceptor?: Interceptor;
}

class PrepareFetchClass {
  static makeUrl(baseUrl: string, endPoint: string, params: FetchOptions['params']): string {
    const url = new URL(`${baseUrl}${endPoint}`);

    if (params === undefined) return url.toString();

    Object.keys(params).forEach((key) => url.searchParams.append(key, String(params[key])));

    return url.toString();
  }

  static makeOptions(options: FetchOptions): FetchOptions {
    const defaultOptions: FetchOptions = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const combinedOptions: FetchOptions = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers
      }
    };

    return combinedOptions;
  }
}

class ExecuteFetchClass {
  static async requestWithInterceptors(
    url: string,
    combinedOptions: FetchOptions,
    interceptor?: Interceptor
  ): Promise<Response> {
    const interceptedConfig = interceptor?.onModifyConfig
      ? interceptor.onModifyConfig(combinedOptions)
      : combinedOptions;

    if (interceptor?.onConfigError) {
      interceptor.onConfigError(interceptedConfig);
    }

    const response = await fetch(url, interceptedConfig);

    return interceptor?.onResponse ? await interceptor.onResponse(response) : response;
  }
}

class EvaluateResponseClass {
  static async makeErrorInstance(response: Response, options: FetchOptions): Promise<Error> {
    if (response.status >= 500) {
      const contentType = response.headers.get('Content-Type');
      const isJson = contentType?.includes('application/json');

      if (response.status === 500 && isJson) {
        return new ServerInternalError(
          response.status,
          JSON.parse(await response.text()).detail.message,
          response,
          options
        );
      } else {
        return new UnExpectedServerError(response.status, response.statusText, response, options);
      }
    } else if (response.status >= 400) {
      return new ClientRequestError(
        response.status,
        JSON.parse(await response.text()).detail.message,
        response,
        options
      );
    }

    return new Error('Unexpected Error');
  }

  static async evaluateResponse(response: Response, options: FetchOptions, interceptor?: Interceptor): Promise<any> {
    const loggingOptions = {
      ...options,
      url: response.url,
      body: await response.clone().json(),
      statusText: response.statusText
    };

    // 에러 처리 로직
    if (response.status >= 400) {
      const error = await this.makeErrorInstance(response, loggingOptions);
      if (interceptor?.onResponseError) {
        await interceptor.onResponseError(error);
      }
      throw error;
    }

    return response.json();
  }
}

class FetchInstance {
  readonly baseUrl: string;
  readonly interceptors?: Interceptor;

  constructor({ baseUrl, interceptors }: { baseUrl: string; interceptors?: Interceptor }) {
    this.baseUrl = baseUrl;
    this.interceptors = interceptors;
  }

  private async fetchProcess<T = unknown>(endPoint: string, options: FetchOptions): Promise<T> {
    const url = PrepareFetchClass.makeUrl(this.baseUrl, endPoint, options.params);
    const combinedOptions = PrepareFetchClass.makeOptions(options);

    const response = await ExecuteFetchClass.requestWithInterceptors(url, combinedOptions, this.interceptors);

    const data: T = await EvaluateResponseClass.evaluateResponse(response, combinedOptions, this.interceptors);

    return data;
  }

  public async get<T = unknown>(endPoint: string, options: Omit<FetchOptions, 'interceptor'> = {}): Promise<T> {
    const data = await this.fetchProcess<T>(endPoint, { ...options, method: 'GET' });
    return data;
  }

  // public async post<T = unknown>(endPoint: string, options: FetchOptions) {
  //   const data: T = await this.fetchProcess(endPoint, {
  //     ...options,
  //     method: 'POST'
  //   })
  //   return data
  // }

  // public async put<T = unknown>(endPoint: string, options: FetchOptions) {
  //   const data: T = await this.fetchProcess(endPoint, {
  //     ...options,
  //     method: 'PUT'
  //   })
  //   return data
  // }

  // public async delete<T = unknown>(endPoint: string, options: FetchOptions) {
  //   const data: T = await this.fetchProcess(endPoint, {
  //     ...options,
  //     method: 'DELETE'
  //   })
  //   return data
  // }
}

export default FetchInstance;
