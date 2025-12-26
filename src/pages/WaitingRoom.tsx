import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import GenZPlacifyLogo from "@/components/GenZPlacifyLogo";
import LeafParticles from "@/components/waiting-room/LeafParticles";
import SonarRadar from "@/components/waiting-room/SonarRadar";
import FloatingVoices from "@/components/waiting-room/FloatingVoices";
import QueueStatus from "@/components/waiting-room/QueueStatus";
import ReadyButton from "@/components/waiting-room/ReadyButton";
import AIFallbackModal from "@/components/waiting-room/AIFallbackModal";
import ExitWarningModal from "@/components/waiting-room/ExitWarningModal";
import { Button } from "@/components/ui/button";
import { Loader2, Radio } from "lucide-react";

const TOTAL_TIME = 300; // 5 minutes in seconds
const MAX_PARTICIPANTS = 5;

const sampleNames = ["Arjun", "Priya", "Rahul", "Sneha", "Vikram", "Ananya", "Karthik", "Divya"];

const WaitingRoom = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [remainingTime, setRemainingTime] = useState(TOTAL_TIME);
  const [participants, setParticipants] = useState<Array<{ id: number; name: string; isActive: boolean }>>([]);
  const [showExitModal, setShowExitModal] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isRoomReady, setIsRoomReady] = useState(false);
  const [isUserReady, setIsUserReady] = useState(false);

  // Initialize with random participants
  useEffect(() => {
    const timer = setTimeout(() => {
      const initialCount = Math.floor(Math.random() * 2) + 1; // 1-2 initial participants
      const initial = Array.from({ length: initialCount }, (_, i) => ({
        id: i + 1,
        name: sampleNames[i],
        isActive: true,
      }));
      setParticipants(initial);
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Countdown timer
  useEffect(() => {
    if (isLoading || isRoomReady) return;

    const interval = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          // Timer hit zero - show AI fallback if not enough participants
          if (participants.length < MAX_PARTICIPANTS) {
            setShowAIModal(true);
          } else {
            handleEnterRoom();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isLoading, isRoomReady, participants.length]);

  // Simulate random participant joins
  useEffect(() => {
    if (isLoading || participants.length >= MAX_PARTICIPANTS) return;

    const scheduleNextJoin = () => {
      const delay = Math.random() * 25000 + 10000; // 10-35 seconds
      return setTimeout(() => {
        setParticipants((prev) => {
          if (prev.length >= MAX_PARTICIPANTS) return prev;
          const newParticipant = {
            id: prev.length + 1,
            name: sampleNames[prev.length] || `Student ${prev.length + 1}`,
            isActive: true,
          };
          return [...prev, newParticipant];
        });
      }, delay);
    };

    const timer = scheduleNextJoin();
    return () => clearTimeout(timer);
  }, [isLoading, participants.length]);

  // Check if room is full
  useEffect(() => {
    if (participants.length >= MAX_PARTICIPANTS) {
      setIsRoomReady(true);
    }
  }, [participants.length]);

  // Handle browser back/close
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  const handleEnterRoom = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      navigate("/gd-room-ai");
    }, 500);
  }, [navigate]);

  const handleUserReady = () => {
    setIsUserReady(true);
  };

  const handleExitConfirm = () => {
    setShowExitModal(false);
    navigate("/");
  };

  const handleAIFallbackContinue = () => {
    setShowAIModal(false);
    handleEnterRoom();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-hero animate-gradient-shift flex flex-col items-center justify-center">
        <LeafParticles />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <GenZPlacifyLogo size="lg" className="mb-8" />
        </motion.div>
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Loader2 className="w-10 h-10 text-forest-medium animate-spin-leaf" />
          <p className="text-muted-foreground font-body">Initializing Digital Zen Garden...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="min-h-screen bg-gradient-hero animate-gradient-shift overflow-hidden relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: isExiting ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Background elements */}
        <LeafParticles />
        <FloatingVoices />

        {/* Header */}
        <motion.header
          className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            <GenZPlacifyLogo size="md" />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowExitModal(true)}
              className="text-muted-foreground hover:text-destructive font-body hover-scale"
            >
              Exit Room
            </Button>
          </div>
        </motion.header>

        {/* Main content */}
        <main className="min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-8">
          {/* Queue Status - Top */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <QueueStatus
              currentCount={participants.length}
              maxCount={MAX_PARTICIPANTS}
              remainingSeconds={remainingTime}
              totalSeconds={TOTAL_TIME}
            />
          </motion.div>

          {/* Radar Title */}
          <motion.div
            className="text-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Radio className="w-5 h-5 text-forest-medium animate-pulse-soft" />
              <h2 className="font-display text-xl md:text-2xl font-bold text-foreground">
                Broadcasting Signal
              </h2>
            </div>
            <p className="text-muted-foreground font-body text-sm md:text-base">
              Searching for Logic Warriors
              <span className="inline-flex ml-1">
                <span className="animate-pulse">.</span>
                <span className="animate-pulse" style={{ animationDelay: "0.2s" }}>.</span>
                <span className="animate-pulse" style={{ animationDelay: "0.4s" }}>.</span>
              </span>
            </p>
          </motion.div>

          {/* Sonar Radar - Centerpiece */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: "spring", damping: 20 }}
          >
            <SonarRadar participants={participants} maxParticipants={MAX_PARTICIPANTS} />
          </motion.div>

          {/* Ready / Enter Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <ReadyButton
              isReady={isUserReady}
              isRoomReady={isRoomReady}
              onReady={handleUserReady}
              onEnter={handleEnterRoom}
            />
          </motion.div>
        </main>

        {/* Exit Warning Modal */}
        <ExitWarningModal
          open={showExitModal}
          onOpenChange={setShowExitModal}
          onConfirm={handleExitConfirm}
        />

        {/* AI Fallback Modal */}
        <AIFallbackModal
          open={showAIModal}
          onContinue={handleAIFallbackContinue}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default WaitingRoom;
