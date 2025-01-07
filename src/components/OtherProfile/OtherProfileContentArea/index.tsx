import React from 'react';
import './index.scss';
import OtherProfileNewsFeed from '../OtherProfileNewsFeed';

interface OtherProfileContentAreaProps {
  isAtEnd: boolean;
}

const OtherProfileContentArea: React.FC<OtherProfileContentAreaProps> = ({ isAtEnd }) => {
  return (
    <div className="content-area">
      {/* <StatusUpdate /> */}
      <OtherProfileNewsFeed isAtEnd={isAtEnd} />
    </div>
  );
};

export default OtherProfileContentArea;
