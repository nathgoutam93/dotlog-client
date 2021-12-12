import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import { useAuth } from '../context/authContext';
import { useFirestore } from '../context/firestoreContext';

export default function SignUp() {
  const history = useHistory();
  const { signup, updateDisplayName } = useAuth();
  const { createUser } = useFirestore();

  const [username, setUsername] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirm] = useState('');

  const [error, setError] = useState('');
  const isInvalid = username === '' || password === '' || emailAddress === '';
  const passwordConfirmed = password === passwordConfirmation;
  const [loading, setLoading] = useState();

  const handleSignUp = async (event) => {
    event.preventDefault();

    if (passwordConfirmed) {
      try {
        setError('');
        setLoading(true);

        signup(emailAddress, password).then((userCredential) => {
          const user = userCredential.user;
          updateDisplayName(username);
          createUser(user.uid, username, emailAddress).then(() => {
            history.push(ROUTES.UPDATE_PROFILE);
          });
        });
      } catch (error) {
        setEmailAddress('');
        setPassword('');
        setPasswordConfirm('');
        setError(error.message);
      }

      setLoading(false);
    } else {
      setError('Password do not match');
    }
  };

  useEffect(() => {
    document.title = 'Sign Up - Dotlog';
  }, []);

  return (
    <div className="flex flex-col h-full w-full items-center justify-center">
      <div className="flex flex-col w-4/5 items-center p-4 border border-gray-700 mb-4 rounded">
        <h1 className="flex justify-center w-full font-bold text-white mb-2">
          dotlog
        </h1>

        {error && <p className="mb-4 text-xs text-red-600">{error}</p>}

        <form onSubmit={handleSignUp} method="POST">
          <input
            aria-label="enter a username"
            type="text"
            placeholder="username"
            className="bg-transparent text-sm text-white w-full mr-3 py-5 px-4 h2 border border-gray-700 rounded mb-2"
            onChange={({ target }) => setUsername(target.value)}
            value={username}
          />
          <input
            aria-label="enter your email address"
            type="text"
            placeholder="Email address"
            className="bg-transparent text-sm text-white w-full mr-3 py-5 px-4 h2 border border-gray-700 rounded mb-2"
            onChange={({ target }) => setEmailAddress(target.value)}
            value={emailAddress}
          />
          <input
            aria-label="enter your password"
            type="password"
            placeholder="Password"
            className="bg-transparent text-sm text-white w-full mr-3 py-5 px-4 h2 border border-gray-700 rounded mb-2"
            onChange={({ target }) => setPassword(target.value)}
            value={password}
          />
          <input
            aria-label="confirm your password"
            type="password"
            placeholder="confirm Password"
            className="bg-transparent text-sm text-white w-full mr-3 py-5 px-4 h2 border border-gray-700 rounded mb-2"
            onChange={({ target }) => setPasswordConfirm(target.value)}
            value={passwordConfirmation}
          />

          <button
            disabled={isInvalid || loading}
            type="submit"
            className="bg-gray-700 text-white w-full rounded h-8 font-bold"
          >
            Sign Up
          </button>
        </form>
      </div>
      <div className="flex justify-center items-center flex-col w-4/5 p-4 border border-gray-700 rounded">
        <p className="text-sm text-white">
          already have an account?{' '}
          <Link to={ROUTES.LOGIN} className="font-bold text-white">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
