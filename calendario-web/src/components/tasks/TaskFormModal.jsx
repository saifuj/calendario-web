import { useState } from 'react'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { toISODate } from '../../utils/dateUtils'
import { RECURRENCIA_LABELS, TIPOS_RECURRENCIA } from '../../utils/recurrence'

const DESCRIPCION_TIPO = {
  [TIPOS_RECURRENCIA.UNICA]: 'Ocurre solo en la fecha indicada.',
  [TIPOS_RECURRENCIA.DIARIA]: 'Se repite todos los días dentro del rango indicado.',
  [TIPOS_RECURRENCIA.SEMANAL]: 'Se repite cada semana (el mismo día) dentro del rango indicado.',
  [TIPOS_RECURRENCIA.ANUAL]: 'Se repite cada año (mismo mes y día) dentro del rango indicado.',
}

const ESTILO_CAMPO =
  'rounded-xl border border-[var(--surface-700)] bg-[var(--surface-800)] px-3 py-2 text-sm font-normal text-white placeholder-slate-500 focus:border-[var(--accent-500)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-500)]/30'

function sumarMeses(fechaISO, meses) {
  const fecha = new Date(`${fechaISO}T00:00:00`)
  fecha.setMonth(fecha.getMonth() + meses)
  return toISODate(fecha)
}

export default function TaskFormModal({ fechaInicial, onCerrar, onGuardar }) {
  const [titulo, setTitulo] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [tipo, setTipo] = useState(TIPOS_RECURRENCIA.UNICA)
  const [fecha, setFecha] = useState(toISODate(fechaInicial))
  const [fechaFin, setFechaFin] = useState('')

  const esUnica = tipo === TIPOS_RECURRENCIA.UNICA

  const manejarCambioTipo = (evento) => {
    const nuevoTipo = evento.target.value
    setTipo(nuevoTipo)
    // Toda tarea recurrente necesita un fin; si no, se repetiría para siempre.
    // Se sugiere 3 meses como punto de partida, editable por el usuario.
    if (nuevoTipo !== TIPOS_RECURRENCIA.UNICA && !fechaFin) {
      setFechaFin(sumarMeses(fecha, 3))
    }
  }

  const manejarSubmit = (evento) => {
    evento.preventDefault()
    if (!titulo.trim()) return
    if (!esUnica && !fechaFin) return

    onGuardar({
      titulo: titulo.trim(),
      descripcion: descripcion.trim(),
      tipo,
      fechaInicio: fecha,
      fechaFin: esUnica ? null : fechaFin,
    })
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onCerrar}
    >
      <div
        className="w-full max-w-md rounded-3xl border border-[var(--surface-800)] bg-[var(--surface-900)] p-6 shadow-2xl"
        onClick={(evento) => evento.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Nueva tarea</h2>
          <button
            type="button"
            onClick={onCerrar}
            aria-label="Cerrar"
            className="text-slate-500 transition hover:text-white"
          >
            <XMarkIcon className="size-5" />
          </button>
        </div>

        <form onSubmit={manejarSubmit} className="mt-4 flex flex-col gap-3">
          <label className="flex flex-col gap-1 text-sm font-semibold text-slate-400">
            Título
            <input
              value={titulo}
              onChange={(evento) => setTitulo(evento.target.value)}
              required
              placeholder="Poner título"
              className={ESTILO_CAMPO}
            />
          </label>

          <label className="flex flex-col gap-1 text-sm font-semibold text-slate-400">
            Descripción
            <textarea
              value={descripcion}
              onChange={(evento) => setDescripcion(evento.target.value)}
              rows={2}
              placeholder="Poner descripción (opcional)"
              className={`resize-none ${ESTILO_CAMPO}`}
            />
          </label>

          <label className="flex flex-col gap-1 text-sm font-semibold text-slate-400">
            Repetición
            <select value={tipo} onChange={manejarCambioTipo} className={ESTILO_CAMPO}>
              {Object.values(TIPOS_RECURRENCIA).map((valor) => (
                <option key={valor} value={valor}>
                  {RECURRENCIA_LABELS[valor]}
                </option>
              ))}
            </select>
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="flex flex-col gap-1 text-sm font-semibold text-slate-400">
              {esUnica ? 'Fecha' : 'Desde'}
              <input
                type="date"
                value={fecha}
                onChange={(evento) => setFecha(evento.target.value)}
                required
                className={`${ESTILO_CAMPO} [color-scheme:dark]`}
              />
            </label>

            {!esUnica && (
              <label className="flex flex-col gap-1 text-sm font-semibold text-slate-400">
                Hasta
                <input
                  type="date"
                  value={fechaFin}
                  onChange={(evento) => setFechaFin(evento.target.value)}
                  min={fecha}
                  required
                  className={`${ESTILO_CAMPO} [color-scheme:dark]`}
                />
              </label>
            )}
          </div>

          <p className="text-xs text-slate-500">{DESCRIPCION_TIPO[tipo]}</p>

          <button
            type="submit"
            className="mt-2 rounded-full bg-[var(--accent-600)] py-2 text-sm font-bold text-white shadow-md shadow-[var(--accent-950)]/50 transition hover:bg-[var(--accent-500)]"
          >
            Guardar tarea
          </button>
        </form>
      </div>
    </div>
  )
}
