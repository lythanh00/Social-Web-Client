import React from 'react';
import { List } from 'antd';
import { useGetListPostsByOther } from '../../../apis/Posts';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import OtherProfilePostCard from '../OtherProfilePostCard';

const OtherProfileNewsFeed: React.FC = () => {
  const otherProfile = useSelector((state: RootState) => state.profile.otherProfile);
  const { data } = useGetListPostsByOther(otherProfile.userId);

  return (
    <div className="newsfeed-container">
      <List
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <OtherProfilePostCard post={item} />
          </List.Item>
        )}
      />
    </div>
  );
};

export default OtherProfileNewsFeed;
