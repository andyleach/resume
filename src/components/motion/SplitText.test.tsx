import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SplitText } from './SplitText';

describe('SplitText', () => {
  it('renders one span per character, preserving spaces with non-breaking spans', () => {
    const { container } = render(<SplitText>hi!</SplitText>);
    const spans = container.querySelectorAll('[data-char]');
    expect(spans).toHaveLength(3);
    expect(spans[0]?.textContent).toBe('h');
    expect(spans[1]?.textContent).toBe('i');
    expect(spans[2]?.textContent).toBe('!');
  });

  it('uses a non-breaking space for whitespace characters', () => {
    const { container } = render(<SplitText>a b</SplitText>);
    const spans = container.querySelectorAll('[data-char]');
    expect(spans).toHaveLength(3);
    expect(spans[1]?.textContent).toBe('\u00A0');
  });
});
