import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
// x.ai key:
// xai-xyerKXh629Pkmq6UquP1IgSyL3TkTKKbBZJKzlKv0jC1hvHNqyr6kM7JVeGwWxrCJBWA7Yl504thLllQ
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
