import React, { useRef } from 'react';
import ProfilePostCard from '../ProfilePostCard';
import { List } from 'antd';
import { useGetListPostsByOwner } from '../../../apis/Posts';

const ProfileNewsFeed: React.FC = () => {
  const { data } = useGetListPostsByOwner();

  return (
    <div className="newsfeed-container">
      <List
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <ProfilePostCard post={item} />
          </List.Item>
        )}
      />
    </div>
  );
};

export default ProfileNewsFeed;
