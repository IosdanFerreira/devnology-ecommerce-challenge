#!/bin/bash

while ! nc -z db 5432; do
  echo "⏳ Aguardando o PostgreSQL iniciar..."
  sleep 2
done

npm install
npm run build
npm install prisma -D
npm install @prisma/client
npx prisma generate
npx prisma migrate dev
npm run start:dev