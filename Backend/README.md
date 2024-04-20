# CRM Project Server

## Introducción

La plataforma CRM (Customer Relationship Management) es un sistema diseñado para gestionar las relaciones y las interacciones con los clientes. Proporciona a las empresas herramientas para administrar contactos, automatizar procesos de ventas, realizar seguimiento de clientes potenciales, analizar datos y mejorar la retención de clientes. Este proyecto de backend en Node.js busca ofrecer una solución eficiente para la gestión de relaciones con los clientes, permitiendo a las empresas organizar y optimizar sus actividades comerciales de manera efectiva.

## Getting Started

Para ejecutar el backend, sigue estos pasos:

1. Instala las dependencias:

    ```bash
    npm install
    ```

2. Crea un archivo `.env` en el directorio raíz del proyecto y completa la configuración necesaria. Aquí hay un ejemplo de cómo podría verse el archivo `.env`:

    ```plaintext
    # Configuración de MySQL
    MYSQL_HOST=
    MYSQL_PORT=
    MYSQL_USER=
    MYSQL_PASSWORD=
    MYSQL_DATABASE=

    # Puerto del servidor
    PORT=

    # Clave secreta para JWT
    JWT_SECRET=

    # Directorio de carga de archivos
    UPLOADS_DIR=uploads

    # Credenciales para MAILTRAP (testing emails https://mailtrap.io/)
    MAIL_TRAP_HOST=
    MAIL_TRAP_PORT=
    MAIL_TRAP_AUTH_USER=
    MAIL_TRAP_AUTH_PASS=
    ```

    Asegúrate de completar los campos con la información específica de tu entorno de desarrollo.

3. Crea una carpeta de UPLOADS en la raiz del proyecto.

4. Inicializa la base de datos:

    ```bash
    npm run initDb
    ```

5. Inicia el servidor:

    ```bash
    npm run dev
    ```

## Endpoints

- **POST /user/register**: Crea un nuevo usuario (solo para administradores). ✅
- **POST /users/:id**: Desactiva un usuario (solo para administradores). 
- **PUT /user/validate/:registration_code**: Valida un usuario. ✅
- **POST /users/login**: Inicio de sesión de usuario. ✅
- **POST /users/forgot-password**: Recuperación de contraseña.
- **PUT /reset-password-request**: Cambio de contraseña.
- **PUT /user/update/:id_user**: Gestión del perfil de usuario (no administrador). ✅
- **POST /customer/register**: Crea un cliente. ✅
- **PUT /customer/:customerId**: Actualiza un cliente. ✅
- **GET /customer/list**: Listado de clientes. ✅
- **POST /products**: Crea un producto (solo para administradores).
- **PUT /products/:id**: Actualiza un producto (solo para administradores).
- **DELETE /products/:id**: Elimina lógicamente un producto (solo para administradores).

## Middlewares

- **Middleware 404 not found**: Maneja las solicitudes a rutas no encontradas. ✅
- **Middleware gestión de errores**: Maneja los errores ocurridos durante el proceso de solicitud. ✅
- **Middleware request body parsing**: Analiza el cuerpo de la solicitud para extraer datos. ✅
- **Middleware file upload**: Procesa la carga de archivos en las solicitudes. ✅
- **Middleware definition of static resources directory (images, files)**: Define el directorio de recursos estáticos como imágenes y archivos. ✅
- **Middleware CORS**: Permite las solicitudes de recursos desde un origen diferente al del servidor. ✅
- **Middleware user authentication verification**: Verifica la autenticación de los usuarios antes de permitir el acceso a ciertas rutas. ✅

--- 
