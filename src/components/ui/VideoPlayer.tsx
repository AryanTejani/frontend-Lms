'use client';

interface VideoPlayerProps {
  src: string;
  className?: string;
}

export function VideoPlayer({ src, className }: VideoPlayerProps) {
  const embedUrl = `${src}?autoplay=false&loop=false&muted=false&preload=true&responsive=true`;

  return (
    <div className={className}>
      <div className="relative aspect-video">
        <iframe
          src={embedUrl}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </div>
  );
}
