"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Target, 
  TrendingUp, 
  Heart, 
  Zap, 
  Coffee, 
  Leaf,
  Star,
  CheckCircle,
  ArrowRight,
  Sparkles
} from "lucide-react"
import Link from "next/link"

interface QuizDiagnosticProps {
  answers: {
    goal: string
    currentWeight: string
    activityLevel: string
    sleepQuality: string
    stressLevel: string
    dietType: string
  }
  onComplete: () => void
}

interface DiagnosticResult {
  category: string
  score: number
  description: string
  recommendations: string[]
  icon: React.ReactNode
  color: string
}

export default function QuizDiagnostic({ answers, onComplete }: QuizDiagnosticProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowResults(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const calculateDiagnostic = (): DiagnosticResult[] => {
    const results: DiagnosticResult[] = []

    // Analyse du métabolisme
    let metabolismScore = 60
    if (answers.activityLevel === "high") metabolismScore += 20
    if (answers.sleepQuality === "excellent") metabolismScore += 15
    if (answers.stressLevel === "low") metabolismScore += 5

    results.push({
      category: "Métabolisme",
      score: Math.min(metabolismScore, 100),
      description: "Votre métabolisme de base et sa capacité à brûler les graisses",
      recommendations: [
        "Le protocole gingembre va stimuler votre thermogenèse",
        "Combinez avec une activité physique régulière",
        "Priorisez un sommeil de qualité"
      ],
      icon: <Zap className="h-5 w-5" />,
      color: "from-yellow-400 to-orange-500"
    })

    // Analyse de la motivation
    let motivationScore = 70
    if (answers.goal === "weight-loss") motivationScore += 15
    if (answers.currentWeight === "overweight") motivationScore += 10
    if (answers.dietType === "healthy") motivationScore += 5

    results.push({
      category: "Motivation",
      score: Math.min(motivationScore, 100),
      description: "Votre niveau de motivation et d'engagement",
      recommendations: [
        "Fixez-vous des objectifs réalistes et mesurables",
        "Suivez votre progression quotidiennement",
        "Célébrez vos petites victoires"
      ],
      icon: <Target className="h-5 w-5" />,
      color: "from-blue-500 to-purple-600"
    })

    // Analyse du bien-être
    let wellnessScore = 50
    if (answers.sleepQuality === "excellent") wellnessScore += 25
    if (answers.stressLevel === "low") wellnessScore += 15
    if (answers.activityLevel === "high") wellnessScore += 10

    results.push({
      category: "Bien-être",
      score: Math.min(wellnessScore, 100),
      description: "Votre état de santé général et équilibre de vie",
      recommendations: [
        "Intégrez la méditation dans votre routine",
        "Pratiquez des exercices de respiration",
        "Maintenez un rythme de sommeil régulier"
      ],
      icon: <Heart className="h-5 w-5" />,
      color: "from-green-400 to-emerald-500"
    })

    return results
  }

  const diagnosticResults = calculateDiagnostic()
  const averageScore = Math.round(diagnosticResults.reduce((sum, result) => sum + result.score, 0) / diagnosticResults.length)

  const getPersonalizedMessage = () => {
    if (averageScore >= 80) {
      return {
        title: "Excellent ! Vous êtes prêt(e) pour le succès !",
        message: "Votre profil montre une excellente base pour réussir le protocole gingembre. Votre métabolisme, motivation et bien-être sont optimaux pour des résultats rapides et durables.",
        emoji: "🌟"
      }
    } else if (averageScore >= 60) {
      return {
        title: "Très bien ! Vous avez un bon potentiel !",
        message: "Votre profil présente de bonnes bases. Le protocole gingembre va vous aider à optimiser vos résultats et améliorer votre bien-être général.",
        emoji: "✨"
      }
    } else {
      return {
        title: "Parfait ! Le protocole va vous transformer !",
        message: "Le protocole gingembre asiatique est idéal pour vous. Il va stimuler votre métabolisme, booster votre motivation et améliorer votre bien-être de manière naturelle.",
        emoji: "🚀"
      }
    }
  }

  const personalizedMessage = getPersonalizedMessage()

  if (!showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/10 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 mx-auto mb-4"
          >
            <Sparkles className="w-full h-full text-primary" />
          </motion.div>
          <h2 className="text-xl font-bold mb-2">Analyse en cours...</h2>
          <p className="text-muted-foreground">Préparation de votre diagnostic personnalisé</p>
        </div>
      </div>
    )
  }

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
              Votre Diagnostic Personnalisé
            </motion.h1>
            <motion.p 
              className="text-white/90 text-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Analyse basée sur vos réponses
            </motion.p>
          </div>
        </div>

        <div className="p-3 space-y-4">
          {/* Score Global */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-gradient-to-r from-primary to-secondary text-primary-foreground border-0 shadow-lg">
              <CardContent className="p-4 text-center">
                <div className="text-4xl mb-2">{personalizedMessage.emoji}</div>
                <h2 className="text-lg font-bold mb-2">{personalizedMessage.title}</h2>
                <p className="text-sm opacity-90 mb-3">{personalizedMessage.message}</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-2xl font-bold">{averageScore}%</span>
                  <span className="text-sm opacity-90">Score global</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Résultats détaillés */}
          {diagnosticResults.map((result, index) => (
            <motion.div
              key={result.category}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 bg-gradient-to-r ${result.color} rounded-full flex items-center justify-center text-white`}>
                      {result.icon}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-sm">{result.category}</CardTitle>
                      <p className="text-xs text-muted-foreground">{result.description}</p>
                    </div>
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      {result.score}%
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">Niveau actuel</span>
                      <span className="text-xs font-medium">{result.score}%</span>
                    </div>
                    <Progress value={result.score} className="h-1.5" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium mb-2">Recommandations :</p>
                    {result.recommendations.map((rec, recIndex) => (
                      <div key={recIndex} className="flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-xs">{rec}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          {/* Plan d'action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Star className="h-4 w-4 text-primary" />
                  Votre Plan d'Action
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-2 bg-orange-50 rounded-lg">
                    <div className="text-xl">🫚</div>
                    <div>
                      <p className="text-xs font-medium">Jour 1-7 : Protocole de base</p>
                      <p className="text-xs text-muted-foreground">Infusions gingembre-café-thé vert</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
                    <div className="text-xl">📊</div>
                    <div>
                      <p className="text-xs font-medium">Suivi quotidien</p>
                      <p className="text-xs text-muted-foreground">Mesurez vos progrès</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
                    <div className="text-xl">🎯</div>
                    <div>
                      <p className="text-xs font-medium">Objectif : {answers.goal === "weight-loss" ? "Perte de poids" : "Bien-être"}</p>
                      <p className="text-xs text-muted-foreground">Résultats en 2-4 semaines</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Bouton de continuation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Button 
              onClick={onComplete}
              className="w-full bg-gradient-to-r from-primary to-secondary text-white h-12 text-base font-semibold"
            >
              Commencer le Protocole
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
