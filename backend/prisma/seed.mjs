import prismaPkg from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const { PrismaClient } = prismaPkg;
const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL no esta definido para el seed");
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const categories = ["finanzas", "operaciones", "marketing", "rrhh", "soporte"];
const statuses = ["activo", "pendiente", "resuelto"];
const owners = [
  "Bastian Salinas",
  "Benjamin Cuello",
  "Benjamin Salas",
  "Tomas Guerra",
  "Maria Gonzalez",
  "Carlos Lopez"
];
const tagOptions = [
  "urgente",
  "revision",
  "aprobado",
  "Q4",
  "Q1",
  "proyecto-alpha",
  "cliente-vip",
  "interno",
  "externo",
  "prioritario"
];

async function main() {
  console.log("Iniciando seed...");

  await prisma.record.deleteMany();
  console.log("Registros eliminados");

  for (let i = 1; i <= 50; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const owner = owners[Math.floor(Math.random() * owners.length)];

    const numTags = Math.floor(Math.random() * 4);
    const tags = [...tagOptions].sort(() => 0.5 - Math.random()).slice(0, numTags);

    const createdAt = new Date();
    createdAt.setDate(createdAt.getDate() - Math.floor(Math.random() * 90));

    await prisma.record.create({
      data: {
        title: `Registro ${i} - ${category.charAt(0).toUpperCase() + category.slice(1)}`,
        owner,
        category,
        status,
        amount: Math.round(Math.random() * 100000) / 100,
        completion: Math.round(Math.random() * 100),
        delta: Math.round((Math.random() * 40 - 20) * 100) / 100,
        tags,
        createdAt
      }
    });
  }

  console.log("50 registros creados");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });

