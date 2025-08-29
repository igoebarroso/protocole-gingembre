-- =====================================================
-- SCHEMA COMPLETO PARA SUPABASE - GINGEMBRE PRO
-- =====================================================

-- Criar tabela de progresso do usuário
CREATE TABLE user_progress (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    current_day INTEGER DEFAULT 1,
    total_days INTEGER DEFAULT 30,
    water_intake INTEGER DEFAULT 0,
    fasting_hours INTEGER DEFAULT 0,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de receitas favoritas
CREATE TABLE user_favorites (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    recipe_id INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de lista de compras
CREATE TABLE shopping_list (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    item_name TEXT NOT NULL,
    is_completed BOOLEAN DEFAULT FALSE,
    priority TEXT DEFAULT 'medium',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para shopping_list
CREATE TRIGGER update_shopping_list_updated_at 
    BEFORE UPDATE ON shopping_list 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Habilitar Row Level Security (RLS)
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE shopping_list ENABLE ROW LEVEL SECURITY;

-- Políticas de segurança para user_progress
CREATE POLICY "Users can view own progress" ON user_progress
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress" ON user_progress
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress" ON user_progress
    FOR UPDATE USING (auth.uid() = user_id);

-- Políticas de segurança para user_favorites
CREATE POLICY "Users can view own favorites" ON user_favorites
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own favorites" ON user_favorites
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own favorites" ON user_favorites
    FOR DELETE USING (auth.uid() = user_id);

-- Políticas de segurança para shopping_list
CREATE POLICY "Users can view own shopping list" ON shopping_list
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own shopping list items" ON shopping_list
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own shopping list items" ON shopping_list
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own shopping list items" ON shopping_list
    FOR DELETE USING (auth.uid() = user_id);

-- Criar índices para performance
CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX idx_user_favorites_user_id ON user_favorites(user_id);
CREATE INDEX idx_shopping_list_user_id ON shopping_list(user_id);

-- =====================================================
-- DADOS INICIAIS (OPCIONAL)
-- =====================================================

-- Inserir algumas receitas de exemplo (se necessário)
-- CREATE TABLE recipes (
--     id SERIAL PRIMARY KEY,
--     name TEXT NOT NULL,
--     description TEXT,
--     image_url TEXT,
--     ingredients TEXT[],
--     instructions TEXT[],
--     category TEXT,
--     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
-- );

-- =====================================================
-- COMENTÁRIOS SOBRE O SCHEMA
-- =====================================================

/*
ESTRUTURA DAS TABELAS:

1. user_progress:
   - Armazena o progresso diário do usuário
   - Inclui dia atual, total de dias, água, jejum
   - Atualizado automaticamente

2. user_favorites:
   - Lista de receitas favoritas do usuário
   - Relacionamento simples com recipe_id

3. shopping_list:
   - Lista de compras personalizada
   - Inclui prioridade e status de conclusão
   - Atualizado automaticamente com trigger

SEGURANÇA:
- Todas as tabelas têm RLS habilitado
- Políticas garantem que usuários só vejam seus próprios dados
- Relacionamentos com auth.users para autenticação

PERFORMANCE:
- Índices criados para user_id em todas as tabelas
- Triggers para atualização automática de timestamps
*/
