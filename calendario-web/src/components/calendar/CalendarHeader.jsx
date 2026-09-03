import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

export default function CalendarHeader({
  etiquetaMes,
  onMesAnterior,
  onMesSiguiente,
  onHoy,
  onNuevaTarea,
}) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 bg-[var(--surface-800)]/40 px-4 py-4 sm:px-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Calendario</p>
        <h1 className="text-lg font-bold capitalize text-white sm:text-xl">{etiquetaMes}</h1>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center rounded-md bg-white/5 ring-1 ring-inset ring-white/10">
          <button
            type="button"
            onClick={onMesAnterior}
            aria-label="Mes anterior"
            className="flex h-10 w-10 items-center justify-center rounded-l-md text-slate-300 transition hover:bg-white/10 hover:text-white focus:relative"
          >
            <ChevronLeftIcon className="size-5" />
          </button>
          <button
            type="button"
            onClick={onHoy}
            className="border-x border-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10 focus:relative"
          >
            Hoy
          </button>
          <button
            type="button"
            onClick={onMesSiguiente}
            aria-label="Mes siguiente"
            className="flex h-10 w-10 items-center justify-center rounded-r-md text-slate-300 transition hover:bg-white/10 hover:text-white focus:relative"
          >
            <ChevronRightIcon className="size-5" />
          </button>
        </div>
        <button
          type="button"
          onClick={onNuevaTarea}
          className="rounded-md bg-[var(--accent-500)] px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-[var(--accent-950)]/50 transition hover:bg-[var(--accent-400)]"
        >
          + Nueva tarea
        </button>
      </div>
    </header>
  )
}
