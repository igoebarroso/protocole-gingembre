// Mock data for the 7-day ginger protocol

export interface Recipe {
  id: string
  name: string
  image: string
  prepTime: number
  calories: number
  day: number
  category: "petit-dej" | "dejeuner" | "diner" | "snack"
  ingredients: string[]
  steps: { step: string; duration?: number }[]
  tags: string[]
}

export interface Challenge {
  id: string
  day: number
  title: string
  description: string
  type: "activity" | "hydration" | "mindfulness"
  completed: boolean
}

export interface ShoppingItem {
  id: string
  name: string
  category: "fruits" | "legumes" | "proteines" | "epicerie"
  quantity: string
  checked: boolean
}

export const recipes: Recipe[] = [
  {
    id: "1",
    name: "Thé au Gingembre Matinal",
    image: "/ginger-tea-with-lemon-and-honey-morning-drink.png",
    prepTime: 5,
    calories: 25,
    day: 1,
    category: "petit-dej",
    ingredients: ["2cm de gingembre frais", "1 citron", "1 c.à.s de miel", "250ml d'eau"],
    steps: [
      { step: "Râper le gingembre frais", duration: 60 },
      { step: "Faire bouillir l'eau", duration: 180 },
      { step: "Infuser le gingembre 5 minutes", duration: 300 },
      { step: "Ajouter le citron et le miel" },
    ],
    tags: ["gingembre", "detox", "anti-inflammatoire"],
  },
  {
    id: "2",
    name: "Salade de Quinoa au Gingembre",
    image: "/quinoa-salad-with-ginger-dressing-and-vegetables.png",
    prepTime: 15,
    calories: 320,
    day: 1,
    category: "dejeuner",
    ingredients: ["100g quinoa", "1 concombre", "2 carottes", "1cm gingembre", "2 c.à.s huile olive"],
    steps: [
      { step: "Cuire le quinoa selon les instructions", duration: 900 },
      { step: "Couper les légumes en dés", duration: 300 },
      { step: "Préparer la vinaigrette au gingembre", duration: 120 },
      { step: "Mélanger tous les ingrédients et assaisonner" },
    ],
    tags: ["gingembre", "quinoa", "leger"],
  },
  {
    id: "3",
    name: "Saumon Grillé au Gingembre",
    image: "/grilled-salmon-with-ginger-glaze-and-vegetables.png",
    prepTime: 20,
    calories: 380,
    day: 1,
    category: "diner",
    ingredients: ["150g saumon", "2cm gingembre", "1 c.à.s sauce soja", "Légumes verts", "1 c.à.s huile olive"],
    steps: [
      { step: "Mariner le saumon avec gingembre et sauce soja", duration: 600 },
      { step: "Préchauffer la poêle avec l'huile", duration: 120 },
      { step: "Griller le saumon 4 min de chaque côté", duration: 480 },
      { step: "Servir avec les légumes vapeur" },
    ],
    tags: ["gingembre", "proteine", "omega-3"],
  },

  // Jour 2
  {
    id: "4",
    name: "Smoothie Gingembre-Ananas",
    image: "/ginger-pineapple-smoothie-tropical-drink.png",
    prepTime: 5,
    calories: 180,
    day: 2,
    category: "petit-dej",
    ingredients: ["150g ananas", "1cm gingembre", "200ml lait coco", "1 c.à.s graines chia"],
    steps: [
      { step: "Couper l'ananas en morceaux" },
      { step: "Râper le gingembre frais", duration: 60 },
      { step: "Mixer tous les ingrédients", duration: 120 },
      { step: "Laisser reposer 5 min pour les graines de chia", duration: 300 },
    ],
    tags: ["gingembre", "tropical", "chia"],
  },
  {
    id: "5",
    name: "Soupe Miso au Gingembre",
    image: "/miso-soup-with-ginger-and-vegetables.png",
    prepTime: 12,
    calories: 150,
    day: 2,
    category: "dejeuner",
    ingredients: ["2 c.à.s miso", "1cm gingembre", "100g tofu", "2 champignons shiitake", "1 oignon vert"],
    steps: [
      { step: "Faire chauffer 400ml d'eau", duration: 300 },
      { step: "Diluer le miso dans un peu d'eau chaude" },
      { step: "Ajouter gingembre râpé et champignons", duration: 180 },
      { step: "Incorporer le tofu et l'oignon vert" },
    ],
    tags: ["gingembre", "miso", "leger"],
  },

  // Jour 3-7 (ajout de plus de recettes)
  {
    id: "6",
    name: "Curry de Légumes au Gingembre",
    image: "/vegetable-curry-with-ginger-and-coconut-milk.png",
    prepTime: 25,
    calories: 280,
    day: 3,
    category: "diner",
    ingredients: ["200g légumes mélangés", "2cm gingembre", "200ml lait coco", "1 c.à.s curry", "1 oignon"],
    steps: [
      { step: "Faire revenir l'oignon et le gingembre", duration: 300 },
      { step: "Ajouter les légumes et le curry", duration: 240 },
      { step: "Verser le lait de coco et mijoter", duration: 900 },
      { step: "Assaisonner et servir avec du riz" },
    ],
    tags: ["gingembre", "curry", "vegetarien"],
  },
]

