/* eslint @typescript-eslint/ban-ts-comment: "off", no-global-assign: "off" */
// import returnFetch from '../src'

import FetchClass, { Interceptor } from '@/api/serverFetch/fetchInstance';
import FetchInstance, {
  PrepareFetchClass,
  ExecuteFetchClass,
  EvaluateResponseClass
} from '@/api/serverFetch/fetchInstance';
import { log } from 'console';

jest.mock('../api/serverFetch/fetchInstance', () => {
  const originModule = jest.requireActual('../api/serverFetch/fetchInstance');
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(({ baseUrl, interceptors }) => {
      return new originModule.default({ baseUrl, interceptors });
    }),
    PrepareFetchClass: {
      makeUrl: jest.fn(),
      makeOptions: jest.fn()
    },
    ExecuteFetchClass: {
      requestWithInterceptors: jest.fn()
    },
    EvaluateResponseClass: {
      evaluateResponse: jest.fn()
    }
  };
});

// jest.mock('../api/serverFetch/fetchInstance', () => {
//   return jest.fn().mockImplementation(() => {
//     return {
//       PrepareFetchClass: {
//         makeUrl: jest.fn().mockImplementation(() => 'https://test.com'),
//         makeOptions: jest.fn().mockImplementation(() => {
//           return {
//             headers: {
//               'Content-Type': 'application/json'
//             }
//           };
//         })
//       },
//       ExecuteFetchClass: {
//         requestWithInterceptors: jest.fn().mockImplementation(() => {
//           return new Response();
//         })
//       },
//       EvaluateResponseClass: {
//         evaluateResponse: jest.fn().mockImplementation(() => {
//           return new Response();
//         })
//       }
//     };
//   });
// });

describe('FetchInstance', () => {
  const baseUrl = 'https://test.com';
  let fetchInstance: FetchClass;

  beforeEach(() => {
    fetchInstance = new FetchClass({ baseUrl });
    window.fetch = jest.fn().mockImplementationOnce(() => {
      const mockedP = new Promise((resolve, reject) => {
        resolve({
          ok: true,
          json: jest.fn(),
          clone: () => {
            return {
              json: jest.fn()
            };
          }
        });
      });
      return mockedP;
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully perform a GET request and return data', async () => {
    PrepareFetchClass.makeUrl = jest.fn().mockReturnValue('https://test.com');
    PrepareFetchClass.makeOptions = jest.fn().mockReturnValue({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const mockResponse = new Response(JSON.stringify({ data: 'test data' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

    ExecuteFetchClass.requestWithInterceptors = jest.fn().mockResolvedValue(mockResponse);
    EvaluateResponseClass.evaluateResponse = jest.fn().mockResolvedValue({ data: 'test data' });

    const result = await fetchInstance.get('/test');
  });
});
