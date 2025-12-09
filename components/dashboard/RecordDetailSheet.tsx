"use client";

import { MouseEvent } from "react";
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

  const handleBackdrop = () => onClose();
  const handleSheetClick = (event: MouseEvent<HTMLDivElement>) => event.stopPropagation();

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/30" role="dialog" aria-modal="true" onClick={handleBackdrop}>
      <div
        className="w-full rounded-t-xl border border-slate-200 bg-white p-5 text-slate-900 shadow-xl sm:mx-auto sm:max-w-lg"
        onClick={handleSheetClick}
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs uppercase text-slate-500">Detalle del registro</p>
            <h3 className="text-2xl font-semibold">{record.title}</h3>
            <p className="text-sm text-slate-600">Propietario: {record.owner}</p>
          </div>
          <button className="rounded-full border border-slate-300 px-3 py-1 text-xs" onClick={onClose}>
            Cerrar
          </button>
        </div>
        <div className="mt-4 grid gap-3 text-sm text-slate-700">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <p className="text-xs uppercase text-slate-500">Monto</p>
            <p className="text-2xl font-semibold text-slate-900">{formatCurrency(record.amount)}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs capitalize text-slate-700">{record.category}</span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs capitalize text-slate-700">{record.status}</span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs">ID {record.id}</span>
          </div>
          <div className="grid gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3 sm:grid-cols-2">
            <div>
              <p className="text-xs uppercase text-slate-500">Creado</p>
              <p className="text-slate-800">{new Date(record.createdAt).toLocaleString("es-CL", { dateStyle: "medium" })}</p>
            </div>
            <div>
              <p className="text-xs uppercase text-slate-500">Actualizado</p>
              <p className="text-slate-800">{new Date(record.updatedAt).toLocaleString("es-CL", { dateStyle: "medium" })}</p>
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <p className="text-xs uppercase text-slate-500">Indicadores</p>
            <div className="mt-2 flex flex-wrap gap-4 text-base text-slate-800">
              <span className="font-semibold">{record.metrics.completion}% completado</span>
              <span className={record.metrics.delta >= 0 ? "text-emerald-600" : "text-rose-600"}>
                {record.metrics.delta >= 0 ? "+" : ""}
                {record.metrics.delta}% vs periodo anterior
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {record.tags.map(tag => (
              <span key={tag} className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
