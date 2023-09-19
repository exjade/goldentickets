import React, { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import * as ROUTES from './constants/routes'
import UserContext from './context/user'
import { WatchListContextProvider } from './context/watchListContext'
import useAuthListener from './hooks/use-auth-listener'
import ProtectedRoute from './helpers/protected-routes'
import FallBackLoader from './components/FallBackLoader'

// - Dashboard
const Dashboard = lazy(() => import('./pages/dashboard'))
// - Admin
const AdminDashboard = lazy(() => import('./pages/dashboard-admin'))

function App() {
  const { user } = useAuthListener()

  useEffect(() => { document.title = 'Welcome to Artificial' }, [])

  return (
    <UserContext.Provider value={{ user }}>
      <WatchListContextProvider>
        <Router>
          <Suspense fallback={<FallBackLoader />} >
            <Switch>
             
              {/* DASHBOARD */}
              <ProtectedRoute user={user} path={ROUTES.DASHBOARD} exact>
                <Dashboard />
              </ProtectedRoute>

              {/* ADMIN */}
              <ProtectedRoute user={user} path={ROUTES.ADMIN_DASHBOARD} exact>
                <AdminDashboard />
              </ProtectedRoute>

            </Switch>
          </Suspense>
        </Router>

      </WatchListContextProvider>
    </UserContext.Provider>
  );
}


export default App;
