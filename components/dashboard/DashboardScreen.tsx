"use client";

import { useEffect } from "react";
import TrendAreaChart from "@/charts/TrendAreaChart";
import { buildMockRecords } from "@/lib/data/mockRecords";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectCharts, selectFilteredRecords, selectListError, selectListStatus } from "@/redux/selectors/dashboardSelectors";
import { hydrateCharts } from "@/redux/slices/chartSlice";
import { setError, setRecords, setStatus } from "@/redux/slices/listSlice";
import FilterBar from "@/components/dashboard/FilterBar";
import MetricsGrid from "@/components/dashboard/MetricsGrid";
import RecordsTable from "@/components/dashboard/RecordsTable";

export default function DashboardScreen() {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectListStatus);
  const error = useAppSelector(selectListError);
  const filteredRecords = useAppSelector(selectFilteredRecords);
  const charts = useAppSelector(selectCharts);

  useEffect(() => {
    if (status !== "idle") {
      return;
    }
    dispatch(setStatus("loading"));
    try {
      const data = buildMockRecords();
      dispatch(setRecords(data));
    } catch (_err) {
      dispatch(setError("No se pudieron simular los datos"));
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (!filteredRecords.length) {
      dispatch(hydrateCharts([]));
      return;
    }
    dispatch(hydrateCharts(filteredRecords));
  }, [dispatch, filteredRecords]);

  return (
    <section className="flex flex-col gap-5">
      <header className="flex flex-col gap-1">
        <p className="text-xs uppercase text-slate-400">Panel principal</p>
        <h1 className="text-3xl font-semibold tracking-tight">Operaciones móviles</h1>
        <p className="text-sm text-slate-400">Filtros persistentes, datos simulados y sincronización global</p>
      </header>
      <FilterBar />
      <section className="grid gap-4 sm:grid-cols-2">
        <MetricsGrid charts={charts} isLoading={status !== "ready"} />
        <div className="rounded-3xl bg-slate-900/60 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-medium">Evolución</h2>
            <span className="text-xs text-slate-400">Últimos meses</span>
          </div>
          <TrendAreaChart data={charts.trend} />
        </div>
      </section>
      <RecordsTable records={filteredRecords} status={status} error={error} />
    </section>
  );
}
