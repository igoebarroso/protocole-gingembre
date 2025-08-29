import { createClient } from '@supabase/supabase-js'

// Verificar se as variáveis de ambiente estão configuradas
const isSupabaseConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Função para verificar se o Supabase está configurado
export const isSupabaseReady = () => {
  return isSupabaseConfigured && 
         process.env.NEXT_PUBLIC_SUPABASE_URL !== 'sua_project_url_aqui' &&
         process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== 'sua_chave_anonima_aqui'
}

// Criar cliente Supabase apenas se estiver configurado
let supabase: any = null

if (isSupabaseReady()) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  supabase = createClient(supabaseUrl, supabaseAnonKey)
} else {
  // Fallback: cliente mock que não faz nada
  supabase = {
    auth: {
      signInWithPassword: async () => ({ data: null, error: null }),
      signUp: async () => ({ data: null, error: null }),
      signOut: async () => ({ error: null }),
      onAuthStateChange: (callback: any) => ({ data: null, error: null }),
      getSession: async () => ({ data: null, error: null }),
      getUser: async () => ({ data: null, error: null })
    },
    from: () => ({
      select: () => ({ data: null, error: null }),
      insert: () => ({ data: null, error: null }),
      update: () => ({ data: null, error: null }),
      delete: () => ({ data: null, error: null })
    })
  }
}

export { supabase }

// Tipos para o banco de dados
export interface User {
  id: string
  email: string
  name: string
  created_at: string
}

export interface UserProgress {
  id: string
  user_id: string
  current_day: number
  total_days: number
  water_intake: number
  fasting_hours: number
  created_at: string
  last_updated: string
}

export interface UserFavorites {
  id: string
  user_id: string
  recipe_id: number
  created_at: string
}

export interface ShoppingList {
  id: string
  user_id: string
  item_name: string
  is_completed: boolean
  priority: 'high' | 'medium' | 'low'
  created_at: string
  updated_at: string
}
