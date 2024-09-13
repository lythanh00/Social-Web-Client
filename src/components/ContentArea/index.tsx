import React from 'react';
import StatusUpdate from '../StatusUpdate';
import NewsFeed from '../NewsFeed';
import './index.scss';

const ContentArea: React.FC = () => {
  return (
    <div className="content-area">
      <StatusUpdate />
      <NewsFeed />
    </div>
  );
};

export default ContentArea;
