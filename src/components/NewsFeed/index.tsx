import React from 'react';
import PostCard from '../PostCard';
import { Divider, List, Typography } from 'antd';
import { useGetListPostsByOwner } from '../../apis/Post';

const NewsFeed: React.FC = () => {
  const { data, error } = useGetListPostsByOwner();
  return (
    <div className="newsfeed-container">
      <List
        dataSource={data?.data}
        renderItem={(item) => (
          <List.Item>
            <PostCard post={item} />
          </List.Item>
        )}
      />
    </div>
  );
};

export default NewsFeed;
