import { DashboardRecord, RecordCategory, RecordStatus } from "@/types/dashboard";

const categories: RecordCategory[] = ["finanzas", "operaciones", "marketing", "rrhh", "soporte"];
const statuses: RecordStatus[] = ["activo", "pendiente", "resuelto"];
const owners = ["Sofía", "Benjamín", "Antonia", "Carlos", "Laura", "Matías"];

const baseTitles = [
  "Optimización de costos",
  "Campaña mobile",
  "Onboarding digital",
  "Revisión salarial",
  "Roadmap Q2",
  "NPS Service Desk",
  "Monitoreo churn",
  "Mantenimiento preventivo",
  "Expansión partners",
  "Flujo de tesorería",
  "Renovación contratos",
  "Actualización app"
];

const randomBetween = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const randomArray = <T,>(source: T[]) => source[randomBetween(0, source.length - 1)];

const generateMetrics = () => ({
  completion: randomBetween(30, 100),
  delta: randomBetween(-15, 20)
});

const createRecord = (idx: number): DashboardRecord => {
  const created = new Date();
  created.setDate(created.getDate() - idx * 3);
  const updated = new Date(created);
  updated.setDate(updated.getDate() + randomBetween(0, 2));
  return {
    id: `REC-${1000 + idx}`,
    title: baseTitles[idx % baseTitles.length],
    owner: randomArray(owners),
    category: randomArray(categories),
    status: randomArray(statuses),
    amount: randomBetween(50000, 350000),
    createdAt: created.toISOString(),
    updatedAt: updated.toISOString(),
    metrics: generateMetrics(),
    tags: ["mobile", "priority", idx % 2 === 0 ? "expansion" : "operativo"].slice(0, randomBetween(1, 3))
  };
};

export const buildMockRecords = (size = 24) => Array.from({ length: size }, (_, idx) => createRecord(idx));

export const MOCK_RECORDS = buildMockRecords();
