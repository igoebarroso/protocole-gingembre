"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import InstallAppGuide from "@/components/install-app-guide"
import Quiz from "@/components/quiz"

export default function HomePage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<"loading" | "install" | "quiz" | "login">("loading")

  useEffect(() => {
    // Check if user has seen install guide
    const hasSeenInstallGuide = localStorage.getItem("has-seen-install-guide")
    const hasCompletedQuiz = localStorage.getItem("quiz-completed")
    const isAuthenticated = localStorage.getItem("user-authenticated")
    const hasCompletedOnboarding = localStorage.getItem("onboarding-completed")

    if (!hasSeenInstallGuide) {
      setCurrentStep("install")
    } else if (!hasCompletedQuiz) {
      setCurrentStep("quiz")
    } else if (!isAuthenticated) {
      setCurrentStep("login")
    } else if (!hasCompletedOnboarding) {
      router.push("/onboarding")
    } else {
      router.push("/accueil")
    }
  }, [router])

  const handleInstallComplete = () => {
    localStorage.setItem("has-seen-install-guide", "true")
    setCurrentStep("quiz")
  }

  const handleQuizComplete = () => {
    localStorage.setItem("quiz-completed", "true")
    setCurrentStep("login")
  }

  const handleLoginRedirect = () => {
    router.push("/login")
  }

  if (currentStep === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-muted-foreground">Chargement...</p>
        </motion.div>
      </div>
    )
  }

  if (currentStep === "install") {
    return (
      <InstallAppGuide
        onClose={handleInstallComplete}
        onContinue={handleInstallComplete}
      />
    )
  }

  if (currentStep === "quiz") {
    return <Quiz onComplete={handleQuizComplete} />
  }

  if (currentStep === "login") {
    // Redirect to login page
    router.push("/login")
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-muted-foreground">Redirection vers la connexion...</p>
        </motion.div>
      </div>
    )
  }

  return null
}
