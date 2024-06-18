import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PropertyForm from '../components/PropertyForm';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

describe('PropertyForm', () => {
  const renderWithRouter = (ui: React.ReactElement) => {
    return render(ui, { wrapper: MemoryRouter });
  };

  it('renders form correctly', () => {
    renderWithRouter(<PropertyForm />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/rua/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/bairro/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/cidade/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/estado/i)).toBeInTheDocument();
  });

  it('clears form after successful submission', async () => {
    renderWithRouter(<PropertyForm />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/rua/i), { target: { value: 'Test Street' } });
    fireEvent.change(screen.getByLabelText(/bairro/i), { target: { value: 'Test Neighborhood' } });
    fireEvent.change(screen.getByLabelText(/cidade/i), { target: { value: 'Test City' } });
    fireEvent.change(screen.getByLabelText(/estado/i), { target: { value: 'Test State' } });

    fireEvent.click(screen.getByText(/cadastrar imóvel/i));

    await waitFor(() => {
      expect(screen.getByLabelText(/email/i)).toHaveValue('');
      expect(screen.getByLabelText(/rua/i)).toHaveValue('');
      expect(screen.getByLabelText(/bairro/i)).toHaveValue('');
      expect(screen.getByLabelText(/cidade/i)).toHaveValue('');
      expect(screen.getByLabelText(/estado/i)).toHaveValue('');
    });
  });
});
