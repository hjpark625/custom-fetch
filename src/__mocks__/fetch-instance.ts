export const mockFetchInstance = jest.fn();
const mock = jest.fn().mockImplementation(() => {
  return { fetchInstance: mockFetchInstance };
});
export default mock;
