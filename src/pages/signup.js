import { useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import { useAuth } from '../context/authContext';
import { useFirestore } from '../context/firestoreContext';

export default function SignUp() {
  const history = useHistory();
  const { signup } = useAuth();
  const { createUser } = useFirestore();

  const [username, setUsername] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirm] = useState('');

  const [error, setError] = useState('');
  const isInvalid = username === '' || password === '' || emailAddress === '';
  const passwordConfirmed = password === passwordConfirmation;
  const [loading, setLoading] = useState();

  const handleSignUp = (event) => {
    event.preventDefault();

    if (passwordConfirmed) {

      try {
        setError('');
        setLoading(true);

        signup(emailAddress, password)
        .then((userCredential) => {
          const user = userCredential.user;
          return createUser(user.uid, username, emailAddress)
        })
        .then(() => {
          setLoading(false);
          history.push(ROUTES.UPDATE_PROFILE);
        });
      } catch (error) {
        setEmailAddress('');
        setPassword('');
        setPasswordConfirm('');
        setError(error.message);
        setLoading(false);
      }

    } else {
      setError('Password do not match');
    }
  };

  return (
    <div className="w-full h-full p-4 flex flex-col justify-center items-center">
      <span className="text-2xl text-dark dark:text-light">
        Create new account
      </span>
      <div className="mt-4 rounded-lg text-left bg-black dark:bg-white">
        <div className="h-2 bg-indigo-400 rounded-t-md"></div>
        {error && <p className="mb-4 text-xs text-red-600">{error}</p>}
        <form className="px-8 py-6" method="Post" onSubmit={handleSignUp}>
          <label className="label text-light dark:text-dark block font-semibold">
            Username
          </label>
          <input
            type="text"
            className="w-full h-5 mt-2 px-3 py-5 border rounded-md 
          focus:outline-none focus:ring-1 focus:ring-indigo-400"
            placeholder="Username"
            onChange={({ target }) => setUsername(target.value)}
            value={username}
          />

          <label className="label text-light dark:text-dark block font-semibold">
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

          <label className="label text-light dark:text-dark mt-3 block font-semibold">
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
          <label className="label text-light dark:text-dark mt-3 block font-semibold">
            Password Confirmation
          </label>
          <input
            type="password"
            className="w-full h-5 mt-2 px-3 py-5 border rounded-md 
          focus:outline-none focus:ring-1 focus:ring-indigo-400"
            placeholder="Confirm Password"
            onChange={({ target }) => setPasswordConfirm(target.value)}
            value={passwordConfirmation}
          />
          <button
            disabled={isInvalid || loading}
            type="submit"
            className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 rounded-md"
          >
            Sign In
          </button>
        </form>
        <div className="p-2 flex justify-center items-center">
          <p className="text-sm text-light dark:text-dark">
            already have an account?{' '}
            <Link
              to={ROUTES.LOGIN}
              className="font-bold text-light dark:text-dark"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
