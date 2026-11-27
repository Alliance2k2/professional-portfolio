import Image from 'next/image';
import { projectImages } from '@/lib/project-images';

export function ProjectPreview({ slug }: { slug: string }) {
  const image = projectImages[slug]?.[0];
  if (!image) return null;
  return (
    <figure className="project-preview">
      <div className="project-preview-frame">
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width ?? 1200}
          height={image.height ?? 675}
          sizes="(max-width: 760px) 90vw, 680px"
          className="project-preview-image"
          unoptimized
        />
      </div>
      <figcaption className="project-preview-label">
        {image.synthetic
          ? 'Demonstration data'
          : (image.label ?? 'Original project visual')}
      </figcaption>
    </figure>
  );
}
