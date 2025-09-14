import { ReactNode } from 'react';

interface BadgeSubtitleProps {
  children: ReactNode;
  className?: string;
}

export default function BadgeSubtitle({ children, className = '' }: BadgeSubtitleProps) {
  return (
    <span className={`inline-block px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded-md bg-transparent ${className}`}>
      {children}
    </span>
  );
}
