import React from 'react';
import Post from '../project/Post/index';
import * as Fake from '../seed';

export default function Explore() {
  const feeds = Fake.ProjectPosts;

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
