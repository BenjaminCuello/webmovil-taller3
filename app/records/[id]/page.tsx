import { notFound } from "next/navigation";
import { prisma } from "@backend/lib/prisma";
import { mapRecordToDashboard } from "@backend/lib/services/recordMapper";
import RecordDetailSheet from "@/components/dashboard/RecordDetailSheet";

interface RecordPageProps {
  params: { id: string };
}

export default async function RecordPage({ params }: RecordPageProps) {
  const record = await prisma.record.findUnique({
    where: { id: params.id }
  });

  if (!record) {
    notFound();
  }

  const dashboardRecord = mapRecordToDashboard(record);

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-6">
      <h1 className="text-xl font-semibold text-[var(--text)]">Detalle del registro</h1>
      <p className="mb-2 text-sm text-[var(--text-secondary)]">
        Vista dedicada utilizando datos en tiempo real desde la base de datos.
      </p>
      <div
        className="relative border rounded-none"
        style={{
          backgroundColor: "var(--bg-secondary)",
          borderColor: "var(--border)",
          color: "var(--text)"
        }}
      >
        <RecordDetailSheet record={dashboardRecord} onClose={() => {}} />
      </div>
    </main>
  );
}
