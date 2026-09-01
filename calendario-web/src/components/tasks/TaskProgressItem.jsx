import { XMarkIcon } from '@heroicons/react/20/solid'
import { RECURRENCIA_LABELS } from '../../utils/recurrence'

const BADGE_POR_TIPO = {
  unica: 'bg-slate-700/50 text-slate-300',
  diaria: 'bg-indigo-500/10 text-indigo-300',
  semanal: 'bg-violet-500/10 text-violet-300',
  anual: 'bg-amber-500/10 text-amber-300',
}

// Vista agregada de una tarea recurrente dentro de un período (semana/mes): cuántas de sus
// ocurrencias ya se completaron, sin listar cada día por separado.
export default function TaskProgressItem({ tarea, onEliminar }) {
  const porcentaje =
    tarea.totalOcurrencias === 0 ? 0 : Math.round((tarea.completadas / tarea.totalOcurrencias) * 100)

  return (
    <li className="rounded-2xl border border-slate-800 bg-slate-800/40 p-3.5">
      <div className="flex items-center justify-between gap-2">
        <p className="truncate text-sm font-semibold text-white">{tarea.titulo}</p>
        <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${BADGE_POR_TIPO[tarea.tipo]}`}>
          {RECURRENCIA_LABELS[tarea.tipo]}
        </span>
      </div>
      <div className="mt-2.5 flex items-center gap-2.5">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-700">
          <div className="h-full rounded-full bg-indigo-500" style={{ width: `${porcentaje}%` }} />
        </div>
        <span className="shrink-0 text-xs font-semibold text-slate-400">
          {tarea.completadas}/{tarea.totalOcurrencias}
        </span>
        <button
          type="button"
          onClick={onEliminar}
          aria-label="Eliminar tarea"
          className="-m-1.5 shrink-0 p-1.5 text-slate-600 transition hover:text-rose-400"
        >
          <XMarkIcon className="size-4" />
        </button>
      </div>
    </li>
  )
}
