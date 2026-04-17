import { describe, it, expect, vi, beforeEach } from 'vitest';
import { copyText } from './copy';

describe('copyText', () => {
  beforeEach(() => {
    vi.stubGlobal('navigator', {
      clipboard: { writeText: vi.fn(async () => {}) },
    });
  });

  it('writes the text to the clipboard and resolves true', async () => {
    const ok = await copyText('hello@example.com');
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('hello@example.com');
    expect(ok).toBe(true);
  });

  it('resolves false when the clipboard API is unavailable', async () => {
    vi.stubGlobal('navigator', {});
    const ok = await copyText('x');
    expect(ok).toBe(false);
  });

  it('resolves false if writeText rejects', async () => {
    vi.stubGlobal('navigator', {
      clipboard: {
        writeText: vi.fn(async () => {
          throw new Error('denied');
        }),
      },
    });
    const ok = await copyText('x');
    expect(ok).toBe(false);
  });
});
