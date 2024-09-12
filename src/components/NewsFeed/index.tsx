import React from 'react';
import PostCard from '../PostCard';
import { Divider, List, Typography } from 'antd';

const NewsFeed: React.FC = () => {
  return (
    <div className="newsfeed-container">
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
    </div>
  );
};

export default NewsFeed;
