# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# ✅ added (only)
ARG MONGODB_URI
ENV MONGODB_URI=$MONGODB_URI

ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=$NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Run
FROM node:18-alpine

WORKDIR /app

ENV NODE_ENV=production

# ✅ added (only)
ARG MONGODB_URI
ENV MONGODB_URI=$MONGODB_URI

COPY --from=builder /app/package*.json ./
RUN npm install --only=production

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public


EXPOSE 3000

CMD ["npm", "run", "start"]
