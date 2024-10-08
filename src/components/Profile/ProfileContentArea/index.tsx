import React from 'react';
import StatusUpdate from '../../StatusUpdate';
import ProfileNewsFeed from '../ProfileNewsFeed';
import './index.scss';

const ProfileContentArea: React.FC = () => {
  return (
    <div className="content-area">
      <StatusUpdate />
      <ProfileNewsFeed />
    </div>
  );
};

export default ProfileContentArea;
