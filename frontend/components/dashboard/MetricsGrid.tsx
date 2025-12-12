import { ChartState } from "@/types/dashboard";

interface MetricsGridProps {
  charts: ChartState;
  isLoading: boolean;
}

const currency = new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 });

export default function MetricsGrid({ charts, isLoading }: MetricsGridProps) {
  const { totals, categoryDistribution, statusDistribution, performanceRadar } = charts;
  const avgCompletion = performanceRadar.length
    ? Math.round(performanceRadar.reduce((acc, item) => acc + item.completion, 0) / performanceRadar.length)
    : 0;

  const cards = [
    { label: "Registros", value: totals.count.toString() },
    { label: "Activos", value: totals.active.toString() },
    { label: "Ingresos", value: currency.format(totals.revenue) },
    { label: "Avance", value: `${avgCompletion}%` }
  ];

  return (
    <section className="bg-[var(--bg-secondary)] px-3 py-2 text-[var(--text)]">
      <div className="grid gap-2 md:grid-cols-4">
        {cards.map(card => (
          <article
            key={card.label}
            className="flex flex-col justify-between border border-[var(--border)] bg-[var(--bg)] px-3 py-2"
          >
            <p className="text-[10px] uppercase tracking-wide text-[var(--text-secondary)]">{card.label}</p>
            <p className="mt-1 text-xl font-semibold">{isLoading ? "..." : card.value}</p>
          </article>
        ))}
      </div>
      <div className="mt-2 grid gap-2 md:grid-cols-2">
        <div className="border border-[var(--border)] bg-[var(--bg)] px-3 py-2">
          <p className="text-[10px] uppercase tracking-wide text-[var(--text-secondary)]">Categorias</p>
          <div className="mt-2 flex flex-wrap gap-y-1 gap-x-4 text-xs">
            {categoryDistribution.map(item => (
              <div key={item.label} className="flex items-center justify-between gap-2">
                <span
                  className="w-20 truncate text-[var(--text-secondary)]"
                  title={item.label.toUpperCase()}
                >
                  {item.label.toUpperCase()}
                </span>
                <span className="text-[var(--text-secondary)]">{currency.format(item.value)}</span>
              </div>
            ))}
            {!categoryDistribution.length && <span className="text-xs text-[var(--text-secondary)]">Sin datos</span>}
          </div>
        </div>
        <div className="border border-[var(--border)] bg-[var(--bg)] px-3 py-2">
          <p className="text-[10px] uppercase tracking-wide text-[var(--text-secondary)]">Estado operativo</p>
          <div className="mt-2 flex flex-col gap-1 text-xs">
            {statusDistribution.map(item => (
              <div key={item.label} className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className="h-2 w-2"
                    style={{
                      backgroundColor:
                        item.label === "activo" ? "#0f766e" : item.label === "pendiente" ? "#c9b458" : "#1e3a8a"
                    }}
                  />
                  <span className="capitalize text-[var(--text-secondary)]">{item.label}</span>
                </div>
                <span className="text-sm text-[var(--text-secondary)]">{item.value}</span>
              </div>
            ))}
            {!statusDistribution.length && (
              <span className="text-xs text-[var(--text-secondary)]">Sin seguimiento</span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

