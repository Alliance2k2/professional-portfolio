'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useSyncExternalStore } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
const links = [
  ['/about', 'About'],
  ['/projects', 'Work'],
  ['/research', 'Research'],
  ['/blog', 'Writing'],
];
function subscribeTheme(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener('ia-theme-change', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('ia-theme-change', callback);
  };
}
function getThemeSnapshot() {
  return document.documentElement.dataset.theme !== 'light';
}
function getServerThemeSnapshot() {
  return true;
}
export function Navigation() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const dark = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );
  function toggleTheme() {
    const next =
      document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('ia-theme', next);
    } catch {}
    window.dispatchEvent(new Event('ia-theme-change'));
  }
  return (
    <header className="header">
      <div className="container nav">
        <Link href="/" className="brand">
          <span className="monogram">
            IA<span>•</span>
          </span>
          <span>
            Irigenera Alliance
            <span className="brand-sub">DATA · RESEARCH · ENGINEERING</span>
          </span>
        </Link>
        <nav
          className={open ? 'nav-links open' : 'nav-links'}
          aria-label="Main navigation"
        >
          {links.map(([url, label]) => (
            <Link
              key={url}
              href={url}
              aria-current={path.startsWith(url) ? 'page' : undefined}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            className="nav-contact"
            href="/contact"
            onClick={() => setOpen(false)}
          >
            Let’s connect
          </Link>
        </nav>
        <button
          className="icon-button theme-button"
          onClick={toggleTheme}
          aria-label="Toggle color theme"
        >
          {dark ? <Sun size={19} /> : <Moon size={19} />}
        </button>
        <button
          className="icon-button menu-button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
