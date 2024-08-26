import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import App from './App'
import { RecoilRoot } from 'recoil'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RecoilRoot>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </RecoilRoot>,
)
