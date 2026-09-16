'use client';

import Image from 'next/image';
import { useState } from 'react';

const FALLBACK = '/logo.svg';

export default function SmartImage({
  src,
  alt = '',
  className = '',
  fill = false,
  width,
  height,
  sizes,
  priority = false,
  ...props
}) {
  const [failed, setFailed] = useState(false);

  const safeSrc = failed || !src ? FALLBACK : src;

  if (fill) {
    return (
      <Image
        src={safeSrc}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`absolute inset-0 h-full w-full ${className}`}
        onError={() => setFailed(true)}
        {...props}
      />
    );
  }

  return (
    <Image
      src={safeSrc}
      alt={alt}
      width={width || 800}
      height={height || 1200}
      sizes={sizes}
      priority={priority}
      className={className}
      onError={() => setFailed(true)}
      {...props}
    />
  );
}