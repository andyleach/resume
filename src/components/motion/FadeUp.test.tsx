import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { FadeUp } from './FadeUp';

describe('FadeUp', () => {
  it('renders its children', () => {
    render(<FadeUp>hello</FadeUp>);
    expect(screen.getByText('hello')).toBeInTheDocument();
  });

  it('applies a given className to the wrapper', () => {
    render(<FadeUp className="custom-cls">x</FadeUp>);
    expect(screen.getByText('x')).toHaveClass('custom-cls');
  });
});
