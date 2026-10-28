import './MenuToggleIcon.css'

export default function MenuToggleIcon({ open = false }) {
  return <span className="menu-toggle-icon" data-open={open} aria-hidden="true"><span /><span /></span>
}
