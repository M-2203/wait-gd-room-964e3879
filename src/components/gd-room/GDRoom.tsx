import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mic, MicOff, Send, PhoneOff } from "lucide-react"
import { ParticipantTiles } from "@/components/gd-room/ParticipantTiles"
import { DiscussionTranscript } from "@/components/gd-room/DiscussionTranscript"
import { Timer } from "@/components/gd-room/Timer"
import { cn } from "@/lib/utils"

interface GDRoomProps {
  sessionId: string
  onEndGD: (evaluation: any) => void
}

interface Message {
  participant: string
  message: string
  timestamp: string
}

interface Participant {
  id: string
  name: string
  is_human: boolean
}

// Demo topics for simulation
const DEMO_TOPICS = [
  "Should AI replace human jobs in the next decade?",
  "Is remote work more productive than office work?",
  "Should social media be regulated by governments?",
  "Is cryptocurrency the future of finance?",
  "Should college education be free for everyone?",
]

// Demo AI responses for simulation
const AI_RESPONSES = [
  "I believe we need to consider both sides of this argument carefully.",
  "From a practical standpoint, the data suggests otherwise.",
  "While I understand your point, I think we should also consider the long-term implications.",
  "Building on what was said earlier, I'd like to add another perspective.",
  "This is an interesting point, but we should also think about the societal impact.",
  "I agree with some aspects, but there are counterarguments worth discussing.",
]

