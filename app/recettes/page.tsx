"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Filter, Clock, Flame, ChefHat, Star } from "lucide-react"
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
                         recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "Toutes" || recipe.category === selectedCategory.toLowerCase().replace("é", "e")
    return matchesSearch && matchesCategory
  })

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "petit-dej": return "bg-orange-100 text-orange-700"
      case "dejeuner": return "bg-green-100 text-green-700"
      case "diner": return "bg-blue-100 text-blue-700"
      case "collation": return "bg-purple-100 text-purple-700"
      default: return "bg-gray-100 text-gray-700"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "petit-dej": return "🌅"
      case "dejeuner": return "☀️"
      case "diner": return "🌙"
      case "collation": return "🍎"
      default: return "🍽️"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5 pb-20">
      <div className="max-w-md mx-auto p-4 space-y-6 sm:max-w-lg lg:max-w-xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center pt-4 sm:pt-6"
        >
          <motion.h1 
            className="text-2xl sm:text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            Recettes
          </motion.h1>
          <motion.p 
            className="text-muted-foreground text-sm sm:text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Découvrez nos recettes santé au gingembre
          </motion.p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher une recette..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category, index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Button
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="whitespace-nowrap"
                >
                  {category}
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recipes Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <AnimatePresence>
            {filteredRecipes.map((recipe, index) => (
              <motion.div
                key={recipe.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="transform transition-all duration-300"
              >
                <Link href={`/recettes/${recipe.id}`}>
                  <Card className="backdrop-blur-sm bg-white/80 shadow-lg border-0 overflow-hidden cursor-pointer">
                    <div className="relative">
                      <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                        <ChefHat className="h-16 w-16 text-primary/50" />
                      </div>
                      
                      {/* Favorite button */}
                      <motion.button
                        onClick={(e) => {
                          e.preventDefault()
                          toggleFavorite(recipe.id)
                        }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg"
                      >
                        <Star 
                          className={`h-5 w-5 ${
                            favorites.includes(recipe.id) 
                              ? "fill-yellow-400 text-yellow-400" 
                              : "text-gray-400"
                          }`} 
                        />
                      </motion.button>

                      {/* Category badge */}
                      <div className="absolute top-3 left-3">
                        <Badge className={`${getCategoryColor(recipe.category)}`}>
                          {getCategoryIcon(recipe.category)} {recipe.category.replace("-", " ")}
                        </Badge>
                      </div>
                    </div>

                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div>
                          <h3 className="font-semibold text-lg mb-1">{recipe.name}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {recipe.description}
                          </p>
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
                          
                          <Badge variant="secondary" className="text-xs">
                            Jour {recipe.day}
                          </Badge>
                        </div>

                        {/* Ingredients preview */}
                        <div className="pt-2 border-t border-border/50">
                          <p className="text-xs text-muted-foreground">
                            <strong>Ingrédients principaux:</strong> {recipe.ingredients.slice(0, 3).join(", ")}
                            {recipe.ingredients.length > 3 && "..."}
                          </p>
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
              <ChefHat className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
              <p className="text-muted-foreground">Aucune recette trouvée</p>
              <p className="text-sm text-muted-foreground mt-1">
                Essayez de modifier vos critères de recherche
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="backdrop-blur-sm bg-white/80 shadow-lg border-0">
            <CardContent className="p-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-primary">{recipes.length}</p>
                  <p className="text-xs text-muted-foreground">Recettes</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-secondary">{favorites.length}</p>
                  <p className="text-xs text-muted-foreground">Favoris</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-500">{filteredRecipes.length}</p>
                  <p className="text-xs text-muted-foreground">Affichées</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <BottomNavigation />
    </div>
  )
}
