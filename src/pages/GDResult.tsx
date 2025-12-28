import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Trophy, TrendingUp, TrendingDown, Lightbulb, BarChart3, MessageCircle, Zap, Users, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import type { TranscriptMessage, GDResult as GDResultType } from '@/types/gd';

const generateYourResult = (transcript: TranscriptMessage[]): GDResultType => {
  const yourMessages = transcript.filter((m) => m.isYou);
  const messageCount = yourMessages.length;
  const baseParticipation = messageCount > 0 ? Math.min(10, 5 + (messageCount / 3) * 5) : 6.5;
  const relevance = 7.8 + Math.random() * 1.5;
  const communication = 7.5 + Math.random() * 2;
  const confidence = 7.2 + Math.random() * 2.3;
  const logicalFlow = 7.6 + Math.random() * 1.8;
  const participation = baseParticipation + Math.random() * 1.5;
  const overallScore = ((participation + relevance + communication + confidence + logicalFlow) / 5);

  return {
    participantId: 'you', participantName: 'You', score: parseFloat(overallScore.toFixed(1)), rank: Math.floor(Math.random() * 3) + 1,
    strengths: ['Clear and articulate presentation of ideas', 'Strong understanding of the topic', 'Respectful and collaborative approach', 'Used relevant real-world examples', 'Maintained composure and confidence'],
    weaknesses: ['Could initiate more points proactively', 'Some arguments needed deeper analysis', 'More engagement with opposing viewpoints'],
    suggestions: ['Practice opening statements', 'Back up arguments with statistics', 'Actively acknowledge others\' points', 'Summarize key takeaways at the end', 'Work on body language'],
    relevance, communication, confidence, participation, logicalFlow,
  };
};

export default function GDResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const { transcript = [], topic = '' } = location.state || {};
  const result = generateYourResult(transcript);
  const scoreMetrics = [
    { label: 'Relevance', value: result.relevance, icon: MessageCircle },
    { label: 'Communication', value: result.communication, icon: Users },
    { label: 'Confidence', value: result.confidence, icon: Zap },
    { label: 'Participation', value: result.participation, icon: TrendingUp },
    { label: 'Logical Flow', value: result.logicalFlow, icon: BarChart3 },
  ];
  const getRankLabel = (rank: number) => rank === 1 ? '1st' : rank === 2 ? '2nd' : rank === 3 ? '3rd' : `${rank}th`;
  const getScoreColor = (score: number) => score >= 8 ? 'text-green-600' : score >= 6 ? 'text-yellow-600' : 'text-red-600';

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <Button variant="ghost" onClick={() => navigate('/')} className="gap-2 text-muted-foreground hover:text-foreground"><ArrowLeft className="w-4 h-4" />Back to Home</Button>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-center space-y-2">
          <h1 className="font-display text-4xl font-bold text-foreground">Your Performance Report</h1>
          <p className="text-muted-foreground">AI-powered analysis of your group discussion</p>
          <p className="text-sm text-muted-foreground/70 italic">Topic: "{topic}"</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="bg-card rounded-3xl shadow-lg p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-3xl font-bold">Y</div>
              <div><h2 className="font-display text-2xl font-semibold text-foreground">You</h2><p className="text-muted-foreground">Discussion Participant</p></div>
            </div>
            <div className="text-center"><div className="flex items-center gap-3"><Trophy className="w-8 h-8 text-gold" /><span className="text-5xl font-display font-bold text-foreground">{getRankLabel(result.rank)}</span></div><p className="text-sm text-muted-foreground mt-1">Overall Rank</p></div>
            <div className="text-center"><div className={`text-5xl font-display font-bold ${getScoreColor(result.score)}`}>{result.score}</div><p className="text-sm text-muted-foreground mt-1">out of 10</p></div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-card rounded-3xl shadow-md p-6">
          <h3 className="font-display text-xl font-semibold text-foreground mb-6 flex items-center gap-2"><BarChart3 className="w-5 h-5 text-primary" />Score Breakdown</h3>
          <div className="space-y-4">
            {scoreMetrics.map((metric, index) => (
              <motion.div key={metric.label} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + index * 0.1 }} className="flex items-center gap-4">
                <div className="w-40 flex items-center gap-2"><metric.icon className="w-4 h-4 text-muted-foreground" /><span className="text-sm font-medium text-foreground">{metric.label}</span></div>
                <div className="flex-1"><Progress value={metric.value * 10} className="h-3" /></div>
                <span className={`w-12 text-right font-semibold ${getScoreColor(metric.value)}`}>{metric.value.toFixed(1)}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-card rounded-2xl shadow-md p-5">
            <h3 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-green-600" />Strengths</h3>
            <ul className="space-y-2">{result.strengths.map((s, i) => <li key={i} className="flex items-start gap-2 text-sm text-foreground/90"><CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />{s}</li>)}</ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-card rounded-2xl shadow-md p-5">
            <h3 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2"><TrendingDown className="w-5 h-5 text-amber-600" />Areas to Improve</h3>
            <ul className="space-y-2">{result.weaknesses.map((w, i) => <li key={i} className="flex items-start gap-2 text-sm text-foreground/90"><div className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-2 flex-shrink-0" />{w}</li>)}</ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="bg-card rounded-2xl shadow-md p-5">
            <h3 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2"><Lightbulb className="w-5 h-5 text-primary" />Suggestions</h3>
            <ul className="space-y-2">{result.suggestions.map((s, i) => <li key={i} className="flex items-start gap-2 text-sm text-foreground/90"><div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />{s}</li>)}</ul>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="text-center pt-4">
          <Button onClick={() => navigate('/gd-portal')} size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8">Start Another Discussion</Button>
        </motion.div>
      </div>
    </div>
  );
}
