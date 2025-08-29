"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Trash2, CheckCircle, Circle, ShoppingCart, Filter, Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import BottomNavigation from "@/components/bottom-navigation"

interface ShoppingItem {
  id: string
  name: string
  category: string
  completed: boolean
  quantity: string
  priority: "high" | "medium" | "low"
}

const categories = [
  "Fruits & Légumes",
  "Protéines",
  "Céréales",
  "Épices",
  "Boissons",
  "Autres"
]

const defaultItems: ShoppingItem[] = [
  { id: "1", name: "Gingembre frais", category: "Épices", completed: false, quantity: "200g", priority: "high" },
  { id: "2", name: "Citron", category: "Fruits & Légumes", completed: false, quantity: "4 unités", priority: "high" },
  { id: "3", name: "Miel bio", category: "Autres", completed: false, quantity: "500g", priority: "medium" },
  { id: "4", name: "Thé vert", category: "Boissons", completed: false, quantity: "1 boîte", priority: "medium" },
  { id: "5", name: "Saumon", category: "Protéines", completed: false, quantity: "300g", priority: "high" },
  { id: "6", name: "Quinoa", category: "Céréales", completed: false, quantity: "250g", priority: "low" },
]

export default function ListePage() {
  const [items, setItems] = useState<ShoppingItem[]>([])
  const [newItem, setNewItem] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterPriority, setFilterPriority] = useState<string>("all")

  useEffect(() => {
    const savedItems = localStorage.getItem("shopping-list")
    if (savedItems) {
      setItems(JSON.parse(savedItems))
    } else {
      setItems(defaultItems)
      localStorage.setItem("shopping-list", JSON.stringify(defaultItems))
    }
  }, [])

  const saveItems = (newItems: ShoppingItem[]) => {
    setItems(newItems)
    localStorage.setItem("shopping-list", JSON.stringify(newItems))
  }

  const addItem = () => {
    if (newItem.trim()) {
      const item: ShoppingItem = {
        id: Date.now().toString(),
        name: newItem.trim(),
        category: selectedCategory || "Autres",
        completed: false,
        quantity: "1 unité",
        priority: "medium"
      }
      saveItems([...items, item])
      setNewItem("")
      setSelectedCategory("")
    }
  }

  const toggleItem = (id: string) => {
    const updatedItems = items.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    )
    saveItems(updatedItems)
  }

  const deleteItem = (id: string) => {
    const updatedItems = items.filter(item => item.id !== id)
    saveItems(updatedItems)
  }

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPriority = filterPriority === "all" || item.priority === filterPriority
    return matchesSearch && matchesPriority
  })

  const completedCount = items.filter(item => item.completed).length
  const totalCount = items.length

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-red-500"
      case "medium": return "text-yellow-500"
      case "low": return "text-green-500"
      default: return "text-gray-500"
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high": return "🔴"
      case "medium": return "🟡"
      case "low": return "🟢"
      default: return "⚪"
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
            Liste de Courses
          </motion.h1>
          <motion.p 
            className="text-muted-foreground text-sm sm:text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {completedCount}/{totalCount} articles achetés
          </motion.p>
        </motion.div>

        {/* Progress */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="backdrop-blur-sm bg-white/80 shadow-lg border-0">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Progression</span>
                <span className="text-sm text-muted-foreground">{Math.round((completedCount / totalCount) * 100)}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <motion.div
                  className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(completedCount / totalCount) * 100}%` }}
                  transition={{ duration: 0.8, type: "spring" }}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un article..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Button
              variant={filterPriority === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterPriority("all")}
            >
              Tous
            </Button>
            <Button
              variant={filterPriority === "high" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterPriority("high")}
              className="text-red-600"
            >
              🔴 Priorité haute
            </Button>
            <Button
              variant={filterPriority === "medium" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterPriority("medium")}
              className="text-yellow-600"
            >
              🟡 Moyenne
            </Button>
            <Button
              variant={filterPriority === "low" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterPriority("low")}
              className="text-green-600"
            >
              🟢 Basse
            </Button>
          </div>
        </motion.div>

        {/* Add new item */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="backdrop-blur-sm bg-white/80 shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-primary" />
                Ajouter un article
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input
                placeholder="Nom de l'article..."
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addItem()}
              />
              <div className="flex gap-2">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="flex-1 px-3 py-2 border border-input rounded-md bg-background text-sm"
                >
                  <option value="">Catégorie</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <Button onClick={addItem} size="sm" className="bg-gradient-to-r from-primary to-secondary">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Shopping list */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="backdrop-blur-sm bg-white/80 shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-primary" />
                Articles ({filteredItems.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <AnimatePresence>
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                      item.completed 
                        ? "bg-green-50 border-green-200" 
                        : "hover:bg-accent/50"
                    }`}
                  >
                    <motion.button
                      onClick={() => toggleItem(item.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="flex-shrink-0"
                    >
                      {item.completed ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <Circle className="h-5 w-5 text-muted-foreground" />
                      )}
                    </motion.button>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`font-medium ${item.completed ? "line-through text-muted-foreground" : ""}`}>
                          {item.name}
                        </span>
                        <span className="text-xs text-muted-foreground">{item.quantity}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {item.category}
                        </Badge>
                        <span className="text-xs">{getPriorityIcon(item.priority)}</span>
                      </div>
                    </div>
                    
                    <motion.button
                      onClick={() => deleteItem(item.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </motion.button>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {filteredItems.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-8 text-muted-foreground"
                >
                  <ShoppingCart className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Aucun article trouvé</p>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <BottomNavigation />
    </div>
  )
}
