import { useState, useEffect } from 'react'
import { supabase, UserProgress, UserFavorites, ShoppingList } from '@/lib/supabase'
import { toast } from 'sonner'

// Hook para gerenciar progresso do usuário
export function useUserProgress(userId: string | null) {
  const [progress, setProgress] = useState<UserProgress | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) {
      setLoading(false)
      return
    }

    fetchUserProgress()
  }, [userId])

  const fetchUserProgress = async () => {
    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', userId)
        .single()

      if (error && error.code !== 'PGRST116') {
        throw error
      }

      if (data) {
        setProgress(data)
      } else {
        // Criar progresso inicial se não existir
        await createInitialProgress()
      }
    } catch (error) {
      console.error('Erro ao buscar progresso:', error)
      toast.error('Erro ao carregar dados')
    } finally {
      setLoading(false)
    }
  }

  const createInitialProgress = async () => {
    try {
      const { data, error } = await supabase
        .from('user_progress')
        .insert({
          user_id: userId,
          current_day: 1,
          completed_challenges: [],
          water_count: 0,
          calories_burned: 0
        })
        .select()
        .single()

      if (error) throw error
      setProgress(data)
    } catch (error) {
      console.error('Erro ao criar progresso inicial:', error)
    }
  }

  const updateProgress = async (updates: Partial<UserProgress>) => {
    try {
      const { data, error } = await supabase
        .from('user_progress')
        .update(updates)
        .eq('user_id', userId)
        .select()
        .single()

      if (error) throw error
      setProgress(data)
      return data
    } catch (error) {
      console.error('Erro ao atualizar progresso:', error)
      toast.error('Erro ao salvar dados')
      return null
    }
  }

  return { progress, loading, updateProgress }
}

// Hook para gerenciar favoritos
export function useUserFavorites(userId: string | null) {
  const [favorites, setFavorites] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) {
      setLoading(false)
      return
    }

    fetchFavorites()
  }, [userId])

  const fetchFavorites = async () => {
    try {
      const { data, error } = await supabase
        .from('user_favorites')
        .select('recipe_id')
        .eq('user_id', userId)

      if (error) throw error
      setFavorites(data.map(fav => fav.recipe_id))
    } catch (error) {
      console.error('Erro ao buscar favoritos:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleFavorite = async (recipeId: string) => {
    try {
      const isFavorite = favorites.includes(recipeId)
      
      if (isFavorite) {
        // Remover favorito
        const { error } = await supabase
          .from('user_favorites')
          .delete()
          .eq('user_id', userId)
          .eq('recipe_id', recipeId)

        if (error) throw error
        setFavorites(favorites.filter(id => id !== recipeId))
        toast.success('Receita removida dos favoritos')
      } else {
        // Adicionar favorito
        const { error } = await supabase
          .from('user_favorites')
          .insert({
            user_id: userId,
            recipe_id: recipeId
          })

        if (error) throw error
        setFavorites([...favorites, recipeId])
        toast.success('Receita adicionada aos favoritos')
      }
    } catch (error) {
      console.error('Erro ao atualizar favoritos:', error)
      toast.error('Erro ao atualizar favoritos')
    }
  }

  return { favorites, loading, toggleFavorite }
}

// Hook para gerenciar lista de compras
export function useShoppingList(userId: string | null) {
  const [items, setItems] = useState<ShoppingList[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) {
      setLoading(false)
      return
    }

    fetchShoppingList()
  }, [userId])

  const fetchShoppingList = async () => {
    try {
      const { data, error } = await supabase
        .from('shopping_list')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (error) throw error
      setItems(data || [])
    } catch (error) {
      console.error('Erro ao buscar lista de compras:', error)
    } finally {
      setLoading(false)
    }
  }

  const addItem = async (item: Omit<ShoppingList, 'id' | 'user_id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('shopping_list')
        .insert({
          ...item,
          user_id: userId
        })
        .select()
        .single()

      if (error) throw error
      setItems([data, ...items])
      toast.success('Item adicionado à lista')
      return data
    } catch (error) {
      console.error('Erro ao adicionar item:', error)
      toast.error('Erro ao adicionar item')
      return null
    }
  }

  const updateItem = async (id: string, updates: Partial<ShoppingList>) => {
    try {
      const { data, error } = await supabase
        .from('shopping_list')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      setItems(items.map(item => item.id === id ? data : item))
      return data
    } catch (error) {
      console.error('Erro ao atualizar item:', error)
      toast.error('Erro ao atualizar item')
      return null
    }
  }

  const deleteItem = async (id: string) => {
    try {
      const { error } = await supabase
        .from('shopping_list')
        .delete()
        .eq('id', id)

      if (error) throw error
      setItems(items.filter(item => item.id !== id))
      toast.success('Item removido da lista')
    } catch (error) {
      console.error('Erro ao deletar item:', error)
      toast.error('Erro ao remover item')
    }
  }

  return { items, loading, addItem, updateItem, deleteItem }
}
