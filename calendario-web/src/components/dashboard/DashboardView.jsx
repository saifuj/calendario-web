import { useMemo, useState } from 'react'
import StatCard from './StatCard'
import ListaResumen from './ListaResumen'
import { construirResumen, obtenerEtiquetaPeriodo } from '../../utils/taskStats'
import { RECURRENCIA_LABELS } from '../../utils/recurrence'
import { toISODate } from '../../utils/dateUtils'

const HOY = new Date()

const PERIODOS = [
  { id: 'dia', etiqueta: 'Día' },
  { id: 'semana', etiqueta: 'Semana' },
  { id: 'mes', etiqueta: 'Mes' },
]

export default function DashboardView({ tareas, obtenerTareasDelDia, alternarCompletada, eliminarTarea }) {
  const [periodo, setPeriodo] = useState('dia')

  const resumen = useMemo(
    () => construirResumen(tareas, obtenerTareasDelDia, periodo, HOY),
    [tareas, obtenerTareasDelDia, periodo],
  )

  const esDia = periodo === 'dia'
  const listaPendientes = esDia ? resumen.pendientesOcurrencias : resumen.pendientesAgregado
  const listaCompletadas = esDia ? resumen.completadasOcurrencias : resumen.completadasAgregado

  const etiquetaPeriodo = obtenerEtiquetaPeriodo(periodo, HOY)
  const hoyISO = toISODate(HOY)

  const alternarDeHoy = (tarea) => alternarCompletada(tarea.id, hoyISO)
  const alternarVencida = (tarea) => alternarCompletada(tarea.id, tarea.fechaInicio)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Resumen</p>
          <h1 className="text-2xl font-bold capitalize text-white sm:text-3xl">Actividades de {etiquetaPeriodo}</h1>
        </div>

        <div className="flex w-fit gap-1 rounded-full border border-[var(--surface-800)] bg-[var(--surface-900)]/60 p-1">
          {PERIODOS.map((opcion) => (
            <button
              key={opcion.id}
              type="button"
              onClick={() => setPeriodo(opcion.id)}
              className={[
                'rounded-full px-4 py-1.5 text-sm font-semibold transition',
                periodo === opcion.id ? 'bg-[var(--accent-500)] text-white' : 'text-slate-400 hover:text-white',
              ].join(' ')}
            >
              {opcion.etiqueta}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard etiqueta="Ocurrencias" valor={resumen.totalOcurrencias} colorTexto="text-[var(--accent-400)]" />
        <StatCard etiqueta="Completadas" valor={resumen.completadasOcurrencias.length} colorTexto="text-emerald-400" />
        <StatCard etiqueta="Pendientes" valor={resumen.pendientesOcurrencias.length} colorTexto="text-amber-400" />
        <StatCard etiqueta="Vencidas" valor={resumen.vencidas.length} colorTexto="text-rose-400" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ListaResumen
          titulo="Pendientes"
          tareas={listaPendientes}
          vacio="No tienes tareas pendientes en este período."
          onAlternar={alternarDeHoy}
          onEliminar={eliminarTarea}
          variante={esDia ? 'ocurrencia' : 'progreso'}
        />
        <ListaResumen
          titulo="Completadas"
          tareas={listaCompletadas}
          vacio="Aún no completas tareas en este período."
          onAlternar={alternarDeHoy}
          onEliminar={eliminarTarea}
          variante={esDia ? 'ocurrencia' : 'progreso'}
        />
      </div>

      <ListaResumen
        titulo="Vencidas"
        tareas={resumen.vencidas}
        vacio="No tienes tareas únicas vencidas. 🎉"
        onAlternar={alternarVencida}
        onEliminar={eliminarTarea}
      />

      <div className="rounded-3xl border border-[var(--surface-800)] bg-[var(--surface-900)]/60 p-5 shadow-lg shadow-black/20">
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-300">Tareas por tipo</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {Object.entries(RECURRENCIA_LABELS).map(([tipo, etiqueta]) => (
            <span
              key={tipo}
              className="rounded-full border border-[var(--surface-700)] bg-[var(--surface-800)]/60 px-3 py-1.5 text-xs font-bold text-slate-200"
            >
              {etiqueta}: {resumen.conteoPorTipo[tipo] ?? 0}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
