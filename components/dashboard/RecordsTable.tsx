import { DashboardRecord, ListState } from "@/types/dashboard";

interface RecordsTableProps {
  records: DashboardRecord[];
  status: ListState["status"];
  error: string | null;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(value);

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("es-CL", { month: "short", day: "numeric" });

export default function RecordsTable({ records, status, error }: RecordsTableProps) {
  if (error) {
    return <div className="rounded-3xl bg-rose-500/10 p-4 text-sm text-rose-200">{error}</div>;
  }

  const isLoading = status !== "ready";

  return (
    <section className="rounded-3xl bg-slate-900/60 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-medium">Listado</h2>
        <span className="text-xs text-slate-400">{records.length} resultados</span>
      </div>
      <div className="mt-4 divide-y divide-white/5 rounded-2xl border border-white/5">
        {isLoading && (
          <div className="animate-pulse p-4 text-sm text-slate-500">Cargando registros simulados...</div>
        )}
        {!isLoading &&
          records.map(record => (
            <article key={record.id} className="grid gap-3 p-4 sm:grid-cols-6">
              <div className="sm:col-span-2">
                <p className="font-semibold text-slate-100">{record.title}</p>
                <p className="text-xs text-slate-500">{record.owner}</p>
              </div>
              <div className="text-sm text-slate-300">
                <p>{formatCurrency(record.amount)}</p>
                <p className="text-xs text-slate-500">{formatDate(record.createdAt)}</p>
              </div>
              <div className="text-sm text-slate-300">
                <p className="uppercase text-xs text-slate-400">Categoría</p>
                <p>{record.category}</p>
              </div>
              <div className="text-sm text-slate-300">
                <p className="uppercase text-xs text-slate-400">Estado</p>
                <p className="capitalize">{record.status}</p>
              </div>
              <div className="flex flex-wrap gap-1 text-xs text-slate-400">
                {record.tags.map(tag => (
                  <span key={tag} className="rounded-full border border-white/5 px-2 py-1">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        {!isLoading && !records.length && (
          <div className="p-4 text-sm text-slate-500">No se encontraron registros para los filtros activos.</div>
        )}
      </div>
    </section>
  );
}
