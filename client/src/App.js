import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import './App.scss'
import Footer from './components/navigation/Footer';
import { useDisablePinchZoomEffect } from './hooks/useDisablePinchZoom'

function App() {
  useDisablePinchZoomEffect()

  return (
    <div className="App">
      <main>
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}

function AppRoutes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <LoginForm />
        </Route>
        <Route exact path="/signin">
          <LoginForm />
        </Route>
        <Route exact path="/signup">
          <SignupForm />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
