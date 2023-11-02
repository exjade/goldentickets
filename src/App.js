import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import UserContext from './context/user';
import useAuthListener from './hooks/use-auth-listener';
import ProtectedRoute from './helpers/protected-routes';
import IsUserLoggedIn from './helpers/is-user-loggedin';
import FallBackLoader from './components/FallBackLoader';
import ProtectedRoutes from './helpers/admin-routes';
import useAuth from './hooks/use-auth';


// - Authentication
const Landing = lazy(() => import('./pages/landing'));
const Login = lazy(() => import('./pages/auth/login'));
const Signup = lazy(() => import('./pages/auth/signup'));
const Patner = lazy(() => import('./pages/auth/afiliate'));
const ForgotPassword = lazy(() => import('./pages/auth/reset-password'));

// - Members Routes
const Dashboard = lazy(() => import('./pages/dashboard'))

// Lotteries - Tickets pages
const BuyTickets = lazy(() => import('./pages/draw/buy-tickets'))
const BuyTickets1000 = lazy(() => import('./pages/draw/weekly-prize/buy-tickets'))
const BuyTicketsMelate = lazy(() => import('./pages/draw/melate/buy-tickets'))
// Lotteries - Winner pages
const Draw = lazy(() => import('./pages/draw/draw'))
const Draw1000 = lazy(() => import('./pages/draw/weekly-prize/draw'))
const DrawMelate = lazy(() => import('./pages/draw/melate/draw'))

// - Error: Not Found
const NotFound = lazy(() => import('./pages/not-found'))

// - Afiliados Routes
const DashboardAfiliados = lazy(() => import('./pages/afiliados'))

// - Admin Routes
const AdminDashboard = lazy(() => import('./pages/dashboard-admin'))

// - Policy
const Policy = lazy(() => import('./pages/policy/policy'))
const Terms = lazy(() => import('./pages/policy/terms'))

function App() {
  const { user } = useAuthListener()
  const { user: authUser } = useAuth()

  useEffect(() => {
    document.title = 'USDT Casino & Gambling - Crypto Casino | GOLDENTICKET.CLUB'
  },
    [])

  return (
    <UserContext.Provider value={{ user }}>

      <Router>
        <Suspense fallback={<FallBackLoader />} >
          <Switch>

            <IsUserLoggedIn user={user} loggedInPath={ROUTES.DASHBOARD} path={ROUTES.LOGIN}>
              <Login />
            </IsUserLoggedIn>
            <IsUserLoggedIn user={user} loggedInPath={ROUTES.DASHBOARD} path={ROUTES.SIGNUP}>
              <Signup />
            </IsUserLoggedIn>
            <IsUserLoggedIn user={user} loggedInPath={ROUTES.DASHBOARD} path={ROUTES.PATNERS}>
              <Patner />
            </IsUserLoggedIn>
            <IsUserLoggedIn user={user} loggedInPath={ROUTES.DASHBOARD} path={ROUTES.RECOVER_PASSWORD} exact>
              <ForgotPassword />
            </IsUserLoggedIn>

            {/* Logged In USERS */}
            <ProtectedRoute user={user} path={ROUTES.DASHBOARD} exact>
              <Dashboard />
            </ProtectedRoute>

            {/* AFILIADOS */}
            <ProtectedRoute user={user} path={ROUTES.AFILIATE} exact>
              <DashboardAfiliados />
            </ProtectedRoute>

            {/* administration */}
            <ProtectedRoutes
              user={authUser}
              path={ROUTES.ADMIN_DASHBOARD}
              allowedRoles='admin'
              exact
            >
              <AdminDashboard />
            </ProtectedRoutes>

            {/* LOTTERY  BUY TICKETS */}
            <Route path={ROUTES.BUY_TICKETS} component={BuyTickets} exact />
            <Route path={ROUTES.BUY_TICKETS_1000} component={BuyTickets1000} exact />
            <Route path={ROUTES.BUY_TICKETS_MELATE} component={BuyTicketsMelate} exact />

            {/* WINNER PAGE */}
            <ProtectedRoute user={user} path={ROUTES.DRAW} exact>
              <Draw />
            </ProtectedRoute>
            <ProtectedRoute user={user} path={ROUTES.DRAW_1000} exact>
              <Draw1000 />
            </ProtectedRoute>
            <ProtectedRoute user={user} path={ROUTES.DRAW_MELATE} exact>
              <DrawMelate />
            </ProtectedRoute>

            {/* LANDING PAGE */}
            <Route path={ROUTES.LANDING} component={Landing} exact />
            {/* LAW  */}
            <Route path={ROUTES.POLICY} component={Policy} exact />
            <Route path={ROUTES.TERMS} component={Terms} exact />

            <Route path="*" component={NotFound} />

          </Switch>
        </Suspense>
      </Router>

    </UserContext.Provider>
  );
}


export default App;
