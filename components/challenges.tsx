"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Trophy, 
  Star, 
  Zap, 
  Target, 
  Calendar, 
  TrendingUp,
  Gift,
  Plane,
  Car,
  Tv,
  Smartphone,
  Watch,
  Headphones,
  Camera,
  Gamepad2,
  ShoppingBag,
  CreditCard,
  Coins,
  Diamond,
  Crown
} from 'lucide-react'
import { toast } from 'sonner'

interface Challenge {
  id: string
  title: string
  description: string
  category: 'daily' | 'weekly' | 'milestone' | 'premium' | 'lottery'
  difficulty: 'easy' | 'medium' | 'hard' | 'epic'
  points: number
  daysRequired: number
  isCompleted: boolean
  isLocked: boolean
  progress: number
  maxProgress: number
  iconName: string
  color: string
  gradient: string
  reward?: {
    type: 'points' | 'lottery' | 'special'
    value: number | string
    description: string
    iconName: string
  }
}

export default function Challenges() {
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [currentDay, setCurrentDay] = useState(1)
  const [totalPoints, setTotalPoints] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [lotteryTickets, setLotteryTickets] = useState(0)
  const [showLotteryModal, setShowLotteryModal] = useState(false)
  const [lotteryPrize, setLotteryPrize] = useState<any>(null)

  // Mapeamento de ícones
  const iconMap: { [key: string]: React.ComponentType<any> } = {
    Trophy,
    Star,
    Zap,
    Target,
    Calendar,
    TrendingUp,
    Gift,
    Plane,
    Car,
    Tv,
    Smartphone,
    Watch,
    Headphones,
    Camera,
    Gamepad2,
    ShoppingBag,
    CreditCard,
    Coins,
    Diamond,
    Crown
  }

  const renderIcon = (iconName: string, className: string) => {
    const IconComponent = iconMap[iconName]
    if (!IconComponent) {
      return <div className={className}>?</div>
    }
    return <IconComponent className={className} />
  }

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    const storedDay = localStorage.getItem('current-day') || '1'
    const storedPoints = localStorage.getItem('total-points') || '0'
    const storedTickets = localStorage.getItem('lottery-tickets') || '0'
    
    setCurrentDay(parseInt(storedDay))
    setTotalPoints(parseInt(storedPoints))
    setLotteryTickets(parseInt(storedTickets))
    
    const storedChallenges = localStorage.getItem('challenges')
    if (storedChallenges) {
      setChallenges(JSON.parse(storedChallenges))
    } else {
      const newChallenges = generateChallenges(parseInt(storedDay))
      setChallenges(newChallenges)
      localStorage.setItem('challenges', JSON.stringify(newChallenges))
    }
  }

  const generateChallenges = (day: number): Challenge[] => {
    const baseChallenges: Challenge[] = [
      // Défis Quotidiens (Jour 1-7)
      {
        id: 'daily-1',
        title: 'Buvez 2L d\'eau',
        description: 'Restez hydraté pendant la journée',
        category: 'daily',
        difficulty: 'easy',
        points: 10,
        daysRequired: 1,
        isCompleted: false,
        isLocked: false,
        progress: 0,
        maxProgress: 1,
        iconName: 'Target',
        color: 'text-blue-500',
        gradient: 'from-blue-500 to-cyan-500',
        reward: {
          type: 'points',
          value: 10,
          description: '+10 points',
          iconName: 'Coins'
        }
      },
      {
        id: 'daily-2',
        title: 'Faites 30 min d\'exercice',
        description: 'Activité physique modérée',
        category: 'daily',
        difficulty: 'medium',
        points: 20,
        daysRequired: 1,
        isCompleted: false,
        isLocked: false,
        progress: 0,
        maxProgress: 1,
        iconName: 'Zap',
        color: 'text-green-500',
        gradient: 'from-green-500 to-emerald-500',
        reward: {
          type: 'points',
          value: 20,
          description: '+20 points',
          iconName: 'Coins'
        }
      },
      {
        id: 'daily-3',
        title: 'Méditez pendant 10 minutes',
        description: 'Pratiquez la pleine conscience',
        category: 'daily',
        difficulty: 'easy',
        points: 15,
        daysRequired: 1,
        isCompleted: false,
        isLocked: false,
        progress: 0,
        maxProgress: 1,
        iconName: 'Star',
        color: 'text-purple-500',
        gradient: 'from-purple-500 to-pink-500',
        reward: {
          type: 'points',
          value: 15,
          description: '+15 points',
          iconName: 'Coins'
        }
      },

      // Défis Hebdomadaires (Jour 7+)
      {
        id: 'weekly-1',
        title: 'Complétez 5 jours consécutifs',
        description: 'Maintenez la cohérence pendant une semaine',
        category: 'weekly',
        difficulty: 'medium',
        points: 100,
        daysRequired: 7,
        isCompleted: false,
        isLocked: day < 7,
        progress: 0,
        maxProgress: 5,
        iconName: 'Calendar',
        color: 'text-orange-500',
        gradient: 'from-orange-500 to-red-500',
        reward: {
          type: 'lottery',
          value: 1,
          description: '1 Billet de Tirage',
          iconName: 'Gift'
        }
      },
      {
        id: 'weekly-2',
        title: 'Perte de 2kg',
        description: 'Atteignez votre objectif de poids',
        category: 'weekly',
        difficulty: 'hard',
        points: 200,
        daysRequired: 7,
        isCompleted: false,
        isLocked: day < 7,
        progress: 0,
        maxProgress: 2,
        iconName: 'TrendingUp',
        color: 'text-emerald-500',
        gradient: 'from-emerald-500 to-teal-500',
        reward: {
          type: 'lottery',
          value: 2,
          description: '2 Billets de Tirage',
          iconName: 'Gift'
        }
      },

      // Défis d'Étape (Jour 15+)
      {
        id: 'milestone-1',
        title: '15 jours de cohérence',
        description: 'Maintenez la concentration pendant 15 jours',
        category: 'milestone',
        difficulty: 'hard',
        points: 500,
        daysRequired: 15,
        isCompleted: false,
        isLocked: day < 15,
        progress: 0,
        maxProgress: 15,
        iconName: 'Crown',
        color: 'text-yellow-500',
        gradient: 'from-yellow-500 to-amber-500',
        reward: {
          type: 'lottery',
          value: 5,
          description: '5 Billets de Tirage',
          iconName: 'Diamond'
        }
      },
      {
        id: 'milestone-2',
        title: 'Perte de 5kg',
        description: 'Objectif de poids significatif',
        category: 'milestone',
        difficulty: 'epic',
        points: 1000,
        daysRequired: 15,
        isCompleted: false,
        isLocked: day < 15,
        progress: 0,
        maxProgress: 5,
        iconName: 'Target',
        color: 'text-red-500',
        gradient: 'from-red-500 to-pink-500',
        reward: {
          type: 'lottery',
          value: 10,
          description: '10 Billets de Tirage',
          iconName: 'Diamond'
        }
      },

      // Défis Premium (Jour 30+)
      {
        id: 'premium-1',
        title: '30 jours de transformation',
        description: 'Un mois complet de dévouement',
        category: 'premium',
        difficulty: 'epic',
        points: 2000,
        daysRequired: 30,
        isCompleted: false,
        isLocked: day < 30,
        progress: 0,
        maxProgress: 30,
        iconName: 'Diamond',
        color: 'text-purple-500',
        gradient: 'from-purple-500 to-indigo-500',
        reward: {
          type: 'lottery',
          value: 20,
          description: '20 Billets de Tirage',
          iconName: 'Crown'
        }
      },
      {
        id: 'premium-2',
        title: 'Perte de 10kg',
        description: 'Transformation complète',
        category: 'premium',
        difficulty: 'epic',
        points: 5000,
        daysRequired: 30,
        isCompleted: false,
        isLocked: day < 30,
        progress: 0,
        maxProgress: 10,
        iconName: 'Crown',
        color: 'text-amber-500',
        gradient: 'from-amber-500 to-orange-500',
        reward: {
          type: 'lottery',
          value: 50,
          description: '50 Billets de Tirage',
          iconName: 'Crown'
        }
      }
    ]

    // Ajouter des défis spéciaux basés sur le jour actuel
    if (day >= 16) {
      baseChallenges.push(
        {
          id: 'lottery-special-1',
          title: 'Tirage Spécial - Voyage',
          description: 'Chance de gagner un voyage incroyable !',
          category: 'lottery',
          difficulty: 'epic',
          points: 1000,
          daysRequired: 16,
          isCompleted: false,
          isLocked: false,
          progress: 0,
          maxProgress: 1,
          iconName: 'Plane',
          color: 'text-sky-500',
          gradient: 'from-sky-500 to-blue-500',
          reward: {
            type: 'lottery',
            value: 'voyage',
            description: 'Tirage: Voyage',
            iconName: 'Plane'
          }
        },
        {
          id: 'lottery-special-2',
          title: 'Tirage Spécial - Voiture',
          description: 'Chance de gagner une voiture neuve !',
          category: 'lottery',
          difficulty: 'epic',
          points: 2000,
          daysRequired: 16,
          isCompleted: false,
          isLocked: false,
          progress: 0,
          maxProgress: 1,
          iconName: 'Car',
          color: 'text-red-500',
          gradient: 'from-red-500 to-pink-500',
          reward: {
            type: 'lottery',
            value: 'voiture',
            description: 'Tirage: Voiture',
            iconName: 'Car'
          }
        },
        {
          id: 'lottery-special-3',
          title: 'Tirage Spécial - TV 4K',
          description: 'Chance de gagner une TV 4K 65" !',
          category: 'lottery',
          difficulty: 'epic',
          points: 1500,
          daysRequired: 16,
          isCompleted: false,
          isLocked: false,
          progress: 0,
          maxProgress: 1,
          iconName: 'Tv',
          color: 'text-green-500',
          gradient: 'from-green-500 to-emerald-500',
          reward: {
            type: 'lottery',
            value: 'tv',
            description: 'Tirage: TV 4K',
            iconName: 'Tv'
          }
        }
      )
    }

    if (day >= 25) {
      baseChallenges.push(
        {
          id: 'lottery-special-4',
          title: 'Tirage Mega - iPhone 15 Pro',
          description: 'Chance de gagner un iPhone 15 Pro !',
          category: 'lottery',
          difficulty: 'epic',
          points: 3000,
          daysRequired: 25,
          isCompleted: false,
          isLocked: false,
          progress: 0,
          maxProgress: 1,
          iconName: 'Smartphone',
          color: 'text-gray-500',
          gradient: 'from-gray-500 to-slate-500',
          reward: {
            type: 'lottery',
            value: 'iphone',
            description: 'Tirage: iPhone 15 Pro',
            iconName: 'Smartphone'
          }
        },
        {
          id: 'lottery-special-5',
          title: 'Tirage Mega - Apple Watch',
          description: 'Chance de gagner une Apple Watch Series 9 !',
          category: 'lottery',
          difficulty: 'epic',
          points: 2500,
          daysRequired: 25,
          isCompleted: false,
          isLocked: false,
          progress: 0,
          maxProgress: 1,
          iconName: 'Watch',
          color: 'text-blue-500',
          gradient: 'from-blue-500 to-cyan-500',
          reward: {
            type: 'lottery',
            value: 'apple-watch',
            description: 'Tirage: Apple Watch',
            iconName: 'Watch'
          }
        }
      )
    }

    if (day >= 50) {
      baseChallenges.push(
        {
          id: 'lottery-ultimate',
          title: 'Tirage Ultimate - Maison',
          description: 'Chance de gagner une maison !',
          category: 'lottery',
          difficulty: 'epic',
          points: 10000,
          daysRequired: 50,
          isCompleted: false,
          isLocked: false,
          progress: 0,
          maxProgress: 1,
          iconName: 'Crown',
          color: 'text-amber-500',
          gradient: 'from-amber-500 to-orange-500',
          reward: {
            type: 'lottery',
            value: 'maison',
            description: 'Tirage: Maison',
            iconName: 'Crown'
          }
        }
      )
    }

    return baseChallenges
  }

  const handleCompleteChallenge = (challengeId: string) => {
    const updatedChallenges = challenges.map(challenge => {
      if (challenge.id === challengeId && !challenge.isCompleted && !challenge.isLocked) {
        const newPoints = totalPoints + challenge.points
        let newTickets = lotteryTickets

        // Ajouter des billets de tirage si c'est une récompense de lottery
        if (challenge.reward?.type === 'lottery') {
          if (typeof challenge.reward.value === 'number') {
            newTickets += challenge.reward.value
          }
        }

        setTotalPoints(newPoints)
        setLotteryTickets(newTickets)

        localStorage.setItem('total-points', newPoints.toString())
        localStorage.setItem('lottery-tickets', newTickets.toString())

        toast.success(`Défi complété ! +${challenge.points} points${challenge.reward?.type === 'lottery' ? ` et ${challenge.reward.value} billets !` : ''}`)

        return {
          ...challenge,
          isCompleted: true,
          progress: challenge.maxProgress
        }
      }
      return challenge
    })

    setChallenges(updatedChallenges)
    localStorage.setItem('challenges', JSON.stringify(updatedChallenges))
  }

  const handleLotteryDraw = () => {
    if (lotteryTickets <= 0) {
      toast.error('Vous n\'avez pas assez de billets !')
      return
    }

    const prizes = [
      { name: 'Voyage à Paris', iconName: 'Plane', color: 'text-sky-500', probability: 0.01 },
      { name: 'Voiture 0km', iconName: 'Car', color: 'text-red-500', probability: 0.005 },
      { name: 'TV 4K 65"', iconName: 'Tv', color: 'text-green-500', probability: 0.02 },
      { name: 'iPhone 15 Pro', iconName: 'Smartphone', color: 'text-gray-500', probability: 0.03 },
      { name: 'Apple Watch Series 9', iconName: 'Watch', color: 'text-blue-500', probability: 0.05 },
      { name: 'Maison', iconName: 'Crown', color: 'text-amber-500', probability: 0.001 },
      { name: 'Casque Premium', iconName: 'Headphones', color: 'text-purple-500', probability: 0.1 },
      { name: 'Appareil Photo DSLR', iconName: 'Camera', color: 'text-indigo-500', probability: 0.08 },
      { name: 'Console de Jeu', iconName: 'Gamepad2', color: 'text-pink-500', probability: 0.12 },
      { name: 'Carte Cadeau 500€', iconName: 'ShoppingBag', color: 'text-emerald-500', probability: 0.15 },
      { name: 'Carte Cadeau 200€', iconName: 'CreditCard', color: 'text-teal-500', probability: 0.2 },
      { name: '100 Points Supplémentaires', iconName: 'Coins', color: 'text-yellow-500', probability: 0.3 }
    ]

    const random = Math.random()
    let cumulativeProbability = 0
    let selectedPrize = prizes[prizes.length - 1] // Par défaut: dernier prix

    for (const prize of prizes) {
      cumulativeProbability += prize.probability
      if (random <= cumulativeProbability) {
        selectedPrize = prize
        break
      }
    }

    setLotteryPrize(selectedPrize)
    setShowLotteryModal(true)
    setLotteryTickets(lotteryTickets - 1)
    localStorage.setItem('lottery-tickets', (lotteryTickets - 1).toString())

    toast.success(`Tirage effectué ! Vous avez gagné : ${selectedPrize.name}`)
  }

  const filteredChallenges = challenges.filter(challenge => 
    selectedCategory === 'all' || challenge.category === selectedCategory
  )

  const completedChallenges = challenges.filter(c => c.isCompleted).length
  const totalChallenges = challenges.length

  const categories = [
    { id: 'all', name: 'Tous', icon: Trophy },
    { id: 'daily', name: 'Quotidien', icon: Calendar },
    { id: 'weekly', name: 'Hebdomadaire', icon: TrendingUp },
    { id: 'milestone', name: 'Étape', icon: Target },
    { id: 'premium', name: 'Premium', icon: Diamond },
    { id: 'lottery', name: 'Tirages', icon: Gift }
  ]

  return (
    <div className="space-y-6">
      {/* Header avec statistiques */}
      <div className="text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent mb-2">
          Défis & Récompenses
        </h1>
        <p className="text-gray-600 mb-4">Débloquez des défis et gagnez des points !</p>
        
        <div className="flex justify-center space-x-6 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">{totalPoints}</div>
            <div className="text-sm text-gray-600">Points Totaux</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">{completedChallenges}/{totalChallenges}</div>
            <div className="text-sm text-gray-600">Défis Complétés</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">Jour {currentDay}</div>
            <div className="text-sm text-gray-600">Progression</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">{lotteryTickets}</div>
            <div className="text-sm text-gray-600">Billets</div>
          </div>
        </div>

        {/* Bouton de Tirage */}
        {lotteryTickets > 0 && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mb-6"
          >
            <Button
              onClick={handleLotteryDraw}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl"
            >
              <Gift className="w-5 h-5 mr-2" />
              Faire un Tirage ({lotteryTickets} billets)
            </Button>
          </motion.div>
        )}

        {/* Filtres de catégorie */}
        <div className="flex justify-center space-x-2 mb-6">
          {categories.map((category) => (
            <Button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <category.icon className="w-4 h-4 mr-1" />
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Grille de défis */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredChallenges.map((challenge, index) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`backdrop-blur-xl bg-white/90 shadow-2xl border-0 transition-all duration-300 hover:shadow-3xl hover:scale-105 ${
                challenge.isLocked ? 'opacity-50' : ''
              }`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${challenge.gradient} flex items-center justify-center`}>
                        {renderIcon(challenge.iconName, "w-6 h-6 text-white")}
                      </div>
                      <div>
                        <CardTitle className="text-lg font-bold text-gray-800">
                          {challenge.title}
                        </CardTitle>
                        <p className="text-sm text-gray-600">{challenge.description}</p>
                      </div>
                    </div>
                    {challenge.isLocked && (
                      <div className="text-gray-400">
                        <Calendar className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Progression */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progression</span>
                      <span className="font-semibold">{challenge.progress}/{challenge.maxProgress}</span>
                    </div>
                    <Progress 
                      value={(challenge.progress / challenge.maxProgress) * 100} 
                      className="h-2"
                    />
                  </div>

                  {/* Récompense */}
                  {challenge.reward && (
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200">
                      <div className="flex items-center space-x-2">
                        {renderIcon(challenge.reward.iconName, `w-5 h-5 ${challenge.reward.type === 'lottery' ? 'text-purple-500' : 'text-amber-500'}`)}
                        <span className="text-sm font-medium text-gray-700">
                          {challenge.reward.description}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Points et difficulté */}
                  <div className="flex items-center justify-between">
                    <Badge className={`px-3 py-1 text-xs font-semibold ${
                      challenge.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                      challenge.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      challenge.difficulty === 'hard' ? 'bg-orange-100 text-orange-700' :
                      'bg-purple-100 text-purple-700'
                    }`}>
                      {challenge.difficulty === 'easy' ? 'Facile' :
                       challenge.difficulty === 'medium' ? 'Moyen' :
                       challenge.difficulty === 'hard' ? 'Difficile' : 'Épique'}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <Coins className="w-4 h-4 text-yellow-500" />
                      <span className="font-bold text-gray-800">{challenge.points}</span>
                    </div>
                  </div>

                  {/* Bouton d'action */}
                  <Button
                    onClick={() => handleCompleteChallenge(challenge.id)}
                    disabled={challenge.isCompleted || challenge.isLocked}
                    className={`w-full transition-all duration-200 ${
                      challenge.isCompleted
                        ? 'bg-green-500 text-white cursor-not-allowed'
                        : challenge.isLocked
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white'
                    }`}
                  >
                    {challenge.isCompleted ? (
                      <>
                        <Trophy className="w-4 h-4 mr-2" />
                        Complété
                      </>
                    ) : challenge.isLocked ? (
                      <>
                        <Calendar className="w-4 h-4 mr-2" />
                        Débloqué Jour {challenge.daysRequired}
                      </>
                    ) : (
                      <>
                        <Target className="w-4 h-4 mr-2" />
                        Compléter
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Modal de Tirage */}
      {showLotteryModal && lotteryPrize && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowLotteryModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center`}>
              {renderIcon(lotteryPrize.iconName, "w-10 h-10 text-white")}
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              🎉 Félicitations ! 🎉
            </h3>
            <p className="text-lg text-gray-600 mb-4">
              Vous avez gagné :
            </p>
            <div className={`text-xl font-bold ${lotteryPrize.color} mb-6`}>
              {lotteryPrize.name}
            </div>
            <Button
              onClick={() => setShowLotteryModal(false)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              Incroyable !
            </Button>
          </motion.div>
        </motion.div>
      )}

      {/* Carte de Progression Générale */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="backdrop-blur-xl bg-white/90 shadow-2xl border-0">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800">
              Progression Générale
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['daily', 'weekly', 'milestone', 'premium'].map((category) => {
                const categoryChallenges = challenges.filter(c => c.category === category)
                const completed = categoryChallenges.filter(c => c.isCompleted).length
                const total = categoryChallenges.length
                const percentage = total > 0 ? (completed / total) * 100 : 0
                
                const colors = {
                  daily: 'from-blue-500 to-cyan-500',
                  weekly: 'from-green-500 to-emerald-500',
                  milestone: 'from-purple-500 to-pink-500',
                  premium: 'from-amber-500 to-orange-500'
                }

                const categoryNames = {
                  daily: 'Quotidien',
                  weekly: 'Hebdomadaire',
                  milestone: 'Étape',
                  premium: 'Premium'
                }

                return (
                  <div key={category} className="text-center">
                    <div className="text-2xl font-bold text-gray-800">
                      {completed}/{total}
                    </div>
                    <div className="text-sm text-gray-600">
                      {categoryNames[category as keyof typeof categoryNames]}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div 
                        className={`h-2 rounded-full bg-gradient-to-r ${colors[category as keyof typeof colors]}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
