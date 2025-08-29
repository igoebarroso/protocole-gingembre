"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Home, Utensils, Trophy, List, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function BottomNavigation() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("user-authenticated")
    localStorage.removeItem("user-email")
    localStorage.removeItem("user-id")
    localStorage.removeItem("user-name")
    router.push("/login")
  }

  const navItems = [
    {
      href: "/accueil",
      icon: Home,
      label: "Accueil",
      active: pathname === "/accueil"
    },
    {
      href: "/recettes",
      icon: Utensils,
      label: "Recettes",
      active: pathname === "/recettes"
    },
    {
      href: "/defis",
      icon: Trophy,
      label: "Défis",
      active: pathname === "/defis"
    },
    {
      href: "/liste",
      icon: List,
      label: "Liste",
      active: pathname === "/liste"
    },
    {
      href: "/profil",
      icon: User,
      label: "Profil",
      active: pathname === "/profil"
    }
  ]

  return (
    <motion.nav
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-t border-gray-200/50 safe-area-bottom"
    >
      <div className="max-w-md mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          {navItems.map((item) => (
            <motion.div
              key={item.href}
              layoutId={item.active ? "activeTab" : undefined}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Link href={item.href}>
                <motion.div
                  className={`relative flex flex-col items-center p-3 rounded-2xl transition-all duration-200 ${
                    item.active
                      ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg"
                      : "text-gray-600 hover:text-orange-600 hover:bg-orange-50"
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.active && (
                    <motion.div
                      layoutId="activeBackground"
                      className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <motion.div
                    className="relative z-10"
                    animate={{
                      scale: item.active ? 1.1 : 1,
                      rotate: item.active ? 5 : 0
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <item.icon className="w-6 h-6" />
                  </motion.div>
                  <motion.span
                    className="relative z-10 text-xs font-medium mt-1"
                    animate={{
                      opacity: item.active ? 1 : 0.7
                    }}
                  >
                    {item.label}
                  </motion.span>
                  
                  {/* Active indicator */}
                  {item.active && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute -top-1 w-1 h-1 bg-white rounded-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.div>
              </Link>
            </motion.div>
          ))}

          {/* Logout Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={handleLogout}
                variant="ghost"
                size="sm"
                className="flex flex-col items-center p-3 rounded-2xl text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
              >
                <LogOut className="w-6 h-6" />
                <span className="text-xs font-medium mt-1">Déconnexion</span>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Gradient overlay for visual appeal */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/50 to-transparent pointer-events-none" />
    </motion.nav>
  )
}

