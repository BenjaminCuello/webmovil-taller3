# 📚 API Documentation - Taller 3

## Base URL
```
http://localhost:3000/api
```

---

## 📋 Endpoints

### 1. Listar Registros

**GET** `/api/records`

#### Query Parameters
| Parámetro | Tipo | Default | Descripción |
|-----------|------|---------|-------------|
| `page` | number | 1 | Número de página |
| `limit` | number | 10 | Registros por página |
| `category` | string | - | Filtrar por categoría |
| `status` | string | - | Filtrar por status |
| `search` | string | - | Buscar en título y owner |
| `sortBy` | string | createdAt | Campo para ordenar |
| `sortOrder` | string | desc | Orden:  `asc` o `desc` |

#### Ejemplo Request
```bash
curl "http://localhost:3000/api/records?page=1&limit=5&category=finanzas"
```

#### Ejemplo Response
```json
{
  "success": true,
  "data":  [
    {
      "id": "cmiza3c17000oxkukv0cnzoik",
      "title": "Registro 25 - Soporte",
      "owner": "Benjamin Salas",
      "category": "soporte",
      "status": "pendiente",
      "amount": 258.98,
      "createdAt": "2025-12-10T00:36:00.042Z",
      "updatedAt": "2025-12-10T00:36:00.043Z",
      "metrics": {
        "completion": 19,
        "delta": 19. 88
      },
      "tags":  "urgente revision"
    }
  ],
  "pagination":  {
    "page": 1,
    "limit": 5,
    "total": 50,
    "totalPages": 10
  }
}
```

---

### 2. Obtener Registro por ID

**GET** `/api/records/:id`

#### Ejemplo Request
```bash
curl "http://localhost:3000/api/records/cmiza3c17000oxkukv0cnzoik"
```

#### Ejemplo Response (200)
```json
{
  "success": true,
  "data": {
    "id":  "cmiza3c17000oxkukv0cnzoik",
    "title": "Registro 25 - Soporte",
    "owner": "Benjamin Salas",
    "category":  "soporte",
    "status": "pendiente",
    "amount": 258.98,
    "completion": 19,
    "delta": 19.88,
    "tags": ["urgente", "revision"],
    "createdAt": "2025-12-10T00:36:00.042Z",
    "updatedAt": "2025-12-10T00:36:00.043Z"
  }
}
```

#### Ejemplo Response (404)
```json
{
  "success":  false,
  "error": "Registro no encontrado"
}
```

---

### 3. Crear Registro

**POST** `/api/records`

#### Body (JSON)
| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `title` | string | ✅ | Título del registro |
| `owner` | string | ✅ | Dueño/responsable |
| `category` | string | ✅ | Categoría (ver valores válidos) |
| `status` | string | ✅ | Estado (ver valores válidos) |
| `amount` | number | ✅ | Monto |
| `completion` | number | ❌ | Porcentaje completado (default: 0) |
| `delta` | number | ❌ | Variación (default: 0) |
| `tags` | string[] | ❌ | Etiquetas (default: []) |

#### Valores Válidos
- **category**: `finanzas`, `operaciones`, `marketing`, `rrhh`, `soporte`
- **status**: `activo`, `pendiente`, `resuelto`

#### Ejemplo Request
```bash
curl -X POST "http://localhost:3000/api/records" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Nuevo Registro",
    "owner": "Juan Pérez",
    "category": "finanzas",
    "status": "activo",
    "amount": 1500.50,
    "completion":  25,
    "tags": ["urgente", "Q1"]
  }'
```

#### Ejemplo Response (201)
```json
{
  "success": true,
  "data": {
    "id": "cmizb4x12000axkuk.. .",
    "title": "Nuevo Registro",
    "owner": "Juan Pérez",
    "category": "finanzas",
    "status": "activo",
    "amount": 1500.50,
    "completion": 25,
    "delta": 0,
    "tags": ["urgente", "Q1"],
    "createdAt": "2025-12-10T01:00:00.000Z",
    "updatedAt": "2025-12-10T01:00:00.000Z"
  }
}
```

#### Ejemplo Response (400)
```json
{
  "success":  false,
  "error": "Campos requeridos faltantes:  title, owner"
}
```

---

### 4. Actualizar Registro

**PUT** `/api/records/:id`

#### Body (JSON)
Cualquier campo del registro (todos opcionales)

#### Ejemplo Request
```bash
curl -X PUT "http://localhost:3000/api/records/cmiza3c17000oxkukv0cnzoik" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "resuelto",
    "completion": 100
  }'
```

#### Ejemplo Response (200)
```json
{
  "success": true,
  "data": {
    "id": "cmiza3c17000oxkukv0cnzoik",
    "title": "Registro 25 - Soporte",
    "owner": "Benjamin Salas",
    "category": "soporte",
    "status": "resuelto",
    "amount": 258.98,
    "completion": 100,
    "delta": 19.88,
    "tags":  ["urgente", "revision"],
    "createdAt": "2025-12-10T00:36:00.042Z",
    "updatedAt": "2025-12-10T01:05:00.000Z"
  }
}
```

---

### 5. Eliminar Registro

**DELETE** `/api/records/:id`

#### Ejemplo Request
```bash
curl -X DELETE "http://localhost:3000/api/records/cmiza3c17000oxkukv0cnzoik"
```

#### Ejemplo Response (200)
```json
{
  "success": true,
  "message":  "Registro eliminado correctamente"
}
```

#### Ejemplo Response (404)
```json
{
  "success":  false,
  "error": "Registro no encontrado"
}
```

---

## 🗄️ Modelo de Datos

### Record
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

enum RecordCategory {
  finanzas
  operaciones
  marketing
  rrhh
  soporte
}

enum RecordStatus {
  activo
  pendiente
  resuelto
}
```

---

## 🔧 Configuración Base de Datos

### Variables de Entorno (. env)
```env
DATABASE_URL="postgresql://usuario:password@localhost:5432/taller3_db? schema=public"
```

### Comandos Prisma
```bash
# Generar cliente
npx prisma generate

# Ejecutar migraciones
npx prisma migrate dev

# Seed de datos
node prisma/seed.mjs

# Ver datos en Prisma Studio
npx prisma studio
```