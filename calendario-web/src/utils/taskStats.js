import { TIPOS_RECURRENCIA } from './recurrence'

function inicioDelDia(fecha) {
  return new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate())
}

// Lista de fechas (Date, a medianoche) que cubre el período solicitado, anclado a fechaReferencia.
export function obtenerRangoFechas(periodo, fechaReferencia) {
  const inicio = inicioDelDia(fechaReferencia)

  if (periodo === 'semana') {
    const inicioSemana = new Date(inicio)
    inicioSemana.setDate(inicioSemana.getDate() - inicioSemana.getDay())
    return Array.from({ length: 7 }, (_, i) => {
      const fecha = new Date(inicioSemana)
      fecha.setDate(fecha.getDate() + i)
      return fecha
    })
  }

  if (periodo === 'mes') {
    const anio = inicio.getFullYear()
    const mes = inicio.getMonth()
    const diasEnMes = new Date(anio, mes + 1, 0).getDate()
    return Array.from({ length: diasEnMes }, (_, i) => new Date(anio, mes, i + 1))
  }

  // 'dia'
  return [inicio]
}

function agruparPorTarea(ocurrencias) {
  const mapa = new Map()
  ocurrencias.forEach((ocurrencia) => {
    if (!mapa.has(ocurrencia.id)) {
      mapa.set(ocurrencia.id, { ...ocurrencia, totalOcurrencias: 0, completadas: 0 })
    }
    const entrada = mapa.get(ocurrencia.id)
    entrada.totalOcurrencias += 1
    if (ocurrencia.completada) entrada.completadas += 1
  })
  return Array.from(mapa.values())
}

// Resumen de estado de las tareas para el período solicitado (día/semana/mes), anclado a fechaReferencia (hoy).
// - Los KPIs (totales/completadas/pendientes) son a nivel de ocurrencia (cada día cuenta aparte).
// - Las listas "pendientesAgregado"/"completadasAgregado" son a nivel de tarea (útil cuando el
//   período abarca varios días y una tarea recurrente tendría muchas filas repetidas).
// - "Vencida" solo aplica a tareas únicas: una fecha pasada (respecto a HOY real) sin marcar como hecha.
export function construirResumen(tareas, obtenerTareasDelDia, periodo, fechaReferencia) {
  const fechas = obtenerRangoFechas(periodo, fechaReferencia)
  const inicioHoy = inicioDelDia(fechaReferencia)

  const ocurrencias = fechas.flatMap((fecha) => obtenerTareasDelDia(fecha))
  const completadasOcurrencias = ocurrencias.filter((tarea) => tarea.completada)
  const pendientesOcurrencias = ocurrencias.filter((tarea) => !tarea.completada)

  const agregadoPorTarea = agruparPorTarea(ocurrencias)
  const pendientesAgregado = agregadoPorTarea.filter((tarea) => tarea.completadas < tarea.totalOcurrencias)
  const completadasAgregado = agregadoPorTarea.filter((tarea) => tarea.completadas === tarea.totalOcurrencias)

  const vencidas = tareas
    .filter((tarea) => tarea.tipo === TIPOS_RECURRENCIA.UNICA)
    .filter((tarea) => inicioDelDia(new Date(`${tarea.fechaInicio}T00:00:00`)) < inicioHoy)
    .map((tarea) => {
      const fechaTarea = new Date(`${tarea.fechaInicio}T00:00:00`)
      return obtenerTareasDelDia(fechaTarea).find((ocurrencia) => ocurrencia.id === tarea.id)
    })
    .filter((tarea) => tarea && !tarea.completada)

  const conteoPorTipo = tareas.reduce((acumulado, tarea) => {
    acumulado[tarea.tipo] = (acumulado[tarea.tipo] ?? 0) + 1
    return acumulado
  }, {})

  return {
    totalDefiniciones: tareas.length,
    totalOcurrencias: ocurrencias.length,
    completadasOcurrencias,
    pendientesOcurrencias,
    pendientesAgregado,
    completadasAgregado,
    vencidas,
    conteoPorTipo,
  }
}

export function obtenerEtiquetaPeriodo(periodo, fechaReferencia) {
  if (periodo === 'semana') {
    const fechas = obtenerRangoFechas('semana', fechaReferencia)
    const opciones = { day: 'numeric', month: 'long' }
    const inicio = fechas[0].toLocaleDateString('es-GT', opciones)
    const fin = fechas[fechas.length - 1].toLocaleDateString('es-GT', opciones)
    return `semana del ${inicio} al ${fin}`
  }

  if (periodo === 'mes') {
    return fechaReferencia.toLocaleDateString('es-GT', { month: 'long', year: 'numeric' })
  }

  return fechaReferencia.toLocaleDateString('es-GT', { weekday: 'long', day: 'numeric', month: 'long' })
}
