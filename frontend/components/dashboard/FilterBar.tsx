"use client";

import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectFilters } from "@/redux/selectors/dashboardSelectors";
import {
  resetFilters,
  setCategory,
  setDateRange,
  setSearch,
  setSortBy,
  setSortDirection,
  setStatus
} from "@/redux/slices/filterSlice";
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
    <section
      className="border-b px-6 py-2"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--bg-secondary)",
        color: "var(--text)"
      }}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 text-[var(--text-secondary)]">
        <span className="text-lg font-semibold text-[var(--text)]">Filtros activos</span>
        <button
          className="border px-2 py-1 text-xs font-medium hover:opacity-80"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--bg)",
            color: "var(--text)"
          }}
          onClick={() => dispatch(resetFilters())}
        >
          Reiniciar
        </button>
      </div>
      <div className="mt-2 grid gap-2 text-sm text-[var(--text-secondary)] md:grid-cols-3">
        <label className="flex flex-col gap-1">
          <span>Categoria</span>
          <select
            className="h-8 rounded-sm border px-2 text-sm focus:outline-none"
            style={{
              borderColor: "var(--border)",
              backgroundColor: "var(--bg)",
              color: "var(--text)"
            }}
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
        <label className="flex flex-col gap-1">
          <span>Estado</span>
          <select
            className="h-8 rounded-sm border px-2 text-sm focus:outline-none"
            style={{
              borderColor: "var(--border)",
              backgroundColor: "var(--bg)",
              color: "var(--text)"
            }}
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
        <label className="flex flex-col gap-1">
          <span>Orden</span>
          <div className="flex items-center gap-2">
            <select
              className="h-8 flex-1 rounded-sm border px-2 text-sm focus:outline-none"
              style={{
                borderColor: "var(--border)",
                backgroundColor: "var(--bg)",
                color: "var(--text)"
              }}
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
              className="h-8 border px-2 text-sm hover:opacity-80"
              style={{
                borderColor: "var(--border)",
                backgroundColor: "var(--bg)",
                color: "var(--text)"
              }}
              onClick={toggleDirection}
            >
              {filters.sortDirection === "asc" ? "Asc" : "Desc"}
            </button>
          </div>
        </label>
      </div>
      <div className="mt-2 grid gap-2 text-sm text-[var(--text-secondary)] md:grid-cols-3">
        <label className="md:col-span-2 flex flex-col gap-1">
          <span>Busqueda</span>
          <input
            type="search"
            placeholder="Nombre, responsable o etiqueta"
            className="h-8 rounded-sm border px-3 text-sm placeholder:text-neutral-500 focus:outline-none"
            style={{
              borderColor: "var(--border)",
              backgroundColor: "var(--bg)",
              color: "var(--text)"
            }}
            value={filters.search}
            onChange={event => dispatch(setSearch(event.target.value))}
          />
        </label>
        <div className="grid grid-cols-2 gap-2">
          <label className="flex flex-col gap-1">
            <span>Desde</span>
            <input
              type="date"
              className="h-8 rounded-sm border px-2 text-sm focus:outline-none"
              style={{
                borderColor: "var(--border)",
                backgroundColor: "var(--bg)",
                color: "var(--text)"
              }}
              value={formattedDates.from}
              onChange={event =>
                dispatch(
                  setDateRange({
                    from: event.target.value ? new Date(event.target.value).toISOString() : null,
                    to: filters.dateRange.to
                  })
                )
              }
            />
          </label>
          <label className="flex flex-col gap-1">
            <span>Hasta</span>
            <input
              type="date"
              className="h-8 rounded-sm border px-2 text-sm focus:outline-none"
              style={{
                borderColor: "var(--border)",
                backgroundColor: "var(--bg)",
                color: "var(--text)"
              }}
              value={formattedDates.to}
              onChange={event =>
                dispatch(
                  setDateRange({
                    from: filters.dateRange.from,
                    to: event.target.value ? new Date(event.target.value).toISOString() : null
                  })
                )
              }
            />
          </label>
        </div>
      </div>
    </section>
  );
}

