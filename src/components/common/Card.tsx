import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'glass' | 'glow' | 'tile';
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'glass',
  className = '',
  ...props
}) => {
  const variantClass = {
    glass: 'glass-card',
    glow: 'glass-card shadow-[0_12px_45px_0_rgba(18,184,255,0.25),inset_0_0_0_1px_rgba(40,200,255,0.4)]',
    tile: 'glass-tile',
  };

  return (
    <div className={`${variantClass[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
};
