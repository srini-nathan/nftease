# Build the client
FROM node:lts-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install -qy
COPY . .
RUN npm run build

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html