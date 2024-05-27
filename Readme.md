# FullStack - Desafío integrador parte 3

## Tecnologías

Esta es una api desarrollada con nodeJS, Express y MongoDB. Se instalaron las siguientes librerias:

*dotenv: para manipular las variables de ambiente.
*express: para gestionar la estructura y el funcionamiento del servidor y sus rutas.
*express-validator: para añadir las validaciones previas a los controladores (middlewares).
*mongoose: para interactuar con la base de datos de MongoDB.
*multer: para tratar las imágenes cargadas en el alta de productos.

## Instalación

El primer paso es instalar las dependencias de node, con el siguiente comando, dentro de la carpeta del proyecto:

```
npm install
```

En segunda instancia, crear en la raiz del proyecto un archivo ".env" con los siguientes valores de variables:

```
PORT=3001
DB_URL_CONNECTION=mongodb+srv://carlosbarriosf:Degradito15@cluster0.xseba8s.mongodb.net/jugueteria-cosmica
BASE_URL=http://localhost:3001
```

Finalmente, levantar el servidor con el comando:

```
npm run dev
```
