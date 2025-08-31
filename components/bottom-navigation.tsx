"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Home, ChefHat, ShoppingCart, Trophy, BookOpen, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function BottomNavigation() {
  const pathname = usePathname()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = () => {
    setIsLoggingOut(true)
    localStorage.removeItem("user-authenticated")
    localStorage.removeItem("onboarding-completed")
    window.location.href = "/login"
  }

  const navItems = [
    {
      href: "/accueil",
      icon: Home,
      label: "Accueil",
      isActive: pathname === "/accueil"
    },
    {
      href: "/recettes",
      icon: ChefHat,
      label: "Recettes",
      isActive: pathname === "/recettes" || pathname.startsWith("/recettes/")
    },
    {
      href: "/protocole",
      icon: BookOpen,
      label: "Protocole",
      isActive: pathname === "/protocole"
    },
    {
      href: "/defis",
      icon: Trophy,
      label: "Défis",
      isActive: pathname === "/defis"
    },
    {
      href: "/liste",
      icon: ShoppingCart,
      label: "Liste",
      isActive: pathname === "/liste"
    }
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="max-w-md mx-auto">
        <div className="bg-white/90 backdrop-blur-lg border-t border-border/50 shadow-lg">
          <div className="flex items-center justify-between p-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex flex-col items-center p-2 rounded-lg transition-all ${
                    item.isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <item.icon className="h-5 w-5 mb-1" />
                  <span className="text-xs font-medium">{item.label}</span>
                </motion.div>
              </Link>
            ))}
            
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

