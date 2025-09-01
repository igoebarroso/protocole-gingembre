"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { isSupabaseReady } from "@/lib/supabase"
import { toast } from "sonner"
import InstallAppGuide from "@/components/install-app-guide"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showInstallGuide, setShowInstallGuide] = useState(false)
  const [hasSeenInstallGuide, setHasSeenInstallGuide] = useState(false)

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà vu le guide d'installation
    const seen = localStorage.getItem("has-seen-install-guide")
    if (!seen) {
      setShowInstallGuide(true)
    }
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (isSupabaseReady()) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) {
          toast.error("Erreur de connexion: " + error.message)
        } else {
          toast.success("Connexion réussie!")
          localStorage.setItem("user-authenticated", "true")
          router.push("/accueil")
        }
      } else {
        // Mode local
        if (email && password) {
          localStorage.setItem("user-authenticated", "true")
          localStorage.setItem("user-email", email)
          toast.success("Connexion réussie!")
          router.push("/accueil")
        } else {
          toast.error("Veuillez remplir tous les champs")
        }
      }
    } catch (error) {
      toast.error("Erreur de connexion")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (isSupabaseReady()) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        })

        if (error) {
          toast.error("Erreur d'inscription: " + error.message)
        } else {
          toast.success("Inscription réussie! Vérifiez votre email.")
        }
      } else {
        // Mode local
        if (email && password) {
          localStorage.setItem("user-authenticated", "true")
          localStorage.setItem("user-email", email)
          toast.success("Inscription réussie!")
          router.push("/accueil")
        } else {
          toast.error("Veuillez remplir tous les champs")
        }
      }
    } catch (error) {
      toast.error("Erreur d'inscription")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInstallGuideClose = () => {
    setShowInstallGuide(false)
    localStorage.setItem("has-seen-install-guide", "true")
  }

  const handleInstallGuideContinue = () => {
    setShowInstallGuide(false)
    localStorage.setItem("has-seen-install-guide", "true")
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/10 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full"
            animate={{
              x: [0, 30, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-40 right-20 w-16 h-16 bg-secondary/10 rounded-full"
            animate={{
              x: [0, -20, 0],
              y: [0, 20, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-20 left-20 w-12 h-12 bg-primary/5 rounded-full"
            animate={{
              x: [0, 15, 0],
              y: [0, -15, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center"
              >
                <span className="text-3xl">🫚</span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2"
              >
                Protocole Gingembre
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-muted-foreground"
              >
                Connectez-vous pour commencer votre transformation
              </motion.p>
            </div>

            {/* Login Form */}
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-6">
                <Tabs defaultValue="login" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="login">Connexion</TabsTrigger>
                    <TabsTrigger value="signup">Inscription</TabsTrigger>
                  </TabsList>

                  <TabsContent value="login">
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="votre@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="bg-white/80"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Mot de passe</Label>
                        <Input
                          id="password"
                          type="password"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="bg-white/80"
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-primary to-secondary text-white h-12"
                        disabled={isLoading}
                      >
                        {isLoading ? "Connexion..." : "Se connecter"}
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="signup">
                    <form onSubmit={handleSignUp} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="signup-email">Email</Label>
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="votre@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="bg-white/80"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-password">Mot de passe</Label>
                        <Input
                          id="signup-password"
                          type="password"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="bg-white/80"
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-primary to-secondary text-white h-12"
                        disabled={isLoading}
                      >
                        {isLoading ? "Inscription..." : "S'inscrire"}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>


              </CardContent>
            </Card>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center mt-6"
            >
              <p className="text-xs text-muted-foreground">
                En vous connectant, vous acceptez nos conditions d'utilisation
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Guide d'installation */}
      <AnimatePresence>
        {showInstallGuide && (
          <InstallAppGuide
            onClose={handleInstallGuideClose}
            onContinue={handleInstallGuideContinue}
          />
        )}
      </AnimatePresence>
    </>
  )
}
