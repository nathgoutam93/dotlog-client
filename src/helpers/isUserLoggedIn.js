import { Route, Redirect } from 'react-router';
import { useAuth } from '../context/authContext';

export default function IsUserLoggedIn({ loggedInpath, children, ...rest }) {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (!currentUser) {
          return children;
        } else {
          return (
            <Redirect
              to={{
                pathname: loggedInpath,
                state: { from: location },
              }}
            />
          );
        }
      }}
    />
  );
}
