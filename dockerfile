# Etapa 1: Construcción
FROM node:18 AS build

WORKDIR /app

# Copiar los archivos package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de los archivos de la aplicación
COPY . .

# Definir las variables de entorno para React (se pasan como ARG)
ARG REACT_APP_HOST_PYTHON_BACKEND
ARG REACT_APP_PORT_PYTHON_BACKEND

ARG REACT_APP_HOST_NODE_BACKEND
ARG REACT_APP_PORT_NODE_BACKEND


# Establecer las variables de entorno para React
ENV REACT_APP_HOST_PYTHON_BACKEND=$REACT_APP_HOST_PYTHON_BACKEND
ENV REACT_APP_PORT_PYTHON_BACKEND=$REACT_APP_PORT_PYTHON_BACKEND

ENV REACT_APP_HOST_NODE_BACKEND=$REACT_APP_HOST_NODE_BACKEND
ENV REACT_APP_PORT_NODE_BACKEND=$REACT_APP_PORT_NODE_BACKEND

# Construir la aplicación para producción
RUN npm run build

# Etapa 2: Servir con Nginx
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

# Exponer el puerto
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
