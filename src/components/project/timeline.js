import React from 'react';
import * as Fake from '../../seed';
import Post from './Post/index';

function getFeeds(posts) {
  const feed = [];

  Fake.ProjectPosts.map((post) => {
    posts.forEach((postId) => {
      if (postId === post.postId) feed.push(post);
    });
  });

  return feed;
}

export default function Timeline({ posts }) {
  const feeds = getFeeds(posts);

  return (
    <div>
      {feeds?.length > 0
        ? feeds.map((feed) => {
            if (feed) {
              return <Post key={feed.postId} post={feed} />;
            }
          })
        : null}
    </div>
  );
}
