import { useMemo, useState } from 'react'
import CalendarHeader from './CalendarHeader'
import CalendarGrid from './CalendarGrid'
import AgendaPanel from '../tasks/AgendaPanel'
import TaskFormModal from '../tasks/TaskFormModal'
import { addMonths, getMonthLabel, getMonthMatrix, toISODate } from '../../utils/dateUtils'

const HOY = new Date()

export default function CalendarView({ agregarTarea, eliminarTarea, alternarCompletada, obtenerTareasDelDia }) {
  const [mesActual, setMesActual] = useState(new Date(HOY.getFullYear(), HOY.getMonth(), 1))
  const [fechaSeleccionada, setFechaSeleccionada] = useState(HOY)
  const [mostrarFormulario, setMostrarFormulario] = useState(false)

  const semanas = useMemo(
    () => getMonthMatrix(mesActual.getFullYear(), mesActual.getMonth()),
    [mesActual],
  )

  const tareasDelDiaSeleccionado = obtenerTareasDelDia(fechaSeleccionada)

  const etiquetaFechaSeleccionada = fechaSeleccionada.toLocaleDateString('es-GT', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })

  const manejarGuardarTarea = (tarea) => {
    agregarTarea(tarea)
    setMostrarFormulario(false)
  }

  const irAHoy = () => {
    setMesActual(new Date(HOY.getFullYear(), HOY.getMonth(), 1))
    setFechaSeleccionada(HOY)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="overflow-hidden rounded-2xl bg-[var(--surface-900)] ring-1 ring-white/10">
          <CalendarHeader
            etiquetaMes={getMonthLabel(mesActual)}
            onMesAnterior={() => setMesActual((mes) => addMonths(mes, -1))}
            onMesSiguiente={() => setMesActual((mes) => addMonths(mes, 1))}
            onHoy={irAHoy}
            onNuevaTarea={() => setMostrarFormulario(true)}
          />
          <CalendarGrid
            semanas={semanas}
            mesActual={mesActual}
            fechaSeleccionada={fechaSeleccionada}
            hoy={HOY}
            obtenerTareasDelDia={obtenerTareasDelDia}
            onSeleccionarFecha={setFechaSeleccionada}
          />
        </div>

        <AgendaPanel
          etiquetaFecha={etiquetaFechaSeleccionada}
          tareas={tareasDelDiaSeleccionado}
          onAlternar={(id) => alternarCompletada(id, toISODate(fechaSeleccionada))}
          onEliminar={eliminarTarea}
          onNuevaTarea={() => setMostrarFormulario(true)}
        />
      </div>

      {mostrarFormulario && (
        <TaskFormModal
          fechaInicial={fechaSeleccionada}
          onCerrar={() => setMostrarFormulario(false)}
          onGuardar={manejarGuardarTarea}
        />
      )}
    </div>
  )
}
