"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Trash2, Check, ShoppingCart, Crown, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import BottomNavigation from "@/components/bottom-navigation"

interface ShoppingItem {
  id: string
  name: string
  category: string
  completed: boolean
  quantity: string
  priority: "high" | "medium" | "low"
  premium?: boolean
}

const categories = [
  "Épices Premium",
  "Café Premium", 
  "Thé Premium",
  "Fruits",
  "Légumes",
  "Protéines",
  "Céréales",
  "Superfoods",
  "Épices",
  "Huiles",
  "Condiments",
  "Desserts",
  "Fromages",
  "Vins",
  "Décorations",
  "Autres"
]

const defaultItems: ShoppingItem[] = [
  // Ingrédients Premium
  { id: "1", name: "Gingembre frais bio", category: "Épices Premium", completed: false, quantity: "300g", priority: "high", premium: true },
  { id: "2", name: "Café éthiopien Yirgacheffe", category: "Café Premium", completed: false, quantity: "250g", priority: "high", premium: true },
  { id: "3", name: "Matcha premium Uji", category: "Thé Premium", completed: false, quantity: "50g", priority: "high", premium: true },
  { id: "4", name: "Miel de manuka", category: "Autres", completed: false, quantity: "250g", priority: "medium", premium: true },
  { id: "5", name: "Miel de châtaignier", category: "Autres", completed: false, quantity: "250g", priority: "medium", premium: true },

  // Fruits & Légumes
  { id: "6", name: "Citrons verts bio", category: "Fruits", completed: false, quantity: "6 pièces", priority: "high" },
  { id: "7", name: "Mangues Ataulfo", category: "Fruits", completed: false, quantity: "4 pièces", priority: "medium" },
  { id: "8", name: "Oranges sanguines", category: "Fruits", completed: false, quantity: "3 pièces", priority: "medium" },
  { id: "9", name: "Avocats Hass", category: "Légumes", completed: false, quantity: "4 pièces", priority: "high" },
  { id: "10", name: "Légumes de saison", category: "Légumes", completed: false, quantity: "500g", priority: "high" },

  // Protéines Premium
  { id: "11", name: "Saumon sauvage d'Alaska", category: "Protéines", completed: false, quantity: "400g", priority: "high", premium: true },
  { id: "12", name: "Tofu soyeux bio", category: "Protéines", completed: false, quantity: "300g", priority: "medium" },
  { id: "13", name: "Œufs bio", category: "Protéines", completed: false, quantity: "12 pièces", priority: "high" },

  // Céréales & Graines
  { id: "14", name: "Quinoa rouge bio", category: "Céréales", completed: false, quantity: "500g", priority: "high" },
  { id: "15", name: "Quinoa noir", category: "Céréales", completed: false, quantity: "250g", priority: "medium" },
  { id: "16", name: "Riz Arborio", category: "Céréales", completed: false, quantity: "500g", priority: "medium" },
  { id: "17", name: "Graines de chia", category: "Superfoods", completed: false, quantity: "200g", priority: "medium" },
  { id: "18", name: "Graines de chanvre", category: "Superfoods", completed: false, quantity: "100g", priority: "low" },

  // Épices & Condiments
  { id: "19", name: "Cardamome moulue", category: "Épices", completed: false, quantity: "50g", priority: "medium" },
  { id: "20", name: "Curry Madras", category: "Épices", completed: false, quantity: "100g", priority: "medium" },
  { id: "21", name: "Safran", category: "Épices", completed: false, quantity: "1g", priority: "low", premium: true },
  { id: "22", name: "Cannelle de Ceylan", category: "Épices", completed: false, quantity: "50g", priority: "medium" },
  { id: "23", name: "Sel rose de l'Himalaya", category: "Épices", completed: false, quantity: "200g", priority: "low" },

  // Huiles & Graisses
  { id: "24", name: "Huile d'avocat", category: "Huiles", completed: false, quantity: "250ml", priority: "medium" },
  { id: "25", name: "Huile de sésame noir", category: "Huiles", completed: false, quantity: "100ml", priority: "low" },
  { id: "26", name: "Huile de coco", category: "Huiles", completed: false, quantity: "200ml", priority: "medium" },
  { id: "27", name: "Beurre de cacao cru", category: "Autres", completed: false, quantity: "100g", priority: "low", premium: true },

  // Autres
  { id: "28", name: "Miso blanc bio", category: "Condiments", completed: false, quantity: "300g", priority: "medium" },
  { id: "29", name: "Sauce tamari bio", category: "Condiments", completed: false, quantity: "200ml", priority: "medium" },
  { id: "30", name: "Algues wakame", category: "Superfoods", completed: false, quantity: "50g", priority: "low" },
  { id: "31", name: "Champignons shiitake séchés", category: "Superfoods", completed: false, quantity: "100g", priority: "low" },
  { id: "32", name: "Chocolat noir 70%", category: "Desserts", completed: false, quantity: "200g", priority: "low" },
  { id: "33", name: "Parmesan vieilli 24 mois", category: "Fromages", completed: false, quantity: "150g", priority: "low", premium: true },
  { id: "34", name: "Vin blanc sec", category: "Vins", completed: false, quantity: "1 bouteille", priority: "low" },
  { id: "35", name: "Fleurs comestibles", category: "Décorations", completed: false, quantity: "1 sachet", priority: "low" },
]

