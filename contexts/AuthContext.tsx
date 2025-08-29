"use client"

import { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase, isSupabaseReady } from '@/lib/supabase'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  signOut: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Se o Supabase não estiver configurado, usar localStorage
    if (!isSupabaseReady()) {
      console.log('🔧 Modo local: Supabase não configurado, usando localStorage')
      const userEmail = localStorage.getItem("user-email")
      const userId = localStorage.getItem("user-id")
      const userName = localStorage.getItem("user-name")
      
      if (userEmail && userId) {
        // Criar um objeto simples para modo local
        const localUser = {
          id: userId,
          email: userEmail,
          user_metadata: { name: userName || 'Usuário' }
        } as unknown as User
        
        const localSession = {
          user: localUser,
          access_token: 'local-token',
          refresh_token: 'local-refresh'
        } as unknown as Session
        
        setUser(localUser)
        setSession(localSession)
      }
      setLoading(false)
      return
    }

    // Verificar sessão atual
    const getSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        setSession(session)
        setUser(session?.user ?? null)
      } catch (error) {
        console.error('Erro ao buscar sessão:', error)
      } finally {
        setLoading(false)
      }
    }

    getSession()

    // Escutar mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: string, session: Session | null) => {
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)

        // Atualizar localStorage
        if (session?.user) {
          localStorage.setItem("user-authenticated", "true")
          localStorage.setItem("user-email", session.user.email || "")
          localStorage.setItem("user-id", session.user.id)
          localStorage.setItem("user-name", session.user.user_metadata?.name || "")
        } else {
          localStorage.removeItem("user-authenticated")
          localStorage.removeItem("user-email")
          localStorage.removeItem("user-id")
          localStorage.removeItem("user-name")
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signOut = async () => {
    try {
      if (isSupabaseReady()) {
        await supabase.auth.signOut()
      }
      localStorage.removeItem("user-authenticated")
      localStorage.removeItem("user-email")
      localStorage.removeItem("user-id")
      localStorage.removeItem("user-name")
      setUser(null)
      setSession(null)
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, session, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}
