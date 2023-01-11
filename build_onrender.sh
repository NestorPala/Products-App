# Build script to deploy on render.com

rm -rf node_modules package-lock.json && npm i && tsc --project tsconfig.json && tsc-alias -p tsconfig.json && cd app && npm i && npx -p @angular/cli@14.2.2 ng build && cd ..