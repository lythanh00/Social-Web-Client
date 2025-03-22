import React, { useState } from 'react';
import StatusUpdate from '../../StatusUpdate';
import ProfileNewsFeed from '../ProfileNewsFeed';
import './index.scss';

interface ProfileContentAreaProps {
  isAtEnd: boolean;
}

const ProfileContentArea: React.FC<ProfileContentAreaProps> = ({ isAtEnd }) => {
  const [newPost, setNewPost] = useState<any | null>(null);
  const handleNewPost = (post: any) => {
    setNewPost(post); // Lưu bài viết mới vào state
  };
  return (
    <div className="profile-content-area">
      <StatusUpdate onCreatePost={handleNewPost} />
      <ProfileNewsFeed isAtEnd={isAtEnd} newPost={newPost} />
    </div>
  );
};

export default ProfileContentArea;
