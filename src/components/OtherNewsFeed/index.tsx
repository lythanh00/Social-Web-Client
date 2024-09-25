import React from 'react';
import PostCard from '../PostCard';
import { Divider, List, Typography } from 'antd';
import { useGetListPostsByOther } from '../../apis/Posts';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import OtherPostCard from '../OtherPostCard';

const OtherNewsFeed: React.FC = () => {
  const otherProfile = useSelector((state: RootState) => state.profile.otherProfile);
  const { data } = useGetListPostsByOther(otherProfile.userId);

  return (
    <div className="newsfeed-container">
      <List
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <OtherPostCard post={item} />
          </List.Item>
        )}
      />
    </div>
  );
};

export default OtherNewsFeed;
