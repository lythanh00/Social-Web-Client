import React from 'react';
import { Card, List, Avatar } from 'antd';
import './index.scss';
import { useGetFriends } from '../../apis/User-Friends';
import { useNavigate } from 'react-router-dom';
import { CLIENT_ROUTE_PATH } from '../../constant/routes';

const RightSidebar: React.FC = () => {
  const { data } = useGetFriends();
  const navigate = useNavigate();

  return (
    <Card className="right-sidebar-card" title="Người liên hệ">
      <List
        dataSource={data?.data}
        renderItem={(item: any) => (
          <List.Item>
            <div
              className="right-sidebar-card-item"
              onClick={() => navigate(`${CLIENT_ROUTE_PATH.OTHERPROFILE}?userId=${item.friend.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <Avatar src={item.friend.profile.avatar.url} />
              <span className="font-medium">{item.friend.profile.lastName + ' ' + item.friend.profile.firstName}</span>
            </div>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default RightSidebar;
