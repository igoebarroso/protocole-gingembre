# 🚀 Guia Completo: Configuração do Supabase

## 📋 Pré-requisitos
- Conta no Supabase (gratuita): https://supabase.com
- Navegador web
- Editor de código (VS Code, etc.)

---

## 🔧 Passo 1: Criar Projeto no Supabase

### 1.1 Acessar Supabase
1. Vá para: https://supabase.com
2. Clique em **"Start your project"** ou **"Sign In"**
3. Faça login com GitHub, Google ou email

### 1.2 Criar Novo Projeto
1. Clique em **"New Project"**
2. Escolha sua organização
3. **Nome do Projeto:** `gingembre-pro` (ou qualquer nome)
4. **Database Password:** Crie uma senha forte (guarde-a!)
5. **Region:** Escolha a mais próxima (ex: São Paulo)
6. Clique em **"Create new project"**

### 1.3 Aguardar Configuração
- ⏱️ Aguarde 2-3 minutos para o projeto ser criado
- ✅ Status: "Project is ready"

---

## 🗄️ Passo 2: Configurar Banco de Dados

### 2.1 Acessar SQL Editor
1. No painel do Supabase, clique em **"SQL Editor"** (menu lateral)
2. Clique em **"New query"**

### 2.2 Executar Script SQL
1. Cole o seguinte código SQL:

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

2. Clique em **"Run"** para executar

### 2.3 Verificar Tabelas
1. Vá para **"Table Editor"** (menu lateral)
2. Você deve ver 3 tabelas criadas:
   - `user_progress`
   - `user_favorites` 
   - `shopping_list`

---

## 🔑 Passo 3: Obter Credenciais da API

### 3.1 Acessar Configurações
1. No menu lateral, clique em **"Settings"** (ícone de engrenagem)
2. Clique em **"API"**

### 3.2 Copiar Credenciais
1. **Project URL:** Copie a URL (ex: `https://abcdefghijklmnop.supabase.co`)
2. **anon public:** Copie a chave anônima (começa com `eyJ...`)

---

## ⚙️ Passo 4: Configurar Variáveis de Ambiente

### 4.1 Criar Arquivo .env.local
1. No seu projeto, crie um arquivo chamado `.env.local` na raiz
2. Adicione o seguinte conteúdo:

```env
NEXT_PUBLIC_SUPABASE_URL=sua_project_url_aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_aqui
```

### 4.2 Exemplo Completo
```env
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNjU0NzIwMCwiZXhwIjoxOTUyMTIzMjAwfQ.exemplo_chave_aqui
```

---

## 🔐 Passo 5: Configurar Autenticação

### 5.1 Acessar Authentication
1. No menu lateral, clique em **"Authentication"**
2. Clique em **"Settings"**

### 5.2 Configurar URLs
1. **Site URL:** `http://localhost:3001` (para desenvolvimento)
2. **Redirect URLs:** Adicione:
   - `http://localhost:3001/auth/callback`
   - `http://localhost:3001/login`
   - `http://localhost:3001/accueil`

### 5.3 Configurar Email (Opcional)
1. Vá para **"Email Templates"**
2. Personalize os emails de confirmação se desejar
3. Ou mantenha os templates padrão

---

## 🧪 Passo 6: Testar Integração

### 6.1 Reiniciar Servidor
```bash
# Pare o servidor (Ctrl+C)
# Reinicie
npm run dev
```

### 6.2 Testar Login
1. Acesse: `http://localhost:3001`
2. Clique em **"Criar conta"**
3. Digite email e senha
4. Verifique se recebeu email de confirmação
5. Faça login

### 6.3 Verificar Dados
1. No Supabase, vá para **"Table Editor"**
2. Clique em **"user_progress"**
3. Você deve ver uma nova linha com seus dados

---

## 🔍 Passo 7: Verificar Funcionalidades

### 7.1 Testar Recursos
- ✅ **Login/Registro:** Deve funcionar com Supabase
- ✅ **Progresso:** Salva automaticamente no banco
- ✅ **Favoritos:** Funciona com persistência
- ✅ **Lista de Compras:** Salva no banco
- ✅ **Perfil:** Mostra dados do usuário

### 7.2 Verificar Console
1. Abra **DevTools** (F12)
2. Vá para **Console**
3. Não deve haver erros de Supabase

---

## 🚀 Passo 8: Deploy (Opcional)

### 8.1 Para Produção
Quando for fazer deploy, atualize as URLs no Supabase:
1. **Site URL:** `https://seu-dominio.com`
2. **Redirect URLs:** 
   - `https://seu-dominio.com/auth/callback`
   - `https://seu-dominio.com/login`

### 8.2 Variáveis de Ambiente
Configure as mesmas variáveis no seu serviço de deploy (Vercel, Netlify, etc.)

---

## 🆘 Solução de Problemas

### ❌ Erro: "supabaseUrl is required"
- Verifique se o arquivo `.env.local` existe
- Confirme se as variáveis estão corretas
- Reinicie o servidor

### ❌ Erro: "Invalid API key"
- Verifique se copiou a chave correta
- Confirme se é a chave "anon public"

### ❌ Erro: "User not found"
- Verifique se o usuário foi criado no Supabase
- Confirme se as políticas RLS estão corretas

### ❌ Erro: "Table doesn't exist"
- Execute novamente o script SQL
- Verifique se as tabelas foram criadas

---

## 📞 Suporte

Se precisar de ajuda:
1. **Documentação Supabase:** https://supabase.com/docs
2. **Discord Supabase:** https://discord.supabase.com
3. **GitHub Issues:** Para problemas específicos do projeto

---

## ✅ Checklist Final

- [ ] Projeto Supabase criado
- [ ] Tabelas criadas com SQL
- [ ] Credenciais copiadas
- [ ] Arquivo `.env.local` configurado
- [ ] URLs de autenticação configuradas
- [ ] Login funcionando
- [ ] Dados salvos no banco
- [ ] Todas as funcionalidades testadas

**🎉 Parabéns! Seu app está totalmente integrado com Supabase!**
