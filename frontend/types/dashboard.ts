export type RecordCategory = "finanzas" | "operaciones" | "marketing" | "rrhh" | "soporte";

export type RecordStatus = "activo" | "pendiente" | "resuelto";

export interface DashboardRecord {
  id: string;
  title: string;
  owner: string;
  category: RecordCategory;
  status: RecordStatus;
  amount: number;
  createdAt: string;
  updatedAt: string;
  metrics: {
    completion: number;
    delta: number;
  };
  tags: string[];
}

export interface DateRange {
  from: string | null;
  to: string | null;
}

export type SortBy = "createdAt" | "amount" | "status";

export interface FiltersState {
  dateRange: DateRange;
  category: RecordCategory | "todas";
  status: RecordStatus | "todos";
  sortBy: SortBy;
  sortDirection: "asc" | "desc";
  search: string;
}

export interface ListState {
  records: DashboardRecord[];
  status: "idle" | "loading" | "ready";
  error: string | null;
}

export interface TrendPoint {
  label: string;
  value: number;
}

export interface CategorySlice {
  label: RecordCategory;
  value: number;
}

export interface StatusSlice {
  label: RecordStatus;
  value: number;
}

export interface PerformancePoint {
  label: RecordCategory;
  completion: number;
  delta: number;
}

export interface VelocityPoint {
  label: string;
  value: number;
}

export interface ChartState {
  trend: TrendPoint[];
  categoryDistribution: CategorySlice[];
  statusDistribution: StatusSlice[];
  performanceRadar: PerformancePoint[];
  velocity: VelocityPoint[];
  totals: {
    count: number;
    active: number;
    revenue: number;
  };
}

