import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { MainRouter } from './router/MainRouter.jsx'
import { AuthProvider } from './store/AuthProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <MainRouter>
    <App />
    </MainRouter>
    </AuthProvider>
  </StrictMode>,
)
