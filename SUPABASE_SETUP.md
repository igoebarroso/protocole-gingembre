# 🚀 Configuração do Supabase

Este guia te ajudará a configurar o Supabase para o app Gingembre Pro.

## 📋 Pré-requisitos

1. Conta no [Supabase](https://supabase.com)
2. Projeto criado no Supabase

## 🔧 Passo a Passo

### 1. Criar Projeto no Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Clique em "New Project"
3. Escolha sua organização
4. Digite um nome para o projeto (ex: "gingembre-pro")
5. Escolha uma senha forte para o banco de dados
6. Escolha uma região próxima
7. Clique em "Create new project"

### 2. Configurar Banco de Dados

1. No dashboard do Supabase, vá para **SQL Editor**
2. Clique em **"New query"**
3. Copie e cole o conteúdo do arquivo `supabase-schema.sql`
4. Clique em **"Run"** para executar o script

### 3. Obter Credenciais

1. No dashboard do Supabase, vá para **Settings** → **API**
2. Copie as seguintes informações:
   - **Project URL** (ex: `https://your-project.supabase.co`)
   - **anon public** key

### 4. Configurar Variáveis de Ambiente

1. Crie um arquivo `.env.local` na raiz do projeto
2. Adicione as seguintes variáveis:

```env
NEXT_PUBLIC_SUPABASE_URL=sua_project_url_aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_anon_key_aqui
```

### 5. Configurar Autenticação

1. No dashboard do Supabase, vá para **Authentication** → **Settings**
2. Em **Site URL**, adicione: `http://localhost:3000`
3. Em **Redirect URLs**, adicione: `http://localhost:3000/accueil`
4. Salve as configurações

### 6. Configurar Email (Opcional)

1. Em **Authentication** → **Settings** → **SMTP Settings**
2. Configure um provedor de email (Gmail, SendGrid, etc.)
3. Isso permitirá confirmação de email para novos usuários

## 🧪 Testando a Integração

1. Execute o projeto: `npm run dev`
2. Acesse `http://localhost:3000`
3. Tente criar uma conta nova
4. Verifique se os dados aparecem no Supabase

## 📊 Verificando os Dados

### No Supabase Dashboard:

1. **Table Editor** → `user_progress` - Progresso dos usuários
2. **Table Editor** → `user_favorites` - Receitas favoritas
3. **Table Editor** → `shopping_list` - Lista de compras
4. **Authentication** → **Users** - Usuários registrados

## 🔒 Segurança

O projeto já está configurado com:
- ✅ Row Level Security (RLS) habilitado
- ✅ Políticas de acesso por usuário
- ✅ Validação de dados
- ✅ Índices para performance

## 🚨 Troubleshooting

### Erro de CORS
- Verifique se as URLs estão corretas em **Authentication** → **Settings**

### Erro de RLS
- Verifique se as políticas foram criadas corretamente
- Execute novamente o script SQL

### Erro de Conexão
- Verifique se as variáveis de ambiente estão corretas
- Reinicie o servidor após adicionar as variáveis

## 📱 Funcionalidades Implementadas

- ✅ Autenticação com email/senha
- ✅ Sincronização de dados em tempo real
- ✅ Progresso do usuário persistente
- ✅ Lista de favoritos
- ✅ Lista de compras
- ✅ Logout automático

## 🔄 Próximos Passos

1. **Deploy**: Configure as variáveis de ambiente no seu servidor de produção
2. **Backup**: Configure backups automáticos no Supabase
3. **Monitoramento**: Use o dashboard do Supabase para monitorar uso
4. **Escalabilidade**: Configure Edge Functions se necessário

## 📞 Suporte

Se encontrar problemas:
1. Verifique os logs no console do navegador
2. Verifique os logs no Supabase Dashboard
3. Consulte a [documentação do Supabase](https://supabase.com/docs)
