# Script de deploy manual para GitHub Pages
Write-Host "🚀 Iniciando deploy para GitHub Pages..." -ForegroundColor Cyan

# Build do projeto
Write-Host "📦 Fazendo build do projeto..." -ForegroundColor Yellow
pnpm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro no build! Abortando deploy." -ForegroundColor Red
    exit 1
}

# Criar arquivo .nojekyll
Write-Host "📝 Criando arquivo .nojekyll..." -ForegroundColor Yellow
New-Item -ItemType File -Path "dist\.nojekyll" -Force | Out-Null

# Verificar se a branch gh-pages existe
Write-Host "🔍 Verificando branch gh-pages..." -ForegroundColor Yellow
$ghPagesExists = git branch -r | Select-String "origin/gh-pages"

if (-not $ghPagesExists) {
    Write-Host "📌 Criando branch gh-pages..." -ForegroundColor Yellow
    git checkout --orphan gh-pages
    git rm -rf .
} else {
    Write-Host "📌 Mudando para branch gh-pages..." -ForegroundColor Yellow
    git checkout gh-pages
    git pull origin gh-pages
}

# Copiar arquivos da pasta dist
Write-Host "📋 Copiando arquivos da pasta dist..." -ForegroundColor Yellow
Get-ChildItem -Path "dist" -Recurse | Copy-Item -Destination "." -Recurse -Force

# Adicionar e commitar
Write-Host "💾 Adicionando arquivos..." -ForegroundColor Yellow
git add .

Write-Host "📝 Fazendo commit..." -ForegroundColor Yellow
git commit -m "Deploy: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"

# Push para GitHub
Write-Host "🚀 Fazendo push para GitHub Pages..." -ForegroundColor Yellow
git push origin gh-pages --force

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Deploy concluído com sucesso!" -ForegroundColor Green
    Write-Host "🌐 Site disponível em: https://grupo-salus.github.io/careflow-desk/" -ForegroundColor Cyan
} else {
    Write-Host "❌ Erro no push! Verifique as credenciais do Git." -ForegroundColor Red
    exit 1
}

# Voltar para branch main
Write-Host "🔄 Voltando para branch main..." -ForegroundColor Yellow
git checkout main

Write-Host "✨ Processo concluído!" -ForegroundColor Green

