import { useCallback, useEffect, useState } from 'react'
import { toISODate } from '../utils/dateUtils'
import { ocurreEnFecha } from '../utils/recurrence'
import { API_BASE } from '../lib/api'

function tipoDesdeApi(tipo) {
  return tipo.charAt(0).toLowerCase() + tipo.slice(1)
}

function tipoHaciaApi(tipo) {
  return tipo.charAt(0).toUpperCase() + tipo.slice(1)
}

function mapearTarea(tarea) {
  return {
    id: tarea.id,
    titulo: tarea.titulo,
    descripcion: tarea.descripcion ?? '',
    tipo: tipoDesdeApi(tarea.tipo),
    fechaInicio: tarea.fechaInicio,
    fechaFin: tarea.fechaFin ?? null,
    fechasCompletadas: tarea.fechasCompletadas ?? [],
  }
}

// Tareas del usuario autenticado, respaldadas por calendario-api (sin estado local de ejemplo).
export function useTasks(usuarioId) {
  const [tareas, setTareas] = useState([])
  const [cargando, setCargando] = useState(true)

  const cargarTareas = useCallback(() => {
    if (!usuarioId) {
      setTareas([])
      setCargando(false)
      return
    }

    setCargando(true)
    fetch(`${API_BASE}/api/tarea?usuarioId=${usuarioId}`)
      .then((respuesta) => (respuesta.ok ? respuesta.json() : []))
      .then((datos) => setTareas(datos.map(mapearTarea)))
      .catch(() => setTareas([]))
      .finally(() => setCargando(false))
  }, [usuarioId])

  useEffect(() => {
    cargarTareas()
  }, [cargarTareas])

  const agregarTarea = async (tarea) => {
    if (!usuarioId) return

    const respuesta = await fetch(`${API_BASE}/api/tarea`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        titulo: tarea.titulo,
        descripcion: tarea.descripcion || null,
        tipo: tipoHaciaApi(tarea.tipo),
        fechaInicio: tarea.fechaInicio,
        fechaFin: tarea.fechaFin || null,
        usuarioId,
      }),
    })
    if (!respuesta.ok) return

    const creada = await respuesta.json()
    setTareas((prev) => [...prev, mapearTarea(creada)])
  }

  const eliminarTarea = async (id) => {
    setTareas((prev) => prev.filter((tarea) => tarea.id !== id))
    await fetch(`${API_BASE}/api/tarea/${id}`, { method: 'DELETE' })
  }

  const alternarCompletada = async (id, fechaISO) => {
    const tarea = tareas.find((t) => t.id === id)
    if (!tarea) return

    const yaCompletada = tarea.fechasCompletadas.includes(fechaISO)
    setTareas((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              fechasCompletadas: yaCompletada
                ? t.fechasCompletadas.filter((fecha) => fecha !== fechaISO)
                : [...t.fechasCompletadas, fechaISO],
            }
          : t,
      ),
    )

    await fetch(`${API_BASE}/api/tarea/${id}/completada`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fecha: fechaISO, completada: !yaCompletada }),
    })
  }

  const obtenerTareasDelDia = (fecha) => {
    const fechaISO = toISODate(fecha)
    return tareas
      .filter((tarea) => ocurreEnFecha(tarea, fecha))
      .map((tarea) => ({ ...tarea, completada: tarea.fechasCompletadas.includes(fechaISO) }))
  }

  return { tareas, cargando, agregarTarea, eliminarTarea, alternarCompletada, obtenerTareasDelDia }
}
