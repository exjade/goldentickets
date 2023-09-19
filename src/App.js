import React, { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import UserContext from './context/user'
import useAuthListener from './hooks/use-auth-listener'
import FallBackLoader from './components/FallBackLoader'


// - Dashboard
const Dashboard = lazy(() => import('./pages/dashboard'))

function App() {
  const { user } = useAuthListener()

  useEffect(() => { document.title = 'Title Here' }, [])

  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense fallback={<FallBackLoader />} >

          <Switch>

            <Route path="*" component={Dashboard} />

          </Switch>

        </Suspense>
      </Router>

    </UserContext.Provider>
  );
}


export default App;
