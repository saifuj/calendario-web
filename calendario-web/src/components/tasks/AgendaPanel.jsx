import TaskItem from './TaskItem'

export default function AgendaPanel({ etiquetaFecha, tareas, onAlternar, onEliminar, onNuevaTarea }) {
  return (
    <div className="flex h-full flex-col rounded-3xl border border-slate-800 bg-slate-900/60 p-5 shadow-lg shadow-black/20">
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Agenda</p>
          <h2 className="text-lg font-bold capitalize text-white">{etiquetaFecha}</h2>
        </div>
        <button
          type="button"
          onClick={onNuevaTarea}
          className="shrink-0 rounded-full border border-slate-700 bg-slate-800/60 px-4 py-2.5 text-xs font-bold text-slate-200 transition hover:bg-slate-700"
        >
          + Agregar
        </button>
      </div>

      {tareas.length === 0 ? (
        <p className="mt-6 text-sm text-slate-500">No hay tareas para este día.</p>
      ) : (
        <ul className="mt-4 flex flex-col gap-2 overflow-y-auto">
          {tareas.map((tarea) => (
            <TaskItem
              key={tarea.id}
              tarea={tarea}
              onAlternar={() => onAlternar(tarea.id)}
              onEliminar={() => onEliminar(tarea.id)}
            />
          ))}
        </ul>
      )}
    </div>
  )
}
