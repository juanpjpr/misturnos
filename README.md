# 📅 Proyecto: Sistema de Gestión de Turnos (Backend MVP)

Este repositorio contiene el *Backend* (servidor) de un Producto Mínimo Viable (MVP) para la gestión de turnos o citas. La API está construida con **Node.js, Express y MongoDB**, implementando el patrón MVC-lite y un sistema de autenticación **JWT** para la seguridad de las rutas críticas.

## 🚀 Tecnologías Principales

* **Lenguaje:** Node.js
* **Framework Web:** Express
* **Base de Datos:** MongoDB (a través de **MongoDB Atlas**)
* **ORM:** Mongoose
* **Seguridad:** **JSON Web Tokens (JWT)** y bcryptjs (para encriptar contraseñas)
* **Validación:** `express-validator`

---

## ⚙️ Configuración Inicial y Ejecución

Sigue estos pasos para poner el servidor en marcha:

### 1. Instalación de Dependencias

```bash
npm install

### 2. Configuración del Entorno (`.env`)

Crea un archivo llamado **`.env`** en la raíz del directorio `/backend` y añade tus credenciales:

¡Claro! Aquí tienes todos los pasos que me pediste (Paso 2, Paso 3, y Paso 4) unidos en un único bloque de código Markdown. Puedes copiar todo este contenido y pegarlo directamente en tu archivo README.md.

Markdown

### 2. Configuración del Entorno (`.env`)

Crea un archivo llamado **`.env`** en la raíz del directorio `/backend` y añade tus credenciales (¡nunca lo subas a Git!):

.env
URI de Conexión a MongoDB Atlas
MONGO_URI=mongodb+srv://<usuario>:<contraseña>@<cluster>.mongodb.net/turnos-db?retryWrites=true&w=majority

Puerto del Servidor
PORT=4000

Clave Secreta para JWT (¡Úsala para firmar los tokens!)
JWT_SECRET=tu_clave_super_secreta_y_larga_para_jwt_987654321

## 3. Estructura del Proyecto

El proyecto sigue una arquitectura modular **MVC-lite** para mantener la organización y escalabilidad:

El servidor se ejecutará en http://localhost:4000.