import { Leaf } from "lucide-react";

interface GenZPlacifyLogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const GenZPlacifyLogo = ({ size = "md", className = "" }: GenZPlacifyLogoProps) => {
  const sizeClasses = {
    sm: "text-xl",
    md: "text-2xl md:text-3xl",
    lg: "text-3xl md:text-4xl",
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        <Leaf 
          size={iconSizes[size]} 
          className="text-forest-medium animate-float" 
          strokeWidth={2.5}
        />
      </div>
      <h1 className={`font-display font-bold tracking-tight ${sizeClasses[size]}`}>
        <span className="text-foreground">Gen-Z</span>
        <span className="ml-1 bg-gradient-to-r from-forest-deep via-forest-medium to-sage bg-clip-text text-transparent">
          Placify
        </span>
      </h1>
    </div>
  );
};

export default GenZPlacifyLogo;