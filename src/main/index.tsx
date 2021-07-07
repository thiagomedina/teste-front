import React from 'react'
import { render } from 'react-dom'

import App from '@/presentation/App'

const rootElement = document.getElementById('main')

render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    rootElement,
)