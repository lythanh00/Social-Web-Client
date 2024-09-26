import React from 'react';
import StatusUpdate from '../StatusUpdate';
import './index.scss';
import HomeNewsFeed from '../HomeNewsFeed';

const HomeContentArea: React.FC = () => {
  return (
    <div className="content-area">
      <StatusUpdate />
      <HomeNewsFeed />
    </div>
  );
};

export default HomeContentArea;
