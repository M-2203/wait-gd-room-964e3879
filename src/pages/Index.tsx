import { useNavigate } from "react-router-dom";
import GenZPlacifyLogo from "@/components/GenZPlacifyLogo";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Clock, Brain } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Clock,
      title: "Smart Queue",
      description: "5-minute max wait with real-time peer matching",
    },
    {
      icon: Users,
      title: "Group Sessions",
      description: "Join discussions with 5 matched participants",
    },
    {
      icon: Brain,
      title: "Brain Feed",
      description: "Stay engaged with interesting tech facts while waiting",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-8 glass-forest">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <GenZPlacifyLogo size="md" />
          <Button
            onClick={() => navigate("/waiting-room")}
            className="bg-forest-medium hover:bg-forest-deep text-primary-foreground font-body"
          >
            Join GD
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </header>

      {/* Hero section */}
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero content */}
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-forest-medium/10 border border-forest-medium/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-forest-medium animate-pulse" />
              <span className="text-sm font-body text-forest-medium">AI-Powered GD Practice</span>
            </div>

            <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Master Group Discussions
              <br />
              <span className="bg-gradient-to-r from-forest-deep via-forest-medium to-sage bg-clip-text text-transparent">
                The Smart Way
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground font-body max-w-2xl mx-auto mb-10">
              Practice group discussions with AI-matched peers. Our smart waiting room 
              ensures you're always paired with the right participants for meaningful practice sessions.
            </p>

            <Button
              onClick={() => navigate("/waiting-room")}
              size="lg"
              className="bg-forest-medium hover:bg-forest-deep text-primary-foreground font-body px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse-soft"
            >
              Enter Waiting Room
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mt-20">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="glass-forest rounded-2xl p-6 text-left animate-fade-up"
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-forest-medium/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-forest-medium" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground font-body text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;