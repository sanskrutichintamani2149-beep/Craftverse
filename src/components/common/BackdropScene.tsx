import React from 'react';

interface BackdropSceneProps {
  variant?: 'full' | 'subtle';
  className?: string;
}

export const BackdropScene: React.FC<BackdropSceneProps> = ({
  variant = 'full',
  className = '',
}) => {
  if (variant === 'subtle') {
    return (
      <div className={`fixed inset-0 pointer-events-none overflow-hidden -z-10 ${className}`}>
        {/* Soft radial blue and cyan ambient glows */}
        <div className="absolute top-[-10%] right-[-5%] w-[650px] h-[650px] rounded-full bg-brand-glow/10 blur-[130px] dark:bg-brand-glow/15" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full bg-brand-teal/8 blur-[120px] dark:bg-brand-cyan/10" />
        <div className="absolute top-[40%] left-[30%] w-[450px] h-[450px] rounded-full bg-brand-blue/10 blur-[140px] dark:bg-brand-blue/15" />
      </div>
    );
  }

  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden -z-10 ${className}`}>
      {/* Background radial gradient mesh */}
      <div className="absolute inset-0 bg-[#040A1C] dark:bg-[#040A1C] opacity-95 transition-opacity" />

      {/* Atmospheric Horizon Glow */}
      <div
        className="absolute top-[35%] right-[25%] w-[550px] h-[450px] rounded-full blur-[110px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255, 230, 160, 0.28) 0%, rgba(18, 184, 255, 0.35) 45%, rgba(19, 70, 224, 0.15) 75%, transparent 100%)',
        }}
      />
      <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] rounded-full bg-brand-blue/20 blur-[130px]" />
      <div className="absolute bottom-[0%] right-[10%] w-[600px] h-[500px] rounded-full bg-brand-cyan/15 blur-[140px]" />

      {/* Optimized SVG Horizon, Mountains, Rising Bars, and Winding Road */}
      <svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full opacity-90 transition-opacity"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="skyGrad" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#040A1C" />
            <stop offset="50%" stopColor="#071433" />
            <stop offset="100%" stopColor="#0B2A6B" />
          </linearGradient>

          <linearGradient id="barGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.7)" />
            <stop offset="30%" stopColor="rgba(25, 227, 192, 0.45)" />
            <stop offset="100%" stopColor="rgba(19, 70, 224, 0.15)" />
          </linearGradient>

          <linearGradient id="barGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.85)" />
            <stop offset="25%" stopColor="rgba(18, 184, 255, 0.55)" />
            <stop offset="100%" stopColor="rgba(19, 70, 224, 0.2)" />
          </linearGradient>

          <linearGradient id="roadGlow" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#19E3C0" />
            <stop offset="50%" stopColor="#12B8FF" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>

          <linearGradient id="mountainDark" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#071942" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#030816" stopOpacity="0.95" />
          </linearGradient>

          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Mountain Silhouette Layers */}
        <path
          d="M0 550 Q 220 480, 480 520 T 960 490 Q 1200 450, 1440 480 L 1440 900 L 0 900 Z"
          fill="url(#mountainDark)"
          opacity="0.85"
        />
        <path
          d="M0 600 Q 300 540, 650 580 T 1300 560 L 1440 580 L 1440 900 L 0 900 Z"
          fill="#040A1C"
          opacity="0.95"
        />

        {/* Translucent Rising 3D Financial Growth Bars (matching image) */}
        <g opacity="0.85">
          {/* Bar 1 */}
          <path d="M720 380 L 740 370 L 752 376 L 732 386 Z" fill="rgba(255,255,255,0.7)" />
          <path d="M720 380 L 732 386 L 732 460 L 720 454 Z" fill="url(#barGrad1)" />
          <path d="M732 386 L 752 376 L 752 450 L 732 460 Z" fill="url(#barGrad2)" />

          {/* Bar 2 */}
          <path d="M756 340 L 778 328 L 792 335 L 770 347 Z" fill="rgba(255,255,255,0.75)" />
          <path d="M756 340 L 770 347 L 770 460 L 756 453 Z" fill="url(#barGrad1)" />
          <path d="M770 347 L 792 335 L 792 448 L 770 460 Z" fill="url(#barGrad2)" />

          {/* Bar 3 */}
          <path d="M796 295 L 820 282 L 835 290 L 811 303 Z" fill="rgba(255,255,255,0.85)" />
          <path d="M796 295 L 811 303 L 811 460 L 796 452 Z" fill="url(#barGrad1)" />
          <path d="M811 303 L 835 290 L 835 447 L 811 460 Z" fill="url(#barGrad2)" />

          {/* Bar 4 */}
          <path d="M840 245 L 866 230 L 883 239 L 857 254 Z" fill="rgba(255,255,255,0.95)" />
          <path d="M840 245 L 857 254 L 857 460 L 840 451 Z" fill="url(#barGrad1)" />
          <path d="M857 254 L 883 239 L 883 445 L 857 460 Z" fill="url(#barGrad2)" />
        </g>

        {/* Winding Glowing Highway to the Future */}
        {/* Glow halo */}
        <path
          d="M340 900 C 480 820, 620 740, 680 660 C 725 600, 745 520, 780 470 C 805 435, 820 420, 835 410"
          stroke="url(#roadGlow)"
          strokeWidth="24"
          strokeLinecap="round"
          opacity="0.25"
          filter="url(#softGlow)"
        />
        {/* Main luminous ribbon */}
        <path
          d="M340 900 C 480 820, 620 740, 680 660 C 725 600, 745 520, 780 470 C 805 435, 820 420, 835 410"
          stroke="url(#roadGlow)"
          strokeWidth="7"
          strokeLinecap="round"
        />
        {/* Road center dash / sheen */}
        <path
          d="M340 900 C 480 820, 620 740, 680 660 C 725 600, 745 520, 780 470 C 805 435, 820 420, 835 410"
          stroke="#FFFFFF"
          strokeWidth="2"
          opacity="0.85"
        />
      </svg>
    </div>
  );
};
