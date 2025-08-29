"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Clock, ChefHat, Play, Pause, RotateCcw, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"
import { recipes, type Recipe } from "@/lib/data"
import Link from "next/link"

interface RecipePageProps {
  params: {
    id: string
  }
}

export default function RecipePage({ params }: RecipePageProps) {
  const router = useRouter()
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  useEffect(() => {
    const foundRecipe = recipes.find((r) => r.id === params.id)
    setRecipe(foundRecipe || null)
  }, [params.id])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isTimerRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setIsTimerRunning(false)
            // Notification sonore ou visuelle
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isTimerRunning, timeRemaining])

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Recette non trouvée</p>
          <Link href="/recettes">
            <Button>Retour aux recettes</Button>
          </Link>
        </div>
      </div>
    )
  }

  const startTimer = (duration: number) => {
    setTimeRemaining(duration)
    setIsTimerRunning(true)
  }

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning)
  }

  const resetTimer = () => {
    setIsTimerRunning(false)
    setTimeRemaining(0)
  }

  const markStepComplete = (stepIndex: number) => {
    if (!completedSteps.includes(stepIndex)) {
      setCompletedSteps([...completedSteps, stepIndex])
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const progressPercentage = (completedSteps.length / recipe.steps.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="max-w-md mx-auto">
        {/* Header avec image */}
        <div className="relative h-64 bg-gradient-to-b from-transparent to-black/20">
          <img src={recipe.image || "/placeholder.svg"} alt={recipe.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          {/* Navigation */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
            <Button
              variant="secondary"
              size="icon"
              className="bg-white/20 backdrop-blur-sm border-white/20"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Badge variant="secondary" className="bg-white/20 backdrop-blur-sm border-white/20">
              Jour {recipe.day}
            </Badge>
          </div>

          {/* Titre et infos */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h1 className="text-2xl font-bold mb-2">{recipe.name}</h1>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {recipe.prepTime} min
              </div>
              <div className="flex items-center gap-1">
                <ChefHat className="h-4 w-4" />
                {recipe.calories} cal
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Progression */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Progression</span>
                  <span className="text-sm text-muted-foreground">
                    {completedSteps.length}/{recipe.steps.length} étapes
                  </span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </CardContent>
            </Card>
          </motion.div>

          {/* Timer actif */}
          <AnimatePresence>
            {timeRemaining > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <Card className="bg-primary text-primary-foreground">
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl font-bold mb-2">{formatTime(timeRemaining)}</div>
                    <div className="flex justify-center gap-2">
                      <Button variant="secondary" size="sm" onClick={toggleTimer}>
                        {isTimerRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>
                      <Button variant="secondary" size="sm" onClick={resetTimer}>
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Ingrédients */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card>
              <CardHeader>
                <CardTitle>Ingrédients</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * index }}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent/50"
                  >
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>{ingredient}</span>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Étapes de préparation */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card>
              <CardHeader>
                <CardTitle>Préparation étape par étape</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recipe.steps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className={`p-4 rounded-lg border transition-all ${
                      completedSteps.includes(index)
                        ? "bg-primary/10 border-primary/20"
                        : currentStep === index
                          ? "bg-accent border-accent-foreground/20"
                          : "hover:bg-accent/50"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          completedSteps.includes(index)
                            ? "bg-primary text-primary-foreground"
                            : currentStep === index
                              ? "bg-accent-foreground text-accent"
                              : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {completedSteps.includes(index) ? <Check className="h-4 w-4" /> : index + 1}
                      </div>

                      <div className="flex-1">
                        <p className="font-medium mb-2">{step.step}</p>

                        <div className="flex items-center gap-2">
                          {step.duration && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => startTimer(step.duration!)}
                              disabled={timeRemaining > 0}
                            >
                              <Clock className="h-3 w-3 mr-1" />
                              {Math.floor(step.duration / 60)}:{(step.duration % 60).toString().padStart(2, "0")}
                            </Button>
                          )}

                          {!completedSteps.includes(index) && (
                            <Button
                              size="sm"
                              onClick={() => {
                                markStepComplete(index)
                                if (index === currentStep && currentStep < recipe.steps.length - 1) {
                                  setCurrentStep(currentStep + 1)
                                }
                              }}
                            >
                              Terminé
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-2"
          >
            {recipe.tags.map((tag, index) => (
              <Badge key={index} variant="secondary">
                #{tag}
              </Badge>
            ))}
          </motion.div>

          {/* Félicitations si toutes les étapes sont terminées */}
          {completedSteps.length === recipe.steps.length && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="bg-gradient-to-r from-primary to-secondary text-primary-foreground">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-2">🎉</div>
                  <h3 className="text-lg font-bold mb-2">Recette terminée !</h3>
                  <p className="opacity-90 mb-4">Bravo ! Tu viens de préparer une délicieuse recette au gingembre.</p>
                  <Button variant="secondary" onClick={() => router.push("/accueil")}>
                    Retour à l'accueil
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
