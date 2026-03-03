import { createRoot } from 'react-dom/client'
import { MovieProvider } from "./context/MovieContext";

import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <MovieProvider>
    <App />
  </MovieProvider>,
)
