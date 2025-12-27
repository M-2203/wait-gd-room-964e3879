interface MockelloLogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const MockelloLogo = ({ size = "md", className = "" }: MockelloLogoProps) => {
  const sizeClasses = {
    sm: "text-xl",
    md: "text-2xl md:text-3xl",
    lg: "text-3xl md:text-4xl",
  };

  const iconSizes = {
    sm: { width: 24, height: 24 },
    md: { width: 32, height: 32 },
    lg: { width: 40, height: 40 },
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Stylized M Logo */}
      <div 
        className="relative flex items-center justify-center rounded-xl bg-gradient-to-br from-forest-deep via-forest-medium to-sage animate-float"
        style={{ 
          width: iconSizes[size].width, 
          height: iconSizes[size].height 
        }}
      >
        <span 
          className="font-display font-bold text-primary-foreground"
          style={{ 
            fontSize: iconSizes[size].width * 0.5,
            lineHeight: 1
          }}
        >
          M
        </span>
      </div>
      <h1 className={`font-display font-bold tracking-tight ${sizeClasses[size]}`}>
        <span className="bg-gradient-to-r from-forest-deep via-forest-medium to-sage bg-clip-text text-transparent">
          Mockello
        </span>
      </h1>
    </div>
  );
};

export default MockelloLogo;
