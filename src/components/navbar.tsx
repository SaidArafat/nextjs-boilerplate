import { ModeToggle } from './ui/toggle-mode'

export default function Navbar() {
  return (
    <nav>
      <ul className="py-4 flex items-center justify-center gap-5 bg-slate-100 dark:bg-black">
        {items.map(({ id, label }) => (
          <li key={id} className="capitalize cursor-pointer">
            {label}
          </li>
        ))}
        <li>
          <ModeToggle />
        </li>
      </ul>
    </nav>
  )
}

const items = [
  { id: 1, label: 'home', path: '/' },
  { id: 2, label: 'feedbacks', path: '/feedbacks' },
  { id: 3, label: 'admin', path: '/admin' },
  { id: 4, label: 'survey', path: '/survey' }
]
