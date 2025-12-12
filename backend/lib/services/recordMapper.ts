import { Record as PrismaRecord } from "@prisma/client";
import { DashboardRecord } from "@/types/dashboard";

export const mapRecordToDashboard = (record: PrismaRecord): DashboardRecord => ({
  id: record.id,
  title: record.title,
  owner: record.owner,
  category: record.category,
  status: record.status,
  amount: record.amount,
  createdAt: record.createdAt.toISOString(),
  updatedAt: record.updatedAt.toISOString(),
  metrics: {
    completion: record.completion,
    delta: record.delta
  },
  tags: record.tags
});

export const mapRecordsToDashboard = (records: PrismaRecord[]): DashboardRecord[] =>
  records.map(mapRecordToDashboard);

