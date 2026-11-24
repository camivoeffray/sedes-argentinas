# Sedes Argentinas

Sedes Argentinas es una aplicación web para consultar información sobre embajadas y consulados argentinos en distintos países del mundo.

Brinda datos útiles, como ubicación, dirección, teléfonos, correo electrónico, sitio web y horarios de atención, permitiendo que los usuarios colaboren informando cuando encuentran datos incompletos o incorrectos en las sedes.

Este proyecto fue desarrollado para el segundo parcial de **Aplicaciones Híbridas**.

## ¿Qué se puede hacer?

**Sin iniciar sesión:**
- Explorar las sedes y filtrarlas por país.
- Consultar la información de cada sede.
- Registrarse o iniciar sesión.

**Usuario registrado:**
- Consultar las sedes.
- Enviar reportes sobre datos incorrectos de una sede.
- Ver el estado de sus reportes: pendiente, aprobado o rechazado.
- Editar sus reportes mientras están pendientes y retirar (eliminar) sus propios reportes.

**Administrador:**
- Crear, editar y eliminar países.
- Crear, editar y eliminar sedes.
- Consultar los reportes recibidos y aprobarlos o rechazarlos.

Las acciones disponibles dependen del rol de cada usuario.

## Tecnologías utilizadas

- **Frontend:** React, Vite, React Router, Bootstrap, React Hook Form y Zod.
- **Backend:** Node.js, Express y JWT.
- **Base de datos:** MongoDB Atlas.
- **Seguridad:** contraseñas protegidas con bcrypt, autenticación mediante JWT y control de permisos por rol.

El frontend y el backend están separados. React consume los datos a través de la API REST.

## Cómo ejecutar el proyecto

Se necesita tener instalados Node.js y pnpm, y acceso a la base de datos MongoDB configurada para el proyecto.

### Backend

1. Entrar a la carpeta `back`.
2. Crear un archivo `.env` tomando como referencia `back/.env.example`.
3. Completar las variables `MONGO_URI` y `JWT_SECRET` con los valores correspondientes.
4. Ejecutar:

```bash
pnpm install
pnpm run dev
```

La API se inicia en `http://localhost:3333`.

### Frontend

En otra terminal, entrar a la carpeta `front` y ejecutar:

```bash
pnpm install
pnpm run dev
```

Abrir en el navegador la dirección que indique Vite (habitualmente `http://localhost:5173`).

## Limitaciones actuales

- Los reportes no modifican automáticamente la información de las sedes: el administrador debe revisar el aviso y realizar los cambios necesarios.
- No hay recuperación de contraseña por correo electrónico.
- No se puede iniciar sesión con Google ni con otras redes sociales.
- La aplicación no permite realizar trámites consulares ni solicitar turnos: solamente reúne información de consulta.


## Usuarios de prueba

Para probar las funcionalidades de la aplicación se pueden utilizar las siguientes cuentas:

| Rol | Correo electrónico | Contraseña |

| Administrador | admin@example.com | Prueba123@ |
| Usuario | usuario@example.com | Prueba123@ |
| Usuario | juan@perez.com | Prueba123@ |

El administrador puede gestionar países y sedes, además de revisar y resolver reportes.
El usuario puede consultar las sedes, enviar reportes y gestionar sus propios reportes.