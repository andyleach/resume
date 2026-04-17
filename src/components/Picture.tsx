import manifest from '../../public/images/manifest.json';

type ManifestEntry = {
  src: string;
  webp: string;
  width: number | null;
  height: number | null;
};

type Props = {
  name: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

export function Picture({ name, alt, className, priority, sizes }: Props) {
  const entry = (manifest as Record<string, ManifestEntry>)[name];
  if (!entry) {
    throw new Error(
      `Picture: no manifest entry for "${name}". Add public/images/${name}.jpg and rerun prebuild.`,
    );
  }
  return (
    <picture>
      <source srcSet={entry.webp} type="image/webp" sizes={sizes} />
      <img
        src={entry.src}
        alt={alt}
        width={entry.width ?? undefined}
        height={entry.height ?? undefined}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        className={className}
      />
    </picture>
  );
}
