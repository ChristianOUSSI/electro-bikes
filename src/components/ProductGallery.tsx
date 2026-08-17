"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProductGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [selected, setSelected] = useState(0);

  return (
    <div className="space-y-3">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
        <Image
          src={images[selected]}
          alt={alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
      <div className="grid grid-cols-3 gap-3">
        {images.map((src, index) => (
          <button
            key={src}
            type="button"
            onClick={() => setSelected(index)}
            aria-label={`${alt} — ${index + 1}`}
            className={`relative aspect-[4/3] overflow-hidden rounded-xl border transition ${
              index === selected
                ? "border-lime-400"
                : "border-zinc-800 opacity-60 hover:opacity-100"
            }`}
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="200px"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
