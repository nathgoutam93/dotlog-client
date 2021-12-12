import { Route, Redirect } from 'react-router';
import * as ROUTES from '../constants/routes';
import { useAuth } from '../context/authContext';

export default function ProtectedRoutes({ children, ...rest }) {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (currentUser) {
          return children;
        } else {
          return (
            <Redirect
              to={{
                pathname: ROUTES.LOGIN,
                state: { from: location },
              }}
            />
          );
        }
      }}
    />
  );
}
