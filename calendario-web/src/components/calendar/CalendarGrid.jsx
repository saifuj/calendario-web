import DayCell from './DayCell'
import { getWeekdayLabels, isSameDay } from '../../utils/dateUtils'

export default function CalendarGrid({
  semanas,
  mesActual,
  fechaSeleccionada,
  hoy,
  obtenerTareasDelDia,
  onSeleccionarFecha,
}) {
  return (
    <div>
      <div className="grid grid-cols-7 gap-px bg-slate-800 text-center text-xs font-semibold uppercase tracking-wide text-slate-400">
        {getWeekdayLabels().map((etiqueta) => (
          <div key={etiqueta} className="bg-slate-900 py-2">
            {etiqueta}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-px bg-slate-800">
        {semanas.flatMap((semana, indiceSemana) =>
          semana.map((fecha, indiceDia) => (
            <DayCell
              key={`${indiceSemana}-${indiceDia}`}
              numeroDia={fecha.getDate()}
              esMesActual={fecha.getMonth() === mesActual.getMonth()}
              esHoy={isSameDay(fecha, hoy)}
              seleccionado={isSameDay(fecha, fechaSeleccionada)}
              tareas={obtenerTareasDelDia(fecha)}
              onSeleccionar={() => onSeleccionarFecha(fecha)}
            />
          )),
        )}
      </div>
    </div>
  )
}
