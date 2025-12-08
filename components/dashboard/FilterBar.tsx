"use client";

import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectFilters } from "@/redux/selectors/dashboardSelectors";
import { resetFilters, setCategory, setDateRange, setSearch, setSortBy, setSortDirection, setStatus } from "@/redux/slices/filterSlice";
import { RecordCategory, RecordStatus, SortBy } from "@/types/dashboard";

const categoryOptions: (RecordCategory | "todas")[] = ["todas", "finanzas", "operaciones", "marketing", "rrhh", "soporte"];
const statusOptions: (RecordStatus | "todos")[] = ["todos", "activo", "pendiente", "resuelto"];
const sortOptions: SortBy[] = ["createdAt", "amount", "status"];

export default function FilterBar() {
  const filters = useAppSelector(selectFilters);
  const dispatch = useAppDispatch();

  const formattedDates = useMemo(
    () => ({
      from: filters.dateRange.from ? filters.dateRange.from.split("T")[0] : "",
      to: filters.dateRange.to ? filters.dateRange.to.split("T")[0] : ""
    }),
    [filters.dateRange]
  );

  const toggleDirection = () => dispatch(setSortDirection(filters.sortDirection === "asc" ? "desc" : "asc"));

  return (
    <section className="rounded-3xl bg-slate-900/60 p-4 shadow-xl shadow-brand-900/20">
      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
        <span>Filtros activos</span>
        <button className="rounded-full bg-white/5 px-3 py-1 text-xs text-white" onClick={() => dispatch(resetFilters())}>
          Reiniciar
        </button>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-xs text-slate-400">Categoría</span>
          <select
            className="rounded-2xl border border-white/5 bg-white/5 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none"
            value={filters.category}
            onChange={event => dispatch(setCategory(event.target.value as RecordCategory | "todas"))}
          >
            {categoryOptions.map(option => (
              <option key={option} value={option}>
                {option === "todas" ? "Todas" : option.toUpperCase()}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-xs text-slate-400">Estado</span>
          <select
            className="rounded-2xl border border-white/5 bg-white/5 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none"
            value={filters.status}
            onChange={event => dispatch(setStatus(event.target.value as RecordStatus | "todos"))}
          >
            {statusOptions.map(option => (
              <option key={option} value={option}>
                {option === "todos" ? "Todos" : option.toUpperCase()}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-xs text-slate-400">Orden</span>
          <div className="flex items-center gap-2">
            <select
              className="flex-1 rounded-2xl border border-white/5 bg-white/5 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none"
              value={filters.sortBy}
              onChange={event => dispatch(setSortBy(event.target.value as SortBy))}
            >
              {sortOptions.map(option => (
                <option key={option} value={option}>
                  {option === "createdAt" ? "Fecha" : option === "amount" ? "Monto" : "Estado"}
                </option>
              ))}
            </select>
            <button
              className="rounded-2xl border border-white/5 bg-white/10 px-3 py-2 text-xs"
              onClick={toggleDirection}
            >
              {filters.sortDirection === "asc" ? "Asc" : "Desc"}
            </button>
          </div>
        </label>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-sm sm:col-span-2">
          <span className="text-xs text-slate-400">Búsqueda</span>
          <input
            type="search"
            placeholder="Nombre, responsable o etiqueta"
            className="rounded-2xl border border-white/5 bg-white/5 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none"
            value={filters.search}
            onChange={event => dispatch(setSearch(event.target.value))}
          />
        </label>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <label className="flex flex-col gap-1">
            <span className="text-xs text-slate-400">Desde</span>
            <input
              type="date"
              className="rounded-2xl border border-white/5 bg-white/5 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none"
              value={formattedDates.from}
              onChange={event =>
                dispatch(
                  setDateRange({ from: event.target.value ? new Date(event.target.value).toISOString() : null, to: filters.dateRange.to })
                )
              }
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-xs text-slate-400">Hasta</span>
            <input
              type="date"
              className="rounded-2xl border border-white/5 bg-white/5 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none"
              value={formattedDates.to}
              onChange={event =>
                dispatch(
                  setDateRange({ from: filters.dateRange.from, to: event.target.value ? new Date(event.target.value).toISOString() : null })
                )
              }
            />
          </label>
        </div>
      </div>
    </section>
  );
}
