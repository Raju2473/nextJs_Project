# ---------- Stage 1: Build ----------
FROM node:18-alpine AS builder

WORKDIR /app

ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=$NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


# ---------- Stage 2: Runtime ----------
FROM node:18-alpine

WORKDIR /app
ENV NODE_ENV=production

# runtime secrets will be injected by Kubernetes
ENV MONGODB_URI=""
ENV CLERK_SECRET_KEY=""

COPY --from=builder /app/package*.json ./
RUN npm install --only=production

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./

EXPOSE 3000

CMD ["npm", "run", "start"]
