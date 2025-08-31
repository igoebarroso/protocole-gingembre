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
  description?: string
  difficulty?: "facile" | "moyen" | "difficile"
  premium?: boolean
}

export interface Challenge {
  id: string
  day: number
  title: string
  description: string
  type: "mindfulness" | "nutrition" | "exercise"
  completed: boolean
}

export interface ShoppingItem {
  id: string
  name: string
  category: string
  quantity: string
  checked: boolean
}

export interface ProtocolInfo {
  id: string
  title: string
  description: string
  benefits: string[]
  icon: string
  color: string
}

export interface Testimonial {
  id: string
  name: string
  age: number
  result: string
  duration: string
  quote: string
  avatar?: string
}

// Informações educativas sobre o protocolo
export const protocolInfo: ProtocolInfo[] = [
  {
    id: "gingembre",
    title: "Le Gingembre: L'Épice Brûle-Graisses",
    description: "Le gingembre est la pierre angulaire du protocole, reconnu pour ses propriétés médicinales ancestrales et ses composés bioactifs (gingérol et shogaol).",
    benefits: [
      "Stimule la thermogenèse et accélère le métabolisme",
      "Agit comme coupe-faim naturel en améliorant la satiété",
      "Favorise la digestion et réduit les ballonnements",
      "Aide à réguler la glycémie",
      "Études cliniques montrent une réduction significative du poids"
    ],
    icon: "🫚",
    color: "from-orange-400 to-orange-600"
  },
  {
    id: "cafe",
    title: "Le Café: Booster Naturel de l'Énergie",
    description: "Le café agit comme un allié minceur grâce à sa teneur en caféine, un puissant agent thermogénique au-delà de son rôle stimulant.",
    benefits: [
      "La caféine augmente la dépense énergétique",
      "Stimule la lipolyse (décomposition des graisses)",
      "Améliore la vigilance et les performances physiques",
      "Effet diurétique léger, aide à éliminer les toxines",
      "Important: privilégier un café noir sans sucre ni crème"
    ],
    icon: "☕",
    color: "from-amber-600 to-amber-800"
  },
  {
    id: "the-vert",
    title: "Le Thé Vert: Antioxydant Puissant",
    description: "Le thé vert, boisson ancestrale asiatique, est reconnu pour ses bienfaits antioxydants et son rôle significatif dans la gestion du poids.",
    benefits: [
      "Riche en catéchines (EGCG) qui favorisent la combustion des graisses",
      "Améliore la sensibilité à l'insuline",
      "Effet détoxifiant, soutient le foie",
      "Peut être consommé chaud ou froid",
      "Protection cellulaire grâce aux antioxydants puissants"
    ],
    icon: "🍵",
    color: "from-green-500 to-green-700"
  }
]

export const testimonials: Testimonial[] = [
  {
    id: "julie",
    name: "Julie",
    age: 35,
    result: "5 kg en 2 mois",
    duration: "2 mois",
    quote: "J'ai toujours eu du mal à perdre mes derniers kilos. En intégrant l'infusion gingembre-café-thé vert chaque matin et en début d'après-midi, combinée à ma marche quotidienne, j'ai perdu 5 kg en 2 mois ! Je me sens plus légère, plus énergique, et mes fringales ont pratiquement disparu."
  },
  {
    id: "marie",
    name: "Marie",
    age: 42,
    result: "3 kg en 6 semaines",
    duration: "6 semaines",
    quote: "Le protocole a transformé ma routine matinale. Non seulement j'ai perdu du poids, mais j'ai aussi remarqué une amélioration notable de ma digestion et une réduction des ballonnements. Je me sens plus concentrée et énergique toute la journée."
  },
  {
    id: "sophie",
    name: "Sophie",
    age: 28,
    result: "4 kg en 3 mois",
    duration: "3 mois",
    quote: "J'étais sceptique au début, mais les résultats sont là ! L'infusion m'aide à contrôler mon appétit et j'ai une meilleure gestion des portions. Le plus surprenant est le regain d'énergie et la sensation générale de bien-être."
  }
]

