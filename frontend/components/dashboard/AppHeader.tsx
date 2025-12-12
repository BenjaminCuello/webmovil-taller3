"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toggleTheme } from "@/redux/slices/themeSlice";

interface AppHeaderProps {
  lastUpdated?: string;
}

export default function AppHeader({ lastUpdated }: AppHeaderProps) {
  const formatted = lastUpdated
    ? new Date(lastUpdated).toLocaleString("es-CL", { dateStyle: "medium", timeStyle: "short" })
    : "Sincronizando";

  const dispatch = useAppDispatch();
  const theme = useAppSelector(state => state.theme.mode);

  const icon = theme === "light" ? "🌞" : "🌙";

  return (
    <header className="border-b border-[var(--border)] bg-[var(--bg-secondary)] px-6 py-3 text-[var(--text)]">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-[var(--text-secondary)]">
            Panel operativo
          </p>
          <h1 className="mt-1 text-2xl font-semibold leading-tight">Dashboard de registros</h1>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            Seguimiento compacto de actividades, montos y estado operativo en tiempo casi real.
          </p>
        </div>
        <div className="flex items-start gap-3 sm:flex-col sm:items-end">
          <button
            type="button"
            onClick={() => dispatch(toggleTheme())}
            className="text-xl transition hover:opacity-80"
            aria-label="Cambiar tema"
          >
            {icon}
          </button>
          <div className="flex flex-col items-start gap-1 text-[11px] text-[var(--text-secondary)] sm:items-end">
            <span className="inline-flex items-center gap-2 border border-[var(--border)] bg-[var(--bg)] px-3 py-1">
              <span className="h-2 w-2 bg-[#22c55e]" />
              <span className="font-medium">Conectado</span>
            </span>
            <span>Ultima actualizacion: {formatted}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

