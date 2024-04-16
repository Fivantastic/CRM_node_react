# Creación de un servidor HTTP

## INICIAR AL CLONAR EL PROYECTO

- npm i
- Crear el `.env` basado en el `.env.example`

## Descripción

Creacion del servidor de nuestro proyecto integreador de CRM.

## Iniciado un proyecto de Node

Iniciado un Proyecto de NodeJs con

```bash
npm init -y
```

## Dependencias de Desarrollo

1. Eslint:

   - Instalado

     ```bash
     npm install -D eslint
     ```

   - Configurado:

     ```bash
     npx eslint --init
     ```

     - `y` para instalar `@eslint/create-config@0.4.6`
     - Check syntax and find problems
     - JavaScript modules (import/export)
     - None of these
     - TyScript: No
     - Code run: Desmarcar con 'space' Browser, marcar Node
     - Format: JSON

   - Ejecutado: ESLint analiza los archivos JavaScript en tu proyecto según las reglas definidas en tu archivo de configuración de ESLint `.eslintrc.json` y te informa sobre cualquier problema que encuentre, como errores de sintaxis, problemas de estilo, o posibles problemas de lógica.

     ```bash
     npx eslint
     ```

   - Integrado Eslint-Prettier: `npm install -D eslint-config-prettier`
   - Agregar la siguiente regla en el archivo `.eslintrc.json` para que no considere `next` como error si no lo usamos:

     ```json
     "rules": {
       "no-unused-vars": ["warn", { "argsIgnorePattern": "next" }]
     }
     ```

2. Prettier:

   - Instalado

     ```bash
     npm install -D prettier
     ```

   - Creado archivo `.prettierrc.json`
   - Agregado esta configuración al archivo `.prettierrc.json`:

     ```json
     {
       "trailingComma": "es5",
       "tabWidth": 2,
       "semi": true,
       "singleQuote": true
     }
     ```

## Dependencias (PENDIENTE) --Reunion

1. **bcrypt**: Para el hash y la comparación de contraseñas de forma segura.

   ```bash
   npm install bcrypt
   ```

2. **cors**: Middleware de Express que permite el acceso a recursos de un servidor desde un dominio diferente al del propio servidor.

   ```bash
   npm install cors
   ```

3. **dotenv**: Permite cargar variables de entorno desde un archivo .env para configurar la aplicación.

   ```bash
   npm install dotenv
   ```

4. **express**: Para simplificar el manejo de rutas, solicitudes y respuestas HTTP.

   ```bash
   npm install express
   ```

5. **express-fileupload**: Facilita la carga de archivos desde formularios HTML.

   ```bash
   npm install express-fileupload
   ```

6. **jsonwebtoken**: Implementa la generación y verificación de tokens JWT (JSON Web Tokens) para autenticación.

   ```bash
   npm install jsonwebtoken
   ```

7. **morgan**: Middleware de registro de solicitudes HTTP para Express, que registra los detalles de cada solicitud recibida por el servidor.

   ```bash
   npm install morgan
   ```

8. **mysql2**: Cliente MySQL para Node.js que proporciona una interfaz para interactuar con bases de datos MySQL.

   ```bash
   npm install mysql2
   ```

9. **nodemailer**: Biblioteca para enviar correos electrónicos desde aplicaciones Node.js.

   ```bash
   npm install nodemailer
   ```

10. **sharp**: Librería para el procesamiento de imágenes en Node.js, utilizada para manipular, redimensionar y convertir imágenes.

    ```bash
    npm install sharp
    ```

11. **joi**: Biblioteca para definir y validar la estructura y los tipos de datos de entrada en tu aplicación.

    ```bash
    npm install joi
    ```

## Estructura Principal

1. Creado un archivo `.gitignore` para no subir al repositorio `node_modules`, `.env` ni `uploads`.
2. Creado un archivo `.env` para las Variables de Entorno.
3. Creado un archivo `env.js` para importar las Variables de Entorno y exportarlas para usarlas desde aquí.
4. Creado un archivo `app.js` que va a ser el punto de entrada de nuestra aplicación.
5. Creado el directorio `src` con la estructura de archivos y carpetas necesaria para el proyecto: `controllers`, `db`, `middlewares`, `models`, `routes`, `schemas`, `services`y`utils`.

## Documento package.json

- Añadido

  ```json
  "type": "module"
  ```

## Directorio db

1. Creado los archivos `getPool.js` e `initDb.js`.
2. Creado un **script** en el `package.json` para ejecutar el `initDb.js`.

   ```json
   "scripts": {
      "initDb": "node ./src/db/initDb.js"
   }
   ```

3. Continuar con la creacion de la DB

## Documento app

1. Creado un **script** en el `package.json` para ejecutar el `initDb.js`.

   ```json
   "scripts": {
     "dev": "node --watch app.js"
   }
   ```

2. Continuar con la importación `express`, `fileUpload`, etc...

3. Importar `express`, `morgan`, y de `./env.js` importar `PORT`.

4. Crear el servidor

   ```javascript
   const app = express();
   ```

5. Crear los Milddewares para parsear el `body`

   ```javascript
   app.use(express.json());
   ```

6. Crear el Milddewar de `morgan`

   ```javascript
   app.use(morgan('dev'));
   ```

7. Ponemos el servidor a escuchar

   ```javascript
   app.listen(PORT, () => {
     console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
   });
   ```

## Directorio routes

## Directorio controllers

## Directorio middlewares

## Directorio utils

## Directorio services

## Directorio models

## Directorio schemas
