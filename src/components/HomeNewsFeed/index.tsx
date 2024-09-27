import React from 'react';
import ProfilePostCard from '../ProfilePostCard';
import { List } from 'antd';
import { useGetListPostsByOwnerAndFriends } from '../../apis/Posts';
import HomePostCard from '../HomePostCard';

const HomeNewsFeed: React.FC = () => {
  const { data } = useGetListPostsByOwnerAndFriends();

  return (
    <div className="newsfeed-container">
      <List
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <HomePostCard post={item} />
          </List.Item>
        )}
      />
    </div>
  );
};

export default HomeNewsFeed;