export function GDRoom({ sessionId, onEndGD }: GDRoomProps) {
  const [started, setStarted] = useState(false)
  const [topic, setTopic] = useState<string>("")
  const [participants, setParticipants] = useState<Participant[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isVoiceMode, setIsVoiceMode] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [elapsedSeconds, setElapsedSeconds] = useState(0)

  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    if (started) {
      const timer = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [started])

  useEffect(() => {
    startGD()
  }, [])

  const startGD = async () => {
    // Simulate starting the GD session
    const randomTopic = DEMO_TOPICS[Math.floor(Math.random() * DEMO_TOPICS.length)]
    setTopic(randomTopic)
    setStarted(true)

    // Initialize participants
    const demoParticipants: Participant[] = [
      { id: "you", name: "YOU", is_human: true },
      { id: "c1", name: "Candidate 1", is_human: false },
      { id: "c2", name: "Candidate 2", is_human: false },
      { id: "c3", name: "Candidate 3", is_human: false },
      { id: "c4", name: "Candidate 4", is_human: false },
    ]
    setParticipants(demoParticipants)

    // Add initial admin message
    setMessages([
      {
        participant: "Admin",
        message: `Good morning everyone. Today's topic is: ${randomTopic} This is a corporate-style group discussion. Please maintain professionalism, listen to others, and present your viewpoints clearly. You may begin.`,
        timestamp: new Date().toISOString(),
      },
    ])
  }

  const sendMessage = async () => {
    if (!inputMessage.trim()) return

    const timestamp = new Date().toISOString()
    const newMessage = {
      participant: "YOU",
      message: inputMessage,
      timestamp,
    }

    setMessages((prev) => [...prev, newMessage])
    setInputMessage("")

    // Simulate AI responses after a delay
    setTimeout(() => {
      const randomParticipant = participants.filter(p => !p.is_human)[Math.floor(Math.random() * 4)]
      const randomResponse = AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)]
      
      setMessages((prev) => [
        ...prev,
        {
          participant: randomParticipant?.name || "Candidate 1",
          message: randomResponse,
          timestamp: new Date().toISOString(),
        },
      ])
    }, 2000 + Math.random() * 2000)
  }

  const toggleVoice = () => {
    if (!isVoiceMode) {
      startVoiceRecognition()
    } else {
      stopVoiceRecognition()
    }
    setIsVoiceMode(!isVoiceMode)
  }

  const startVoiceRecognition = () => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = true
      recognitionRef.current.interimResults = true

      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result: any) => result.transcript)
          .join("")

        setInputMessage(transcript)
      }

      recognitionRef.current.start()
      setIsRecording(true)
    } else {
      alert("Speech recognition not supported in this browser")
    }
  }

  const stopVoiceRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      setIsRecording(false)
    }
  }

  const endGD = async () => {
    // Generate demo evaluation data
    const evaluation = {
      evaluation: {
        rankings: [
          {
            rank: 1,
            name: "YOU",
            overall_score: 8.5,
            communication: 8,
            content_relevance: 9,
            leadership: 8,
            confidence: 9,
            team_behavior: 8,
            corporate_readiness: 8,
            placement_readiness: "Interview Ready",
            strengths: ["Clear articulation", "Good examples", "Active listening"],
            weaknesses: ["Could improve on time management"],
            hr_remarks: "Strong candidate with excellent communication skills.",
            suggestions: ["Practice more structured arguments", "Work on concise delivery"],
          },
          {
            rank: 2,
            name: "Candidate 1",
            overall_score: 7.8,
            communication: 7,
            content_relevance: 8,
            leadership: 7,
            confidence: 8,
            team_behavior: 8,
            corporate_readiness: 8,
            placement_readiness: "Needs Improvement",
            strengths: ["Good team player", "Relevant points"],
            weaknesses: ["Could be more assertive"],
            hr_remarks: "Good potential, needs more confidence.",
            suggestions: ["Speak up more", "Lead discussions"],
          },
          {
            rank: 3,
            name: "Candidate 2",
            overall_score: 7.2,
            communication: 7,
            content_relevance: 7,
            leadership: 6,
            confidence: 7,
            team_behavior: 8,
            corporate_readiness: 7,
            placement_readiness: "Needs Improvement",
            strengths: ["Listens well", "Respectful"],
            weaknesses: ["Limited participation"],
            hr_remarks: "Should participate more actively.",
            suggestions: ["Prepare more points", "Engage earlier"],
          },
        ],
        summary: "The group discussion was productive with good participation from most candidates. The user demonstrated strong communication skills and relevant knowledge.",
      },
    }
    onEndGD(evaluation)
  }

  return (
    <div className="flex flex-col h-screen bg-[var(--bg-main)]">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-[var(--green-primary)] text-white">
        <div>
          <h1 className="text-xl font-semibold">AI Group Discussion</h1>
          <p className="text-sm text-[var(--green-light)]">{topic || "Loading topic..."}</p>
        </div>
        <div className="flex items-center gap-4">
          <Timer elapsedSeconds={elapsedSeconds} />
          <Button onClick={endGD} variant="destructive" size="sm" className="gap-2">
            <PhoneOff className="w-4 h-4" />
            End GD
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Participant Tiles */}
        <div className="w-80 border-r border-[var(--green-light)] p-4 overflow-y-auto bg-[var(--bg-card)]">
          <ParticipantTiles participants={participants} />
        </div>

        {/* Center: Discussion Transcript */}
        <div className="flex-1 flex flex-col">
          <DiscussionTranscript messages={messages} />

          {/* Input Area */}
          <div className="p-4 border-t border-[var(--green-light)] bg-white">
            <div className="flex gap-2">
              <Button
                onClick={toggleVoice}
                variant={isRecording ? "destructive" : "outline"}
                size="icon"
                className={cn("shrink-0", isRecording && "bg-red-500 hover:bg-red-600")}
              >
                {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </Button>
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type your response... (or use voice)"
                className="flex-1 border-[var(--green-soft)]"
              />
              <Button onClick={sendMessage} className="gap-2 bg-[var(--green-primary)] hover:bg-[var(--green-dark)]">
                <Send className="w-4 h-4" />
                Send
              </Button>
            </div>
            {isRecording && <p className="text-xs text-[var(--green-muted)] mt-2">Recording... Speak now</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