export const challenges: Challenge[] = [
  // Jour 1
  {
    id: "1",
    day: 1,
    title: "Marcher 15 minutes",
    description: "Une petite promenade pour activer la circulation",
    type: "activity",
    completed: false,
  },
  {
    id: "2",
    day: 1,
    title: "Boire 2L d'eau",
    description: "Hydratation optimale pour éliminer les toxines",
    type: "hydration",
    completed: false,
  },
  {
    id: "3",
    day: 1,
    title: "5 minutes de respiration",
    description: "Exercice de respiration profonde pour réduire le stress",
    type: "mindfulness",
    completed: false,
  },

  // Jour 2
  {
    id: "4",
    day: 2,
    title: "20 minutes de marche",
    description: "Augmente ton activité physique progressivement",
    type: "activity",
    completed: false,
  },
  {
    id: "5",
    day: 2,
    title: "Méditation 10 minutes",
    description: "Prends du temps pour toi et ton bien-être mental",
    type: "mindfulness",
    completed: false,
  },
  {
    id: "6",
    day: 2,
    title: "Boire 2.5L d'eau",
    description: "Augmente ton hydratation pour optimiser la détox",
    type: "hydration",
    completed: false,
  },

  // Jour 3
  {
    id: "7",
    day: 3,
    title: "Étirements 15 minutes",
    description: "Assouplit ton corps et améliore ta circulation",
    type: "activity",
    completed: false,
  },
  {
    id: "8",
    day: 3,
    title: "Gratitude journal",
    description: "Écris 3 choses pour lesquelles tu es reconnaissant(e)",
    type: "mindfulness",
    completed: false,
  },
]

export const shoppingList: ShoppingItem[] = [
  // Fruits
  { id: "1", name: "Citrons", category: "fruits", quantity: "4 pièces", checked: false },
  { id: "2", name: "Pommes vertes", category: "fruits", quantity: "6 pièces", checked: false },

  // Légumes
  { id: "3", name: "Gingembre frais", category: "legumes", quantity: "200g", checked: false },
  { id: "4", name: "Concombres", category: "legumes", quantity: "2 pièces", checked: false },
  { id: "5", name: "Carottes", category: "legumes", quantity: "500g", checked: false },

  // Protéines
  { id: "6", name: "Saumon frais", category: "proteines", quantity: "600g", checked: false },
  { id: "7", name: "Œufs bio", category: "proteines", quantity: "12 pièces", checked: false },

  // Épicerie
  { id: "8", name: "Quinoa", category: "epicerie", quantity: "500g", checked: false },
  { id: "9", name: "Miel", category: "epicerie", quantity: "1 pot", checked: false },
  { id: "10", name: "Huile d'olive", category: "epicerie", quantity: "1 bouteille", checked: false },
]

export const badges = [
  { id: "jour-parfait", name: "Jour Parfait", description: "Toutes les tâches complétées", icon: "🏆" },
  { id: "hydra-master", name: "Hydra Master", description: "2L d'eau par jour pendant 3 jours", icon: "💧" },
  { id: "chef-gingembre", name: "Chef Gingembre", description: "10 recettes cuisinées", icon: "👨‍🍳" },
]
