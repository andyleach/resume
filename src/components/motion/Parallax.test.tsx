import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Parallax } from './Parallax';

describe('Parallax', () => {
  it('renders its children inside a wrapper', () => {
    render(
      <Parallax speed={0.15}>
        <span>content</span>
      </Parallax>,
    );
    expect(screen.getByText('content')).toBeInTheDocument();
  });
});
