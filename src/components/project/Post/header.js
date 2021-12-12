import React from 'react';
import locale from 'date-fns/locale/en-US';
import { formatDistanceToNowStrict } from 'date-fns';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';

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
  projectId,
  imgSrc,
  projectName,
  userImg,
  userName,
  timeStamp,
}) {
  return (
    <div className="flex mb-4 items-center">
      <Link to={`${ROUTES.PROJECT}/${projectId}`}>
        <img
          className="w-8 h-8 mr-1 object-cover rounded-full cursor-pointer"
          src={imgSrc}
          alt=""
        />
      </Link>
      <div className="flex flex-col justify-center">
        <Link to={`${ROUTES.PROJECT}/${projectId}`}>
          <span className="mr-2 dark:text-white font-base text-base cursor-pointer">
            {projectName}
          </span>
        </Link>
        <div className="flex items-center">
          <span className="dark:text-white text-xs mr-2">posted by-</span>
          <img
            className="w-4 h-4 mr-1 object-cover rounded-full cursor-pointer"
            src={userImg}
            alt=""
          />
          <span className="text-gray-500 text-sm mr-2 cursor-pointer">
            @{userName}
          </span>
          <span className="dark:text-white text-xs">
            {formatDistanceToNowStrict(timeStamp, {
              addSuffix: true,
              locale: {
                ...locale,
                formatDistance,
              },
            })}
          </span>
        </div>
      </div>
    </div>
  );
}
