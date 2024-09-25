import React from 'react';
import StatusUpdate from '../StatusUpdate';
import NewsFeed from '../NewsFeed';
import './index.scss';
import OtherNewsFeed from '../OtherNewsFeed';

const OtherContentArea: React.FC = () => {
  return (
    <div className="content-area">
      {/* <StatusUpdate /> */}
      <OtherNewsFeed />
    </div>
  );
};

export default OtherContentArea;
