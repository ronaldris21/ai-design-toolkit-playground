import { LayoutDashboard, Receipt, Tags } from 'lucide-react'

export const navLinks = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/expenses', label: 'Expenses', icon: Receipt },
  { to: '/categories', label: 'Categories', icon: Tags },
] as const
