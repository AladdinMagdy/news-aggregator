FROM node:20-alpine3.17 as development
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build

#Production build
FROM nginx:1.25.3-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=development /app/build .
ENTRYPOINT ["nginx", "-g", "daemon off;"]