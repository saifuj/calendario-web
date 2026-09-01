import { XMarkIcon } from '@heroicons/react/20/solid'
import { RECURRENCIA_LABELS } from '../../utils/recurrence'

const BADGE_POR_TIPO = {
  unica: 'bg-slate-700/50 text-slate-300',
  diaria: 'bg-indigo-500/10 text-indigo-300',
  semanal: 'bg-violet-500/10 text-violet-300',
  anual: 'bg-amber-500/10 text-amber-300',
}

export default function TaskItem({ tarea, onAlternar, onEliminar }) {
  return (
    <li className="flex items-start gap-3 rounded-2xl border border-slate-800 bg-slate-800/40 p-3.5">
      <input
        type="checkbox"
        checked={tarea.completada}
        onChange={onAlternar}
        className="mt-1 h-5 w-5 shrink-0 rounded border-slate-600 bg-slate-800 accent-indigo-500 focus:ring-indigo-400"
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p
            className={[
              'truncate text-sm font-semibold',
              tarea.completada ? 'text-slate-600 line-through' : 'text-white',
            ].join(' ')}
          >
            {tarea.titulo}
          </p>
          <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${BADGE_POR_TIPO[tarea.tipo]}`}>
            {RECURRENCIA_LABELS[tarea.tipo]}
          </span>
        </div>
        {tarea.descripcion && <p className="mt-0.5 truncate text-xs text-slate-500">{tarea.descripcion}</p>}
      </div>
      <button
        type="button"
        onClick={onEliminar}
        aria-label="Eliminar tarea"
        className="-m-1.5 shrink-0 p-1.5 text-slate-600 transition hover:text-rose-400"
      >
        <XMarkIcon className="size-4" />
      </button>
    </li>
  )
}
