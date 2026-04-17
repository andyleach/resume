import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Nav } from './Nav';

describe('Nav', () => {
  it('renders brand and anchor links', () => {
    render(<Nav />);
    expect(screen.getByRole('img', { name: /andrew leach/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toHaveAttribute('href', '/#about');
    expect(screen.getByRole('link', { name: /work/i })).toHaveAttribute('href', '/#experience');
    expect(screen.getByRole('link', { name: /open source/i })).toHaveAttribute(
      'href',
      '/#open-source',
    );
    expect(screen.getByRole('link', { name: /contact/i })).toHaveAttribute('href', '/#contact');
  });
});
