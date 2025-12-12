# API Documentation - Taller 3

## Base URL

```text
http://localhost:3000/api
```

---

## Endpoints

### 1. Listar registros

**GET** `/api/records`

#### Query parameters

| Parametro   | Tipo   | Default | Descripcion                               |
|------------|--------|---------|-------------------------------------------|
| `page`     | number | 1       | Numero de pagina                          |
| `limit`    | number | 10      | Registros por pagina                      |
| `category` | string | -       | Filtrar por categoria                     |
| `status`   | string | -       | Filtrar por status                        |
| `search`   | string | -       | Buscar en titulo y owner                  |
| `sortBy`   | string | createdAt | Campo para ordenar                      |
| `sortOrder`| string | desc    | Orden: `asc` o `desc`                     |

#### Ejemplo request

```bash
curl "http://localhost:3000/api/records?page=1&limit=5&category=finanzas"
```

---

### 2. Obtener registro por ID

**GET** `/api/records/:id`

#### Ejemplo request

```bash
curl "http://localhost:3000/api/records/cmiza3c17000oxkukv0cnzoik"
```

---

### 3. Crear registro

**POST** `/api/records`

#### Body (JSON)

| Campo        | Tipo     | Requerido | Descripcion                                      |
|-------------|----------|-----------|--------------------------------------------------|
| `title`     | string   | Si        | Titulo del registro                              |
| `owner`     | string   | Si        | Dueno o responsable                              |
| `category`  | string   | Si        | Categoria (ver valores validos)                  |
| `status`    | string   | Si        | Estado (ver valores validos)                     |
| `amount`    | number   | Si        | Monto                                            |
| `completion`| number   | No        | Porcentaje completado (default: 0)               |
| `delta`     | number   | No        | Variacion (default: 0)                           |
| `tags`      | string[] | No        | Etiquetas (default: [])                          |

Valores validos:

- **category**: `finanzas`, `operaciones`, `marketing`, `rrhh`, `soporte`
- **status**: `activo`, `pendiente`, `resuelto`

Ejemplo:

```bash
curl -X POST "http://localhost:3000/api/records" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Nuevo Registro",
    "owner": "Juan Perez",
    "category": "finanzas",
    "status": "activo",
    "amount": 1500.50,
    "completion": 25,
    "tags": ["urgente", "Q1"]
  }'
```

---

### 4. Actualizar registro

**PUT** `/api/records/:id`

Body: cualquier campo del registro (todos opcionales).

```bash
curl -X PUT "http://localhost:3000/api/records/cmiza3c17000oxkukv0cnzoik" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "resuelto",
    "completion": 100
  }'
```

---

### 5. Eliminar registro

**DELETE** `/api/records/:id`

```bash
curl -X DELETE "http://localhost:3000/api/records/cmiza3c17000oxkukv0cnzoik"
```

---

## Modelo de datos

```prisma
model Record {
  id         String         @id @default(cuid())
  title      String
  owner      String
  category   RecordCategory
  status     RecordStatus
  amount     Float
  completion Float          @default(0)
  delta      Float          @default(0)
  tags       String[]
  createdAt  DateTime       @default(now())
  updatedAt  DateTime       @updatedAt
}
```

---

## Configuracion base de datos

### Variables de entorno (.env)

```env
DATABASE_URL="postgresql://usuario:password@localhost:5432/taller3_db?schema=public"
```

### Comandos Prisma

```bash
npx prisma generate
npx prisma migrate dev
node backend/prisma/seed.mjs
npx prisma studio
```

