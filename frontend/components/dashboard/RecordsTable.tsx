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
  activo: "text-[#22c55e]",
  pendiente: "text-[#eab308]",
  resuelto: "text-[#38bdf8]"
};

export default function RecordsTable({ records, status, error, onSelectRecord, selectedId }: RecordsTableProps) {
  if (error) {
    return (
      <div className="border border-rose-700 bg-rose-950/60 p-3 text-sm text-rose-100">
        {error}
      </div>
    );
  }

  const isLoading = status !== "ready";

  return (
    <section
      className="border px-4 py-2"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--bg-secondary)",
        color: "var(--text)"
      }}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-xs uppercase tracking-wide text-[var(--text-secondary)]">Registros</p>
          <h2 className="text-lg font-semibold">Listado de actividades</h2>
        </div>
        <span
          className="border px-2 py-1 text-sm"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--bg)",
            color: "var(--text-secondary)"
          }}
        >
          {records.length} resultados
        </span>
      </div>
      <div
        className="mt-2 divide-y border"
        style={{
          borderColor: "var(--border)",
          backgroundColor: "var(--bg)",
          borderRadius: 0
        }}
      >
        {isLoading && (
          <div className="space-y-1 p-3">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={idx}
                className="h-10"
                style={{ backgroundColor: "var(--bg-secondary)" }}
              />
            ))}
          </div>
        )}
        {!isLoading &&
          records.map((record, index) => (
            <button
              key={record.id}
              type="button"
              className="grid w-full gap-3 px-4 py-1.5 text-left text-xs transition-colors md:grid-cols-5"
              style={{
                backgroundColor:
                  selectedId === record.id
                    ? "var(--bg-secondary)"
                    : index % 2 === 0
                    ? "var(--bg)"
                    : "var(--bg-secondary)"
              }}
              onClick={() => onSelectRecord?.(record)}
            >
              <div className="md:col-span-2">
                <p className="truncate text-base font-semibold">{record.title}</p>
                <p className="mt-0.5 text-sm text-[var(--text-secondary)]">{record.owner}</p>
              </div>
              <div className="text-sm">
                <p className="text-base font-medium">{formatCurrency(record.amount)}</p>
                <p className="mt-0.5 text-xs text-[var(--text-secondary)]">{formatDate(record.createdAt)}</p>
              </div>
              <div className="text-xs">
                <p className="text-xs uppercase text-[var(--text-secondary)]">Categoria</p>
                <p className="mt-0.5 text-sm capitalize">{record.category}</p>
              </div>
              <div className="text-xs">
                <p className="text-xs uppercase text-[var(--text-secondary)]">Estado</p>
                <div className="mt-1 flex items-center gap-2">
                  <span
                    className="h-2 w-2"
                    style={{
                      backgroundColor:
                        record.status === "activo"
                          ? "#22c55e"
                          : record.status === "pendiente"
                          ? "#eab308"
                          : "#38bdf8"
                    }}
                  />
                  <span className={`${statusStyles[record.status]} text-sm`}>{record.status}</span>
                </div>
              </div>
            </button>
          ))}
        {!isLoading && !records.length && (
          <div className="px-4 py-3 text-sm text-[var(--text-secondary)]">
            No se encontraron registros para los filtros activos.
          </div>
        )}
      </div>
    </section>
  );
}

