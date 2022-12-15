import { RouteError } from './classes';

describe('RouteError', () => {
  it('should create a RouteError with a status and message', () => {
    const status = 500;
    const message = 'Error';
    const routeError = new RouteError(status, message);
    expect(routeError.status).toBe(status);
    expect(routeError.message).toBe(message);
  });
});