import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [
      [
        'rehype-pretty-code',
        {
          theme: 'github-dark-dimmed',
          keepBackground: false,
        },
      ],
    ],
  },
});

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  pageExtensions: ['ts', 'tsx', 'mdx'],
};

export default withMDX(nextConfig);
