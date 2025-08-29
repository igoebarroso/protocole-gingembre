"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Clock, Play, Pause, RotateCcw, Sparkles } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export default function FastingTimer() {
  const [isRunning, setIsRunning] = useState(false)
  const [time, setTime] = useState(0)
  const [targetHours, setTargetHours] = useState(16)
  const [startTime, setStartTime] = useState<number | null>(null)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isRunning) {
      interval = setInterval(() => {
        setTime(prev => prev + 1)
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isRunning])

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true)
      setStartTime(Date.now())
    }
  }

  const pauseTimer = () => {
    setIsRunning(false)
  }

  const resetTimer = () => {
    setIsRunning(false)
    setTime(0)
    setStartTime(null)
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const progress = Math.min((time / (targetHours * 3600)) * 100, 100)
  const hours = Math.floor(time / 3600)
  const minutes = Math.floor((time % 3600) / 60)

  const getMotivationalMessage = () => {
    if (progress >= 100) return "🎉 Jeûne terminé ! Vous êtes incroyable !"
    if (progress >= 75) return "💪 Presque au bout ! Continuez !"
    if (progress >= 50) return "🔥 Vous êtes sur la bonne voie !"
    if (progress >= 25) return "🌟 Chaque minute compte !"
    return "⏰ Commencez votre jeûne !"
  }

  const getPhaseMessage = () => {
    if (hours < 12) return "Phase de jeûne"
    if (hours < 16) return "Phase de cétose"
    if (hours < 20) return "Phase d'autophagie"
    return "Phase optimale"
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.02 }}
      className="group"
    >
      <Card className="backdrop-blur-xl bg-white/90 shadow-2xl border-0 overflow-hidden group-hover:shadow-3xl transition-all duration-300">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold text-gray-800">Jeûne Intermittent</CardTitle>
            <motion.div
              className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg"
              whileHover={{ rotate: 5, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Clock className="w-5 h-5 text-white" />
            </motion.div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Timer Display */}
          <div className="flex justify-center">
            <motion.div
              className="relative"
              animate={{ scale: isRunning ? 1.05 : 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-xl relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <div className="relative z-10 text-center text-white">
                  <motion.div
                    className="text-2xl font-bold font-mono"
                    key={time}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {formatTime(time)}
                  </motion.div>
                  <div className="text-xs opacity-90">{getPhaseMessage()}</div>
                </div>
              </div>
              {/* Floating sparkles when running */}
              {isRunning && (
                <motion.div
                  className="absolute -top-2 -right-2"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Sparkles className="w-4 h-4 text-purple-400" />
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 font-medium">Progression</span>
              <span className="text-gray-800 font-bold">{hours}h {minutes}m / {targetHours}h</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <motion.div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full relative"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center space-x-4">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                onClick={resetTimer}
                variant="outline"
                size="lg"
                className="w-12 h-12 rounded-full border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-200"
              >
                <RotateCcw className="w-5 h-5 text-gray-600" />
              </Button>
            </motion.div>

            <motion.div
              className="text-center"
              animate={{ scale: isRunning ? 1.05 : 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-3xl font-bold text-gray-800 mb-1">{hours}h {minutes}m</div>
              <div className="text-sm text-gray-500">temps écoulé</div>
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                onClick={isRunning ? pauseTimer : startTimer}
                size="lg"
                className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {isRunning ? (
                  <Pause className="w-5 h-5 text-white" />
                ) : (
                  <Play className="w-5 h-5 text-white" />
                )}
              </Button>
            </motion.div>
          </div>

          {/* Motivational Message */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <motion.p
              className="text-sm text-gray-600 font-medium"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {getMotivationalMessage()}
            </motion.p>
          </motion.div>

          {/* Phase Indicators */}
          <div className="flex justify-center space-x-2">
            {[12, 16, 20].map((hour) => (
              <motion.div
                key={hour}
                className={`w-3 h-3 rounded-full ${
                  hours >= hour ? "bg-gradient-to-r from-purple-500 to-pink-500" : "bg-gray-200"
                }`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: hour * 0.1 }}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
