# Taller 3 — Desarrollo Web Móvil (UCN)

## 1) Grupo y equipo

- Grupo 1 — Equipo: SmartCoders

## 2) Integrantes (Nombre — RUT)

- Bastian Salinas — 21.848.994-K  
- Benjamín Cuello — 21.682.135-1  
- Benjamín Salas — 21.758.667-4  
- Tomás Guerra — 21.664.344-5  

## 3) Descripción del proyecto

El objetivo principal es construir una aplicación web móvil utilizando **Next.js 14+** para visualizar información proveniente de una base de datos real, mediante un dashboard moderno, responsivo y enfocado en dispositivos móviles.

La aplicación permite:
- Visualizar registros almacenados en la base de datos.  
- Acceder a un dashboard con tablas, métricas y gráficos interactivos.  
- Aplicar filtros dinámicos que se mantienen entre navegaciones.  
- Ingresar a una vista detallada por cada registro.  

Todo el diseño se trabaja bajo un enfoque **Mobile First** para garantizar una buena experiencia en diferentes tamaños de pantalla.

## 4) Tecnologías utilizadas

### **Frontend y arquitectura**
- Next.js 14 (App Router)
- React
- TailwindCSS / ShadCN
- Librería de gráficos (Chart.js, Recharts o Nivo)
- Diseño Mobile First

### **Backend y base de datos**
- API REST construida dentro de Next.js (rutas `/api`)
- Prisma ORM
- PostgreSQL

### **Gestión de estado**
- Redux Toolkit
- Persistencia de filtros y configuraciones

### **Estructura relevante del proyecto**
- `app/` — Vistas principales y rutas  
- `app/api/` — Endpoints CRUD  
- `lib/prisma/` — Configuración del ORM  
- `redux/` — Store global y slices  
- `components/` — Componentes reutilizables  
- `charts/` — Componentes de gráficos  

