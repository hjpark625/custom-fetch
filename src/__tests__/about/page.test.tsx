import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import AboutPage from '@/app/about/page';

describe('page', () => {
  it('renders a heading', () => {
    render(<AboutPage />);

    const heading = screen.getByRole('heading', { level: 1 });
    const testContainer = screen.getByTestId('custom-element');

    expect(heading).toBeInTheDocument();
    expect(testContainer).toBeInTheDocument();
    // expect(heading).toHaveTextContent('welcome to About');
  });

  it('renders homepage unchanged', () => {
    const { container } = render(<AboutPage />);
    expect(container).toMatchSnapshot();
  });
});
