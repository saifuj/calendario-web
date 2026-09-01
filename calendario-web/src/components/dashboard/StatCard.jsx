export default function StatCard({ etiqueta, valor, colorTexto }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-lg shadow-black/20">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{etiqueta}</p>
      <p className={`mt-1 text-3xl font-bold ${colorTexto}`}>{valor}</p>
    </div>
  )
}
