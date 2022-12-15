import App from './App';
import { act, render, } from '@testing-library/react';
import * as api from './utils/api';

describe('<App />', () => {
  const fetchSpy = jest
    .spyOn(api, 'getGroceryList')
    .mockResolvedValue(Promise.resolve([]));
  it('renders the app component', async () => {
    await act(async () => {
      const { container } = render(<App />);
      expect(container).toBeVisible();
    });
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });
});
