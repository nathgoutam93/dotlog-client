import React from 'react';
import locale from 'date-fns/locale/en-US';
import { formatDistanceToNowStrict } from 'date-fns';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

const formatDistanceLocale = {
  lessThanXSeconds: '{{count}}s',
  xSeconds: '{{count}}s',
  halfAMinute: '30s',
  lessThanXMinutes: '{{count}}m',
  xMinutes: '{{count}}m',
  aboutXHours: '{{count}}h',
  xHours: '{{count}}h',
  xDays: '{{count}}d',
  aboutXWeeks: '{{count}}w',
  xWeeks: '{{count}}w',
  aboutXMonths: '{{count}}m',
  xMonths: '{{count}}m',
  aboutXYears: '{{count}}y',
  xYears: '{{count}}y',
  overXYears: '{{count}}y',
  almostXYears: '{{count}}y',
};

function formatDistance(token, count, options) {
  options = options || {};

  const result = formatDistanceLocale[token].replace('{{count}}', count);

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return 'in ' + result;
    } else {
      return result + ' ago';
    }
  }

  return result;
}

export default function Header({
  userId,
  userImg,
  fullName,
  userName,
  timeStamp,
}) {
  return (
    <div className="flex p-2 items-center">
      <Link to={`${ROUTES.PROFILE}/${userId}`}>
        <img
          className="h-8 w-8 object-cover rounded-full cursor-pointer"
          src={userImg}
          alt=""
        />
      </Link>

      <div className="flex flex-col flex-1 px-2">
        <Link to={`${ROUTES.PROFILE}/${userId}`}>
          <span className="dark:text-white text-base mr-1 cursor-pointer truncate">
            {fullName}
          </span>

          <span className="text-gray-500 text-sm mr-2">{`@${userName}`}</span>
        </Link>
        <span className="dark:text-white text-xs">
          {timeStamp &&
            formatDistanceToNowStrict(timeStamp.seconds * 1000, {
              addSuffix: true,
              locale: {
                ...locale,
                formatDistance,
              },
            })}
        </span>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 dark:text-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
      </svg>
    </div>
  );
}
