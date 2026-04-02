import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CounterDisplay } from './CounterDisplay';

describe('CounterDisplay', () => {
  it('renders numeric count correctly', () => {
    render(<CounterDisplay count={42} />);
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('renders zero correctly', () => {
    render(<CounterDisplay count={0} />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('renders large numbers correctly', () => {
    render(<CounterDisplay count={9999} />);
    expect(screen.getByText('9999')).toBeInTheDocument();
  });

  it('renders negative numbers correctly', () => {
    render(<CounterDisplay count={-5} />);
    expect(screen.getByText('-5')).toBeInTheDocument();
  });
});
