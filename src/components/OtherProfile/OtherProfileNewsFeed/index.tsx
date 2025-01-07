import React, { useEffect, useState } from 'react';
import { List } from 'antd';
import { useGetListPostsByOther } from '../../../apis/Posts';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import OtherProfilePostCard from '../OtherProfilePostCard';

interface OtherProfileNewsFeedProps {
  isAtEnd: boolean; // Prop nhận tín hiệu cuộn tới cuối trang
}

const OtherProfileNewsFeed: React.FC<OtherProfileNewsFeedProps> = ({ isAtEnd }) => {
  const otherProfile = useSelector((state: RootState) => state.profile.otherProfile);

  const [arrPosts, setArrPosts] = useState<any[]>([]);

  const [cursor, setCursor] = useState<any>();
  const { data, refetch } = useGetListPostsByOther(otherProfile.userId, cursor);

  // Xử lý khi nhận tín hiệu cuộn tới cuối trang
  useEffect(() => {
    if (isAtEnd) {
      refetch();
    }
  }, [isAtEnd]);

  useEffect(() => {
    if (data) {
      setTimeout(() => {
        setArrPosts((prevPosts) => [...prevPosts, ...data]);
      }, 1000);
    }
  }, [data]);

  useEffect(() => {
    if (arrPosts.length > 0) {
      setCursor(arrPosts[arrPosts.length - 1].id);
    }
  }, [arrPosts]);

  return (
    <div className="newsfeed-container">
      <List
        dataSource={arrPosts}
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
