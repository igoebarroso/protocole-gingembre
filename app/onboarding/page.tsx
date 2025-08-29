"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"

interface OnboardingData {
  age: string
  weight: string
  height: string
  goal: string
  restrictions: string[]
  activityLevel: string
}

const steps = [
  {
    title: "Bienvenue !",
    subtitle: "Commençons ton parcours de 7 jours avec le gingembre",
    type: "welcome",
  },
  {
    title: "Parle-nous de toi",
    subtitle: "Quelques infos pour personnaliser ton expérience",
    type: "personal",
  },
  {
    title: "Fixe ton objectif",
    subtitle: "Que souhaites-tu accomplir en 7 jours ?",
    type: "goal",
  },
  {
    title: "Tes préférences",
    subtitle: "As-tu des restrictions alimentaires ?",
    type: "preferences",
  },
  {
    title: "Niveau d'activité",
    subtitle: "À quelle fréquence fais-tu du sport ?",
    type: "activity",
  },
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [data, setData] = useState<OnboardingData>({
    age: "",
    weight: "",
    height: "",
    goal: "",
    restrictions: [],
    activityLevel: "",
  })
  const router = useRouter()

  const progress = ((currentStep + 1) / steps.length) * 100

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Complete onboarding
      localStorage.setItem("onboarding-completed", "true")
      localStorage.setItem("user-data", JSON.stringify(data))
      router.push("/accueil")
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const updateData = (field: keyof OnboardingData, value: any) => {
    setData((prev) => ({ ...prev, [field]: value }))
  }

  const toggleRestriction = (restriction: string) => {
    setData((prev) => ({
      ...prev,
      restrictions: prev.restrictions.includes(restriction)
        ? prev.restrictions.filter((r) => r !== restriction)
        : [...prev.restrictions, restriction],
    }))
  }

  const canProceed = () => {
    const step = steps[currentStep]
    switch (step.type) {
      case "welcome":
        return true
      case "personal":
        return data.age && data.weight && data.height
      case "goal":
        return data.goal
      case "preferences":
        return true // Optional
      case "activity":
        return data.activityLevel
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 p-4">
      <div className="max-w-md mx-auto pt-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>Étape {currentStep + 1}</span>
            <span>{steps.length} étapes</span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-6 mb-6">
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold mb-2">{steps[currentStep].title}</h1>
                <p className="text-muted-foreground">{steps[currentStep].subtitle}</p>
              </div>

              {/* Step Content */}
              {steps[currentStep].type === "welcome" && (
                <div className="text-center space-y-4">
                  <div className="text-6xl">🫚</div>
                  <p className="text-sm text-muted-foreground">
                    Découvre les bienfaits du gingembre pour désinflammer ton corps et retrouver ton énergie
                    naturellement.
                  </p>
                </div>
              )}

              {steps[currentStep].type === "personal" && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="age">Âge</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="25"
                      value={data.age}
                      onChange={(e) => updateData("age", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="weight">Poids (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      placeholder="65"
                      value={data.weight}
                      onChange={(e) => updateData("weight", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="height">Taille (cm)</Label>
                    <Input
                      id="height"
                      type="number"
                      placeholder="170"
                      value={data.height}
                      onChange={(e) => updateData("height", e.target.value)}
                    />
                  </div>
                </div>
              )}

              {steps[currentStep].type === "goal" && (
                <RadioGroup value={data.goal} onValueChange={(value) => updateData("goal", value)}>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="lose-1kg" id="lose-1kg" />
                      <Label htmlFor="lose-1kg">Perdre 1kg en 7 jours</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="lose-2kg" id="lose-2kg" />
                      <Label htmlFor="lose-2kg">Perdre 2kg en 7 jours</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="detox" id="detox" />
                      <Label htmlFor="detox">Détoxifier mon corps</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="energy" id="energy" />
                      <Label htmlFor="energy">Retrouver mon énergie</Label>
                    </div>
                  </div>
                </RadioGroup>
              )}

              {steps[currentStep].type === "preferences" && (
                <div className="space-y-3">
                  {["Sans lactose", "Sans gluten", "Végétarien", "Végan"].map((restriction) => (
                    <div key={restriction} className="flex items-center space-x-2">
                      <Checkbox
                        id={restriction}
                        checked={data.restrictions.includes(restriction)}
                        onCheckedChange={() => toggleRestriction(restriction)}
                      />
                      <Label htmlFor={restriction}>{restriction}</Label>
                    </div>
                  ))}
                </div>
              )}

              {steps[currentStep].type === "activity" && (
                <RadioGroup value={data.activityLevel} onValueChange={(value) => updateData("activityLevel", value)}>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="sedentary" id="sedentary" />
                      <Label htmlFor="sedentary">Sédentaire (peu ou pas d'exercice)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="light" id="light" />
                      <Label htmlFor="light">Léger (1-3 fois/semaine)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="moderate" id="moderate" />
                      <Label htmlFor="moderate">Modéré (3-5 fois/semaine)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="active" id="active" />
                      <Label htmlFor="active">Actif (6-7 fois/semaine)</Label>
                    </div>
                  </div>
                </RadioGroup>
              )}
            </Card>

            {/* Navigation */}
            <div className="flex justify-between">
              <Button variant="outline" onClick={handleBack} disabled={currentStep === 0}>
                <ChevronLeft className="h-4 w-4 mr-1" />
                Retour
              </Button>

              <Button onClick={handleNext} disabled={!canProceed()} className="min-w-[120px]">
                {currentStep === steps.length - 1 ? "Commencer mon plan" : "Suivant"}
                {currentStep < steps.length - 1 && <ChevronRight className="h-4 w-4 ml-1" />}
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
