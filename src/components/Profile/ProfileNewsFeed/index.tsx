import React, { useEffect, useState } from 'react';
import ProfilePostCard from '../ProfilePostCard';
import { List } from 'antd';
import { useGetListPostsByOwner } from '../../../apis/Posts';

interface ProfileNewsFeedProps {
  isAtEnd: boolean; // Prop nhận tín hiệu cuộn tới cuối trang
}

const ProfileNewsFeed: React.FC<ProfileNewsFeedProps> = ({ isAtEnd }) => {
  const [arrPosts, setArrPosts] = useState<any[]>([]);

  const [cursor, setCursor] = useState<any>();

  const { data, refetch } = useGetListPostsByOwner(cursor);

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
            <ProfilePostCard post={item} />
          </List.Item>
        )}
      />
    </div>
  );
};

export default ProfileNewsFeed;
