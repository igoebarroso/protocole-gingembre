# 🗄️ Como Executar o Script SQL no Supabase

## 📋 Pré-requisitos
- ✅ Projeto Supabase criado
- ✅ Acesso ao painel do Supabase

---

## 🔧 Passo a Passo Detalhado

### 1. Acessar o SQL Editor
1. **Faça login** no Supabase: https://supabase.com
2. **Clique no seu projeto** na lista
3. **No menu lateral esquerdo**, clique em **"SQL Editor"**
4. **Clique em "New query"** (botão azul)

### 2. Copiar o Script SQL
1. **Abra o arquivo** `supabase-schema.sql` no seu projeto
2. **Selecione TODO o conteúdo** (Ctrl+A)
3. **Copie** (Ctrl+C)

### 3. Colar no Supabase
1. **Cole o script** no editor SQL do Supabase
2. **Verifique se o conteúdo está completo**

### 4. Executar o Script
1. **Clique no botão "Run"** (botão azul com play ▶️)
2. **Aguarde a execução** (pode demorar alguns segundos)
3. **Verifique se não há erros** na aba "Results"

---

## ✅ Verificar se Funcionou

### 1. Ir para Table Editor
1. **No menu lateral**, clique em **"Table Editor"**
2. **Você deve ver 3 tabelas:**
   - `user_progress`
   - `user_favorites`
   - `shopping_list`

### 2. Verificar Estrutura das Tabelas
1. **Clique em cada tabela** para ver as colunas
2. **Verifique se as colunas estão corretas**

---

## 🆘 Se Não Funcionou

### ❌ Erro: "relation already exists"
- **Solução:** As tabelas já existem
- **Ação:** Pule este passo, as tabelas já estão criadas

### ❌ Erro: "permission denied"
- **Solução:** Você não tem permissão
- **Ação:** Verifique se está logado corretamente

### ❌ Erro: "syntax error"
- **Solução:** Copie o script novamente
- **Ação:** Verifique se copiou tudo corretamente

---

## 🔍 Script SQL Completo

Se precisar copiar novamente, aqui está o script:

```sql
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
```

---

## 📞 Precisa de Ajuda?

Se ainda não conseguir criar as tabelas:

1. **Screenshot:** Tire um print da tela do SQL Editor
2. **Erro:** Copie a mensagem de erro exata
3. **Descreva:** O que você fez e onde parou

**Vou te ajudar a resolver!** 🚀
