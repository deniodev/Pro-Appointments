import { it, expect, screen} from 'vitest';
import { render } from '@testing-library/react';
import Header from '../components/Header/Header';
import '@testing-library/jest-dom/vitest';

describe('code snippet', () => {

  // Header renders without errors
  it('should render the header component without errors', () => {
    render(<Header />);
    // assertion
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  // User is not authenticated and token is null
  it('should render the login button when user is not authenticated and token is null', () => {
    const { getByText } = render(<Header />);
    // assertion
    expect(getByText('Login')).toBeInTheDocument();
  });
});