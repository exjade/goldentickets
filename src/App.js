import React, { lazy, useEffect } from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import UserContext from './context/user'
import useAuthListener from './hooks/use-auth-listener'

// - Dashboard
const Dashboard = lazy(() => import('./pages/dashboard'))

function App() {
  const { user } = useAuthListener()

  useEffect(() => { document.title = 'Title Here' }, [])

  return (
    <UserContext.Provider value={{ user }}>
        <Router>
            <Switch>
             
                <Dashboard />

            </Switch>
        </Router>

    </UserContext.Provider>
  );
}


export default App;
