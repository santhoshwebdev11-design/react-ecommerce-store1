
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import FilterContextProvider from './componenets/FilterContext.tsx'

createRoot(document.getElementById('root')!).render(
  
    <BrowserRouter>
    <FilterContextProvider>
      <App />
    </FilterContextProvider>
    </BrowserRouter>
    
  ,
)
