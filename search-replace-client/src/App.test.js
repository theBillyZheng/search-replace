import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header', () => {
  render(<App />);
  const headerElement = screen.getByText(/File Search and Replace Tool/i);
  expect(headerElement).toBeInTheDocument();
});
