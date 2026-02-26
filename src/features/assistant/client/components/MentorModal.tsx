'use client';

import Image from 'next/image';
import { NorthEastIcon } from '@/assets/icons';
import { cn } from '@/utils';

interface MentorModalProps {
  logoUrl: string;
  title: string;
  description: string;
  features: { text: string }[];
  relatedCourse?: { label: string; href?: string; onClick?: () => void };
  onClose?: () => void;
  className?: string;
}

export function MentorModal({
  logoUrl,
  title,
  description,
  features,
  relatedCourse,
  onClose,
  className,
}: MentorModalProps) {
  return (
    <div
      className={cn(
        'flex flex-col w-[490px] rounded-[16px] border border-(--color-stroke-tertiary) shadow-lg bg-(--color-bg-primary) overflow-hidden',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-(--space-base) px-(--space-2xl) py-(--space-base) rounded-t-[16px] bg-gradient-to-r from-(--color-bg-primary) to-(--color-action-primary)/10 shadow-[0_0_10px_rgba(0,0,0,0.25)]">
        <div className="flex items-center justify-center size-[64px] rounded-[14px] bg-gradient-to-b from-[#170689] to-[#170689]/87 shadow-lg shrink-0">
          <Image
            src={logoUrl}
            alt={title}
            width={40}
            height={40}
            className="size-[40px] object-contain"
          />
        </div>
        <h6 className="h6 h6-semibold text-(--color-text-primary)">{title}</h6>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-(--space-base) px-(--space-2xl) py-(--space-base)">
        {/* Description */}
        <div className="flex flex-col gap-(--space-xs2)">
          <span className="label-2 label-2-regular text-(--color-text-tertiary)">Description</span>
          <p className="label-1 label-1-regular text-(--color-text-primary)">{description}</p>
        </div>

        {/* Features */}
        {features.length > 0 && (
          <div className="flex flex-col gap-(--space-xs2)">
            <span className="label-2 label-2-regular text-(--color-text-tertiary)">
              Key Features
            </span>
            <ul className="flex flex-col gap-(--space-xs2)">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-(--space-xs2)">
                  <span className="size-[6px] rounded-full bg-(--color-primary-accent) mt-[7px] shrink-0" />
                  <span className="label-1 label-1-regular text-(--color-text-primary)">
                    {feature.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Related Course */}
        {relatedCourse && (
          <div className="flex flex-col gap-(--space-xs2)">
            <span className="label-2 label-2-regular text-(--color-text-tertiary)">
              Related Course
            </span>
            <button
              type="button"
              onClick={relatedCourse.onClick}
              className="inline-flex items-center gap-(--space-xs3) label-1 label-1-medium text-(--color-text-link)"
            >
              {relatedCourse.label}
              <NorthEastIcon className="size-[14px]" />
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex justify-center py-(--space-base)">
        <button
          type="button"
          onClick={onClose}
          className="h-[32px] px-(--space-base) rounded-full bg-(--color-action-primary) label-2 label-2-semibold text-(--color-text-inverse) transition-colors hover:bg-(--color-action-hover)"
        >
          Close
        </button>
      </div>
    </div>
  );
}
