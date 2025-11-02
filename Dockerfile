# Etapa 1: Build Angular
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx ng build --configuration production

# Etapa 2: Servir com Nginx
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*

# Copia o conteúdo da pasta do projeto dentro de dist
# /app/dist/* pega a pasta do projeto
COPY --from=build /app/dist/*/* /usr/share/nginx/html/

# Configuração do Nginx para Angular na porta 4000
RUN echo 'server { \
    listen 4000; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html index.htm; \
    location / { try_files $uri $uri/ /index.html; } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 4000
CMD ["nginx", "-g", "daemon off;"]
