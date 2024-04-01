import 'server-only';
import {
  ClientRequestError,
  NoResponseError,
  ServerInternalError,
  UnExpectedServerError
} from '@/api/serverFetch/types/errorInstance';

const NO_RESPONSE_ERR_MSG = '응답이 없습니다. 네트워크 문제 또는 요청 오류가 있을 수 있습니다.';

interface Interceptor {
  // 응답 요청 전에 config를 가로채서 수정을 한다.
  onRequest?: (config: FetchOptions) => FetchOptions;
  // fetch실행 후 응답을 가로챈뒤 응답을 반환한다.
  onResponse?: (response: Response) => Response | PromiseLike<Response>;
  // fetch실행 후 과정에서 에러가 발생했을때 실행된다.
  onRequestError?: (reason: any) => any | Promise<any>;
  // config 변환과정 및 fetch 자체에서 에러가 발생했을때 실행된다.
  onResponseError?: (reason: any) => any | Promise<any>;
}
export interface FetchOptions extends RequestInit {
  params?: {
    [key: string]: string | number;
  };
  body?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  interceptor?: Interceptor;
}

class FetchInstance {
  private baseUrl: string;
  private interceptors?: Interceptor;

  constructor({ baseUrl, interceptors }: { baseUrl: string; interceptors?: Interceptor }) {
    this.baseUrl = baseUrl;
    this.interceptors = interceptors;
  }

  // TODO: server component에서 fetch 에러가 발생했을때 정의된 error ui 표출 필요
  private async errorHandler(res: Response, options: FetchOptions) {
    // TODO: fetch API에선 response가 없는 경우가 있는지 확인 필요 없으면 제거(현재까진 무조건 있는걸로 알고있음)
    if (!res) {
      return new NoResponseError(NO_RESPONSE_ERR_MSG, options);
    }

    if (res.status >= 500) {
      const contentType = res.headers.get('Content-Type');
      const isJson = contentType?.includes('application/json');

      if (res.status === 500 && isJson) {
        return new ServerInternalError(res.status, JSON.parse(await res.text()).detail.message, res, options);
      } else {
        return new UnExpectedServerError(res.status, res.statusText, res, options);
      }
    } else if (res.status >= 400) {
      return new ClientRequestError(res.status, JSON.parse(await res.text()).detail.message, res, options);
    }
  }

  private makeUrl(endPoint: string, params?: FetchOptions['params']): string {
    const url = new URL(`${this.baseUrl}${endPoint}`);

    if (params === undefined) return url.toString();

    Object.keys(params).forEach((key) => url.searchParams.append(key, String(params[key])));

    return url.toString();
  }

  private makeOptions(options: FetchOptions): FetchOptions {
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

  // TODO: 여기 커링함수로 클래스 내에서 어떻게 구현할지 각 잡아보기
  private async fetching(endPoint: string, options: FetchOptions) {
    const combinedOptions = this.makeOptions(options);
    const url = this.makeUrl(endPoint, combinedOptions.params);

    try {
      const interceptedConfig =
        this.interceptors && this.interceptors.onRequest
          ? this.interceptors.onRequest(combinedOptions)
          : combinedOptions;

      // if (this.interceptors && this.interceptors.onRequestError) {
      //   return await this.interceptors.onRequestError(e);
      // }

      const response = await fetch(url, interceptedConfig);

      const loggingOptions = {
        ...interceptedConfig,
        url: response.url,
        body: await response.clone().json(),
        statusText: response.statusText
      };

      if (this.interceptors && this.interceptors.onResponse) {
        await this.interceptors.onResponse(response);
      }

      if (response.status >= 400) {
        const error = await this.errorHandler(response, loggingOptions);
        if (this.interceptors && this.interceptors.onResponseError) {
          await this.interceptors.onResponseError(error);
        }
        throw error;
      }

      return await response.json();
    } catch (err: unknown) {
      throw err;
    }
  }

  public async get<T = unknown>(endPoint: string, options: FetchOptions) {
    const data: T = await this.fetching(endPoint, {
      ...options,
      method: 'GET'
    });
    return data;
  }

  // public async post<T = unknown>(endPoint: string, options: FetchOptions) {
  //   const data: T = await this.fetching(endPoint, {
  //     ...options,
  //     method: 'POST'
  //   })
  //   return data
  // }

  // public async put<T = unknown>(endPoint: string, options: FetchOptions) {
  //   const data: T = await this.fetching(endPoint, {
  //     ...options,
  //     method: 'PUT'
  //   })
  //   return data
  // }

  // public async delete<T = unknown>(endPoint: string, options: FetchOptions) {
  //   const data: T = await this.fetching(endPoint, {
  //     ...options,
  //     method: 'DELETE'
  //   })
  //   return data
  // }
}

export default FetchInstance;