export default function ListePage() {
  const [items, setItems] = useState<ShoppingItem[]>([])
  const [newItemName, setNewItemName] = useState("")
  const [newItemCategory, setNewItemCategory] = useState("")
  const [newItemQuantity, setNewItemQuantity] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Toutes")
  const [showAddForm, setShowAddForm] = useState(false)

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

  const toggleItem = (id: string) => {
    const newItems = items.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    )
    saveItems(newItems)
  }

  const deleteItem = (id: string) => {
    const newItems = items.filter(item => item.id !== id)
    saveItems(newItems)
  }

  const addItem = () => {
    if (newItemName.trim() && newItemCategory && newItemQuantity.trim()) {
      const newItem: ShoppingItem = {
        id: Date.now().toString(),
        name: newItemName.trim(),
        category: newItemCategory,
        quantity: newItemQuantity.trim(),
        completed: false,
        priority: "medium"
      }
      const newItems = [...items, newItem]
      saveItems(newItems)
      setNewItemName("")
      setNewItemCategory("")
      setNewItemQuantity("")
      setShowAddForm(false)
    }
  }

  const filteredItems = items.filter(item => 
    selectedCategory === "Toutes" || item.category === selectedCategory
  )

  const completedItems = items.filter(item => item.completed)
  const pendingItems = items.filter(item => !item.completed)

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800"
      case "medium": return "bg-yellow-100 text-yellow-800"
      case "low": return "bg-green-100 text-green-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Épices Premium":
      case "Café Premium":
      case "Thé Premium":
        return <Crown className="h-4 w-4" />
      case "Fruits": return "🍎"
      case "Légumes": return "🥬"
      case "Protéines": return "🥩"
      case "Céréales": return "🌾"
      case "Superfoods": return "⭐"
      case "Épices": return "🌶️"
      case "Huiles": return "🫗"
      case "Condiments": return "🧂"
      case "Desserts": return "🍰"
      case "Fromages": return "🧀"
      case "Vins": return "🍷"
      case "Décorations": return "🌸"
      default: return "📦"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/10">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="p-4 space-y-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Liste de Courses
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Organisez vos achats pour le protocole gingembre
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-3 text-center">
                <div className="text-lg font-bold text-primary">{items.length}</div>
                <div className="text-xs text-muted-foreground">Total</div>
              </CardContent>
            </Card>
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-3 text-center">
                <div className="text-lg font-bold text-green-600">{completedItems.length}</div>
                <div className="text-xs text-muted-foreground">Achetés</div>
              </CardContent>
            </Card>
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-3 text-center">
                <div className="text-lg font-bold text-orange-600">{pendingItems.length}</div>
                <div className="text-xs text-muted-foreground">En attente</div>
              </CardContent>
            </Card>
          </div>

          {/* Filtres */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Button
              variant={selectedCategory === "Toutes" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("Toutes")}
              className="whitespace-nowrap bg-white/80 backdrop-blur-sm"
            >
              Toutes
            </Button>
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

          {/* Bouton Ajouter */}
          <Button
            onClick={() => setShowAddForm(!showAddForm)}
            className="w-full bg-white/90 backdrop-blur-sm border-0 shadow-lg"
          >
            <Plus className="h-4 w-4 mr-2" />
            Ajouter un article
          </Button>
        </div>

        {/* Formulaire d'ajout */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="px-4 mb-4"
            >
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-4 space-y-3">
                  <Input
                    placeholder="Nom de l'article"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                  />
                  <Select value={newItemCategory} onValueChange={setNewItemCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="Quantité"
                    value={newItemQuantity}
                    onChange={(e) => setNewItemQuantity(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <Button onClick={addItem} className="flex-1">
                      Ajouter
                    </Button>
                    <Button variant="outline" onClick={() => setShowAddForm(false)}>
                      Annuler
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Liste des articles */}
        <div className="px-4 pb-20 space-y-2">
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className={`bg-white/90 backdrop-blur-sm border-0 shadow-lg transition-all ${
                  item.completed ? "opacity-60" : ""
                }`}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleItem(item.id)}
                        className="h-8 w-8"
                      >
                        {item.completed ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <div className="w-4 h-4 border-2 border-gray-300 rounded" />
                        )}
                      </Button>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`font-medium ${item.completed ? "line-through" : ""}`}>
                            {item.name}
                          </span>
                          {item.premium && (
                            <Crown className="h-3 w-3 text-yellow-500" />
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{item.quantity}</span>
                          <span>•</span>
                          <span>{item.category}</span>
                          <Badge variant="outline" className={`text-xs ${getPriorityColor(item.priority)}`}>
                            {item.priority}
                          </Badge>
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteItem(item.id)}
                        className="h-8 w-8 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
              <h3 className="text-lg font-semibold mb-2">Liste vide</h3>
              <p className="text-muted-foreground">
                {selectedCategory === "Toutes" 
                  ? "Ajoutez des articles à votre liste de courses"
                  : `Aucun article dans la catégorie "${selectedCategory}"`
                }
              </p>
            </motion.div>
          )}
        </div>

        <BottomNavigation />
      </div>
    </div>
  )
}
