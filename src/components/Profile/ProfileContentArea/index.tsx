import React from 'react';
import StatusUpdate from '../../StatusUpdate';
import ProfileNewsFeed from '../ProfileNewsFeed';
import './index.scss';

interface ProfileContentAreaProps {
  isAtEnd: boolean;
}

const ProfileContentArea: React.FC<ProfileContentAreaProps> = ({ isAtEnd }) => {
  return (
    <div className="content-area">
      <StatusUpdate />
      <ProfileNewsFeed isAtEnd={isAtEnd} />
    </div>
  );
};

export default ProfileContentArea;
