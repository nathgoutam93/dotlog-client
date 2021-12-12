import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import { useAuth } from '../context/authContext';

export default function Login() {
  const history = useHistory();
  const { login } = useAuth();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const isInvalid = password === '' || emailAddress === '';

  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(emailAddress, password);
      setLoading(false);
      history.push(ROUTES.DASHBOARD);
    } catch (error) {
      setEmailAddress('');
      setPassword('');
      setError(error.message);
    }
  };

  useEffect(() => {
    document.title = 'Login - Dotlog';
  }, []);

  return (
    <div className="flex flex-col h-full w-4/5 items-center justify-center">
      <div className="flex flex-col items-center p-4 border w-full border-gray-700 mb-4 rounded">
        <h1 className="flex justify-center w-full text-white font-bold mb-2">
          dotlog
        </h1>

        {error && <p className="mb-4 text-xs text-red-600">{error}</p>}

        <form onSubmit={handleLogin} method="POST">
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
          <button
            disabled={isInvalid || loading}
            type="submit"
            className={`bg-gray-700 text-white w-full rounded h-8 font-bold ${
              isInvalid && 'opacity-50'
            }`}
          >
            Log In
          </button>
        </form>
      </div>
      <div className="flex justify-center items-center flex-col w-full p-4 border border-gray-700 rounded">
        <p className="text-sm text-white">
          Don't have an account?{' '}
          <Link to={ROUTES.SIGN_UP} className="font-bold text-white">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
