import { Avatar, Button, Card, DatePicker, DatePickerProps, Divider, Input, List, Modal, Space } from 'antd';

import './index.scss';

import { useGetFriends } from '../../../apis/User-Friends';
import { useNavigate } from 'react-router-dom';
import { CLIENT_ROUTE_PATH } from '../../../constant/routes';

const ProfileFriends: React.FC = () => {
  const { data } = useGetFriends();
  const navigate = useNavigate();

  return (
    <Card className="profile-friends" title="Bạn bè">
      <List
        dataSource={data}
        renderItem={(item: any) => (
          <List.Item>
            <div
              className="profile-friends-item"
              onClick={() => navigate(`${CLIENT_ROUTE_PATH.OTHERPROFILE}?userId=${item.friend.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <Avatar src={item.friend.profile.avatar.url} shape="square" size={80} />
              <span className="profile-friends-name">
                {item.friend.profile.lastName + ' ' + item.friend.profile.firstName}
              </span>
            </div>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default ProfileFriends;
