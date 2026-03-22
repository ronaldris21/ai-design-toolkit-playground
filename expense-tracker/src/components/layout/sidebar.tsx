import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { navLinks } from './nav-links'

export function Sidebar() {
  return (
    <aside className="hidden md:flex w-60 flex-col border-r bg-sidebar p-4">
      <div className="mb-8 px-2">
        <span className="text-lg font-semibold tracking-tight">Expense Tracker</span>
      </div>
      <nav aria-label="Main navigation" className="flex flex-col gap-1">
        {navLinks.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/50',
              )
            }
          >
            <Icon className="h-4 w-4" />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
