import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import UserContext from './context/user';
import useAuthListener from './hooks/use-auth-listener';
import ProtectedRoute from './helpers/protected-routes';
import IsUserLoggedIn from './helpers/is-user-loggedin';
import FallBackLoader from './components/FallBackLoader';


// - Authentication
const Landing = lazy(() => import('./pages/landing'));
const Login = lazy(() => import('./pages/auth/login'));
const Signup = lazy(() => import('./pages/auth/signup'));
const ForgotPassword = lazy(() => import('./pages/auth/reset-password'));

// - Dashboard
const Dashboard = lazy(() => import('./pages/dashboard'))

// - Error: Not Found
const NotFound = lazy(() => import('./pages/not-found'))

function App() {
  const { user } = useAuthListener()

  useEffect(() => {
    document.title = 'USDT Casino & Gambling - Crypto Casino | GOLDENTICKET.CLUB'
  },
    [])

  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense fallback={<FallBackLoader />} >
          <Switch>

            {/* GUEST USERS */}
            <IsUserLoggedIn user={user} loggedInPath={ROUTES.LOGIN} path={ROUTES.LANDING} exact>
              <Landing />
            </IsUserLoggedIn>
            <IsUserLoggedIn user={user} loggedInPath={ROUTES.DASHBOARD} path={ROUTES.LOGIN}>
              <Login />
            </IsUserLoggedIn>
            <IsUserLoggedIn user={user} loggedInPath={ROUTES.DASHBOARD} path={ROUTES.SIGNUP}>
              <Signup />
            </IsUserLoggedIn>
            <IsUserLoggedIn user={user} loggedInPath={ROUTES.DASHBOARD} path={ROUTES.RECOVER_PASSWORD} exact>
              <ForgotPassword />
            </IsUserLoggedIn>

            {/* LOGGED USERS */}
            <ProtectedRoute user={user} path={ROUTES.DASHBOARD} exact>
              <Dashboard />
            </ProtectedRoute>

            {/* ALL USERS */}
            <Route path="*" component={NotFound} />

          </Switch>
        </Suspense>
      </Router>

    </UserContext.Provider>
  );
}


export default App;
