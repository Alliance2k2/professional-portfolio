'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import type { ProjectImage } from '@/lib/project-images';

export type EvidenceImage = ProjectImage;

export function EvidenceGallery({
  title,
  images,
}: {
  title: string;
  images: EvidenceImage[];
}) {
  const [index, setIndex] = useState(0);
  const [originalSize, setOriginalSize] = useState(false);
  const viewer = useRef<HTMLDialogElement>(null);
  if (!images.length) return null;
  const activeIndex = Math.min(index, images.length - 1);
  const image = images[activeIndex];
  const changeImage = (offset: number) =>
    setIndex((activeIndex + offset + images.length) % images.length);
  return (
    <section className="case-study-section visual-gallery" aria-label={title}>
      <div className="visual-gallery-heading">
        <div>
          <h2>{title}</h2>
          <p className="small">
            Select a visual, then enlarge it to explore the details.
          </p>
        </div>
        <div
          className="visual-gallery-controls"
          role="group"
          aria-label="Browse project visuals"
        >
          {images.length > 1 ? (
            <>
              <button
                type="button"
                aria-label="Previous visual"
                onClick={() => changeImage(-1)}
              >
                <ChevronLeft size={20} />
              </button>
              <span aria-live="polite">
                {activeIndex + 1} / {images.length}
              </span>
              <button
                type="button"
                aria-label="Next visual"
                onClick={() => changeImage(1)}
              >
                <ChevronRight size={20} />
              </button>
            </>
          ) : null}
          <button
            type="button"
            onClick={() => {
              setOriginalSize(false);
              viewer.current?.showModal();
            }}
          >
            <Maximize2 size={17} /> Enlarge
          </button>
        </div>
      </div>
      <figure className="active-visual">
        <button
          className="visual-open"
          type="button"
          aria-label={`Enlarge visual: ${image.alt}`}
          onClick={() => {
            setOriginalSize(false);
            viewer.current?.showModal();
          }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width ?? 1200}
            height={image.height ?? 675}
            className="active-visual-image"
            loading="eager"
            unoptimized
          />
        </button>
        <figcaption>
          {image.synthetic ? (
            <span className="synthetic-label">
              Synthetic demonstration data
            </span>
          ) : null}
          <p>{image.caption}</p>
          <a href={image.src} target="_blank" rel="noreferrer">
            Open original image
          </a>
        </figcaption>
      </figure>
      <dialog
        className="visual-viewer"
        ref={viewer}
        aria-label={`${title}: enlarged visual`}
      >
        <div className="visual-viewer-toolbar">
          <strong>{title}</strong>
          <button
            type="button"
            aria-pressed={originalSize}
            onClick={() => setOriginalSize(!originalSize)}
          >
            {originalSize ? 'Fit to screen' : 'View original size'}
          </button>
          <button
            type="button"
            onClick={() => viewer.current?.close()}
            aria-label="Close enlarged visual"
          >
            <X size={20} /> Close
          </button>
        </div>
        <div
          className={`visual-viewer-scroll${originalSize ? ' is-original-size' : ''}`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width ?? 1200}
            height={image.height ?? 675}
            unoptimized
            className="visual-viewer-image"
          />
        </div>
        <p className="visual-viewer-caption">{image.caption}</p>
      </dialog>
    </section>
  );
}
