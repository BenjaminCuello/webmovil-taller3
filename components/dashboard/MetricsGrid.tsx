import { ChartState } from "@/types/dashboard";

interface MetricsGridProps {
  charts: ChartState;
  isLoading: boolean;
}

const currency = new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 });

export default function MetricsGrid({ charts, isLoading }: MetricsGridProps) {
  const { totals, categoryDistribution } = charts;
  const cards = [
    { label: "Registros", value: totals.count.toString(), accent: "bg-brand-500/20 text-brand-200" },
    { label: "Activos", value: totals.active.toString(), accent: "bg-emerald-500/20 text-emerald-200" },
    { label: "Ingresos", value: currency.format(totals.revenue), accent: "bg-amber-500/20 text-amber-200" }
  ];

  return (
    <div className="flex flex-col gap-4 rounded-3xl bg-slate-900/60 p-4">
      <div className="grid gap-3 sm:grid-cols-3">
        {cards.map(card => (
          <article key={card.label} className="rounded-2xl border border-white/5 bg-white/5 p-3">
            <p className="text-xs uppercase text-slate-400">{card.label}</p>
            <p className={`mt-2 text-2xl font-semibold ${card.accent}`}>{isLoading ? "―" : card.value}</p>
          </article>
        ))}
      </div>
      <div className="rounded-2xl border border-white/5 bg-white/5 p-3">
        <p className="text-xs uppercase text-slate-400">Categorías</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {categoryDistribution.map(item => (
            <span key={item.label} className="rounded-full bg-brand-500/10 px-3 py-1 text-xs text-slate-100">
              {item.label.toUpperCase()} · {currency.format(item.value)}
            </span>
          ))}
          {!categoryDistribution.length && <span className="text-xs text-slate-500">Sin datos</span>}
        </div>
      </div>
    </div>
  );
}
