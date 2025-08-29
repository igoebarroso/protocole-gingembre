"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Calendar, Target, Trophy, TrendingUp, Sparkles, Heart, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import BottomNavigation from "@/components/bottom-navigation"
import WaterCounter from "@/components/water-counter"
import FastingTimer from "@/components/fasting-timer"
import ProgressRing from "@/components/progress-ring"
import Link from "next/link"

export default function AccueilPage() {
  const [currentDay, setCurrentDay] = useState(1)
  const [totalDays, setTotalDays] = useState(30)
  const [waterIntake, setWaterIntake] = useState(0)
  const [fastingHours, setFastingHours] = useState(0)
  const [userName, setUserName] = useState("")

  useEffect(() => {
    // Carregar dados do localStorage
    const savedDay = localStorage.getItem("current-day")
    const savedWater = localStorage.getItem("water-intake")
    const savedFasting = localStorage.getItem("fasting-hours")
    const savedName = localStorage.getItem("user-name")

    if (savedDay) setCurrentDay(parseInt(savedDay))
    if (savedWater) setWaterIntake(parseInt(savedWater))
    if (savedFasting) setFastingHours(parseInt(savedFasting))
    if (savedName) setUserName(savedName)
  }, [])

  const progress = (currentDay / totalDays) * 100

  const stats = [
    {
      title: "Jours complétés",
      value: currentDay,
      icon: Calendar,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600"
    },
    {
      title: "Défis réussis",
      value: Math.floor(currentDay * 0.8),
      icon: Trophy,
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-50",
      textColor: "text-amber-600"
    },
    {
      title: "Série actuelle",
      value: Math.min(currentDay, 7),
      icon: TrendingUp,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      textColor: "text-green-600"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br from-orange-200/20 to-amber-300/20 rounded-full blur-3xl"
          animate={{
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-60 h-60 bg-gradient-to-tr from-yellow-200/20 to-orange-300/20 rounded-full blur-3xl"
          animate={{
            x: [0, -20, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative z-10 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 p-6 text-white relative overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold">Bonjour, {userName || "Utilisateur"}! 👋</h1>
                <p className="text-white/90 text-sm">Prêt pour votre protocole gingembre ?</p>
              </div>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center"
              >
                <Sparkles className="w-6 h-6 text-white" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        <div className="p-4 space-y-6">
          {/* Progress Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="backdrop-blur-xl bg-white/90 shadow-2xl border-0 overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold text-gray-800">Votre Progression</CardTitle>
                  <Badge className="bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0">
                    Jour {currentDay}/{totalDays}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex-shrink-0"
                  >
                    <ProgressRing progress={progress} size={80} />
                  </motion.div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Progression globale</span>
                      <span className="text-sm font-bold text-gray-800">{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-orange-500 to-amber-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 1, delay: 0.3 }}
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-100"
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                        <Heart className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">Santé</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-800">{Math.round(progress * 0.8)}%</div>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100"
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                        <Zap className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">Énergie</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-800">{Math.round(progress * 0.9)}%</div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group"
              >
                <Card className={`backdrop-blur-xl bg-white/90 shadow-xl border-0 overflow-hidden group-hover:shadow-2xl transition-all duration-300`}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                        <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                      </div>
                      <motion.div
                        className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <stat.icon className="w-6 h-6 text-white" />
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Water Counter and Fasting Timer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
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

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card className="backdrop-blur-xl bg-white/90 shadow-2xl border-0 overflow-hidden">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-800">Actions Rapides</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Link href="/recettes">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
                        <Target className="w-5 h-5 mr-2" />
                        Voir les recettes
                      </Button>
                    </motion.div>
                  </Link>
                  <Link href="/defis">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button variant="outline" className="w-full border-2 border-orange-200 text-orange-600 hover:bg-orange-50 font-semibold py-4 rounded-xl transition-all duration-200">
                        <Trophy className="w-5 h-5 mr-2" />
                        Mes défis
                      </Button>
                    </motion.div>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  )
}
