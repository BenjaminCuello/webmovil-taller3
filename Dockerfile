FROM node:20-bullseye-slim

WORKDIR /app

COPY package.json package-lock.json prisma.config.ts ./
COPY backend/prisma ./backend/prisma

RUN npm ci

ENV DATABASE_URL="postgresql://postgres:postgres@db:5432/taller3_db?schema=public"

RUN npx prisma generate

COPY . .

EXPOSE 3000

CMD ["sh", "-c", "npm run prisma:sync && npm run prisma:seed && npm run dev"]

