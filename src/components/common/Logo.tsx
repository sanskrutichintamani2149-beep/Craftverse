import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
  to?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showTagline = true,
  className = '',
  to = '/',
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-13 h-13',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  const taglineSizes = {
    sm: 'text-[9px] tracking-[0.2em]',
    md: 'text-[10px] tracking-[0.28em]',
    lg: 'text-xs tracking-[0.32em]',
  };

  const content = (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Monogram Icon */}
      <div className={`relative shrink-0 ${iconSizes[size]}`}>
        <svg viewBox="0 0 48 48" fill="none" className="w-full h-full drop-shadow-[0_0_12px_rgba(18,184,255,0.45)]">
          <defs>
            <linearGradient id="logo-d-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22E58B" />
              <stop offset="45%" stopColor="#12B8FF" />
              <stop offset="100%" stopColor="#1346E0" />
            </linearGradient>
            <linearGradient id="logo-bars" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#1346E0" />
              <stop offset="100%" stopColor="#19E3C0" />
            </linearGradient>
          </defs>
          {/* Stylized D curve */}
          <path
            d="M9 7h15c9.5 0 17.5 7.8 17.5 17.5S33.5 42 24 42H9V7z"
            stroke="url(#logo-d-grad)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Rupee horizontal lines */}
          <path d="M16 16.5h11M16 21.5h8.5" stroke="#19E3C0" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M21.5 21.5c0 3-3.2 4-5.5 6.5l6.5 8" stroke="#12B8FF" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
          {/* Growth bars */}
          <rect x="29" y="27" width="2.8" height="9" rx="1.2" fill="url(#logo-bars)" />
          <rect x="33.5" y="21" width="2.8" height="15" rx="1.2" fill="url(#logo-bars)" />
          <rect x="38" y="16" width="2.8" height="20" rx="1.2" fill="url(#logo-bars)" />
        </svg>
      </div>

      {/* Wordmark and Tagline */}
      <div className="flex flex-col leading-none">
        <div className={`font-extrabold tracking-tight ${textSizes[size]}`}>
          <span className="text-white dark:text-white dark:group-hover:text-white transition-colors duration-200 light:text-[#0B1B4A]" style={{ color: 'var(--text-heading)' }}>
            Dhana
          </span>
          <span className="text-gradient">
            Drishti
          </span>
        </div>
        {showTagline && (
          <span className={`font-semibold uppercase text-brand-cyan/80 dark:text-[#7F92B8] mt-1 ${taglineSizes[size]}`}>
            Simple Finance • Stronger Tomorrows
          </span>
        )}
      </div>
    </div>
  );

  if (to) {
    return <Link to={to} className="inline-flex items-center group">{content}</Link>;
  }

  return content;
};
