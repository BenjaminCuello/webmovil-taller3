"use client";

import { MouseEvent } from "react";
import { useAppSelector } from "@/redux/hooks";
import { DashboardRecord } from "@/types/dashboard";

interface RecordDetailSheetProps {
  record: DashboardRecord | null;
  onClose: () => void;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(value);

export default function RecordDetailSheet({ record, onClose }: RecordDetailSheetProps) {
  if (!record) {
    return null;
  }

  const theme = useAppSelector(state => state.theme.mode);
  const isLight = theme === "light";

  const handleBackdrop = () => onClose();
  const handleSheetClick = (event: MouseEvent<HTMLDivElement>) => event.stopPropagation();

  return (
    <div
      className={`fixed inset-0 z-50 flex items-end ${isLight ? "bg-black/40" : "bg-black/70"} sm:items-center sm:justify-center`}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdrop}
    >
      <div
        className="w-full border rounded-none p-5 sm:max-w-lg"
        style={{
          backgroundColor: "var(--bg-secondary)",
          color: "var(--text)",
          borderColor: "var(--border)"
        }}
        onClick={handleSheetClick}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-wide text-[var(--text-secondary)]">Detalle del registro</p>
            <h3 className="mt-1 text-lg font-semibold leading-tight">{record.title}</h3>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">Propietario: {record.owner}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="border rounded-none px-3 py-1 text-sm hover:opacity-80"
            style={{
              backgroundColor: "var(--bg-secondary)",
              borderColor: "var(--border)",
              color: "var(--text)"
            }}
          >
            Cerrar
          </button>
        </div>
        <div className="mt-4 grid gap-3 text-sm">
          <div
            className="border rounded-none p-3"
            style={{
              backgroundColor: "var(--bg)",
              borderColor: "var(--border)"
            }}
          >
            <p className="text-[10px] uppercase tracking-wide text-[var(--text-secondary)]">Monto</p>
            <p className="mt-1 text-xl font-semibold">{formatCurrency(record.amount)}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span
              className="rounded border px-3 py-1 text-xs capitalize"
              style={{
                backgroundColor: "var(--bg)",
                borderColor: "var(--border)",
                color: "var(--text-secondary)"
              }}
            >
              {record.category}
            </span>
            <span
              className="rounded border px-3 py-1 text-xs capitalize"
              style={{
                backgroundColor: "var(--bg)",
                borderColor: "var(--border)",
                color: "var(--text-secondary)"
              }}
            >
              {record.status}
            </span>
            <span
              className="rounded border px-3 py-1 text-xs"
              style={{
                backgroundColor: "var(--bg)",
                borderColor: "var(--border)",
                color: "var(--text-secondary)"
              }}
            >
              ID {record.id}
            </span>
          </div>
          <div
            className="grid gap-2 border rounded-none p-3 sm:grid-cols-2"
            style={{
              backgroundColor: "var(--bg)",
              borderColor: "var(--border)"
            }}
          >
            <div>
              <p className="text-[10px] uppercase tracking-wide text-[var(--text-secondary)]">Creado</p>
              <p className="mt-1 text-sm">
                {new Date(record.createdAt).toLocaleString("es-CL", { dateStyle: "medium" })}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wide text-[var(--text-secondary)]">Actualizado</p>
              <p className="mt-1 text-sm">
                {new Date(record.updatedAt).toLocaleString("es-CL", { dateStyle: "medium" })}
              </p>
            </div>
          </div>
          <div
            className="border rounded-none p-3"
            style={{
              backgroundColor: "var(--bg)",
              borderColor: "var(--border)"
            }}
          >
            <p className="text-[10px] uppercase tracking-wide text-[var(--text-secondary)]">Indicadores</p>
            <div className="mt-2 flex flex-wrap gap-4 text-base">
              <span className="font-semibold">{record.metrics.completion}% completado</span>
              <span className={record.metrics.delta >= 0 ? "text-emerald-400" : "text-rose-400"}>
                {record.metrics.delta >= 0 ? "+" : ""}
                {record.metrics.delta}% vs periodo anterior
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {record.tags.map(tag => (
              <span
                key={tag}
                className="rounded border px-3 py-1 text-xs"
                style={{
                  backgroundColor: "var(--bg)",
                  borderColor: "var(--border)",
                  color: "var(--text-secondary)"
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
