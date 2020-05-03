FROM node:12

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
EXPOSE 8000

CMD ["node", "server.js"]