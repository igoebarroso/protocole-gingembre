"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  Target, 
  TrendingUp, 
  Heart, 
  Zap, 
  Coffee, 
  Leaf,
  ArrowRight,
  ArrowLeft,
  CheckCircle
} from "lucide-react"
import QuizDiagnostic from "./quiz-diagnostic"

interface QuizProps {
  onComplete: () => void
}

interface QuizAnswer {
  goal: string
  currentWeight: string
  activityLevel: string
  sleepQuality: string
  stressLevel: string
  dietType: string
}

const quizQuestions = [
  {
    id: "goal",
    question: "Quel est votre objectif principal ?",
    options: [
      { value: "weight-loss", label: "Perte de poids", icon: "⚖️" },
      { value: "wellness", label: "Bien-être général", icon: "🧘" },
      { value: "energy", label: "Plus d'énergie", icon: "⚡" },
      { value: "detox", label: "Détoxification", icon: "🌿" }
    ]
  },
  {
    id: "currentWeight",
    question: "Comment décririez-vous votre poids actuel ?",
    options: [
      { value: "underweight", label: "En dessous du poids normal", icon: "📉" },
      { value: "normal", label: "Poids normal", icon: "✅" },
      { value: "overweight", label: "Légèrement en surpoids", icon: "📈" },
      { value: "obese", label: "Obésité", icon: "⚠️" }
    ]
  },
  {
    id: "activityLevel",
    question: "Quel est votre niveau d'activité physique ?",
    options: [
      { value: "low", label: "Sédentaire", icon: "🛋️" },
      { value: "moderate", label: "Modéré", icon: "🚶" },
      { value: "high", label: "Actif", icon: "🏃" },
      { value: "very-high", label: "Très actif", icon: "🏋️" }
    ]
  },
  {
    id: "sleepQuality",
    question: "Comment évaluez-vous votre qualité de sommeil ?",
    options: [
      { value: "poor", label: "Mauvaise", icon: "😴" },
      { value: "fair", label: "Moyenne", icon: "😐" },
      { value: "good", label: "Bonne", icon: "😊" },
      { value: "excellent", label: "Excellente", icon: "😍" }
    ]
  },
  {
    id: "stressLevel",
    question: "Quel est votre niveau de stress actuel ?",
    options: [
      { value: "high", label: "Élevé", icon: "😰" },
      { value: "moderate", label: "Modéré", icon: "😐" },
      { value: "low", label: "Faible", icon: "😌" },
      { value: "very-low", label: "Très faible", icon: "😇" }
    ]
  },
  {
    id: "dietType",
    question: "Quel type d'alimentation suivez-vous ?",
    options: [
      { value: "unhealthy", label: "Peu équilibrée", icon: "🍔" },
      { value: "mixed", label: "Mixte", icon: "🥗" },
      { value: "healthy", label: "Équilibrée", icon: "🥑" },
      { value: "strict", label: "Très stricte", icon: "🌱" }
    ]
  }
]

export default function Quiz({ onComplete }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswer>({
    goal: "",
    currentWeight: "",
    activityLevel: "",
    sleepQuality: "",
    stressLevel: "",
    dietType: ""
  })
  const [showDiagnostic, setShowDiagnostic] = useState(false)

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100

  const handleAnswer = (value: string) => {
    const questionId = quizQuestions[currentQuestion].id as keyof QuizAnswer
    setAnswers(prev => ({ ...prev, [questionId]: value }))
    
    if (currentQuestion < quizQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(prev => prev + 1)
      }, 300)
    } else {
      setTimeout(() => {
        setShowDiagnostic(true)
      }, 500)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    }
  }

  const handleDiagnosticComplete = () => {
    onComplete()
  }

  if (showDiagnostic) {
    return <QuizDiagnostic answers={answers} onComplete={handleDiagnosticComplete} />
  }

  const currentQ = quizQuestions[currentQuestion]
  const currentAnswer = answers[currentQ.id as keyof QuizAnswer]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/10 pb-20">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="relative h-40 bg-gradient-to-b from-primary/20 to-secondary/20">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="relative z-10 p-4 text-white">
            <motion.h1 
              className="text-xl font-bold mb-1"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Quiz Personnalisé
            </motion.h1>
            <motion.p 
              className="text-white/90 text-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Question {currentQuestion + 1} sur {quizQuestions.length}
            </motion.p>
            
            {/* Progress Bar */}
            <div className="mt-4">
              <Progress value={progress} className="h-2" />
            </div>
          </div>
        </div>

        <div className="p-3">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            {/* Question */}
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <h2 className="text-lg font-bold mb-4">{currentQ.question}</h2>
                
                {/* Options */}
                <div className="space-y-3">
                  {currentQ.options.map((option, index) => (
                    <motion.div
                      key={option.value}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Button
                        variant={currentAnswer === option.value ? "default" : "outline"}
                        className={`w-full h-16 justify-start text-left ${
                          currentAnswer === option.value 
                            ? "bg-gradient-to-r from-primary to-secondary text-white" 
                            : "bg-white/80 hover:bg-primary/10"
                        }`}
                        onClick={() => handleAnswer(option.value)}
                      >
                        <div className="flex items-center gap-3 w-full">
                          <span className="text-2xl">{option.icon}</span>
                          <span className="font-medium">{option.label}</span>
                          {currentAnswer === option.value && (
                            <CheckCircle className="h-5 w-5 ml-auto" />
                          )}
                        </div>
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Précédent
              </Button>
              
              <div className="text-sm text-muted-foreground">
                {currentQuestion + 1} / {quizQuestions.length}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
