import Image from 'next/image';
import Link from 'next/link';
import { paths } from '@/config';

interface LogoProps {
  showText?: boolean;
}

export function Logo({ showText = true }: LogoProps) {
  return (
    <Link href={paths.dashboard} className="flex items-center gap-(--space-xs) no-underline">
      <Image
        src="/logo.png"
        alt="VidyaSetu"
        width={48}
        height={48}
        className="size-logo object-contain"
        priority
      />
      {showText && <span className="h6-semibold text-(--color-text-primary)">VidyaSetu</span>}
    </Link>
  );
}
