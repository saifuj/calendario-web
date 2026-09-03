export const API_BASE = import.meta.env.VITE_API_BASE ?? 'http://localhost:5147'

// Se llama justo después de iniciar sesión con Microsoft: registra al usuario en calendario-api
// (o actualiza su nombre si ya existía) y devuelve su registro, incluido el Id que identifica sus tareas.
export async function sincronizarUsuario({ correo, nombreCompleto, puesto }) {
  const respuesta = await fetch(`${API_BASE}/api/usuario/sincronizar`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ correo, nombreCompleto, puesto }),
  })
  if (!respuesta.ok) throw new Error('No se pudo sincronizar el usuario')
  return respuesta.json()
}

// Activa/desactiva el correo diario con las tareas pendientes de hoy.
export async function actualizarNotificaciones(usuarioId, notificarPorCorreo) {
  const respuesta = await fetch(`${API_BASE}/api/usuario/${usuarioId}/notificaciones`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ notificarPorCorreo }),
  })
  if (!respuesta.ok) throw new Error('No se pudo actualizar la preferencia de notificaciones')
  return respuesta.json()
}
