"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Clock, ChefHat, Play, Pause, RotateCcw, Check, Crown, Star, Zap } from "lucide-react"
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
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    const foundRecipe = recipes.find((r) => r.id === params.id)
    setRecipe(foundRecipe || null)
    
    // Charger les favoris
    const savedFavorites = localStorage.getItem("favorite-recipes")
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [params.id])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isTimerRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setIsTimerRunning(false)
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="text-center">
          <div className="text-6xl mb-4">🍽️</div>
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

  const toggleFavorite = () => {
    const newFavorites = favorites.includes(recipe.id)
      ? favorites.filter(id => id !== recipe.id)
      : [...favorites, recipe.id]
    
    setFavorites(newFavorites)
    localStorage.setItem("favorite-recipes", JSON.stringify(newFavorites))
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const progressPercentage = (completedSteps.length / recipe.steps.length) * 100

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "facile": return "bg-green-100 text-green-800"
      case "moyen": return "bg-yellow-100 text-yellow-800"
      case "difficile": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

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
            
            <div className="flex gap-2">
              {recipe.premium && (
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
                  <Crown className="h-3 w-3 mr-1" />
                  Premium
                </Badge>
              )}
              <Badge variant="secondary" className="bg-white/20 backdrop-blur-sm border-white/20">
                Jour {recipe.day}
              </Badge>
            </div>
          </div>

          {/* Titre et infos */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-start justify-between mb-2">
              <h1 className="text-2xl font-bold">{recipe.name}</h1>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-white/20"
                onClick={toggleFavorite}
              >
                <Star className={`h-4 w-4 ${favorites.includes(recipe.id) ? 'fill-yellow-400 text-yellow-400' : ''}`} />
              </Button>
            </div>
            
            {recipe.description && (
              <p className="text-sm opacity-90 mb-2 line-clamp-2">{recipe.description}</p>
            )}
            
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {recipe.prepTime} min
              </div>
              <div className="flex items-center gap-1">
                <ChefHat className="h-4 w-4" />
                {recipe.calories} cal
              </div>
              {recipe.difficulty && (
                <Badge variant="outline" className={`text-xs ${getDifficultyColor(recipe.difficulty)} bg-white/20`}>
                  {recipe.difficulty}
                </Badge>
              )}
            </div>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Progression */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
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
                <Card className="bg-gradient-to-r from-primary to-secondary text-primary-foreground">
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
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Ingrédients
                </CardTitle>
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
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ChefHat className="h-5 w-5 text-primary" />
                  Préparation étape par étape
                </CardTitle>
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
              <Badge key={index} variant="secondary" className="bg-primary/10 text-primary">
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
