"use client";

import { DashboardRecord, ListState } from "@/types/dashboard";

interface RecordsTableProps {
  records: DashboardRecord[];
  status: ListState["status"];
  error: string | null;
  onSelectRecord?: (record: DashboardRecord) => void;
  selectedId?: string | null;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(value);

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("es-CL", { month: "short", day: "numeric" });

const statusStyles: Record<string, string> = {
  activo: "bg-emerald-100 text-emerald-700",
  pendiente: "bg-amber-100 text-amber-700",
  resuelto: "bg-sky-100 text-sky-700"
};

export default function RecordsTable({ records, status, error, onSelectRecord, selectedId }: RecordsTableProps) {
  if (error) {
    return <div className="rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">{error}</div>;
  }

  const isLoading = status !== "ready";

  return (
    <section className="rounded-xl border border-amber-100 bg-gradient-to-br from-white to-amber-50 p-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-xs uppercase text-slate-500">Registros</p>
          <h2 className="text-base font-semibold text-slate-900">Listado interactivo</h2>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">{records.length} resultados</span>
      </div>
      <div className="mt-4 divide-y divide-amber-100 rounded-lg border border-amber-100 bg-white/70">
        {isLoading && (
          <div className="space-y-3 p-4">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="h-16 animate-pulse rounded-md bg-slate-100" />
            ))}
          </div>
        )}
        {!isLoading &&
          records.map(record => (
            <button
              key={record.id}
              className={`grid w-full gap-3 p-4 text-left transition hover:bg-amber-50/70 sm:grid-cols-6 ${
                selectedId === record.id ? "bg-amber-50/70" : ""
              }`}
              type="button"
              aria-label={`Ver ${record.title}`}
              onClick={() => onSelectRecord?.(record)}
            >
              <div className="sm:col-span-2">
                <p className="font-semibold text-slate-900">{record.title}</p>
                <p className="text-xs text-slate-500">{record.owner}</p>
              </div>
              <div className="text-sm text-slate-700">
                <p>{formatCurrency(record.amount)}</p>
                <p className="text-xs text-slate-500">{formatDate(record.createdAt)}</p>
              </div>
              <div className="text-sm text-slate-700">
                <p className="uppercase text-xs text-slate-500">Categoría</p>
                <p className="capitalize">{record.category}</p>
              </div>
              <div className="text-sm text-slate-700">
                <p className="uppercase text-xs text-slate-500">Estado</p>
                <span className={`rounded-full px-2 py-1 text-xs capitalize ${statusStyles[record.status]}`}>{record.status}</span>
              </div>
              <div className="flex flex-wrap gap-1 text-xs text-slate-500">
                {record.tags.map(tag => (
                  <span key={tag} className="rounded-full border border-slate-200 px-2 py-1">
                    {tag}
                  </span>
                ))}
              </div>
            </button>
          ))}
        {!isLoading && !records.length && (
          <div className="p-4 text-sm text-slate-500">No se encontraron registros para los filtros activos.</div>
        )}
      </div>
    </section>
  );
}
