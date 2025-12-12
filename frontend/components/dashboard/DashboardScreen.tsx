"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  selectCharts,
  selectFilteredRecords,
  selectListError,
  selectListStatus
} from "@/redux/selectors/dashboardSelectors";
import { hydrateCharts } from "@/redux/slices/chartSlice";
import { setError, setRecords, setStatus } from "@/redux/slices/listSlice";
import FilterBar from "@/components/dashboard/FilterBar";
import MetricsGrid from "@/components/dashboard/MetricsGrid";
import RecordsTable from "@/components/dashboard/RecordsTable";
import ChartGallery from "@/components/dashboard/ChartGallery";
import RecordDetailSheet from "@/components/dashboard/RecordDetailSheet";
import AppHeader from "@/components/dashboard/AppHeader";
import CreateRecordForm from "@/components/dashboard/CreateRecordForm";
import { DashboardRecord } from "@/types/dashboard";

export default function DashboardScreen() {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectListStatus);
  const error = useAppSelector(selectListError);
  const filteredRecords = useAppSelector(selectFilteredRecords);
  const charts = useAppSelector(selectCharts);
  const [selectedRecord, setSelectedRecord] = useState<DashboardRecord | null>(null);

  useEffect(() => {
    if (status !== "idle") {
      return;
    }

    const loadRecords = async () => {
      dispatch(setStatus("loading"));
      try {
        const response = await fetch("/api/records?page=1&limit=500", { cache: "no-store" });
        if (!response.ok) {
          throw new Error("Respuesta no OK");
        }
        const json = await response.json();
        const data = (json.data ?? []) as DashboardRecord[];
        dispatch(setRecords(data));
      } catch (_err) {
        dispatch(setError("No se pudieron cargar los datos desde el servidor"));
      }
    };

    void loadRecords();
  }, [dispatch, status]);

  useEffect(() => {
    if (!filteredRecords.length) {
      dispatch(hydrateCharts([]));
      return;
    }
    dispatch(hydrateCharts(filteredRecords));
  }, [dispatch, filteredRecords]);

  useEffect(() => {
    if (selectedRecord && !filteredRecords.some(record => record.id === selectedRecord.id)) {
      setSelectedRecord(null);
    }
  }, [filteredRecords, selectedRecord]);

  const handleSelectRecord = (record: DashboardRecord) => setSelectedRecord(record);
  const closeDetails = () => setSelectedRecord(null);

  return (
    <section className="flex flex-col gap-2 pb-6">
      <AppHeader lastUpdated={filteredRecords[0]?.updatedAt} />
      <CreateRecordForm />
      <FilterBar />
      <div className="mt-2 flex flex-col gap-2 lg:grid lg:grid-cols-[2.3fr,1.4fr] lg:items-start">
        <div className="flex flex-col gap-2">
          <RecordsTable
            records={filteredRecords}
            status={status}
            error={error}
            onSelectRecord={handleSelectRecord}
            selectedId={selectedRecord?.id ?? null}
          />
        </div>
        <div className="flex flex-col gap-2">
          <MetricsGrid charts={charts} isLoading={status !== "ready"} />
          <ChartGallery charts={charts} isLoading={status !== "ready"} />
        </div>
      </div>
      <RecordDetailSheet record={selectedRecord} onClose={closeDetails} />
    </section>
  );
}
