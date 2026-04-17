import '@testing-library/jest-dom/vitest';

// jsdom does not implement IntersectionObserver; provide a minimal stub so
// Framer Motion's viewport / whileInView feature doesn't throw.
if (typeof IntersectionObserver === 'undefined') {
  global.IntersectionObserver = class IntersectionObserver {
    readonly root = null;
    readonly rootMargin = '';
    readonly thresholds: ReadonlyArray<number> = [];
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }
  };
}
