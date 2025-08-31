"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Star, Zap, Leaf, Coffee, Target, Users, Award, Clock, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"
import { protocolInfo, testimonials } from "@/lib/data"
import BottomNavigation from "@/components/bottom-navigation"

export default function ProtocolePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("ingredients")

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/10">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="relative h-64 bg-gradient-to-b from-primary/20 to-secondary/20">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Navigation */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
            <Button
              variant="secondary"
              size="icon"
              className="bg-white/20 backdrop-blur-sm border-white/20"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Badge variant="secondary" className="bg-white/20 backdrop-blur-sm border-white/20">
              Protocole
            </Badge>
          </div>

          {/* Titre et description */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h1 className="text-2xl font-bold mb-2">
              Protocole du Gingembre Asiatique
            </h1>
            <p className="text-sm opacity-90">
              Maîtrisez la perte de poids par infusion quotidienne
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="p-4">
          <div className="flex gap-2 mb-6">
            <Button
              variant={activeTab === "ingredients" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab("ingredients")}
              className="flex-1"
            >
              <Leaf className="h-4 w-4 mr-2" />
              Ingrédients
            </Button>
            <Button
              variant={activeTab === "testimonials" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab("testimonials")}
              className="flex-1"
            >
              <Users className="h-4 w-4 mr-2" />
              Témoignages
            </Button>
            <Button
              variant={activeTab === "benefits" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab("benefits")}
              className="flex-1"
            >
              <Target className="h-4 w-4 mr-2" />
              Bénéfices
            </Button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "ingredients" && (
              <motion.div
                key="ingredients"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <div className="text-center mb-6">
                  <h2 className="text-xl font-bold mb-2">Les Trois Alliés Naturels</h2>
                  <p className="text-sm text-muted-foreground">
                    Découvrez les propriétés uniques de chaque ingrédient et leur synergie
                  </p>
                </div>

                {protocolInfo.map((info, index) => (
                  <motion.div
                    key={info.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg overflow-hidden">
                      <div className={`h-2 bg-gradient-to-r ${info.color}`} />
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="text-3xl">{info.icon}</div>
                          <div>
                            <CardTitle className="text-lg">{info.title}</CardTitle>
                            <p className="text-sm text-muted-foreground mt-1">
                              {info.description}
                            </p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {info.benefits.map((benefit, benefitIndex) => (
                            <div key={benefitIndex} className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                              <span className="text-sm">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === "testimonials" && (
              <motion.div
                key="testimonials"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <div className="text-center mb-6">
                  <h2 className="text-xl font-bold mb-2">Témoignages et Études de Cas</h2>
                  <p className="text-sm text-muted-foreground">
                    Découvrez les expériences concrètes de ceux qui ont adopté le protocole
                  </p>
                </div>

                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold">
                            {testimonial.name.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold">{testimonial.name}</h3>
                              <span className="text-sm text-muted-foreground">
                                {testimonial.age} ans
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="bg-green-100 text-green-800">
                                {testimonial.result}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                en {testimonial.duration}
                              </span>
                            </div>
                          </div>
                        </div>
                        <blockquote className="text-sm italic text-muted-foreground border-l-2 border-primary/20 pl-3">
                          "{testimonial.quote}"
                        </blockquote>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}

                {/* Étude Clinique */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-blue-800">
                        <Award className="h-5 w-5" />
                        Étude Clinique Révélatrice
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-blue-700">
                        Une étude récente a démontré qu'une consommation quotidienne de{" "}
                        <strong>2 grammes de gingembre en poudre</strong> par des participants a entraîné une{" "}
                        <strong>baisse significative du poids corporel et du tour de taille en seulement 12 semaines</strong>. 
                        Ces résultats soulignent le potentiel du gingembre en tant qu'agent anti-obésité.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            )}

            {activeTab === "benefits" && (
              <motion.div
                key="benefits"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <div className="text-center mb-6">
                  <h2 className="text-xl font-bold mb-2">Les Bienfaits Conjoints</h2>
                  <p className="text-sm text-muted-foreground">
                    Synergie et impact sur la perte de poids
                  </p>
                </div>

                {/* Synergie Diagram */}
                <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mb-4">
                        <Zap className="h-12 w-12 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">Synergie des Trois Ingrédients</h3>
                      <p className="text-sm text-muted-foreground">
                        L'efficacité du protocole réside dans la synergie de ses ingrédients
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-orange-50 rounded-lg">
                        <div className="text-2xl mb-2">🔥</div>
                        <h4 className="font-medium text-sm mb-1">Thermogenèse</h4>
                        <p className="text-xs text-muted-foreground">
                          Augmentation de la chaleur corporelle
                        </p>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-2xl mb-2">⚡</div>
                        <h4 className="font-medium text-sm mb-1">Énergie</h4>
                        <p className="text-xs text-muted-foreground">
                          Stimulation de la vigilance
                        </p>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-2xl mb-2">🍽️</div>
                        <h4 className="font-medium text-sm mb-1">Appétit</h4>
                        <p className="text-xs text-muted-foreground">
                          Contrôle naturel de l'appétit
                        </p>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <div className="text-2xl mb-2">🧘</div>
                        <h4 className="font-medium text-sm mb-1">Détox</h4>
                        <p className="text-xs text-muted-foreground">
                          Élimination des toxines
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Conseils Complémentaires */}
                <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Conseils pour Optimiser les Résultats
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">Alimentation Équilibrée</span>
                        <span className="text-sm text-green-600">100%</span>
                      </div>
                      <Progress value={100} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">
                        Priorisez les aliments complets et non transformés
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">Activité Physique</span>
                        <span className="text-sm text-yellow-600">80%</span>
                      </div>
                      <Progress value={80} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">
                        Marche rapide, vélo ou natation
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">Hydratation</span>
                        <span className="text-sm text-blue-600">75%</span>
                      </div>
                      <Progress value={75} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">
                        2L d'eau pure par jour minimum
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">Éviter les Sucres</span>
                        <span className="text-sm text-red-600">90%</span>
                      </div>
                      <Progress value={90} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">
                        Réduire les aliments ultra-transformés
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Conclusion */}
                <Card className="bg-gradient-to-r from-primary to-secondary text-primary-foreground">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">🎯</div>
                    <h3 className="text-lg font-bold mb-2">
                      Adoptez le Protocole du Gingembre Asiatique
                    </h3>
                    <p className="opacity-90 mb-4">
                      Une méthode simple, naturelle et puissante qui s'intègre harmonieusement dans votre vie quotidienne.
                    </p>
                    <Button 
                      variant="secondary" 
                      onClick={() => router.push("/recettes")}
                      className="bg-white/20 hover:bg-white/30"
                    >
                      Commencer les Recettes
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <BottomNavigation />
      </div>
    </div>
  )
}
