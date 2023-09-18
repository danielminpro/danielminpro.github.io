import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'
import { ThemeProvider } from './contexts/theme'
import Overlay from './components/Overlay'

createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <App />
    <Overlay />
  </ThemeProvider>
)
