import { Avatar, Card, List } from 'antd';

import './index.scss';

import { useGetFriends, useGetListFriendsByOther } from '../../apis/User-Friends';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const OtherProfileFriends: React.FC = () => {
  const otherProfile = useSelector((state: RootState) => state.profile.otherProfile);
  const { data } = useGetListFriendsByOther(otherProfile.userId);

  return (
    <Card className="profile-friends" title="Bạn bè">
      <List
        dataSource={data}
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

export default OtherProfileFriends;
