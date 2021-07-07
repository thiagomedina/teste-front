import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from '@/presentation/pages/Home'

export default function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/home' exact component={Home} />
            </Switch>
        </BrowserRouter>
    )
}