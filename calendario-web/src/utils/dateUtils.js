const ETIQUETAS_DIA_SEMANA = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
const ETIQUETAS_MES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
]

export function toISODate(fecha) {
  const anio = fecha.getFullYear()
  const mes = String(fecha.getMonth() + 1).padStart(2, '0')
  const dia = String(fecha.getDate()).padStart(2, '0')
  return `${anio}-${mes}-${dia}`
}

export function isSameDay(a, b) {
  return toISODate(a) === toISODate(b)
}

export function addMonths(fecha, cantidad) {
  return new Date(fecha.getFullYear(), fecha.getMonth() + cantidad, 1)
}

export function getMonthLabel(fecha) {
  return `${ETIQUETAS_MES[fecha.getMonth()]} ${fecha.getFullYear()}`
}

export function getWeekdayLabels() {
  return ETIQUETAS_DIA_SEMANA
}

// Devuelve una matriz de 6 semanas x 7 días (incluye días de meses adyacentes para completar la grilla)
export function getMonthMatrix(anio, mes) {
  const primerDiaMes = new Date(anio, mes, 1)
  const desfaseInicial = primerDiaMes.getDay()
  const inicioGrilla = new Date(anio, mes, 1 - desfaseInicial)

  const semanas = []
  const cursor = new Date(inicioGrilla)
  for (let semana = 0; semana < 6; semana += 1) {
    const dias = []
    for (let i = 0; i < 7; i += 1) {
      dias.push(new Date(cursor))
      cursor.setDate(cursor.getDate() + 1)
    }
    semanas.push(dias)
  }
  return semanas
}
