import * as ROUTES from './constants/routes';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import ProtectedRoutes from './helpers/protectedRoutes';
import IsUserLoggedIn from './helpers/isUserLoggedIn';
import { AuthProvider } from './context/authContext';
import { FirestoreProvider } from './context/firestoreContext';
import { HeaderProvider } from './context/headerContext';
import { NavProvider } from './context/navbarContext';
import Navbar from './components/navbar';
import Header from './components/header';

const Login = lazy(() => import('./pages/Login'));
const SignUp = lazy(() => import('./pages/signup'));
const ForgotPassword = lazy(() => import('./pages/forgotPassword'));
const Dashboard = lazy(() => import('./pages/dashboard'));
const Profile = lazy(() => import('./pages/profile'));
const UpdateProfile = lazy(() => import('./pages/updateProfile'));
const UploadPost = lazy(() => import('./pages/upload-post'));
const PostView = lazy(() => import('./pages/post'));
const Conversations = lazy(() => import('./pages/conversations'));
const Convertation = lazy(() => import('./pages/conversation'));
const Notification = lazy(() => import('./pages/Notification'));

function App() {
  return (
    <AuthProvider>
      <FirestoreProvider>
        <HeaderProvider>
          <NavProvider>
            <Router>
              <div className="flex flex-col items-center h-screen w-full font-sans lg:w-2/5">
                <Header />
                <Navbar />

                <Suspense
                  fallback={
                    <div className="w-full h-full flex justify-center items-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
                    </div>
                  }
                >
                  <Switch>
                    <IsUserLoggedIn
                      loggedInpath={ROUTES.DASHBOARD}
                      path={ROUTES.LOGIN}
                    >
                      <Login />
                    </IsUserLoggedIn>

                    <IsUserLoggedIn
                      loggedInpath={ROUTES.UPDATE_PROFILE}
                      path={ROUTES.SIGN_UP}
                    >
                      <SignUp />
                    </IsUserLoggedIn>

                    <IsUserLoggedIn
                      loggedInpath={ROUTES.DASHBOARD}
                      path={ROUTES.FORGOT_PASSWORD}
                    >
                      <ForgotPassword />
                    </IsUserLoggedIn>

                    <ProtectedRoutes path={ROUTES.DASHBOARD} exact>
                      <Dashboard />
                    </ProtectedRoutes>

                    <ProtectedRoutes path={`${ROUTES.PROFILE}/:userId`}>
                      <Profile />
                    </ProtectedRoutes>

                    <ProtectedRoutes path={ROUTES.UPDATE_PROFILE}>
                      <UpdateProfile />
                    </ProtectedRoutes>

                    <ProtectedRoutes path={`${ROUTES.Post}/:postId`}>
                      <PostView />
                    </ProtectedRoutes>

                    <ProtectedRoutes path={ROUTES.NEW_POST} exact>
                      <UploadPost />
                    </ProtectedRoutes>

                    <ProtectedRoutes path={ROUTES.MESSAGES} exact>
                      <Conversations />
                    </ProtectedRoutes>

                    <ProtectedRoutes
                      path={`${ROUTES.CONVERSATION}/:conversationId`}
                    >
                      <Convertation />
                    </ProtectedRoutes>

                    <ProtectedRoutes path={ROUTES.NOTIFICATION} exact>
                      <Notification />
                    </ProtectedRoutes>
                  </Switch>
                </Suspense>
              </div>
            </Router>
          </NavProvider>
        </HeaderProvider>
      </FirestoreProvider>
    </AuthProvider>
  );
}

export default App;
