import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import { useAuth } from '../context/authContext';

export default function ForgotPassword() {

  const { resetPassword } = useAuth();

  const [emailAddress, setEmailAddress] = useState('');
    const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const isInvalid = emailAddress === '';

  const [loading, setLoading] = useState(false);

  const handleReset = async (event) => {
    event.preventDefault();

    try {
      setError('');
      setLoading(true);
      await resetPassword(emailAddress);
      setMessage("Please check your email for further instructions")
      setLoading(false);
    } catch (error) {
      setEmailAddress('');
      setError("Failed to rest password");
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = 'reset password - Dotlog';
  }, []);

  return (
    <div className="w-full h-full p-4 flex flex-col justify-center items-center">
      <span className="text-2xl dark:text-light">Forgot Password</span>
      <div className="mt-4 rounded-lg text-left bg-black dark:bg-white">
        <div className="h-2 bg-indigo-400 rounded-t-md"></div>
        {error && <p className="mb-4 text-xs text-red-600">{error}</p>}
        {error && <p className="mb-4 text-xs dark:text-light">{message}</p>}
        <form className="px-8 py-6" method="Post" onSubmit={handleReset}>
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
            <button
                disabled={isInvalid || loading}
                type="submit"
                className="w-full mt-2 px-4 py-2 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 rounded-md"
            >
                Reset Password
            </button>
        </form>
        <div className="p-2 flex justify-around items-center">
            <Link
                to={ROUTES.LOGIN}
                className="font-bold text-light dark:text-dark"
            >
                Log in
            </Link>
            <Link
                to={ROUTES.SIGN_UP}
                className="font-bold text-light dark:text-dark"
            >
                Sign up
            </Link>
        </div>
      </div>
    </div>
  );
}