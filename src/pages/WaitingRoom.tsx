import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import GenZPlacifyLogo from "@/components/GenZPlacifyLogo";
import CountdownTimer from "@/components/waiting-room/CountdownTimer";
import ParticipantGrid from "@/components/waiting-room/ParticipantGrid";
import BrainFeedCarousel from "@/components/waiting-room/BrainFeedCarousel";
import ExitWarningModal from "@/components/waiting-room/ExitWarningModal";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";

const TOTAL_TIME = 300; // 5 minutes in seconds
const MAX_PARTICIPANTS = 5;

const sampleNames = ["Arjun", "Priya", "Rahul", "Sneha", "Vikram", "Ananya", "Karthik", "Divya"];

const WaitingRoom = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [remainingTime, setRemainingTime] = useState(TOTAL_TIME);
  const [participants, setParticipants] = useState<Array<{ id: number; name: string; isActive: boolean }>>([]);
  const [showExitModal, setShowExitModal] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isRoomReady, setIsRoomReady] = useState(false);

  // Initialize with random participants
  useEffect(() => {
    const timer = setTimeout(() => {
      const initialCount = Math.floor(Math.random() * 2) + 2; // 2-3 initial participants
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
          handleEnterRoom();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isLoading, isRoomReady]);

  // Simulate random participant joins
  useEffect(() => {
    if (isLoading || participants.length >= MAX_PARTICIPANTS) return;

    const scheduleNextJoin = () => {
      const delay = Math.random() * 30000 + 15000; // 15-45 seconds
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

  const handleExitConfirm = () => {
    setShowExitModal(false);
    navigate("/");
  };

  const isWarning = remainingTime <= 60;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <GenZPlacifyLogo size="lg" className="mb-8 animate-fade-up" />
        <div className="flex flex-col items-center gap-4 animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <Loader2 className="w-10 h-10 text-forest-medium animate-spin-leaf" />
          <p className="text-muted-foreground font-body">Initializing waiting room...</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`min-h-screen bg-background transition-opacity duration-500 ${
        isExiting ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-8">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <GenZPlacifyLogo size="md" />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowExitModal(true)}
            className="text-muted-foreground hover:text-destructive font-body"
          >
            Exit Room
          </Button>
        </div>
      </header>

      {/* Main content */}
      <main className="min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-8">
        {/* Glassmorphic card */}
        <div className="glass-forest rounded-3xl p-6 md:p-10 max-w-xl w-full animate-fade-up">
          {/* Title section */}
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
              Calibration in Progress
              <span className="inline-flex ml-1">
                <span className="animate-pulse">.</span>
                <span className="animate-pulse" style={{ animationDelay: "0.2s" }}>.</span>
                <span className="animate-pulse" style={{ animationDelay: "0.4s" }}>.</span>
              </span>
            </h2>
            <p className="text-muted-foreground font-body text-sm md:text-base">
              Scanning for peers. Maximum wait time: 5 minutes.
            </p>
          </div>

          {/* Timer */}
          <div className="flex justify-center mb-8">
            <CountdownTimer
              totalSeconds={TOTAL_TIME}
              remainingSeconds={remainingTime}
              isWarning={isWarning}
            />
          </div>

          {/* Participant grid */}
          <div className="mb-8">
            <ParticipantGrid participants={participants} maxParticipants={MAX_PARTICIPANTS} />
          </div>

          {/* Enter button */}
          <div className="flex justify-center">
            <Button
              onClick={handleEnterRoom}
              disabled={!isRoomReady && remainingTime > 0}
              className={`font-body px-8 py-6 text-base rounded-xl transition-all duration-300 ${
                isRoomReady
                  ? "bg-forest-medium hover:bg-forest-deep text-primary-foreground shadow-lg hover:shadow-xl animate-pulse-soft"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              }`}
            >
              {isRoomReady ? (
                <>
                  Enter GD Room
                  <ArrowRight className="ml-2 w-5 h-5" />
                </>
              ) : (
                "Waiting for participants..."
              )}
            </Button>
          </div>
        </div>

        {/* Brain Feed */}
        <div className="mt-8 w-full max-w-xl">
          <BrainFeedCarousel />
        </div>
      </main>

      {/* Exit Warning Modal */}
      <ExitWarningModal
        open={showExitModal}
        onOpenChange={setShowExitModal}
        onConfirm={handleExitConfirm}
      />
    </div>
  );
};

export default WaitingRoom;