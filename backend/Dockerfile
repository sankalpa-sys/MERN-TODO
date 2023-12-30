FROM node:18-alpine
FROM mongo-express:1.0.0-alpha.4
WORKDIR /app/backend
COPY package.json .
RUN npm install
COPY . .
CMD npm start
EXPOSE 8001