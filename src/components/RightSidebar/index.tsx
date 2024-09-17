import React from 'react';
import { Card, List, Avatar } from 'antd';
import './index.scss';
import { useGetFriends } from '../../apis/User-Friends';

const RightSidebar: React.FC = () => {
  const { data, error } = useGetFriends();

  return (
    <Card className="right-sidebar-card" title="Người liên hệ">
      <List
        dataSource={data?.data}
        renderItem={(item: any) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.friend.profile.avatar.url} />}
              title={item.friend.profile.lastName + ' ' + item.friend.profile.firstName}
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default RightSidebar;
