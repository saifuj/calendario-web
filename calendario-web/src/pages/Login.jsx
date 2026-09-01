import { useMsal } from '@azure/msal-react'
import { loginRequest } from '../lib/authConfig'

export default function Login() {
  const { instance } = useMsal()

  function iniciarSesion() {
    instance.loginRedirect(loginRequest).catch(() => {})
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-sm rounded-3xl border border-slate-800 bg-slate-900/60 p-8 text-center shadow-lg shadow-black/20">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10">
          <CalendarioIcon />
        </div>

        <h1 className="mt-5 text-xl font-bold text-white">Calendario Guandy</h1>
        <p className="mt-2 text-sm text-slate-400">
          Inicia sesión con tu cuenta corporativa de Microsoft para ver y administrar tus tareas.
        </p>

        <button
          type="button"
          onClick={iniciarSesion}
          className="mt-6 flex w-full items-center justify-center gap-2.5 rounded-md bg-indigo-500 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-950/50 transition hover:bg-indigo-400"
        >
          <WindowsIcon />
          Iniciar sesión con Microsoft
        </button>

        <p className="mt-5 text-xs text-slate-500">Solo cuentas corporativas @guandy.com pueden acceder.</p>
      </div>
    </div>
  )
}

function CalendarioIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400">
      <rect x="3" y="4" width="18" height="17" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="16" y1="2" x2="16" y2="6" />
    </svg>
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
