"use client"

import { useRouter } from "next/navigation"
import Quiz from "@/components/quiz"

export default function QuizPage() {
  const router = useRouter()

  const handleQuizComplete = () => {
    // Rediriger vers la page d'accueil après le quiz
    router.push("/accueil")
  }

  return <Quiz onComplete={handleQuizComplete} />
}
