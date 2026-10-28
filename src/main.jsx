import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './cjk-fonts.css'
import './styles.css'
import './theme.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode><App /></React.StrictMode>,
)
