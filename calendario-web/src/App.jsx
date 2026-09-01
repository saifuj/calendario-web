import {useState} from 'react'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-slate-100 flex items center justify-center">
      <div className="bg-white rounded-2x1 shadow-lg p-8 w-full max-w-md text-center">
      <h1 className='text-2x1 font bold text-slate-800 mb-2'>
        Vite + React
        </h1>
        <p className='text-slate-600 mb-6'>
          React + Vite + Tailwind CSS
        </p>
        <button
        onClick={() => setCount((count) => count + 1)}
        className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors'
        >
          Count is {count}
        </button>
      </div>
    </div>
  )
}