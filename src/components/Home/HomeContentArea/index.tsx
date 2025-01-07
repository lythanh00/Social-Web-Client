import React from 'react';
import StatusUpdate from '../../StatusUpdate';
import './index.scss';
import HomeNewsFeed from '../HomeNewsFeed';

interface HomeContentAreaProps {
  isAtEnd: boolean;
}

const HomeContentArea: React.FC<HomeContentAreaProps> = ({ isAtEnd }) => {
  return (
    <div className="content-area">
      <StatusUpdate />
      <HomeNewsFeed isAtEnd={isAtEnd} />
    </div>
  );
};

export default HomeContentArea;
