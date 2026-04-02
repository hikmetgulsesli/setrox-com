import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorBanner } from './ErrorBanner';

describe('ErrorBanner', () => {
  it('renders when error is passed', () => {
    const onDismiss = vi.fn();
    render(<ErrorBanner message="Test hata mesajı" onDismiss={onDismiss} />);
    
    expect(screen.getByText('Hata')).toBeInTheDocument();
    expect(screen.getByText('Test hata mesajı')).toBeInTheDocument();
  });

  it('is hidden when error is null', () => {
    const onDismiss = vi.fn();
    const { container } = render(<ErrorBanner message={null} onDismiss={onDismiss} />);
    
    expect(container.firstChild).toBeNull();
  });

  it('calls onDismiss when close button is clicked', () => {
    const onDismiss = vi.fn();
    render(<ErrorBanner message="Test hata mesajı" onDismiss={onDismiss} />);
    
    fireEvent.click(screen.getByLabelText('Kapat'));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('renders error icon', () => {
    const onDismiss = vi.fn();
    render(<ErrorBanner message="Test hata mesajı" onDismiss={onDismiss} />);
    
    expect(screen.getByText('gpp_maybe')).toBeInTheDocument();
  });
});
