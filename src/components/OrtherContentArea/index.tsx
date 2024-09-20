import React from 'react';
import StatusUpdate from '../StatusUpdate';
import NewsFeed from '../NewsFeed';
import './index.scss';

const OrtherContentArea: React.FC = () => {
  return (
    <div className="content-area">
      <StatusUpdate />
      {/* <OrtherNewsFeed /> */}
    </div>
  );
};

export default OrtherContentArea;
