@echo off
set PATH=C:\Program Files\Git\cmd;%PATH%

echo === Configuring Git identity ===
git config user.email "ChristianOUSSI@users.noreply.github.com"
git config user.name "ChristianOUSSI"

echo === Adding all files ===
git add -A

echo === Committing ===
git commit -m "feat: full catalog with 124 products, bilingual i18n, product images, and complete UI"

echo === Pushing to main ===
git push -u origin main

echo === Done ===
