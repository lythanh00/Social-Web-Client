import React, { useState } from 'react';
import StatusUpdate from '../../StatusUpdate';
import './index.scss';
import HomeNewsFeed from '../HomeNewsFeed';

interface HomeContentAreaProps {
  isAtEnd: boolean;
}

const HomeContentArea: React.FC<HomeContentAreaProps> = ({ isAtEnd }) => {
  const [newPost, setNewPost] = useState<any | null>(null);
  const handleNewPost = (post: any) => {
    console.log('Bài viết mới:', post); // In ra dữ liệu bài viết mới
    setNewPost(post); // Lưu bài viết mới vào state
  };
  return (
    <div className="content-area">
      <StatusUpdate onCreatePost={handleNewPost} />
      <HomeNewsFeed isAtEnd={isAtEnd} newPost={newPost} />
    </div>
  );
};

export default HomeContentArea;
