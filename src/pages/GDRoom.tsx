import { useState } from "react"
import { GDRoom } from "@/components/gd-room/GDRoom"
import { EvaluationResults } from "@/components/gd-room/EvaluationResults"

const GDRoomPage = () => {
  const [showResults, setShowResults] = useState(false)
  const [evaluationData, setEvaluationData] = useState<any>(null)

  // Generate a simple session ID
  const sessionId = `session-${Date.now()}`

  const handleEndGD = async (evaluation: any) => {
    setEvaluationData(evaluation)
    setShowResults(true)
  }

  if (showResults && evaluationData) {
    return <EvaluationResults data={evaluationData} />
  }

  return <GDRoom sessionId={sessionId} onEndGD={handleEndGD} />
}

export default GDRoomPage
