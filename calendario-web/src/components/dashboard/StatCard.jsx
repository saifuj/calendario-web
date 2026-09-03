export default function StatCard({ etiqueta, valor, colorTexto }) {
  return (
    <div className="rounded-2xl border border-[var(--surface-800)] bg-[var(--surface-900)]/60 p-4 shadow-lg shadow-black/20">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{etiqueta}</p>
      <p className={`mt-1 text-3xl font-bold ${colorTexto}`}>{valor}</p>
    </div>
  )
}
