import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CounterButtons } from './CounterButtons';

describe('CounterButtons', () => {
  it('calls onIncrement when Artır button is clicked', () => {
    const onIncrement = vi.fn();
    const onDecrement = vi.fn();
    const onReset = vi.fn();

    render(
      <CounterButtons
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        onReset={onReset}
      />
    );

    fireEvent.click(screen.getByLabelText('Arttır'));
    expect(onIncrement).toHaveBeenCalledTimes(1);
  });

  it('calls onDecrement when Azalt button is clicked', () => {
    const onIncrement = vi.fn();
    const onDecrement = vi.fn();
    const onReset = vi.fn();

    render(
      <CounterButtons
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        onReset={onReset}
      />
    );

    fireEvent.click(screen.getByLabelText('Azalt'));
    expect(onDecrement).toHaveBeenCalledTimes(1);
  });

  it('calls onReset when Sıfırla button is clicked', () => {
    const onIncrement = vi.fn();
    const onDecrement = vi.fn();
    const onReset = vi.fn();

    render(
      <CounterButtons
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        onReset={onReset}
      />
    );

    fireEvent.click(screen.getByLabelText('Sıfırla'));
    expect(onReset).toHaveBeenCalledTimes(1);
  });

  it('has correct aria-labels in Turkish', () => {
    const onIncrement = vi.fn();
    const onDecrement = vi.fn();
    const onReset = vi.fn();

    render(
      <CounterButtons
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        onReset={onReset}
      />
    );

    expect(screen.getByLabelText('Arttır')).toBeInTheDocument();
    expect(screen.getByLabelText('Azalt')).toBeInTheDocument();
    expect(screen.getByLabelText('Sıfırla')).toBeInTheDocument();
  });

  it('displays button text in Turkish', () => {
    const onIncrement = vi.fn();
    const onDecrement = vi.fn();
    const onReset = vi.fn();

    render(
      <CounterButtons
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        onReset={onReset}
      />
    );

    expect(screen.getByText('Arttır')).toBeInTheDocument();
    expect(screen.getByText('Azalt')).toBeInTheDocument();
    expect(screen.getByText('Sıfırla')).toBeInTheDocument();
  });
});
