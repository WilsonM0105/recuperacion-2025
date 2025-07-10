🛠️ Actividad de Recuperación - Backend Express MVC
🎯 Objetivo
Esta actividad de recuperación tiene como objetivo reforzar tus conocimientos de Backend con Node.js y Express, usando la arquitectura MVC, validaciones de datos y pruebas automáticas.

📌 Enunciado
Extiende tu API de Tareas existente agregando las siguientes funcionalidades:

✅ 1️⃣ Búsqueda por prioridad
Ruta: GET /tasks/priority/:level
Devuelve todas las tareas que tengan la prioridad indicada.
Valida que level esté entre 1 y 5, de lo contrario responde con 400 Bad Request.
✅ 2️⃣ Búsqueda parcial por título
Ruta: GET /tasks/search?title=...
Devuelve todas las tareas que contengan el texto buscado en su título.
La búsqueda no distingue mayúsculas/minúsculas.
✅ 3️⃣ Resumen extendido
Ruta: GET /tasks/summary
Además de los datos actuales, agrega el porcentaje de tareas completadas sobre el total.
✅ 4️⃣ Pruebas automáticas
Agrega mínimo 2 tests unitarios por cada nueva ruta.
Usa Vitest o Jest y Supertest.
Todos los tests deben pasar ejecutando:
npm run test