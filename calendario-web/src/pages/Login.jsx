import { useMsal } from '@azure/msal-react'
import { loginRequest } from '../lib/authConfig'

export default function Login() {
  const { instance } = useMsal()

  function iniciarSesion() {
    instance.loginRedirect(loginRequest).catch(() => {})
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--surface-950)] px-4">
      <div className="w-full max-w-sm rounded-3xl border border-[var(--surface-800)] bg-[var(--surface-900)]/60 p-8 text-center shadow-lg shadow-black/20">
        <img src="/logo_guandy.png" alt="Guandy" className="mx-auto h-14 w-auto" />

        <h1 className="mt-5 text-xl font-bold text-white">Calendario Guandy</h1>
        <p className="mt-2 text-sm text-slate-400">
          Inicia sesión con tu cuenta corporativa de Microsoft para ver y administrar tus tareas.
        </p>

        <button
          type="button"
          onClick={iniciarSesion}
          className="mt-6 flex w-full items-center justify-center gap-2.5 rounded-md bg-[var(--accent-500)] px-4 py-3 text-sm font-semibold text-white shadow-md shadow-[var(--accent-950)]/50 transition hover:bg-[var(--accent-400)]"
        >
          <WindowsIcon />
          Iniciar sesión con Microsoft
        </button>

        <p className="mt-5 text-xs text-slate-500">Solo cuentas corporativas @guandy.com pueden acceder.</p>
      </div>
    </div>
  )
}

function WindowsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 21 21" fill="#fff" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="9" height="9" />
      <rect x="11" y="1" width="9" height="9" />
      <rect x="1" y="11" width="9" height="9" />
      <rect x="11" y="11" width="9" height="9" />
    </svg>
  )
}
