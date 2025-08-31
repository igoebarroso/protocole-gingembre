"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Smartphone, 
  Download, 
  Share2, 
  Plus, 
  ArrowRight,
  X,
  CheckCircle,
  Star,
  Home,
  Settings
} from "lucide-react"

interface InstallAppGuideProps {
  onClose: () => void
  onContinue: () => void
}

export default function InstallAppGuide({ onClose, onContinue }: InstallAppGuideProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<"android" | "iphone" | null>(null)

  const androidSteps = [
    {
      step: 1,
      title: "Ouvrir Chrome",
      description: "Ouvrez votre navigateur Chrome sur votre téléphone",
      icon: <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">C</div>
    },
    {
      step: 2,
      title: "Toucher le menu",
      description: "Touchez les 3 points en haut à droite",
      icon: <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">⋮</div>
    },
    {
      step: 3,
      title: "Ajouter à l'écran d'accueil",
      description: "Sélectionnez 'Ajouter à l'écran d'accueil'",
      icon: <Home className="w-8 h-8 text-primary" />
    },
    {
      step: 4,
      title: "Confirmer l'installation",
      description: "Touchez 'Ajouter' pour confirmer",
      icon: <CheckCircle className="w-8 h-8 text-green-500" />
    }
  ]

  const iphoneSteps = [
    {
      step: 1,
      title: "Ouvrir Safari",
      description: "Ouvrez Safari sur votre iPhone",
      icon: <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">S</div>
    },
    {
      step: 2,
      title: "Toucher le bouton Partager",
      description: "Touchez l'icône de partage en bas",
      icon: <Share2 className="w-8 h-8 text-primary" />
    },
    {
      step: 3,
      title: "Ajouter à l'écran d'accueil",
      description: "Sélectionnez 'Sur l'écran d'accueil'",
      icon: <Plus className="w-8 h-8 text-primary" />
    },
    {
      step: 4,
      title: "Confirmer l'ajout",
      description: "Touchez 'Ajouter' pour confirmer",
      icon: <CheckCircle className="w-8 h-8 text-green-500" />
    }
  ]

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="relative p-6 bg-gradient-to-r from-primary to-secondary text-white rounded-t-2xl">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </Button>
          <div className="text-center">
            <div className="text-4xl mb-3">📱</div>
            <h2 className="text-xl font-bold mb-2">Installer l'App</h2>
            <p className="text-sm opacity-90">
              Ajoutez le protocole gingembre à votre écran d'accueil pour un accès rapide
            </p>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Sélection de plateforme */}
          {!selectedPlatform && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold text-center">Choisissez votre appareil</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Card 
                    className="cursor-pointer border-2 hover:border-primary transition-colors"
                    onClick={() => setSelectedPlatform("android")}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl mb-2">🤖</div>
                      <h4 className="font-semibold mb-1">Android</h4>
                      <p className="text-xs text-muted-foreground">Chrome / Samsung Internet</p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Card 
                    className="cursor-pointer border-2 hover:border-primary transition-colors"
                    onClick={() => setSelectedPlatform("iphone")}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl mb-2">🍎</div>
                      <h4 className="font-semibold mb-1">iPhone</h4>
                      <p className="text-xs text-muted-foreground">Safari</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  L'installation prend moins de 30 secondes et vous donne un accès rapide à l'app
                </p>
                <Button 
                  variant="outline" 
                  onClick={onContinue}
                  className="text-sm"
                >
                  Continuer sans installer
                </Button>
              </div>
            </motion.div>
          )}

          {/* Instructions détaillées */}
          <AnimatePresence mode="wait">
            {selectedPlatform && (
              <motion.div
                key={selectedPlatform}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">
                    Instructions pour {selectedPlatform === "android" ? "Android" : "iPhone"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Suivez ces étapes simples pour installer l'app
                  </p>
                </div>

                <div className="space-y-3">
                  {(selectedPlatform === "android" ? androidSteps : iphoneSteps).map((step, index) => (
                    <motion.div
                      key={step.step}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="bg-gray-50 border-0">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                              {step.step}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-sm">{step.title}</h4>
                              <p className="text-xs text-muted-foreground">{step.description}</p>
                            </div>
                            <div className="flex-shrink-0">
                              {step.icon}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Avantages de l'installation */}
                <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <Star className="h-4 w-4 text-green-600" />
                      Avantages de l'installation
                    </h4>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        <span className="text-xs">Accès rapide depuis l'écran d'accueil</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        <span className="text-xs">Fonctionne hors ligne</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        <span className="text-xs">Expérience comme une vraie app</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Boutons d'action */}
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedPlatform(null)}
                    className="flex-1"
                  >
                    Retour
                  </Button>
                  <Button 
                    onClick={onContinue}
                    className="flex-1 bg-gradient-to-r from-primary to-secondary"
                  >
                    J'ai installé
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}
