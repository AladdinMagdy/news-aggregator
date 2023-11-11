import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Read the documentation link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Read the documentation/i);
  expect(linkElement).toBeInTheDocument();
});
