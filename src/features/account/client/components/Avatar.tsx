import Image from 'next/image';
import { cn } from '@/utils/cn';

interface AvatarProps {
  src?: string;
  initials?: string;
  size?: number;
  className?: string;
}

export function Avatar({ src, initials, size = 48, className }: AvatarProps) {
  return (
    <div
      className={cn(
        'relative shrink-0 rounded-full overflow-hidden bg-(--color-bg-tertiary) flex items-center justify-center',
        className
      )}
      style={{ width: size, height: size }}
    >
      {src ? (
        <Image src={src} alt={initials ?? ''} fill className="h-full w-full object-cover" />
      ) : (
        <span
          className="label-2 label-2-semibold text-(--color-text-primary) select-none"
          style={{ fontSize: size * 0.4 }}
        >
          {initials}
        </span>
      )}
    </div>
  );
}
