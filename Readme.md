# AdminBot: Gestión de Asistencia y Pagos

Solución integral para centros educativos diseñada para centralizar el control de asistencia, la gestión de cobros y el registro de pagos, con un sistema automatizado de notificaciones a acudientes a través de la API de WhatsApp.

## 🚀 Características Principales

- **Control de Asistencia:** Registro diario con estados (asistió, falta, excusa).
- **Gestión Financiera:** Administración de cuentas por cobrar, abonos y seguimiento de estados de cuenta.
- **Notificaciones Push:** Envío de alertas vía WhatsApp Cloud API (Meta).
- **Arquitectura MVC:** Separación clara entre modelos de datos, lógica y rutas.
- **Seguridad:** Implementación de variables de entorno para proteger credenciales.

## 🛠️ Stack Tecnológico

- **Backend:** Node.js (ES Modules) & Express 5.
- **Base de Datos:** MySQL (usando `mysql2` con pool de conexiones).
- **Integraciones:** WhatsApp Business Cloud API.
- **Desarrollo:** Dotenv, CORS, Nodemon.

## 📂 Estructura del Proyecto

```text
Backend/
├── config/         # Conexión a DB (db.js)
├── controllers/    # Lógica de negocio (procesamiento de peticiones)
├── models/         # Consultas SQL y modelos de datos
├── routes/         # Definición de endpoints API
├── .env            # Variables sensibles (Token, BD) - [NO SUBIR A GITHUB]
├── .gitignore      # Archivos excluidos del repositorio
├── app.js          # Punto de entrada del servidor
└── package.json    # Dependencias y scripts de arranque
```
## ⚙️ Configuración e Instalación
1. Requisitos
Node.js 18+ y MySQL Server.

Token temporal o permanente de Meta for Developers.

2. Instalación

git clone [https://github.com/tu-usuario/adminbot-alejo.git](https://github.com/tu-usuario/adminbot-alejo.git)
cd Backend
npm install

3. Variables de Entorno (.env)
Crea un archivo .env en la raíz de Backend/ con este formato:

PORT=3000
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=adminbot_db

# Meta WhatsApp API
WHATSAPP_TOKEN=tu_token_aqui
PHONE_ID=tu_phone_id_aqui

4. Base de Datos (Tips Importantes)
Esquema: Crea las tablas de estudiantes, acudientes, pagos y asistencias asegurando que las llaves primarias sean consistentes.

Error 1175 (Safe Update Mode): Si al intentar actualizar un registro en MySQL Workbench recibes este error, ejecuta este comando antes de tu query o desactiva la opción en Preferences -> SQL Editor:

SET SQL_SAFE_UPDATES = 0;

5. Ejecución

npm run dev

## 📱 Solución de Problemas de WhatsApp (Meta API)
Error 131030: "Recipient phone number not in allowed list"
Si el mensaje no llega y la terminal muestra el código 131030, se debe a que estás usando el Sandbox de prueba.

Solución: Debes ir al panel de Meta for Developers -> WhatsApp -> Configuración de la API y añadir manualmente el número de teléfono del destinatario a la lista de números autorizados.

Recurso,Método,Endpoint,Descripción
Estudiantes,GET / POST,/api/student,Listar y registrar alumnos.
Pagos,POST,/api/pago,Registrar un nuevo abono o cobro.
Asistencias,POST,/api/asistencia,Registrar entrada/salida.
Notificaciones,POST,/api/notificacion,Enviar mensaje de WhatsApp.

## 💡 Buenas Prácticas Sugeridas
Validaciones: Asegúrate de que el campo phone en la base de datos incluya el código de país (ej: 57 para Colombia) sin el símbolo +.

Seguridad: Nunca subas el archivo .env a GitHub. Usa el .gitignore proporcionado en este repo.

Mantenimiento: Usa el pool de conexiones de db.js para evitar que la aplicación se caiga por exceso de peticiones a la base de datos.

Desarrollado por [Alejandro Gracia Carrillo]
AdminBotAlejo - Proyecto Educativo - 2026