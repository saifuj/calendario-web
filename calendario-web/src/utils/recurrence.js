import { toISODate } from './dateUtils'

export const TIPOS_RECURRENCIA = {
  UNICA: 'unica',
  DIARIA: 'diaria',
  SEMANAL: 'semanal',
  ANUAL: 'anual',
}

export const RECURRENCIA_LABELS = {
  [TIPOS_RECURRENCIA.UNICA]: 'Única vez',
  [TIPOS_RECURRENCIA.DIARIA]: 'Todos los días',
  [TIPOS_RECURRENCIA.SEMANAL]: 'Cada semana',
  [TIPOS_RECURRENCIA.ANUAL]: 'Cada año',
}

function inicioDelDia(fecha) {
  return new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate())
}

// Determina si una tarea (con su regla de recurrencia) ocurre en una fecha dada.
// Las recurrentes (todo menos "unica") necesitan fechaFin: sin límite, se repetirían para
// siempre (ej. "cada semana" sin fin sería una vez a la semana toda la vida).
export function ocurreEnFecha(tarea, fecha) {
  const dia = inicioDelDia(fecha)
  const inicio = inicioDelDia(new Date(`${tarea.fechaInicio}T00:00:00`))

  if (dia < inicio) return false

  if (tarea.tipo !== TIPOS_RECURRENCIA.UNICA && tarea.fechaFin) {
    const fin = inicioDelDia(new Date(`${tarea.fechaFin}T00:00:00`))
    if (dia > fin) return false
  }

  switch (tarea.tipo) {
    case TIPOS_RECURRENCIA.UNICA:
      return toISODate(dia) === toISODate(inicio)
    case TIPOS_RECURRENCIA.DIARIA:
      return true
    case TIPOS_RECURRENCIA.SEMANAL:
      return dia.getDay() === inicio.getDay()
    case TIPOS_RECURRENCIA.ANUAL:
      return dia.getMonth() === inicio.getMonth() && dia.getDate() === inicio.getDate()
    default:
      return false
  }
}
