import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '@/utils/test-utils';
import Login from '../Login';
import { vi } from 'vitest';

vi.mock('@/services/api', () => ({
  default: {
    post: vi.fn(() => Promise.resolve({ data: { token: 'fake-token', user: { name: 'Test User' } } })),
  },
}));

describe('Login Sayfası UI Testleri', () => {
  
  it('Form elemanları ekranda görünmeli', () => {
    renderWithProviders(<Login />);

    expect(screen.getByText(/NetPortföy/i)).toBeInTheDocument();
    
    expect(screen.getByPlaceholderText(/ornek@emlak.com/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/••••••/i)).toBeInTheDocument();
    
    expect(screen.getByRole('button', { name: /Giriş Yap/i })).toBeInTheDocument();
  });

  it('Inputlara veri girilebilmeli', () => {
    renderWithProviders(<Login />);

    const emailInput = screen.getByPlaceholderText(/ornek@emlak.com/i) as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText(/••••••/i) as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: 'admin@test.com' } });
    fireEvent.change(passwordInput, { target: { value: '123456' } });

    expect(emailInput.value).toBe('admin@test.com');
    expect(passwordInput.value).toBe('123456');
  });
});