export const recipes: Recipe[] = [
  // Jour 1 - Petit-déjeuner Premium
  {
    id: "1",
    name: "Elixir Matinal Gingembre-Café",
    image: "/ginger-tea-with-lemon-and-honey-morning-drink.png",
    prepTime: 8,
    calories: 45,
    day: 1,
    category: "petit-dej",
    description: "Un mélange exclusif de gingembre frais et café de montagne éthiopien pour un réveil énergisant et détoxifiant.",
    difficulty: "facile",
    premium: true,
    ingredients: [
      "2cm de gingembre frais bio",
      "1 tasse de café éthiopien Yirgacheffe (mouture fine)",
      "1 c.à.c de miel de manuka",
      "1 pincée de cardamome moulue",
      "1 c.à.c de beurre de cacao cru",
      "200ml d'eau filtrée"
    ],
    steps: [
      { step: "Préparer le café éthiopien en méthode pour-over", duration: 240 },
      { step: "Râper finement le gingembre frais", duration: 60 },
      { step: "Infuser le gingembre dans le café chaud 3 minutes", duration: 180 },
      { step: "Ajouter le miel de manuka et la cardamome", duration: 30 },
      { step: "Incorporer le beurre de cacao pour la texture crémeuse" },
    ],
    tags: ["gingembre", "café-premium", "detox", "energisant", "ethiopien"],
  },

  // Jour 1 - Déjeuner
  {
    id: "2",
    name: "Bowl Quinoa Royal au Gingembre",
    image: "/quinoa-salad-with-ginger-dressing-and-vegetables.png",
    prepTime: 20,
    calories: 380,
    day: 1,
    category: "dejeuner",
    description: "Un bowl nutritif avec quinoa rouge, légumes exotiques et vinaigrette au gingembre et citron vert.",
    difficulty: "moyen",
    ingredients: [
      "100g quinoa rouge bio",
      "1 avocat Hass mûr",
      "1 mangue Ataulfo",
      "2cm gingembre frais",
      "1 citron vert",
      "2 c.à.s huile d'avocat",
      "1 c.à.c graines de chanvre",
      "Fleurs comestibles pour décorer"
    ],
    steps: [
      { step: "Cuire le quinoa rouge selon les instructions", duration: 900 },
      { step: "Préparer la vinaigrette au gingembre et citron vert", duration: 120 },
      { step: "Couper l'avocat et la mangue en dés artistiques", duration: 180 },
      { step: "Assembler le bowl avec élégance et décorer" },
    ],
    tags: ["gingembre", "quinoa-rouge", "superfood", "exotique"],
  },

  // Jour 1 - Dîner
  {
    id: "3",
    name: "Saumon Sashimi au Gingembre",
    image: "/grilled-salmon-with-ginger-glaze-and-vegetables.png",
    prepTime: 25,
    calories: 420,
    day: 1,
    category: "diner",
    description: "Saumon sauvage d'Alaska mariné au gingembre, servi avec légumes de saison et riz noir.",
    difficulty: "difficile",
    premium: true,
    ingredients: [
      "150g saumon sauvage d'Alaska",
      "3cm gingembre frais",
      "2 c.à.s sauce tamari bio",
      "1 c.à.c wasabi frais",
      "1 c.à.s huile de sésame noir",
      "Riz noir sauvage",
      "Légumes de saison",
      "Fleur de sel de Guérande"
    ],
    steps: [
      { step: "Mariner le saumon avec gingembre et tamari", duration: 600 },
      { step: "Préparer le riz noir sauvage", duration: 1200 },
      { step: "Cuire le saumon à la vapeur douce", duration: 480 },
      { step: "Assembler avec élégance et décorer" },
    ],
    tags: ["gingembre", "saumon-sauvage", "premium", "japonais"],
  },

  // Jour 2 - Petit-déjeuner
  {
    id: "4",
    name: "Smoothie Matcha-Gingembre Émeraude",
    image: "/ginger-pineapple-smoothie-tropical-drink.png",
    prepTime: 6,
    calories: 220,
    day: 2,
    category: "petit-dej",
    description: "Un smoothie vert énergisant avec matcha premium, gingembre et superfoods pour un boost matinal.",
    difficulty: "facile",
    premium: true,
    ingredients: [
      "1 c.à.c matcha premium Uji",
      "2cm gingembre frais",
      "1 banane congelée",
      "200ml lait d'amande maison",
      "1 c.à.s spiruline",
      "1 c.à.c graines de chia",
      "1 c.à.c miel de châtaignier",
      "1 pincée de sel rose de l'Himalaya"
    ],
    steps: [
      { step: "Préparer le matcha avec eau chaude", duration: 120 },
      { step: "Râper le gingembre frais", duration: 60 },
      { step: "Mixer tous les ingrédients jusqu'à consistance crémeuse", duration: 180 },
      { step: "Laisser reposer 5 min pour les graines de chia", duration: 300 },
    ],
    tags: ["gingembre", "matcha-premium", "superfood", "energisant"],
  },

  // Jour 2 - Déjeuner
  {
    id: "5",
    name: "Soupe Miso Impériale au Gingembre",
    image: "/miso-soup-with-ginger-and-vegetables.png",
    prepTime: 15,
    calories: 180,
    day: 2,
    category: "dejeuner",
    description: "Soupe miso traditionnelle japonaise enrichie au gingembre et algues wakame.",
    difficulty: "moyen",
    ingredients: [
      "3 c.à.s miso blanc bio",
      "2cm gingembre frais",
      "100g tofu soyeux",
      "3 champignons shiitake séchés",
      "1 c.à.s algues wakame",
      "1 oignon vert",
      "1 c.à.c dashi en poudre",
      "400ml d'eau filtrée"
    ],
    steps: [
      { step: "Réhydrater les champignons shiitake", duration: 300 },
      { step: "Préparer le bouillon dashi", duration: 180 },
      { step: "Infuser le gingembre et les algues", duration: 240 },
      { step: "Incorporer le miso et le tofu délicatement" },
    ],
    tags: ["gingembre", "miso", "japonais", "umami"],
  },

  // Jour 3 - Petit-déjeuner
  {
    id: "6",
    name: "Chia Pudding Gingembre-Café",
    image: "/ginger-tea-with-lemon-and-honey.png",
    prepTime: 10,
    calories: 280,
    day: 3,
    category: "petit-dej",
    description: "Pudding de chia infusé au café et gingembre, garni de fruits exotiques et noix de macadamia.",
    difficulty: "facile",
    ingredients: [
      "3 c.à.s graines de chia",
      "1 tasse café froid infusé 24h",
      "2cm gingembre frais",
      "1 c.à.s sirop d'érable",
      "1/2 mangue Ataulfo",
      "2 c.à.s noix de macadamia",
      "1 c.à.c cannelle de Ceylan",
      "Fleurs comestibles"
    ],
    steps: [
      { step: "Infuser le gingembre dans le café froid", duration: 300 },
      { step: "Mélanger chia, café et sirop d'érable", duration: 60 },
      { step: "Réfrigérer 4h minimum", duration: 14400 },
      { step: "Garnir avec fruits et noix" },
    ],
    tags: ["gingembre", "café", "chia", "overnight"],
  },

  // Jour 3 - Déjeuner
  {
    id: "7",
    name: "Curry Végétarien au Gingembre",
    image: "/vegetable-curry-with-ginger-and-coconut-milk.png",
    prepTime: 30,
    calories: 320,
    day: 3,
    category: "dejeuner",
    description: "Curry végétarien riche avec gingembre, lait de coco et épices fraîches du Kerala.",
    difficulty: "moyen",
    ingredients: [
      "200g légumes de saison",
      "3cm gingembre frais",
      "200ml lait de coco premium",
      "2 c.à.s curry Madras",
      "1 oignon rouge",
      "2 gousses d'ail",
      "1 c.à.c curcuma frais",
      "Riz basmati parfumé"
    ],
    steps: [
      { step: "Faire revenir oignon, ail et gingembre", duration: 300 },
      { step: "Ajouter les épices et faire torréfier", duration: 120 },
      { step: "Incorporer légumes et lait de coco", duration: 900 },
      { step: "Mijoter à feu doux 15 minutes" },
    ],
    tags: ["gingembre", "curry", "vegetarien", "kerala"],
  },

  // Jour 4 - Snack Premium
  {
    id: "8",
    name: "Thé Vert Matcha au Gingembre",
    image: "/ginger-tea-with-lemon-and-honey.png",
    prepTime: 5,
    calories: 35,
    day: 4,
    category: "snack",
    description: "Thé vert matcha premium préparé selon la tradition japonaise avec gingembre frais.",
    difficulty: "facile",
    premium: true,
    ingredients: [
      "1 c.à.c matcha premium Uji",
      "1cm gingembre frais",
      "200ml eau à 80°C",
      "1 c.à.c miel de lavande",
      "1 pincée de sel de mer"
    ],
    steps: [
      { step: "Préparer l'eau à la température idéale", duration: 120 },
      { step: "Fouetter le matcha avec un peu d'eau", duration: 60 },
      { step: "Ajouter le gingembre râpé", duration: 30 },
      { step: "Compléter avec l'eau et le miel" },
    ],
    tags: ["gingembre", "matcha", "japonais", "zen"],
  },

  // Jour 5 - Petit-déjeuner
  {
    id: "9",
    name: "Granola Gingembre-Café Artisanal",
    image: "/ginger-pineapple-smoothie-tropical-drink.png",
    prepTime: 35,
    calories: 450,
    day: 5,
    category: "petit-dej",
    description: "Granola maison avec flocons d'avoine, gingembre confit et café moulu.",
    difficulty: "difficile",
    ingredients: [
      "200g flocons d'avoine bio",
      "2cm gingembre confit",
      "2 c.à.s café moulu fin",
      "3 c.à.s miel d'acacia",
      "2 c.à.s huile de coco",
      "1 c.à.c cannelle",
      "50g noix de pécan",
      "50g amandes effilées"
    ],
    steps: [
      { step: "Mélanger tous les ingrédients secs", duration: 120 },
      { step: "Préparer le sirop au miel et café", duration: 180 },
      { step: "Cuire au four 25 minutes à 160°C", duration: 1500 },
      { step: "Laisser refroidir et conserver" },
    ],
    tags: ["gingembre", "café", "granola", "artisanal"],
  },

  // Jour 6 - Déjeuner
  {
    id: "10",
    name: "Salade de Quinoa Noir au Gingembre",
    image: "/quinoa-salad-with-ginger-dressing-and-vegetables.png",
    prepTime: 18,
    calories: 290,
    day: 6,
    category: "dejeuner",
    description: "Salade sophistiquée avec quinoa noir, gingembre et vinaigrette aux agrumes.",
    difficulty: "moyen",
    ingredients: [
      "100g quinoa noir",
      "2cm gingembre frais",
      "1 orange sanguine",
      "1 avocat",
      "2 c.à.s huile d'olive extra-vierge",
      "1 c.à.s vinaigre balsamique",
      "1 c.à.c graines de grenade",
      "Fleur de sel"
    ],
    steps: [
      { step: "Cuire le quinoa noir", duration: 900 },
      { step: "Préparer la vinaigrette au gingembre", duration: 120 },
      { step: "Couper les fruits et légumes", duration: 180 },
      { step: "Assembler avec élégance" },
    ],
    tags: ["gingembre", "quinoa-noir", "agrumes", "premium"],
  },

  // Jour 7 - Dîner de Clôture
  {
    id: "11",
    name: "Risotto Gingembre-Safran",
    image: "/grilled-salmon-with-ginger-glaze-and-vegetables.png",
    prepTime: 40,
    calories: 380,
    day: 7,
    category: "diner",
    description: "Risotto crémeux au gingembre et safran, garni de parmesan vieilli et fleurs comestibles.",
    difficulty: "difficile",
    premium: true,
    ingredients: [
      "150g riz Arborio",
      "3cm gingembre frais",
      "1 pincée de safran",
      "1L bouillon de légumes",
      "50g parmesan vieilli 24 mois",
      "2 c.à.s beurre bio",
      "1 oignon émincé",
      "1 verre vin blanc sec"
    ],
    steps: [
      { step: "Faire revenir oignon et gingembre", duration: 300 },
      { step: "Ajouter le riz et faire nacrer", duration: 180 },
      { step: "Verser le vin et laisser absorber", duration: 120 },
      { step: "Ajouter le bouillon progressivement", duration: 1800 },
      { step: "Finir avec parmesan et beurre" },
    ],
    tags: ["gingembre", "risotto", "safran", "italien"],
  },

  // Jour 7 - Dessert Premium
  {
    id: "12",
    name: "Mousse au Chocolat Gingembre-Matcha",
    image: "/ginger-tea-with-lemon-and-honey.png",
    prepTime: 20,
    calories: 280,
    day: 7,
    category: "snack",
    description: "Mousse au chocolat noir avec gingembre confit et couche de matcha pour un dessert sophistiqué.",
    difficulty: "difficile",
    premium: true,
    ingredients: [
      "100g chocolat noir 70%",
      "2cm gingembre confit",
      "1 c.à.c matcha premium",
      "2 œufs bio",
      "2 c.à.s sucre de coco",
      "1 c.à.s beurre de cacao",
      "Fleur de sel pour finition"
    ],
    steps: [
      { step: "Faire fondre le chocolat au bain-marie", duration: 300 },
      { step: "Séparer les blancs et jaunes d'œufs", duration: 60 },
      { step: "Monter les blancs en neige", duration: 180 },
      { step: "Incorporer délicatement et réfrigérer", duration: 7200 },
    ],
    tags: ["gingembre", "chocolat", "matcha", "dessert"],
  },
]

