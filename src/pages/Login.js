import { useState } from 'react';
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
      setError(error.message);
      setPassword('');
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full p-4 flex flex-col justify-center items-center">
      <span className="text-2xl dark:text-light">Login to your account</span>
      <div className="mt-4 rounded-lg text-left bg-black dark:bg-white">
        <div className="h-2 bg-indigo-400 rounded-t-md"></div>
        {error && <p className="mb-4 text-xs text-red-600">{error}</p>}
        <form className="px-8 py-6" method="Post" onSubmit={handleLogin}>
          <label className="text-light dark:text-dark label block font-semibold">
            Email address
          </label>
          <input
            type="email"
            className="w-full h-5 mt-2 px-3 py-5 border rounded-md 
            focus:outline-none focus:ring-1 focus:ring-indigo-400"
            placeholder="Email"
            onChange={({ target }) => setEmailAddress(target.value)}
            value={emailAddress}
          />

          <label className="text-light dark:text-dark label mt-3 block font-semibold">
            Password
          </label>
          <input
            type="password"
            className="w-full h-5 mt-2 px-3 py-5 border rounded-md 
            focus:outline-none focus:ring-1 focus:ring-indigo-400"
            placeholder="Password"
            onChange={({ target }) => setPassword(target.value)}
            value={password}
          />
          <div className="flex items-center mt-4">
            <button
              disabled={isInvalid || loading}
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 rounded-md"
            >
              Log In
            </button>
            <Link to={ROUTES.FORGOT_PASSWORD}
              className="mx-3 text-sm text-light dark:text-dark hover:underline"
              href=""
            >
              Forgot password?
            </Link>
          </div>
        </form>
        <div className="p-2 flex justify-center items-center">
          <p className="text-sm text-light dark:text-dark">
            Don't have an account?{' '}
            <Link
              to={ROUTES.SIGN_UP}
              className="font-bold text-light dark:text-dark"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
