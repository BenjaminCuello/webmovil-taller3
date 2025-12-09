"use client";

import { useEffect, useState } from "react";
import { buildMockRecords } from "@/lib/data/mockRecords";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectCharts, selectFilteredRecords, selectListError, selectListStatus } from "@/redux/selectors/dashboardSelectors";
import { hydrateCharts } from "@/redux/slices/chartSlice";
import { setError, setRecords, setStatus } from "@/redux/slices/listSlice";
import FilterBar from "@/components/dashboard/FilterBar";
import MetricsGrid from "@/components/dashboard/MetricsGrid";
import RecordsTable from "@/components/dashboard/RecordsTable";
import ChartGallery from "@/components/dashboard/ChartGallery";
import RecordDetailSheet from "@/components/dashboard/RecordDetailSheet";
import AppHeader from "@/components/dashboard/AppHeader";
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

  useEffect(() => {
    if (selectedRecord && !filteredRecords.some(record => record.id === selectedRecord.id)) {
      setSelectedRecord(null);
    }
  }, [filteredRecords, selectedRecord]);

  const handleSelectRecord = (record: DashboardRecord) => setSelectedRecord(record);
  const closeDetails = () => setSelectedRecord(null);

  return (
    <section className="flex flex-col gap-5 pb-12">
      <AppHeader lastUpdated={filteredRecords[0]?.updatedAt} />
      <FilterBar />
      <MetricsGrid charts={charts} isLoading={status !== "ready"} />
      <ChartGallery charts={charts} isLoading={status !== "ready"} />
      <RecordsTable
        records={filteredRecords}
        status={status}
        error={error}
        onSelectRecord={handleSelectRecord}
        selectedId={selectedRecord?.id ?? null}
      />
      <RecordDetailSheet record={selectedRecord} onClose={closeDetails} />
    </section>
  );
}
