"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Filter, Clock, Flame, ChefHat, Star, Crown, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { recipes } from "@/lib/data"
import Link from "next/link"
import BottomNavigation from "@/components/bottom-navigation"

const categories = ["Toutes", "Petit-déjeuner", "Déjeuner", "Dîner", "Collation"]

export default function RecettesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Toutes")
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorite-recipes")
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  const toggleFavorite = (recipeId: string) => {
    const newFavorites = favorites.includes(recipeId)
      ? favorites.filter(id => id !== recipeId)
      : [...favorites, recipeId]
    
    setFavorites(newFavorites)
    localStorage.setItem("favorite-recipes", JSON.stringify(newFavorites))
  }

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (recipe.description && recipe.description.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "Toutes" || recipe.category === selectedCategory.toLowerCase().replace("é", "e")
    return matchesSearch && matchesCategory
  })

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "petit-dej": return "bg-orange-100 text-orange-800"
      case "dejeuner": return "bg-green-100 text-green-800"
      case "diner": return "bg-purple-100 text-purple-800"
      case "snack": return "bg-blue-100 text-blue-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "facile": return "bg-green-100 text-green-800"
      case "moyen": return "bg-yellow-100 text-yellow-800"
      case "difficile": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/10">
      <div className="max-w-md mx-auto">
        {/* Header avec recherche et filtres */}
        <div className="p-4 space-y-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Recettes Premium
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Découvrez nos recettes exclusives au gingembre
            </p>
          </div>

          {/* Barre de recherche */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Rechercher une recette..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/80 backdrop-blur-sm border-0 shadow-lg"
            />
          </div>

          {/* Filtres par catégorie */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="whitespace-nowrap bg-white/80 backdrop-blur-sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Liste des recettes */}
        <div className="px-4 pb-20 space-y-4">
          <AnimatePresence>
            {filteredRecipes.map((recipe, index) => (
              <motion.div
                key={recipe.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/recettes/${recipe.id}`}>
                  <Card className="overflow-hidden bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                    <div className="relative">
                      <img
                        src={recipe.image || "/placeholder.svg"}
                        alt={recipe.name}
                        className="w-full h-48 object-cover"
                      />
                      
                      {/* Badge Premium */}
                      {recipe.premium && (
                        <div className="absolute top-3 right-3">
                          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
                            <Crown className="h-3 w-3 mr-1" />
                            Premium
                          </Badge>
                        </div>
                      )}

                      {/* Badge Jour */}
                      <div className="absolute top-3 left-3">
                        <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
                          Jour {recipe.day}
                        </Badge>
                      </div>

                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </div>

                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div>
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold text-lg mb-1 line-clamp-2">{recipe.name}</h3>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-primary"
                              onClick={(e) => {
                                e.preventDefault()
                                toggleFavorite(recipe.id)
                              }}
                            >
                              <Star className={`h-4 w-4 ${favorites.includes(recipe.id) ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                            </Button>
                          </div>
                          
                          {recipe.description && (
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                              {recipe.description}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{recipe.prepTime} min</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Flame className="h-4 w-4" />
                              <span>{recipe.calories} cal</span>
                            </div>
                          </div>
                          
                          {recipe.difficulty && (
                            <Badge variant="outline" className={`text-xs ${getDifficultyColor(recipe.difficulty)}`}>
                              {recipe.difficulty}
                            </Badge>
                          )}
                        </div>

                        {/* Ingrédients principaux */}
                        <div className="pt-2 border-t border-border/50">
                          <p className="text-xs text-muted-foreground">
                            <strong>Ingrédients principaux:</strong> {recipe.ingredients.slice(0, 3).join(", ")}
                            {recipe.ingredients.length > 3 && "..."}
                          </p>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1">
                          {recipe.tags.slice(0, 3).map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="secondary" className="text-xs bg-primary/10 text-primary">
                              #{tag}
                            </Badge>
                          ))}
                          {recipe.tags.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{recipe.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredRecipes.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-6xl mb-4">🍽️</div>
              <h3 className="text-lg font-semibold mb-2">Aucune recette trouvée</h3>
              <p className="text-muted-foreground">
                Essayez de modifier vos critères de recherche
              </p>
            </motion.div>
          )}
        </div>

        <BottomNavigation />
      </div>
    </div>
  )
}
