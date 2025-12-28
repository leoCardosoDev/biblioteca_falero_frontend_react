import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserForm } from '@/presentation/components/ui/UserForm';
import { describe, it, expect, vi } from 'vitest';

describe('UserForm Component', () => {
  it('should validate name and email in real-time', async () => {
    const user = userEvent.setup();
    render(<UserForm onSubmit={vi.fn()} onCancel={vi.fn()} />);

    const nameInput = screen.getByPlaceholderText(/Ex: João Silva/i);
    const emailInput = screen.getByPlaceholderText(/exemplo@email.com/i);

    // Initial state: no errors
    expect(screen.queryByText(/Nome é obrigatório/i)).not.toBeInTheDocument();

    // Trigger validation
    await user.type(nameInput, 'Jo'); // Too short
    expect(screen.getByText(/Nome deve ter pelo menos 3 caracteres/i)).toBeInTheDocument();

    await user.clear(nameInput);
    expect(screen.getByText(/Nome é obrigatório/i)).toBeInTheDocument();

    await user.type(emailInput, 'invalid-email');
    expect(screen.getByText(/Email inválido/i)).toBeInTheDocument();
  });

  it('should apply CPF mask correctly', async () => {
    const user = userEvent.setup();
    render(<UserForm onSubmit={vi.fn()} onCancel={vi.fn()} />);

    const cpfInput = screen.getByPlaceholderText(/000.000.000-00/i);

    await user.type(cpfInput, '12345678901');
    expect(cpfInput).toHaveValue('123.456.789-01');
  });

  it('should submit form with correct data', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<UserForm onSubmit={onSubmit} onCancel={vi.fn()} />);

    await user.type(screen.getByPlaceholderText(/Ex: João Silva/i), 'John Doe');
    await user.type(screen.getByPlaceholderText(/exemplo@email.com/i), 'john@example.com');
    await user.type(screen.getByPlaceholderText(/000.000.000-00/i), '12345678901');

    await user.click(screen.getByRole('button', { name: /Salvar/i }));

    expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({
      name: 'John Doe',
      email: 'john@example.com',
      cpf: '123.456.789-01',
      role: 'user' // default
    }));
  });
});
