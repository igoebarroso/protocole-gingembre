# 🔧 Configuração das Variáveis de Ambiente

## 📝 Passo a Passo

### 1. Criar Arquivo .env.local
Na raiz do seu projeto, crie um arquivo chamado `.env.local`

### 2. Adicionar Conteúdo
Cole o seguinte conteúdo no arquivo:

```env
NEXT_PUBLIC_SUPABASE_URL=sua_project_url_aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_aqui
```

### 3. Substituir Valores
Substitua os valores pelas suas credenciais do Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNjU0NzIwMCwiZXhwIjoxOTUyMTIzMjAwfQ.exemplo_chave_aqui
```

## 🔍 Como Obter as Credenciais

### 1. Acessar Supabase
- Vá para: https://supabase.com
- Faça login na sua conta

### 2. Selecionar Projeto
- Clique no seu projeto criado

### 3. Ir para Settings > API
- No menu lateral, clique em **"Settings"**
- Clique em **"API"**

### 4. Copiar Credenciais
- **Project URL:** Copie a URL completa
- **anon public:** Copie a chave anônima

## ⚠️ Importante

- ✅ **NUNCA** commite o arquivo `.env.local` no git
- ✅ O arquivo `.env.local` já está no `.gitignore`
- ✅ Reinicie o servidor após criar o arquivo
- ✅ Use `npm run dev` para testar

## 🧪 Teste

Após configurar, teste acessando:
- http://localhost:3001
- Tente fazer login/registro
- Verifique se não há erros no console
