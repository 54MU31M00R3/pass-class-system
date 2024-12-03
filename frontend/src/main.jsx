import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// generated CSS via tailwind package
import './output.css'
import App from './App.jsx'

// this function retrieves the div within the DOM tree with id='root'
// then it renders the react App component within it

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
