const HeartLine = () => {
  return (
    <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-40">
      <svg
        width="100%"
        height="200"
        viewBox="0 0 1000 200"
        className="heartbeat-svg"
      >
        <defs>
          <linearGradient id="pulseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00f7ff" />
            <stop offset="50%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#00f7ff" />
          </linearGradient>

          {/* Glow Effect */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path
          d="M0 100 
             L120 100 
             L170 40 
             L220 160 
             L260 60 
             L300 100 
             L520 100 
             L560 70 
             L600 150 
             L640 80 
             L680 100 
             L1000 100"
          fill="none"
          stroke="url(#pulseGrad)"
          strokeWidth="3"
          filter="url(#glow)"
          className="pulse-path"
        />
      </svg>
    </div>
  );
};
export default HeartLine;