export const challenges: Challenge[] = [
  // Jour 1
  {
    id: "1",
    day: 1,
    title: "Début du Voyage",
    description: "Prépare ton premier elixir gingembre-café et prends 5 minutes pour méditer",
    type: "mindfulness",
    completed: false,
  },
  {
    id: "2",
    day: 1,
    title: "Hydratation Premium",
    description: "Bois 2L d'eau avec des tranches de gingembre frais",
    type: "nutrition",
    completed: false,
  },

  // Jour 2
  {
    id: "3",
    day: 2,
    title: "Énergie Matcha",
    description: "Remplace ton café habituel par le smoothie matcha-gingembre",
    type: "nutrition",
    completed: false,
  },
  {
    id: "4",
    day: 2,
    title: "Mouvement Conscient",
    description: "Fais 20 minutes de yoga ou stretching avec focus sur la respiration",
    type: "exercise",
    completed: false,
  },

  // Jour 3
  {
    id: "5",
    day: 3,
    title: "Détox Naturel",
    description: "Passe une journée sans sucre raffiné, uniquement des sucres naturels",
    type: "nutrition",
    completed: false,
  },
  {
    id: "6",
    day: 3,
    title: "Gratitude",
    description: "Écris 3 choses pour lesquelles tu es reconnaissant aujourd'hui",
    type: "mindfulness",
    completed: false,
  },

  // Jour 4
  {
    id: "7",
    day: 4,
    title: "Cérémonie du Thé",
    description: "Prépare le thé matcha-gingembre selon la tradition japonaise",
    type: "mindfulness",
    completed: false,
  },
  {
    id: "8",
    day: 4,
    title: "Marche Méditative",
    description: "Fais une promenade de 30 minutes en pleine conscience",
    type: "exercise",
    completed: false,
  },

  // Jour 5
  {
    id: "9",
    day: 5,
    title: "Créativité Culinaire",
    description: "Crée ta propre recette avec gingembre et partage-la",
    type: "nutrition",
    completed: false,
  },
  {
    id: "10",
    day: 5,
    title: "Respiration Profonde",
    description: "Pratique 10 minutes de respiration consciente",
    type: "mindfulness",
    completed: false,
  },

  // Jour 6
  {
    id: "11",
    day: 6,
    title: "Connexion Sociale",
    description: "Partage une recette gingembre avec un ami ou membre de famille",
    type: "mindfulness",
    completed: false,
  },
  {
    id: "12",
    day: 6,
    title: "Force Intérieure",
    description: "Fais 15 minutes d'exercices de renforcement",
    type: "exercise",
    completed: false,
  },

  // Jour 7
  {
    id: "13",
    day: 7,
    title: "Célébration",
    description: "Prépare le risotto gingembre-safran pour célébrer ta semaine",
    type: "nutrition",
    completed: false,
  },
  {
    id: "14",
    day: 7,
    title: "Réflexion",
    description: "Écris tes ressentis sur cette semaine de protocole gingembre",
    type: "mindfulness",
    completed: false,
  },
]

