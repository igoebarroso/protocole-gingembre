"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Droplets, Plus, Minus, Sparkles } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface WaterCounterProps {
  count: number
  onUpdate: (count: number) => void
}

export default function WaterCounter({ count, onUpdate }: WaterCounterProps) {
  const [isAnimating, setIsAnimating] = useState(false)
  const targetGlasses = 8
  const progress = (count / targetGlasses) * 100

  const handleIncrement = () => {
    if (count < targetGlasses) {
      setIsAnimating(true)
      onUpdate(count + 1)
      setTimeout(() => setIsAnimating(false), 200)
    }
  }

  const handleDecrement = () => {
    if (count > 0) {
      onUpdate(count - 1)
    }
  }

  const getMotivationalMessage = () => {
    if (progress >= 100) return "🎉 Objectif atteint ! Vous êtes incroyable !"
    if (progress >= 75) return "💪 Presque au bout ! Continuez comme ça !"
    if (progress >= 50) return "🔥 Vous êtes sur la bonne voie !"
    if (progress >= 25) return "🌟 Chaque verre compte !"
    return "💧 Commencez votre hydratation !"
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
            <CardTitle className="text-xl font-bold text-gray-800">Hydratation</CardTitle>
            <motion.div
              className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg"
              whileHover={{ rotate: 5, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Droplets className="w-5 h-5 text-white" />
            </motion.div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Progress Ring */}
          <div className="flex justify-center">
            <motion.div
              className="relative"
              animate={{ scale: isAnimating ? 1.1 : 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-xl relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="relative z-10 text-white font-bold text-2xl"
                  animate={{ scale: isAnimating ? 1.2 : 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {count}
                </motion.div>
              </div>
              {/* Floating sparkles */}
              {isAnimating && (
                <motion.div
                  className="absolute -top-2 -right-2"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Sparkles className="w-4 h-4 text-blue-400" />
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 font-medium">Progression</span>
              <span className="text-gray-800 font-bold">{count}/{targetGlasses} verres</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <motion.div
                className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full relative"
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
                onClick={handleDecrement}
                disabled={count === 0}
                variant="outline"
                size="lg"
                className="w-12 h-12 rounded-full border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
              >
                <Minus className="w-5 h-5 text-gray-600" />
              </Button>
            </motion.div>

            <motion.div
              className="text-center"
              animate={{ scale: isAnimating ? 1.05 : 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-3xl font-bold text-gray-800 mb-1">{count}</div>
              <div className="text-sm text-gray-500">verres</div>
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                onClick={handleIncrement}
                disabled={count >= targetGlasses}
                size="lg"
                className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Plus className="w-5 h-5 text-white" />
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

          {/* Water Drop Animation */}
          <div className="flex justify-center space-x-1">
            {[...Array(targetGlasses)].map((_, index) => (
              <motion.div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index < count ? "bg-gradient-to-r from-blue-500 to-cyan-500" : "bg-gray-200"
                }`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
