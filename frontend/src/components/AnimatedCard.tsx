import { ReactNode } from 'react';

interface AnimatedCardProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  hover?: boolean;
}

export default function AnimatedCard({ children, delay = 0, className = '', hover = true }: AnimatedCardProps) {
  const hoverClass = hover ? 'hover:shadow-2xl hover:-translate-y-2' : '';
  
  return (
    <div
      className={`card animate-fadeIn ${hoverClass} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
