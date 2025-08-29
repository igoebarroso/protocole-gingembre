"use client"

import { motion } from "framer-motion"
import { Sparkles, Trophy, Star } from "lucide-react"
import Challenges from "@/components/challenges"
import BottomNavigation from "@/components/bottom-navigation"

export default function DefisPage() {
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

      {/* Floating Sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-amber-400/60"
            style={{
              left: `${10 + i * 12}%`,
              top: `${5 + i * 15}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          >
            <Sparkles size={20 + i * 2} />
          </motion.div>
        ))}
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
                <h1 className="text-2xl font-bold">Défis & Récompenses</h1>
                <p className="text-white/90 text-sm">Débloquez votre potentiel !</p>
              </div>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center"
              >
                <Trophy className="w-6 h-6 text-white" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <div className="p-4">
          <Challenges />
        </div>
      </div>

      <BottomNavigation />
    </div>
  )
}
