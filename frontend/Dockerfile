FROM node:18-alpine

WORKDIR /app

COPY package.json .
COPY package-lock.json .

EXPOSE 8080

CMD [ -d "node_modules" ] && npm run dev || npm ci && npm run dev


# CMD [ "npm", "run", "dev" ]