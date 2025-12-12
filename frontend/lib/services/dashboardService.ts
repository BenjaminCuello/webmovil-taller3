import {
  ChartState,
  DashboardRecord,
  FiltersState,
  PerformancePoint,
  RecordCategory,
  StatusSlice,
  VelocityPoint
} from "@/types/dashboard";

const normalize = (value: string) => value.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

const withinRange = (value: Date, range: FiltersState["dateRange"]) => {
  if (range.from) {
    const fromDate = new Date(range.from);
    const fromStart = new Date(
      fromDate.getUTCFullYear(),
      fromDate.getUTCMonth(),
      fromDate.getUTCDate(),
      0,
      0,
      0,
      0
    );
    if (value < fromStart) {
      return false;
    }
  }

  if (range.to) {
    const toDate = new Date(range.to);
    const toEnd = new Date(
      toDate.getUTCFullYear(),
      toDate.getUTCMonth(),
      toDate.getUTCDate(),
      23,
      59,
      59,
      999
    );
    if (value > toEnd) {
      return false;
    }
  }

  return true;
};

const passesFilters = (record: DashboardRecord, filters: FiltersState) => {
  const created = new Date(record.createdAt);
  if (!withinRange(created, filters.dateRange)) {
    return false;
  }
  if (filters.category !== "todas" && record.category !== filters.category) {
    return false;
  }
  if (filters.status !== "todos" && record.status !== filters.status) {
    return false;
  }
  if (!filters.search) {
    return true;
  }
  const target = `${record.title} ${record.owner} ${record.tags.join(" ")}`;
  return normalize(target).includes(normalize(filters.search));
};

const compareRecords = (a: DashboardRecord, b: DashboardRecord, filters: FiltersState) => {
  const factor = filters.sortDirection === "asc" ? 1 : -1;
  if (filters.sortBy === "amount") {
    return (a.amount - b.amount) * factor;
  }
  if (filters.sortBy === "status") {
    return a.status.localeCompare(b.status) * factor;
  }
  return (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) * factor;
};

const aggregateTrend = (records: DashboardRecord[]) => {
  const groups = records.reduce<Record<string, { label: string; value: number; timestamp: number }>>((acc, record) => {
    const date = new Date(record.createdAt);
    const key = `${date.getFullYear()}-${date.getMonth()}`;
    if (!acc[key]) {
      acc[key] = {
        label: date.toLocaleDateString("es-CL", { month: "short" }),
        value: 0,
        timestamp: date.getTime()
      };
    }
    acc[key].value += record.amount;
    return acc;
  }, {});
  return Object.values(groups)
    .sort((a, b) => a.timestamp - b.timestamp)
    .slice(-6)
    .map(item => ({ label: item.label, value: item.value }));
};

const aggregateCategories = (records: DashboardRecord[]) => {
  const totals = records.reduce<Record<string, number>>((acc, record) => {
    acc[record.category] = (acc[record.category] ?? 0) + record.amount;
    return acc;
  }, {});
  return Object.entries(totals).map(([label, value]) => ({
    label: label as RecordCategory,
    value
  }));
};

const aggregateStatuses = (records: DashboardRecord[]): StatusSlice[] => {
  const statusBuckets: Record<string, number> = { activo: 0, pendiente: 0, resuelto: 0 };
  records.forEach(record => {
    statusBuckets[record.status] = (statusBuckets[record.status] ?? 0) + 1;
  });
  return Object.entries(statusBuckets).map(([label, value]) => ({ label: label as StatusSlice["label"], value }));
};

const aggregatePerformance = (records: DashboardRecord[]): PerformancePoint[] => {
  const buckets = records.reduce<Record<string, { completion: number; delta: number; count: number }>>((acc, record) => {
    if (!acc[record.category]) {
      acc[record.category] = { completion: 0, delta: 0, count: 0 };
    }
    acc[record.category].completion += record.metrics.completion;
    acc[record.category].delta += record.metrics.delta;
    acc[record.category].count += 1;
    return acc;
  }, {});

  return Object.entries(buckets).map(([category, value]) => ({
    label: category as PerformancePoint["label"],
    completion: Math.round(value.completion / value.count),
    delta: Number((value.delta / value.count).toFixed(1))
  }));
};

const aggregateVelocity = (records: DashboardRecord[]): VelocityPoint[] => {
  const groups = records.reduce<Record<string, { label: string; value: number; timestamp: number }>>((acc, record) => {
    const date = new Date(record.createdAt);
    const key = date.toISOString().split("T")[0];
    if (!acc[key]) {
      acc[key] = {
        label: date.toLocaleDateString("es-CL", { day: "2-digit", month: "short" }),
        value: 0,
        timestamp: date.getTime()
      };
    }
    acc[key].value += 1;
    return acc;
  }, {});

  return Object.values(groups)
    .sort((a, b) => a.timestamp - b.timestamp)
    .slice(-7)
    .map(item => ({ label: item.label, value: item.value }));
};

const aggregateTotals = (records: DashboardRecord[]) => {
  const revenue = records.reduce((acc, record) => acc + record.amount, 0);
  const active = records.filter(record => record.status === "activo").length;
  return { count: records.length, active, revenue };
};

export const applyFilters = (records: DashboardRecord[], filters: FiltersState) =>
  records.filter(record => passesFilters(record, filters)).sort((a, b) => compareRecords(a, b, filters));

export const buildChartState = (records: DashboardRecord[]): ChartState => ({
  trend: aggregateTrend(records),
  categoryDistribution: aggregateCategories(records),
  statusDistribution: aggregateStatuses(records),
  performanceRadar: aggregatePerformance(records),
  velocity: aggregateVelocity(records),
  totals: aggregateTotals(records)
});
