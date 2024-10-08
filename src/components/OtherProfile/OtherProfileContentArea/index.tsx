import React from 'react';
import './index.scss';
import OtherProfileNewsFeed from '../OtherProfileNewsFeed';

const OtherProfileContentArea: React.FC = () => {
  return (
    <div className="content-area">
      {/* <StatusUpdate /> */}
      <OtherProfileNewsFeed />
    </div>
  );
};

export default OtherProfileContentArea;
