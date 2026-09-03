import { useEffect, useRef, useState } from 'react'
import { useIsAuthenticated, useMsal, useAccount } from '@azure/msal-react'
import { ArrowRightStartOnRectangleIcon, BellIcon, BellSlashIcon } from '@heroicons/react/20/solid'
import Login from './pages/Login'
import CalendarView from './components/calendar/CalendarView'
import DashboardView from './components/dashboard/DashboardView'
import ThemeSwitcher from './components/layout/ThemeSwitcher'
import { useTasks } from './hooks/useTasks'
import { useTheme } from './hooks/useTheme'
import { sincronizarUsuario, actualizarNotificaciones } from './lib/api'

const PESTANAS = [
  { id: 'calendario', etiqueta: 'Calendario' },
  { id: 'dashboard', etiqueta: 'Resumen' },
]

function obtenerIniciales(nombre) {
  return nombre
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((palabra) => palabra[0].toUpperCase())
    .join('')
}

export default function App() {
  const isAuthenticated = useIsAuthenticated()
  const { instance, accounts } = useMsal()
  const account = useAccount(accounts[0] ?? null)

  const [vista, setVista] = useState('calendario')
  const [usuario, setUsuario] = useState(null)
  const [cargandoUsuario, setCargandoUsuario] = useState(true)

  const tareasApi = useTasks(usuario?.id)
  const [tema, setTema] = useTheme()

  // Evita disparar la sincronización dos veces para la misma cuenta (p. ej. por el doble
  // efecto de React StrictMode en desarrollo). El backend también es tolerante a esto,
  // pero así ahorramos la llamada de red duplicada.
  const correoSincronizado = useRef(null)

  useEffect(() => {
    if (!isAuthenticated || !account) return
    if (correoSincronizado.current === account.username) return
    correoSincronizado.current = account.username

    setCargandoUsuario(true)
    sincronizarUsuario({ correo: account.username, nombreCompleto: account.name ?? account.username })
      .then(setUsuario)
      .catch(() => setUsuario(null))
      .finally(() => setCargandoUsuario(false))
  }, [isAuthenticated, account])

  function cerrarSesion() {
    instance.logoutRedirect({ postLogoutRedirectUri: window.location.origin }).catch(() => {})
  }

  function alternarNotificaciones() {
    if (!usuario) return
    const siguiente = !usuario.notificarPorCorreo
    setUsuario((prev) => ({ ...prev, notificarPorCorreo: siguiente }))
    actualizarNotificaciones(usuario.id, siguiente).catch(() => {
      setUsuario((prev) => ({ ...prev, notificarPorCorreo: !siguiente }))
    })
  }

  if (!isAuthenticated) return <Login />

  if (cargandoUsuario) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--surface-950)] text-sm text-slate-400">
        Cargando tu cuenta...
      </div>
    )
  }

  if (!usuario) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-[var(--surface-950)] px-4 text-center">
        <p className="text-sm text-slate-400">
          No se pudo conectar con el servidor. Verifica que calendario-api esté corriendo.
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="rounded-full bg-[var(--accent-500)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--accent-400)]"
        >
          Reintentar
        </button>
      </div>
    )
  }

  if (tareasApi.cargando) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--surface-950)] text-sm text-slate-400">
        Cargando tus tareas...
      </div>
    )
  }

  const nombre = usuario?.nombreCompleto ?? account?.name ?? 'Usuario'

  return (
    <div className="min-h-screen bg-[var(--surface-950)] px-4 py-8 sm:px-8">
      <div className="mx-auto flex w-full max-w-[1800px] flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img src="/logo_guandy.png" alt="Guandy" className="h-8 w-auto" />

            <nav className="flex w-fit gap-1 rounded-full border border-[var(--surface-800)] bg-[var(--surface-900)]/60 p-1">
              {PESTANAS.map((pestana) => (
                <button
                  key={pestana.id}
                  type="button"
                  onClick={() => setVista(pestana.id)}
                  className={[
                    'rounded-full px-4 py-1.5 text-sm font-semibold transition',
                    vista === pestana.id ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-white',
                  ].join(' ')}
                >
                  {pestana.etiqueta}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <ThemeSwitcher tema={tema} onCambiar={setTema} />

            <button
              type="button"
              onClick={alternarNotificaciones}
              title={usuario.notificarPorCorreo ? 'Desactivar aviso diario por correo' : 'Activar aviso diario por correo'}
              className={[
                'rounded-full border p-2.5 transition',
                usuario.notificarPorCorreo
                  ? 'border-[var(--accent-500)]/40 bg-[var(--accent-500)]/15 text-[var(--accent-300)] hover:bg-[var(--accent-500)]/25'
                  : 'border-[var(--surface-800)] bg-[var(--surface-900)]/60 text-slate-500 hover:text-white',
              ].join(' ')}
            >
              {usuario.notificarPorCorreo ? <BellIcon className="size-4" /> : <BellSlashIcon className="size-4" />}
            </button>

            <div className="flex items-center gap-3 rounded-full border border-[var(--surface-800)] bg-[var(--surface-900)]/60 py-1.5 pl-1.5 pr-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--accent-500)] text-xs font-bold text-white">
                {obtenerIniciales(nombre)}
              </div>
              <div className="leading-tight">
                <p className="text-sm font-semibold text-white">{nombre}</p>
                {usuario?.puesto && <p className="text-xs text-slate-500">{usuario.puesto}</p>}
              </div>
              <button
                type="button"
                onClick={cerrarSesion}
                title="Cerrar sesión"
                className="ml-1 shrink-0 rounded-full p-2 text-slate-500 transition hover:bg-white/5 hover:text-white"
              >
                <ArrowRightStartOnRectangleIcon className="size-4" />
              </button>
            </div>
          </div>
        </div>

        {vista === 'calendario' ? <CalendarView {...tareasApi} /> : <DashboardView {...tareasApi} />}
      </div>
    </div>
  )
}
