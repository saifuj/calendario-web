const COLOR_POR_TIPO = {
  unica: 'bg-slate-400',
  diaria: 'bg-indigo-400',
  semanal: 'bg-violet-400',
  anual: 'bg-amber-400',
}

export default function DayCell({ numeroDia, esMesActual, esHoy, seleccionado, tareas, onSeleccionar }) {
  return (
    <button
      type="button"
      onClick={onSeleccionar}
      className={[
        'group relative flex min-h-[92px] flex-col items-start gap-1 px-2 py-2 text-left transition sm:px-3',
        esMesActual ? 'bg-slate-900' : 'bg-slate-900/40',
        seleccionado ? 'bg-indigo-500/10 ring-1 ring-inset ring-indigo-500/40' : 'hover:bg-slate-800/60',
      ].join(' ')}
    >
      <span
        className={[
          'flex h-7 w-7 items-center justify-center rounded-full text-sm font-semibold',
          esHoy ? 'bg-indigo-500 text-white' : esMesActual ? 'text-slate-200' : 'text-slate-600',
        ].join(' ')}
      >
        {numeroDia}
      </span>

      {tareas.length > 0 && (
        <ol className="mt-0.5 w-full space-y-0.5">
          {tareas.slice(0, 2).map((tarea) => (
            <li key={tarea.id} className="flex items-center gap-1.5">
              <span
                className={[
                  'h-1.5 w-1.5 shrink-0 rounded-full',
                  COLOR_POR_TIPO[tarea.tipo],
                  tarea.completada ? 'opacity-30' : '',
                ].join(' ')}
              />
              <span
                className={[
                  'min-w-0 flex-1 truncate text-xs',
                  tarea.completada ? 'text-slate-600 line-through' : 'text-slate-300',
                ].join(' ')}
              >
                {tarea.titulo}
              </span>
            </li>
          ))}
          {tareas.length > 2 && <li className="text-[11px] text-slate-500">+{tareas.length - 2} más</li>}
        </ol>
      )}
    </button>
  )
}
