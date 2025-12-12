"use client";

import { FormEvent, useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { upsertRecord } from "@/redux/slices/listSlice";
import { DashboardRecord, RecordCategory, RecordStatus } from "@/types/dashboard";

interface CreateRecordFormProps {
  onCreated?: () => void;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

const categoryOptions: RecordCategory[] = ["finanzas", "operaciones", "marketing", "rrhh", "soporte"];
const statusOptions: RecordStatus[] = ["activo", "pendiente", "resuelto"];

export default function CreateRecordForm({ onCreated }: CreateRecordFormProps) {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");
  const [owner, setOwner] = useState("");
  const [category, setCategory] = useState<RecordCategory>("finanzas");
  const [status, setStatus] = useState<RecordStatus>("activo");
  const [amount, setAmount] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (submitting) return;

    const parsedAmount = Number(amount.replace(",", "."));
    if (Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      setError("Ingresa un monto valido mayor a 0.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/records", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          owner,
          category,
          status,
          amount: parsedAmount,
          tags: tags
            .split(",")
            .map(tag => tag.trim())
            .filter(Boolean)
        })
      });

      const json = (await response.json()) as ApiResponse<DashboardRecord>;

      if (!response.ok || !json.success || !json.data) {
        setError(json.error ?? "No se pudo crear el registro.");
        return;
      }

      dispatch(upsertRecord(json.data));
      setTitle("");
      setOwner("");
      setAmount("");
      setTags("");
      if (onCreated) {
        onCreated();
      }
    } catch (_err) {
      setError("Error de red al crear el registro.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      className="border px-4 py-2"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--bg-secondary)",
        color: "var(--text)"
      }}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-[10px] uppercase tracking-wide text-[var(--text-secondary)]">Nuevo registro</p>
          <h2 className="text-lg font-semibold">Agregar al tablero</h2>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="mt-2 grid gap-2 md:grid-cols-5">
        <div className="md:col-span-2">
          <label className="flex flex-col gap-1 text-sm text-[var(--text-secondary)]">
            <span>Titulo</span>
            <input
              required
              type="text"
              value={title}
              onChange={event => setTitle(event.target.value)}
              className="h-8 rounded-sm border px-3 text-sm placeholder:text-neutral-500 focus:outline-none"
              style={{
                borderColor: "var(--border)",
                backgroundColor: "var(--bg)",
                color: "var(--text)"
              }}
              placeholder="Ej: Registro ventas Q1"
            />
          </label>
        </div>
        <div>
          <label className="flex flex-col gap-1 text-sm text-[var(--text-secondary)]">
            <span>Responsable</span>
            <input
              required
              type="text"
              value={owner}
              onChange={event => setOwner(event.target.value)}
              className="h-8 rounded-sm border px-3 text-sm placeholder:text-neutral-500 focus:outline-none"
              style={{
                borderColor: "var(--border)",
                backgroundColor: "var(--bg)",
                color: "var(--text)"
              }}
              placeholder="Nombre"
            />
          </label>
        </div>
        <div>
          <label className="flex flex-col gap-1 text-sm text-[var(--text-secondary)]">
            <span>Categoria</span>
            <select
              value={category}
              onChange={event => setCategory(event.target.value as RecordCategory)}
              className="h-8 rounded-sm border px-2 text-sm focus:outline-none"
              style={{
                borderColor: "var(--border)",
                backgroundColor: "var(--bg)",
                color: "var(--text)"
              }}
            >
              {categoryOptions.map(option => (
                <option key={option} value={option}>
                  {option.toUpperCase()}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label className="flex flex-col gap-1 text-sm text-[var(--text-secondary)]">
            <span>Estado</span>
            <select
              value={status}
              onChange={event => setStatus(event.target.value as RecordStatus)}
              className="h-8 rounded-sm border px-2 text-sm focus:outline-none"
              style={{
                borderColor: "var(--border)",
                backgroundColor: "var(--bg)",
                color: "var(--text)"
              }}
            >
              {statusOptions.map(option => (
                <option key={option} value={option}>
                  {option.toUpperCase()}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label className="flex flex-col gap-1 text-sm text-[var(--text-secondary)]">
            <span>Monto (CLP)</span>
            <input
              required
              inputMode="decimal"
              type="text"
              value={amount}
              onChange={event => setAmount(event.target.value)}
              className="h-8 rounded-sm border px-3 text-sm placeholder:text-neutral-500 focus:outline-none"
              style={{
                borderColor: "var(--border)",
                backgroundColor: "var(--bg)",
                color: "var(--text)"
              }}
              placeholder="150000"
            />
          </label>
        </div>
        <div className="md:col-span-3">
          <label className="flex flex-col gap-1 text-sm text-[var(--text-secondary)]">
            <span>Etiquetas (separadas por coma)</span>
            <input
              type="text"
              value={tags}
              onChange={event => setTags(event.target.value)}
              className="h-9 rounded border px-3 text-sm placeholder:text-neutral-500 focus:outline-none"
              style={{
                borderColor: "var(--border)",
                backgroundColor: "var(--bg)",
                color: "var(--text)"
              }}
              placeholder="urgente, Q1, cliente-vip"
            />
          </label>
        </div>
        <div className="flex flex-col justify-end gap-1 md:col-span-2">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center justify-center border px-4 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60"
            style={{
              borderColor: "#facc15",
              backgroundColor: "var(--bg)",
              color: "#facc15"
            }}
          >
            {submitting ? "Guardando..." : "Crear registro"}
          </button>
          {error && <p className="text-sm text-rose-400">{error}</p>}
        </div>
      </form>
    </section>
  );
}

