import * as ROUTES from './constants/routes';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { lazy, Suspense, useState, useEffect } from 'react';

import ProtectedRoutes from './helpers/protectedRoutes';
import IsUserLoggedIn from './helpers/isUserLoggedIn';
import { AuthProvider } from './context/authContext';
import { FirestoreProvider } from './context/firestoreContext';
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
// const Projects = lazy(() => import('./pages/Projects'));
// const Project = lazy(() => import('./pages/project'));
// const NewProject = lazy(() => import('./pages/createProject'));
const Messages = lazy(() => import('./pages/Messages'));
const Notification = lazy(() => import('./pages/Notification'));

function App() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    let oldScroll = 0;

    const controlshow = () => {
      let scrollY = window.scrollY;

      if (scrollY > oldScroll) {
        setShow(false);
      } else {
        setShow(true);
      }
      oldScroll = scrollY;
    };

    window.addEventListener('scroll', controlshow);

    return () => {
      window.removeEventListener('scroll', controlshow);
    };
  }, []);

  return (
    <AuthProvider>
      <FirestoreProvider>
        <Router>
          <div className="flex flex-col items-center h-screen w-full font-sans lg:w-2/5">
            <Header/>
            <Navbar show={show} />

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

                {/*<ProtectedRoutes path={ROUTES.PROJECTS}>
                  <Projects />
                </ProtectedRoutes>

                <ProtectedRoutes path={`${ROUTES.PROJECT}/:projectId`}>
                  <Project />
                </ProtectedRoutes> 

                <ProtectedRoutes path={ROUTES.NEW_PROJECT} exact>
                  <NewProject />
                </ProtectedRoutes>*/}
                
                <ProtectedRoutes path={ROUTES.MESSAGES} exact>
                  <Messages />
                </ProtectedRoutes>

                <ProtectedRoutes path={ROUTES.NOTIFICATION} exact>
                  <Notification />
                </ProtectedRoutes>

              </Switch>
            </Suspense>
          </div>
        </Router>
      </FirestoreProvider>
    </AuthProvider>
  );
}

export default App;
