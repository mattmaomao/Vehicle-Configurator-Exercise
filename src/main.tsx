import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import VehicleSelector from './VehicleSelector.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <VehicleSelector />
  </StrictMode>,
)
