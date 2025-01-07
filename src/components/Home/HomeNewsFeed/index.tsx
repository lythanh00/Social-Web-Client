import React, { useEffect, useState } from 'react';
import { List } from 'antd';
import { useGetListPostsByOwnerAndFriends } from '../../../apis/Posts';
import HomePostCard from '../HomePostCard';

interface HomeNewsFeedProps {
  isAtEnd: boolean; // Prop nhận tín hiệu cuộn tới cuối trang
}

const HomeNewsFeed: React.FC<HomeNewsFeedProps> = ({ isAtEnd }) => {
  const [arrPosts, setArrPosts] = useState<any[]>([]);

  const [cursor, setCursor] = useState<any>();

  const { data, refetch } = useGetListPostsByOwnerAndFriends(cursor);

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
            <HomePostCard post={item} />
          </List.Item>
        )}
      />
    </div>
  );
};

export default HomeNewsFeed;
