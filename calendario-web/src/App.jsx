const weekDays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']

const monthDays = [
  { day: 29, muted: true },
  { day: 30, muted: true },
  { day: 1 },
  { day: 2 },
  { day: 3 },
  { day: 4 },
  { day: 5 },
  { day: 6 },
  { day: 7 },
  { day: 8 },
  { day: 9 },
  { day: 10 },
  { day: 11 },
  { day: 12 },
  { day: 13 },
  { day: 14 },
  { day: 15 },
  { day: 16 },
  { day: 17 },
  { day: 18 },
  { day: 19 },
  { day: 20 },
  { day: 21 },
  { day: 22 },
  { day: 23 },
  { day: 24 },
  { day: 25 },
  { day: 26 },
  { day: 27 },
  { day: 28 },
  { day: 29 },
  { day: 30 },
  { day: 1, muted: true },
  { day: 2, muted: true },
]

const events = [
  { title: 'Reunión de equipo', time: '09:30', tone: 'lavender' },
  { title: 'Terapia', time: '12:00', tone: 'peach' },
  { title: 'Clase de yoga', time: '18:30', tone: 'mint' },
  { title: 'Cena con amigos', time: '20:00', tone: 'sky' },
]

export default function App() {
  return (
    <main className="app-shell">
      <section className="calendar-card">
        <header className="calendar-header">
          <div>
            <p className="eyebrow">Agenda</p>
            <h1>Septiembre</h1>
          </div>
          <button type="button" className="add-button">
            + Añadir
          </button>
        </header>

        <div className="calendar-weekdays" aria-label="Días de la semana">
          {weekDays.map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>

        <div className="calendar-grid" aria-label="Calendario del mes">
          {monthDays.map((item, index) => (
            <div
              key={`${item.day}-${index}`}
              className={`day-cell ${item.muted ? 'muted' : ''} ${item.day === 14 ? 'selected' : ''}`}
            >
              <span>{item.day}</span>
              {item.day === 7 && <i className="dot lavender" />}
              {item.day === 12 && <i className="dot peach" />}
              {item.day === 18 && <i className="dot mint" />}
              {item.day === 24 && <i className="dot sky" />}
            </div>
          ))}
        </div>
      </section>

      <aside className="agenda-card">
        <div className="agenda-header">
          <p className="eyebrow">Hoy</p>
          <h2>Miércoles 18</h2>
        </div>

        <div className="mini-pills">
          <span>Trabajos</span>
          <span>Personal</span>
          <span>Salud</span>
        </div>

        <ul className="event-list">
          {events.map((event) => (
            <li key={event.title} className={`event-item ${event.tone}`}>
              <div className="event-bullet" aria-hidden="true" />
              <div>
                <h3>{event.title}</h3>
                <p>{event.time}</p>
              </div>
            </li>
          ))}
        </ul>
      </aside>
    </main>
  )
}
