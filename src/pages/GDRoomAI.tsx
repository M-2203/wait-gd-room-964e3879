import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GenZPlacifyLogo from "@/components/GenZPlacifyLogo";
import { Button } from "@/components/ui/button";
import { Check, Users, ArrowLeft } from "lucide-react";

const GDRoomAI = () => {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-8">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <GenZPlacifyLogo size="md" />
        </div>
      </header>

      {/* Main content */}
      <main className="min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-8">
        <div 
          className={`glass-forest rounded-3xl p-8 md:p-12 max-w-lg w-full text-center transition-all duration-500 ${
            mounted ? "animate-fade-up opacity-100" : "opacity-0"
          }`}
        >
          {/* Success icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-forest-medium/20 flex items-center justify-center animate-scale-in">
              <div className="w-14 h-14 rounded-full bg-forest-medium flex items-center justify-center">
                <Check className="w-8 h-8 text-primary-foreground" strokeWidth={3} />
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            Welcome to the
            <br />
            <span className="bg-gradient-to-r from-forest-deep via-forest-medium to-sage bg-clip-text text-transparent">
              Discussion Room
            </span>
          </h1>

          <p className="text-muted-foreground font-body mb-8">
            Your group discussion session is about to begin. Get ready to showcase your skills!
          </p>

          {/* Info card */}
          <div className="bg-muted/30 rounded-xl p-4 mb-8 border border-border">
            <div className="flex items-center justify-center gap-3">
              <Users className="w-5 h-5 text-forest-medium" />
              <span className="font-body text-foreground">
                5 participants are ready
              </span>
            </div>
          </div>

          {/* Placeholder message */}
          <div className="bg-sage/20 rounded-xl p-6 border border-sage/30">
            <p className="text-sm text-muted-foreground font-body">
              🚧 This is a placeholder page. The full GD Room experience will be built in a future update.
            </p>
          </div>

          {/* Back button */}
          <div className="mt-8">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="font-body text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Home
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GDRoomAI;