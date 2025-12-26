import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MessageCircle, Cog, Zap, Brain, Timer, Mic, CheckCircle, Volume2, FileText } from "lucide-react";
import GenZPlacifyLogo from "@/components/GenZPlacifyLogo";
import LeafParticles from "@/components/waiting-room/LeafParticles";

const steps = [
  {
    icon: Timer,
    title: "Lobby Sync",
    description: "Wait for peers to join your discussion group",
  },
  {
    icon: Zap,
    title: "The Topic Drop",
    description: "15 seconds to think and structure your thoughts",
  },
  {
    icon: Mic,
    title: "The Debate",
    description: "10 mins live audio discussion with your peers",
  },
  {
    icon: Brain,
    title: "AI Feedback",
    description: "Get instant analytics and improvement tips",
  },
];

const rules = [
  {
    icon: Volume2,
    title: "No Interruption Policy",
    description: "Wait for others to finish before speaking",
  },
  {
    icon: MessageCircle,
    title: "Fluency over Volume",
    description: "Quality of argument matters more than quantity",
  },
  {
    icon: FileText,
    title: "Fact-Based Logic",
    description: "Support your points with evidence and examples",
  },
];

const GDPortal = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-hero animate-gradient-shift overflow-hidden relative">
      {/* Background elements */}
      <LeafParticles />

      {/* Header */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center justify-center max-w-6xl mx-auto">
          <GenZPlacifyLogo size="md" />
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-canopy" />
        
        {/* SVG Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="leaf-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M30 5 Q45 20 30 35 Q15 20 30 5" fill="currentColor" className="text-primary-foreground" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#leaf-pattern)" />
          </svg>
        </div>

        <div className="relative z-10 container mx-auto px-4 md:px-8 pt-24">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left Content */}
            <motion.div
              className="flex-1 text-center lg:text-left"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
                Enter the Arena.
                <br />
                <span className="text-gold">Sharpen Your Voice.</span>
              </h1>
              <p className="font-body text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-xl">
                Join the live queue. Match with 4 peers. Dominate the discussion.
              </p>
              <motion.button
                onClick={() => navigate("/waiting-room")}
                className="btn-gold text-lg md:text-xl shadow-glow-gold animate-pulse-soft"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                JOIN WAITING ROOM
              </motion.button>
            </motion.div>

            {/* Right Visual */}
            <motion.div
              className="flex-1 flex justify-center lg:justify-end"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                {/* Outer glow ring */}
                <div className="absolute inset-0 rounded-full bg-gold/20 animate-pulse-soft" />
                
                {/* Main circle */}
                <div className="absolute inset-4 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 flex items-center justify-center">
                  {/* Speech bubble */}
                  <motion.div
                    className="relative"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <MessageCircle className="w-24 h-24 md:w-32 md:h-32 text-gold" strokeWidth={1.5} />
                    
                    {/* Gear inside */}
                    <motion.div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    >
                      <Cog className="w-12 h-12 md:w-16 md:h-16 text-primary-foreground/80" />
                    </motion.div>
                  </motion.div>
                </div>

                {/* Floating particles */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-gold/60"
                    style={{
                      top: `${20 + Math.random() * 60}%`,
                      left: `${20 + Math.random() * 60}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.4, 1, 0.4],
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 px-4 md:px-8 relative">
        <div className="container mx-auto max-w-6xl">
          <motion.h2
            className="font-display text-3xl md:text-4xl font-bold text-center text-foreground mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            How It Works
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                className="glass-forest rounded-2xl p-6 hover-lift hover-glow cursor-pointer group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, borderColor: "hsl(var(--primary))" }}
              >
                <div className="w-14 h-14 rounded-xl bg-forest-medium/10 flex items-center justify-center mb-4 group-hover:bg-forest-medium/20 transition-colors">
                  <step.icon className="w-7 h-7 text-forest-medium" />
                </div>
                <div className="text-sm font-body text-muted-foreground mb-2">
                  Step {index + 1}
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="font-body text-muted-foreground text-sm">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Rules Section */}
      <section className="py-16 md:py-24 px-4 md:px-8 relative">
        <div className="container mx-auto max-w-4xl">
          <motion.h2
            className="font-display text-3xl md:text-4xl font-bold text-center text-foreground mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            The Rules
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {rules.map((rule, index) => (
              <motion.div
                key={rule.title}
                className="card-forest p-6 hover-lift hover-glow"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-sage/30 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-forest-medium" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                      {rule.title}
                    </h3>
                    <p className="font-body text-muted-foreground text-sm">
                      {rule.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 px-4 md:px-8">
        <motion.div
          className="container mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="font-body text-muted-foreground mb-6">
            Ready to sharpen your discussion skills?
          </p>
          <motion.button
            onClick={() => navigate("/waiting-room")}
            className="btn-forest text-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Enter the Arena
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};

export default GDPortal;
