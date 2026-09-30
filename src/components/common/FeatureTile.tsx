import React from 'react';
import { ArrowRight, LucideIcon } from 'lucide-react';

interface FeatureTileProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick?: () => void;
  className?: string;
}

export const FeatureTile: React.FC<FeatureTileProps> = ({
  icon: Icon,
  title,
  description,
  onClick,
  className = '',
}) => {
  return (
    <div
      onClick={onClick}
      className={`glass-tile p-5 flex items-center justify-between gap-4 cursor-pointer group select-none transition-all duration-300 ${className}`}
    >
      <div className="flex items-center gap-3.5 min-w-0">
        {/* Icon in rounded glass square */}
        <div className="w-12 h-12 shrink-0 rounded-2xl bg-gradient-to-br from-brand-blue/30 via-brand-cyan/20 to-brand-teal/20 border border-brand-cyan/40 flex items-center justify-center text-brand-cyan group-hover:text-brand-teal group-hover:scale-105 group-hover:border-brand-teal/60 transition-all duration-300 shadow-[0_0_15px_rgba(18,184,255,0.2)]">
          <Icon className="w-6 h-6 drop-shadow-[0_0_8px_rgba(25,227,192,0.4)]" />
        </div>

        {/* Text */}
        <div className="min-w-0">
          <h4 className="font-bold text-[15px] leading-tight text-white dark:text-white transition-colors duration-200">
            {title}
          </h4>
          <p className="text-xs text-brand-cyan/70 dark:text-[#8FA5CB] mt-1 leading-snug line-clamp-2">
            {description}
          </p>
        </div>
      </div>

      {/* Circular Arrow Button at Right */}
      <div className="w-8 h-8 shrink-0 rounded-full border border-brand-cyan/35 flex items-center justify-center text-brand-cyan group-hover:bg-brand-cyan group-hover:text-brand-dark group-hover:border-transparent group-hover:shadow-[0_0_15px_rgba(18,184,255,0.5)] transition-all duration-200">
        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform duration-200" />
      </div>
    </div>
  );
};
