"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { User, Settings, LogOut, Bell, Shield, HelpCircle, Star, Trophy, Target, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import BottomNavigation from "@/components/bottom-navigation"

interface UserStats {
  totalDays: number
  totalChallenges: number
  totalWater: number
  totalCalories: number
  currentStreak: number
  bestStreak: number
}

export default function ProfilPage() {
  const [userStats, setUserStats] = useState<UserStats>({
    totalDays: 0,
    totalChallenges: 0,
    totalWater: 0,
    totalCalories: 0,
    currentStreak: 0,
    bestStreak: 0
  })
  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  
  const router = useRouter()

  useEffect(() => {
    // Carregar dados do usuário
    const name = localStorage.getItem("user-name") || "Utilisateur"
    const email = localStorage.getItem("user-email") || "user@example.com"
    const currentDay = Number.parseInt(localStorage.getItem("current-day") || "1")
    const completedChallenges = JSON.parse(localStorage.getItem("completed-challenges") || "[]")
    const waterCount = Number.parseInt(localStorage.getItem("water-count") || "0")
    const caloriesBurned = Number.parseInt(localStorage.getItem("calories-burned") || "0")

    setUserName(name)
    setUserEmail(email)
    setUserStats({
      totalDays: currentDay - 1,
      totalChallenges: completedChallenges.length,
      totalWater: waterCount,
      totalCalories: caloriesBurned,
      currentStreak: currentDay - 1,
      bestStreak: Math.max(currentDay - 1, Number.parseInt(localStorage.getItem("best-streak") || "0"))
    })
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user-authenticated")
    localStorage.removeItem("user-email")
    localStorage.removeItem("user-name")
    toast.success("Déconnexion réussie")
    router.push("/login")
  }

  const getAchievementLevel = () => {
    const { totalDays, totalChallenges } = userStats
    if (totalDays >= 7 && totalChallenges >= 20) return { level: "Expert", color: "bg-gradient-to-r from-purple-500 to-pink-500", icon: "👑" }
    if (totalDays >= 5 && totalChallenges >= 15) return { level: "Avancé", color: "bg-gradient-to-r from-blue-500 to-purple-500", icon: "⭐" }
    if (totalDays >= 3 && totalChallenges >= 10) return { level: "Intermédiaire", color: "bg-gradient-to-r from-green-500 to-blue-500", icon: "🌟" }
    return { level: "Débutant", color: "bg-gradient-to-r from-yellow-500 to-green-500", icon: "🌱" }
  }

  const achievement = getAchievementLevel()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5 pb-20">
      <div className="max-w-md mx-auto p-4 space-y-6 sm:max-w-lg lg:max-w-xl">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Header do perfil */}
          <motion.div variants={itemVariants} className="text-center pt-4 sm:pt-6">
            <motion.div
              className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <User className="h-12 w-12 text-white" />
            </motion.div>
            <motion.h1 
              className="text-2xl sm:text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              {userName}
            </motion.h1>
            <motion.p 
              className="text-muted-foreground text-sm sm:text-base"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {userEmail}
            </motion.p>
          </motion.div>

          {/* Nível de conquista */}
          <motion.div variants={itemVariants}>
            <Card className="backdrop-blur-sm bg-white/80 shadow-lg border-0 overflow-hidden">
              <div className={`${achievement.color} p-4 text-white text-center`}>
                <div className="text-4xl mb-2">{achievement.icon}</div>
                <h3 className="text-xl font-bold mb-1">{achievement.level}</h3>
                <p className="text-white/90 text-sm">Niveau de progression</p>
              </div>
            </Card>
          </motion.div>

          {/* Estatísticas */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="backdrop-blur-sm bg-white/80 shadow-lg border-0">
                <CardContent className="p-4 text-center">
                  <Calendar className="h-6 w-6 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold">{userStats.totalDays}</p>
                  <p className="text-xs text-muted-foreground">jours complétés</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="backdrop-blur-sm bg-white/80 shadow-lg border-0">
                <CardContent className="p-4 text-center">
                  <Trophy className="h-6 w-6 text-secondary mx-auto mb-2" />
                  <p className="text-2xl font-bold">{userStats.totalChallenges}</p>
                  <p className="text-xs text-muted-foreground">défis réussis</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="backdrop-blur-sm bg-white/80 shadow-lg border-0">
                <CardContent className="p-4 text-center">
                  <Target className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold">{userStats.currentStreak}</p>
                  <p className="text-xs text-muted-foreground">série actuelle</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="backdrop-blur-sm bg-white/80 shadow-lg border-0">
                <CardContent className="p-4 text-center">
                  <Star className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold">{userStats.bestStreak}</p>
                  <p className="text-xs text-muted-foreground">meilleure série</p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Opções do perfil */}
          <motion.div variants={itemVariants}>
            <Card className="backdrop-blur-sm bg-white/80 shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  Paramètres
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Bell className="h-5 w-5 text-muted-foreground" />
                    <span>Notifications</span>
                  </div>
                  <Badge variant="secondary">Activées</Badge>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-muted-foreground" />
                    <span>Confidentialité</span>
                  </div>
                  <Badge variant="outline">Standard</Badge>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="h-5 w-5 text-muted-foreground" />
                    <span>Aide & Support</span>
                  </div>
                </motion.button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Botão de logout */}
          <motion.div variants={itemVariants}>
            <motion.button
              onClick={handleLogout}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-3 p-4 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors border border-red-200"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Se déconnecter</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      <BottomNavigation />
    </div>
  )
}
