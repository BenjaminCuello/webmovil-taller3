"use client";

interface AppHeaderProps {
  lastUpdated?: string;
}

export default function AppHeader({ lastUpdated }: AppHeaderProps) {
  const formatted = lastUpdated ? new Date(lastUpdated).toLocaleString("es-CL", { dateStyle: "medium", timeStyle: "short" }) : "Sincronizando";

  return (
    <header className="rounded-xl border border-sky-100 bg-gradient-to-br from-sky-50 to-white p-5 shadow">
      <p className="text-xs uppercase tracking-[0.2em] text-sky-700">Panel móvil</p>
      <div className="mt-2 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">Centro de control estudiantil</h1>
        <span className="text-xs text-slate-600">Última actualización: {formatted}</span>
      </div>
      <p className="mt-2 text-sm text-slate-700">
        Vista simple para practicar filtros persistentes, métricas básicas y gráficos con datos ficticios.
      </p>
      <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-700">
        <span className="rounded-full bg-sky-100 px-3 py-1">Datos dummy</span>
        <span className="rounded-full bg-amber-100 px-3 py-1">Mobile first</span>
        <span className="rounded-full bg-rose-100 px-3 py-1">Sin backend</span>
      </div>
    </header>
  );
}
