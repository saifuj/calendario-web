import { useEffect, useState } from 'react'

export const TEMAS = [
  { id: 'indigo', etiqueta: 'Índigo', color: '#6366f1' },
  { id: 'azul', etiqueta: 'Azul', color: '#3b82f6' },
  { id: 'violeta', etiqueta: 'Violeta', color: '#8b5cf6' },
  { id: 'esmeralda', etiqueta: 'Esmeralda', color: '#10b981' },
  { id: 'rosa', etiqueta: 'Rosa', color: '#f43f5e' },
  { id: 'ambar', etiqueta: 'Ámbar', color: '#f59e0b' },
]

const CLAVE = 'calendario_tema'

// Cambia el color de acento de toda la app (botones, día de hoy, etc.) escribiendo
// data-theme en <html>; las variables --accent-* de index.css hacen el resto. Se guarda
// por navegador (localStorage), igual que el modo oscuro en dashboard-web.
export function useTheme() {
  const [tema, setTema] = useState(() => localStorage.getItem(CLAVE) || 'indigo')

  useEffect(() => {
    document.documentElement.dataset.theme = tema
    localStorage.setItem(CLAVE, tema)
  }, [tema])

  return [tema, setTema]
}
