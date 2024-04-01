type HeaderValue = string | string[] | number | boolean | null;
type CommonRequestHeaders = 'Accept' | 'Content-Length' | 'User-Agent' | 'Content-Type' | 'Authorization';
type CommonContentType =
  | 'text/html'
  | 'text/plain'
  | 'multipart/form-data'
  | 'application/json'
  | 'application/x-www-form-urlencoded'
  | 'application/octet-stream';
type CommonMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD' | 'CONNECT' | 'TRACE';

type RawHeaders = Partial<
  {
    [key in CommonRequestHeaders]: HeaderValue;
  } & {
    'Content-Type': CommonContentType;
  }
>;

export interface FetchConfig extends Omit<RequestInit, 'headers'> {
  method?: CommonMethod;
  // headers?: RawHeaders | [string, string][] | Record<string, string> | Headers;
  headers?: RawHeaders | HeadersInit;
}
