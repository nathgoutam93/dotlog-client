import React from 'react';
import Post from '../post/index';

export default function Timeline({ feeds }) {
  return (
    <div className="flex flex-col items-center justify-center">
      {feeds
        ? feeds.map((feed) => {
            return <Post key={feed.postId} post={feed} />;
          })
        : null}
    </div>
  );
}
