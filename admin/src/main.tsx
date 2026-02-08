import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Initialize theme before React renders to prevent flash
type Theme = 'light' | 'dark' | 'auto';
const savedTheme = localStorage.getItem('theme') as Theme;
const theme = savedTheme && ['light', 'dark', 'auto'].includes(savedTheme) ? savedTheme : 'auto';

if (theme === 'auto') {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
} else {
  document.documentElement.setAttribute('data-theme', theme);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
