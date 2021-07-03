import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Page404 } from './pages/404'
import { Home } from './pages/home'
import { Login } from './pages/login'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/*" exact component={Page404} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
