Taller 3 — Desarrollo Web Móvil (UCN)
1) Grupo y equipo

Grupo 1 — Equipo: SmartCoders

2) Integrantes (Nombre — RUT)

Bastian Salinas — 21.848.994-K

Benjamín Cuello — 21.682.135-1

Benjamín Salas — 21.758.667-4

Tomás Guerra — 21.664.344-5

3) Descripción del proyecto


El objetivo es construir una aplicación web móvil basada en Next.js que funcione como un dashboard interactivo, conectada a una base de datos real y capaz de mostrar información mediante tablas, gráficos y vistas detalladas.

La aplicación permite visualizar un conjunto de registros, aplicar filtros dinámicos, mantener configuraciones entre páginas y acceder a una vista individual por cada elemento. Todo el diseño está trabajado bajo un enfoque Mobile First, buscando una experiencia fluida en dispositivos móviles.

4) Tecnologías utilizadas
Frontend y arquitectura

Next.js 14+ (App Router)

React

TailwindCSS / ShadCN (interfaz y estilo)

Librería de gráficos: Chart.js / Recharts / Nivo (según implementación final)

Mobile First Design

Backend y base de datos

API construida dentro de Next.js usando rutas en /api

Prisma ORM

PostgreSQL (base de datos principal)

Gestión de estado

Redux Toolkit

Persistencia de filtros y estados globales

Estructura relevante del proyecto

app/ — páginas, rutas y vistas

app/api/ — endpoints CRUD de la entidad principal

lib/prisma/ — configuración del ORM

redux/ — slices, store y lógica global

components/ — componentes reutilizables

charts/ — componentes de visualización
