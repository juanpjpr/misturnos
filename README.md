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
bloque de código Markdown. Puedes copiar todo este contenido y pegarlo directamente en tu archivo README.md.


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

El proyecto sigue una arquitectura modular **MVC-lite**:

proyecto-turnos-backend/
├── config/ # Conexión a la DB
├── controllers/ # Lógica de negocio (CRUD y Auth)
├── models/ # Esquemas de Mongoose (Turno.js, Usuario.js)
├── routes/ # Definición de URLs (turnos.js, auth.js)
├── middleware/ # Verificación de JWT
└── server.js # Archivo principal de Express

El servidor se ejecutará en http://localhost:4000.

# 🛡️ Rutas de la API y Seguridad (JWT)

## I. Flujo de Autenticación (JWT)

Para acceder a las rutas protegidas, primero debe obtenerse un token:

| Método | URL                | Descripción                  |
|--------|--------------------|------------------------------|
| POST   | /api/auth/register | Crea un nuevo usuario.       |
| POST   | /api/auth/login    | Inicia sesión y devuelve el JWT. |

---

## II. Rutas de Gestión de Turnos (CRUD)

> Todas las rutas marcadas como **PROTEGIDA** requieren enviar el JWT en el encabezado `x-auth-token`.

| Método | URL               | Descripción                                                                 | Estado    |
|--------|-------------------|-----------------------------------------------------------------------------|-----------|
| POST   | /api/turnos       | **CREATE:** Crea un nuevo turno. Incluye validación de disponibilidad.      | PROTEGIDA |
| GET    | /api/turnos       | **READ:** Obtiene todos los turnos. (Soporta filtro por `?fecha=YYYY-MM-DD`). | PÚBLICA   |
| PUT    | /api/turnos/:id   | **UPDATE:** Modifica un turno existente (ej. cambia el estado a 'Confirmado'). | PROTEGIDA |
| DELETE | /api/turnos/:id   | **DELETE:** Elimina un turno por ID.                                        | PROTEGIDA |
