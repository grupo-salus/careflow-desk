# ⚙️ Configuração do GitHub Pages

## 🔧 Problema Atual

O GitHub Pages está mostrando o README ao invés do site porque está configurado para usar a branch `main` ao invés do GitHub Actions.

## ✅ Solução

### Passo 1: Configurar GitHub Pages para usar GitHub Actions

1. Vá para o repositório no GitHub: https://github.com/grupo-salus/careflow-desk
2. Clique em **Settings** (Configurações)
3. No menu lateral, clique em **Pages**
4. Em **Source** (Fonte), altere de:
   - ❌ **Deploy from a branch** → `main` → `/ (root)`
   
   Para:
   - ✅ **GitHub Actions**
5. Clique em **Save** (Salvar)

### Passo 2: Verificar se o Workflow está funcionando

1. Vá para **Actions** no repositório
2. Verifique se o workflow **"Deploy to GitHub Pages"** está rodando
3. Se não estiver rodando, clique em **"Run workflow"** manualmente

### Passo 3: Aguardar o Deploy

Após configurar para usar GitHub Actions, o workflow irá:
1. Fazer build do projeto
2. Criar arquivo `.nojekyll`
3. Fazer upload dos arquivos da pasta `dist/`
4. Fazer deploy para GitHub Pages

## 🌐 URL do Site

Após o deploy, o site estará disponível em:
**https://grupo-salus.github.io/careflow-desk/**

## ⚠️ Importante

- O GitHub Pages **deve** estar configurado para usar **GitHub Actions**, não a branch `main`
- O arquivo `.nojekyll` é criado automaticamente pelo workflow
- O `base: '/careflow-desk/'` no `vite.config.ts` está correto

## 🔍 Verificação

Após configurar, você deve ver:
- ✅ O site React funcionando (não o README)
- ✅ Todos os componentes carregando corretamente
- ✅ Assets (CSS, JS) carregando com o caminho `/careflow-desk/assets/...`