export const shoppingList: ShoppingItem[] = [
  // Ingrédients Premium
  { id: "1", name: "Gingembre frais bio", category: "Épices Premium", quantity: "300g", checked: false },
  { id: "2", name: "Café éthiopien Yirgacheffe", category: "Café Premium", quantity: "250g", checked: false },
  { id: "3", name: "Matcha premium Uji", category: "Thé Premium", quantity: "50g", checked: false },
  { id: "4", name: "Miel de manuka", category: "Édulcorants", quantity: "250g", checked: false },
  { id: "5", name: "Miel de châtaignier", category: "Édulcorants", quantity: "250g", checked: false },

  // Fruits & Légumes
  { id: "6", name: "Citrons verts bio", category: "Fruits", quantity: "6 pièces", checked: false },
  { id: "7", name: "Mangues Ataulfo", category: "Fruits", quantity: "4 pièces", checked: false },
  { id: "8", name: "Oranges sanguines", category: "Fruits", quantity: "3 pièces", checked: false },
  { id: "9", name: "Avocats Hass", category: "Légumes", quantity: "4 pièces", checked: false },
  { id: "10", name: "Légumes de saison", category: "Légumes", quantity: "500g", checked: false },

  // Protéines Premium
  { id: "11", name: "Saumon sauvage d'Alaska", category: "Protéines", quantity: "400g", checked: false },
  { id: "12", name: "Tofu soyeux bio", category: "Protéines", quantity: "300g", checked: false },
  { id: "13", name: "Œufs bio", category: "Protéines", quantity: "12 pièces", checked: false },

  // Céréales & Graines
  { id: "14", name: "Quinoa rouge bio", category: "Céréales", quantity: "500g", checked: false },
  { id: "15", name: "Quinoa noir", category: "Céréales", quantity: "250g", checked: false },
  { id: "16", name: "Riz Arborio", category: "Céréales", quantity: "500g", checked: false },
  { id: "17", name: "Graines de chia", category: "Superfoods", quantity: "200g", checked: false },
  { id: "18", name: "Graines de chanvre", category: "Superfoods", quantity: "100g", checked: false },

  // Épices & Condiments
  { id: "19", name: "Cardamome moulue", category: "Épices", quantity: "50g", checked: false },
  { id: "20", name: "Curry Madras", category: "Épices", quantity: "100g", checked: false },
  { id: "21", name: "Safran", category: "Épices", quantity: "1g", checked: false },
  { id: "22", name: "Cannelle de Ceylan", category: "Épices", quantity: "50g", checked: false },
  { id: "23", name: "Sel rose de l'Himalaya", category: "Épices", quantity: "200g", checked: false },

  // Huiles & Graisses
  { id: "24", name: "Huile d'avocat", category: "Huiles", quantity: "250ml", checked: false },
  { id: "25", name: "Huile de sésame noir", category: "Huiles", quantity: "100ml", checked: false },
  { id: "26", name: "Huile de coco", category: "Huiles", quantity: "200ml", checked: false },
  { id: "27", name: "Beurre de cacao cru", category: "Graisses", quantity: "100g", checked: false },

  // Autres
  { id: "28", name: "Miso blanc bio", category: "Condiments", quantity: "300g", checked: false },
  { id: "29", name: "Sauce tamari bio", category: "Condiments", quantity: "200ml", checked: false },
  { id: "30", name: "Algues wakame", category: "Superfoods", quantity: "50g", checked: false },
  { id: "31", name: "Champignons shiitake séchés", category: "Superfoods", quantity: "100g", checked: false },
  { id: "32", name: "Chocolat noir 70%", category: "Desserts", quantity: "200g", checked: false },
  { id: "33", name: "Parmesan vieilli 24 mois", category: "Fromages", quantity: "150g", checked: false },
  { id: "34", name: "Vin blanc sec", category: "Vins", quantity: "1 bouteille", checked: false },
  { id: "35", name: "Fleurs comestibles", category: "Décorations", quantity: "1 sachet", checked: false },
]

export const badges = [
  { id: "jour-parfait", name: "Jour Parfait", description: "Complète tous les défis d'une journée", icon: "⭐" },
  { id: "hydra-master", name: "Hydra Master", description: "2L d'eau par jour pendant 3 jours", icon: "💧" },
  { id: "gingembre-expert", name: "Expert Gingembre", description: "Utilise du gingembre dans 5 recettes", icon: "🫚" },
  { id: "cafe-connoisseur", name: "Connaisseur Café", description: "Déguste 3 variétés de café premium", icon: "☕" },
  { id: "matcha-master", name: "Maître Matcha", description: "Prépare 3 recettes avec matcha premium", icon: "🍵" },
  { id: "zen-warrior", name: "Guerrier Zen", description: "Médite 7 jours consécutifs", icon: "🧘" },
  { id: "culinary-artist", name: "Artiste Culinaire", description: "Crée 3 recettes originales", icon: "👨‍🍳" },
  { id: "wellness-champion", name: "Champion Bien-être", description: "Complète le protocole 7 jours", icon: "🏆" },
]
