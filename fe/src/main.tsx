import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import {BrowserRouter, Routes, Route} from 'react-router'
import TodoFormPage from './pages/TodoFormPage'
import { UnheadProvider } from '@unhead/react/client'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UnheadProvider>
      <BrowserRouter>
        <Routes>
          <Route index  element={<App/>} />
          <Route path='/todo-form-page' element={<TodoFormPage/>} />
        </Routes>
      </BrowserRouter>
    </UnheadProvider>
  </StrictMode>,
)
