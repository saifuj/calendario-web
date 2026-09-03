import { useState } from 'react'
import { SwatchIcon } from '@heroicons/react/20/solid'
import { TEMAS } from '../../hooks/useTheme'

export default function ThemeSwitcher({ tema, onCambiar }) {
  const [abierto, setAbierto] = useState(false)

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setAbierto((valor) => !valor)}
        title="Elegir tema"
        className="rounded-full border border-[var(--surface-800)] bg-[var(--surface-900)]/60 p-2.5 text-slate-400 transition hover:text-white"
      >
        <SwatchIcon className="size-4" />
      </button>

      {abierto && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setAbierto(false)} />
          <div className="absolute right-0 z-50 mt-2 w-60 rounded-2xl border border-[var(--surface-800)] bg-[var(--surface-900)] p-3 shadow-2xl">
            <p className="px-1 pb-2 text-xs font-bold uppercase tracking-widest text-slate-500">Tema</p>
            <div className="grid grid-cols-3 gap-2">
              {TEMAS.map((opcion) => {
                const seleccionado = tema === opcion.id
                return (
                  <button
                    key={opcion.id}
                    type="button"
                    onClick={() => {
                      onCambiar(opcion.id)
                      setAbierto(false)
                    }}
                    className={[
                      'flex flex-col items-center gap-1.5 rounded-xl border p-2 transition',
                      seleccionado ? 'border-white/20 bg-white/5' : 'border-transparent hover:bg-white/5',
                    ].join(' ')}
                  >
                    <span
                      className="h-6 w-6 rounded-full ring-2 ring-offset-2 ring-offset-[var(--surface-900)]"
                      style={{
                        backgroundColor: opcion.color,
                        '--tw-ring-color': seleccionado ? opcion.color : 'transparent',
                      }}
                    />
                    <span className="text-[11px] font-medium text-slate-300">{opcion.etiqueta}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
