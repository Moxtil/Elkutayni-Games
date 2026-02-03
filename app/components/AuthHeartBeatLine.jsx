const AuthHeartBeatLine = () => {
  return (
    <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-70">
      <svg width="100%" height="220" viewBox="0 0 1200 220">
        <defs>
          {/* Animated Gradient */}
          <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%">
              <animate attributeName="stop-color" values="#00f7ff; #7c3aed; #00f7ff" dur="6s" repeatCount="indefinite" />
            </stop>
            <stop offset="50%">
              <animate attributeName="stop-color" values="#7c3aed; #00f7ff; #7c3aed" dur="6s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%">
              <animate attributeName="stop-color" values="#00f7ff; #7c3aed; #00f7ff" dur="6s" repeatCount="indefinite" />
            </stop>
          </linearGradient>

          {/* Glow */}
          <filter id="neonGlow">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Pulse */}
        <path
          d="M0 110 
             L150 110 
             L210 30 
             L270 180 
             L330 70 
             L380 110 
             L600 110 
             L660 50 
             L720 170 
             L780 80 
             L840 110 
             L1200 110"
          fill="none"
          stroke="url(#neonGradient)"
          strokeWidth="5"
          filter="url(#neonGlow)"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="pulse-animate"
        />
      </svg>

      <style jsx>{`
        .pulse-animate {
          stroke-dasharray: 1200;
          stroke-dashoffset: 1200;
          animation: pulseMove 4s linear infinite;
        }

        @keyframes pulseMove {
          0% {
            stroke-dashoffset: 1200;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default AuthHeartBeatLine;
