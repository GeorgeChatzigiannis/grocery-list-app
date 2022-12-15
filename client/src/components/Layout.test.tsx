import { render, screen } from '@testing-library/react';
import Layout from './Layout';

describe('<Layout />', () => {
  it('should render the component', () => {
    render(
      <Layout><div /></Layout>);
    expect(screen.getByText('GROCERY LIST')).toBeVisible();
  });
});