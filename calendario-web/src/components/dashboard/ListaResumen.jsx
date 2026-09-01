import TaskItem from '../tasks/TaskItem'
import TaskProgressItem from '../tasks/TaskProgressItem'

export default function ListaResumen({ titulo, tareas, vacio, onAlternar, onEliminar, variante = 'ocurrencia' }) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5 shadow-lg shadow-black/20">
      <h2 className="text-sm font-bold uppercase tracking-widest text-slate-300">{titulo}</h2>
      {tareas.length === 0 ? (
        <p className="mt-3 text-sm text-slate-500">{vacio}</p>
      ) : (
        <ul className="mt-3 flex flex-col gap-2">
          {tareas.map((tarea) =>
            variante === 'progreso' ? (
              <TaskProgressItem key={tarea.id} tarea={tarea} onEliminar={() => onEliminar(tarea.id)} />
            ) : (
              <TaskItem
                key={tarea.id}
                tarea={tarea}
                onAlternar={() => onAlternar(tarea)}
                onEliminar={() => onEliminar(tarea.id)}
              />
            ),
          )}
        </ul>
      )}
    </div>
  )
}
