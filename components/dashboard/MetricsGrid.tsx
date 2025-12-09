import { ChartState } from "@/types/dashboard";

interface MetricsGridProps {
  charts: ChartState;
  isLoading: boolean;
}

const currency = new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 });

export default function MetricsGrid({ charts, isLoading }: MetricsGridProps) {
  const { totals, categoryDistribution, statusDistribution, performanceRadar, velocity } = charts;
  const avgCompletion = performanceRadar.length
    ? Math.round(performanceRadar.reduce((acc, item) => acc + item.completion, 0) / performanceRadar.length)
    : 0;
  const latestVelocity = velocity.at(-1)?.value ?? 0;
  const cards = [
    { label: "Registros", value: totals.count.toString() },
    { label: "Activos", value: totals.active.toString() },
    { label: "Ingresos", value: currency.format(totals.revenue) },
    { label: "Avance", value: `${avgCompletion}%` }
  ];
  const pillColors: Record<string, string> = {
    activo: "bg-emerald-50 text-emerald-700",
    pendiente: "bg-amber-50 text-amber-700",
    resuelto: "bg-sky-50 text-sky-700"
  };

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-indigo-100 bg-gradient-to-br from-white via-white to-indigo-50 p-4 shadow-sm">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(card => (
          <article key={card.label} className="rounded-lg border border-white/60 bg-white/80 p-3">
            <p className="text-xs uppercase text-slate-600">{card.label}</p>
            <p className="mt-2 text-2xl font-semibold text-slate-800">{isLoading ? "―" : card.value}</p>
          </article>
        ))}
      </div>
      <div className="grid gap-3 lg:grid-cols-2">
        <div className="rounded-lg border border-white/60 bg-white/80 p-3">
          <p className="text-xs uppercase text-slate-600">Categorías</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {categoryDistribution.map(item => (
              <span key={item.label} className="rounded-full bg-sky-50 px-3 py-1 text-xs text-slate-700">
                {item.label.toUpperCase()} · {currency.format(item.value)}
              </span>
            ))}
            {!categoryDistribution.length && <span className="text-xs text-slate-500">Sin datos</span>}
          </div>
        </div>
        <div className="rounded-lg border border-white/60 bg-white/80 p-3">
          <p className="text-xs uppercase text-slate-600">Estado operativo</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {statusDistribution.map(item => (
              <span key={item.label} className={`rounded-full px-3 py-1 text-xs capitalize ${pillColors[item.label] ?? "bg-slate-100 text-slate-700"}`}>
                {item.label} · {item.value}
              </span>
            ))}
            {!statusDistribution.length && <span className="text-xs text-slate-500">Sin seguimiento</span>}
          </div>
          <p className="mt-4 text-xs text-slate-500">Velocidad diaria: {latestVelocity} registros/día</p>
        </div>
      </div>
    </div>
  );
}
