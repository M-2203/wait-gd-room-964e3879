import { motion } from 'framer-motion';
import { Mic, MicOff, VideoOff, Hand } from 'lucide-react';
import { Participant } from '@/types/gd';

interface ParticipantTileProps {
  participant: Participant;
  isLarge?: boolean;
}

export function ParticipantTile({ participant, isLarge = false }: ParticipantTileProps) {
  const initial = participant.name.charAt(0).toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`
        relative flex flex-col items-center justify-center rounded-2xl
        bg-gradient-to-br from-forest-deep to-forest-medium
        ${participant.isYou ? 'ring-2 ring-gold' : ''}
        ${participant.isSpeaking ? 'ring-2 ring-accent animate-pulse' : ''}
        ${isLarge ? 'min-h-[180px]' : 'min-h-[120px]'}
      `}
    >
      {/* Speaking indicator animation */}
      {participant.isSpeaking && (
        <div className="absolute inset-0 rounded-2xl">
          <div className="absolute inset-0 rounded-2xl bg-accent/20 animate-pulse" />
        </div>
      )}

      {/* Avatar */}
      <div className={`flex items-center justify-center rounded-full bg-primary text-primary-foreground font-bold ${isLarge ? 'w-16 h-16 text-2xl' : 'w-12 h-12 text-lg'}`}>
        {initial}
      </div>

      {/* Name */}
      <p className={`mt-2 font-medium text-primary-foreground ${isLarge ? 'text-sm' : 'text-xs'}`}>
        {participant.isYou ? 'You' : participant.name}
      </p>

      {/* Status indicators */}
      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
        <div className="flex items-center gap-1">
          {participant.isMuted ? (
            <div className="p-1 rounded-full bg-destructive/80">
              <MicOff className="w-3 h-3 text-destructive-foreground" />
            </div>
          ) : (
            <div className="p-1 rounded-full bg-primary/80">
              <Mic className="w-3 h-3 text-primary-foreground" />
            </div>
          )}

          {participant.isVideoOff && (
            <div className="p-1 rounded-full bg-muted/80">
              <VideoOff className="w-3 h-3 text-muted-foreground" />
            </div>
          )}
        </div>

        {participant.isHandRaised && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="p-1 rounded-full bg-gold"
          >
            <Hand className="w-3 h-3 text-forest-deep" />
          </motion.div>
        )}
      </div>

      {/* You badge */}
      {participant.isYou && (
        <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-gold text-forest-deep text-xs font-medium">
          You
        </div>
      )}
    </motion.div>
  );
}
