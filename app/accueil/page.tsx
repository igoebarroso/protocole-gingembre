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
  BookOpen, 
  ChefHat, 
  Trophy, 
  ShoppingCart,
  Star,
  Zap,
  Leaf,
  Coffee,
  Users,
  Award
} from "lucide-react"
import Link from "next/link"
import ProgressRing from "@/components/progress-ring"
import WaterCounter from "@/components/water-counter"
import FastingTimer from "@/components/fasting-timer"
import BottomNavigation from "@/components/bottom-navigation"

export default function AccueilPage() {
  const [currentDay, setCurrentDay] = useState(1)
  const [totalDays] = useState(30)
  const [waterIntake, setWaterIntake] = useState(0)
  const [fastingHours, setFastingHours] = useState(0)

  useEffect(() => {
    const savedDay = localStorage.getItem("current-day")
    const savedWater = localStorage.getItem("water-intake")
    const savedFasting = localStorage.getItem("fasting-hours")

    if (savedDay) setCurrentDay(parseInt(savedDay))
    if (savedWater) setWaterIntake(parseInt(savedWater))
    if (savedFasting) setFastingHours(parseInt(savedFasting))
  }, [])

  const progressPercentage = (currentDay / totalDays) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/10">
      <div className="max-w-md mx-auto">
        {/* Header avec gradient animé */}
        <div className="relative h-48 bg-gradient-to-br from-primary/20 via-secondary/20 to-primary/30 overflow-hidden">
          {/* Sparkles animés */}
          <div className="absolute inset-0">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white/30 rounded-full"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + i * 10}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </div>

          <div className="relative z-10 p-6 text-white">
            <motion.h1 
              className="text-2xl font-bold mb-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Bonjour ! 👋
            </motion.h1>
            <motion.p 
              className="text-white/90"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Prêt(e) pour votre journée de bien-être ?
            </motion.p>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Progression du protocole */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Progression du Protocole
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  <ProgressRing 
                    progress={progressPercentage} 
                    size={80} 
                    strokeWidth={8}
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Jour {currentDay}</span>
                      <span className="text-sm text-muted-foreground">
                        {Math.round(progressPercentage)}%
                      </span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-2xl mb-1">🔥</div>
                    <p className="text-xs font-medium">Thermogenèse</p>
                    <p className="text-xs text-muted-foreground">Active</p>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl mb-1">⚡</div>
                    <p className="text-xs font-medium">Métabolisme</p>
                    <p className="text-xs text-muted-foreground">Boosté</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Section Protocole Educatif */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="bg-gradient-to-r from-primary to-secondary text-primary-foreground border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">📚</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-2">
                      Découvrez le Protocole du Gingembre Asiatique
                    </h3>
                    <p className="text-sm opacity-90 mb-4">
                      Apprenez comment la synergie du gingembre, du café et du thé vert peut transformer votre bien-être et votre silhouette.
                    </p>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center gap-1 text-xs">
                        <Leaf className="h-3 w-3" />
                        <span>Gingembre</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        <Coffee className="h-3 w-3" />
                        <span>Café</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        <Zap className="h-3 w-3" />
                        <span>Thé Vert</span>
                      </div>
                    </div>
                    <Link href="/protocole">
                      <Button variant="secondary" className="w-full bg-white/20 hover:bg-white/30">
                        <BookOpen className="h-4 w-4 mr-2" />
                        En savoir plus
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Suivi quotidien */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-2 gap-4"
          >
            <WaterCounter 
              count={waterIntake}
              onUpdate={(newCount) => {
                setWaterIntake(newCount)
                localStorage.setItem("water-intake", newCount.toString())
              }}
            />
            <FastingTimer />
          </motion.div>

          {/* Actions rapides */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Actions Rapides
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <Link href="/recettes">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex flex-col items-center p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg border border-orange-200"
                    >
                      <ChefHat className="h-6 w-6 text-orange-600 mb-2" />
                      <span className="text-sm font-medium text-orange-800">Recettes</span>
                    </motion.div>
                  </Link>
                  <Link href="/defis">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex flex-col items-center p-4 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg border border-purple-200"
                    >
                      <Trophy className="h-6 w-6 text-purple-600 mb-2" />
                      <span className="text-sm font-medium text-purple-800">Défis</span>
                    </motion.div>
                  </Link>
                  <Link href="/liste">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex flex-col items-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200"
                    >
                      <ShoppingCart className="h-6 w-6 text-green-600 mb-2" />
                      <span className="text-sm font-medium text-green-800">Liste</span>
                    </motion.div>
                  </Link>
                  <Link href="/protocole">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex flex-col items-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border border-blue-200"
                    >
                      <BookOpen className="h-6 w-6 text-blue-600 mb-2" />
                      <span className="text-sm font-medium text-blue-800">Protocole</span>
                    </motion.div>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Statistiques */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-primary" />
                  Vos Statistiques
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">{currentDay}</div>
                    <div className="text-xs text-muted-foreground">Jours</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">{waterIntake}</div>
                    <div className="text-xs text-muted-foreground">Verres d'eau</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">{fastingHours}</div>
                    <div className="text-xs text-muted-foreground">Heures de jeûne</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <BottomNavigation />
      </div>
    </div>
  )
}
