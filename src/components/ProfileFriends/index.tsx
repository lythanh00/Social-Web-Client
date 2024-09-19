import { Avatar, Button, Card, DatePicker, DatePickerProps, Divider, Input, List, Modal, Space } from 'antd';

import './index.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useGetFriends } from '../../apis/User-Friends';
import { size } from 'lodash';

const ProfileFriends: React.FC = () => {
  const profile = useSelector((state: RootState) => state.profile.profile);
  const { data, error } = useGetFriends();

  return (
    <Card className="profile-friends" title="Bạn bè">
      <List
        dataSource={data?.data}
        renderItem={(item: any) => (
          <List.Item>
            <List.Item.Meta
              className="profile-friends-item"
              avatar={<Avatar src={item.friend.profile.avatar.url} shape="square" size={96} />}
              title={
                <span className="profile-friends-name">
                  {item.friend.profile.lastName + ' ' + item.friend.profile.firstName}
                </span>
              }
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default ProfileFriends;
