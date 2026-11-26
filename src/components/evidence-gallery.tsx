import Image from 'next/image';

export type EvidenceImage = {
  src: string;
  alt: string;
  caption: string;
  synthetic?: boolean;
};

export function EvidenceGallery({
  title,
  images,
}: {
  title: string;
  images: EvidenceImage[];
}) {
  if (!images.length) return null;
  return (
    <section className="case-study-section">
      <h2>{title}</h2>
      <div className="case-gallery">
        {images.map((item) => (
          <figure className="case-gallery-item" key={item.src}>
            <div className="case-gallery-image">
              <Image
                src={item.src}
                alt={item.alt}
                width={1200}
                height={675}
                sizes="(max-width: 760px) 100vw, 760px"
                className="case-gallery-photo"
              />
              {item.synthetic ? (
                <span className="synthetic-image-label" aria-hidden="true">
                  Synthetic demo data
                </span>
              ) : null}
            </div>
            <figcaption>
              {item.caption}
              {item.synthetic ? (
                <span className="synthetic-label">
                  All values shown are synthetic demonstration data.
                </span>
              ) : null}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
