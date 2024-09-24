import React, { useEffect } from 'react';
import StatusUpdate from '../StatusUpdate';
import NewsFeed from '../NewsFeed';
import './index.scss';
import { Avatar, Button, Card, List } from 'antd';
import { useGetReceivedFriendRequests } from '../../apis/Friend-Requests';
import { useAppDispatch } from '../../store';
import { useGetProfile } from '../../apis/Profiles';
import { setProfile } from '../../store/profileSlice';

const ReceivedFriendRequests: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data: dataProfile, error } = useGetProfile();

  useEffect(() => {
    if (dataProfile && dataProfile.data) {
      dispatch(setProfile(dataProfile?.data as any));
    }
  }, [dataProfile?.data]);
  const { data } = useGetReceivedFriendRequests();
  return (
    <div>
      <h3 className="received-friend-requests-title">Lời mời kết bạn</h3>
      <List
        className="received-friend-requests-list"
        grid={{ gutter: 16, column: 4 }}
        dataSource={data}
        renderItem={(item: any) => (
          <List.Item>
            <Card className="received-friend-requests-card">
              <Avatar
                className="received-friend-requests-avatar"
                src={item.sender.profile.avatar.url}
                shape="square"
                size={160}
              />

              <div className="received-friend-requests-name-and-button">
                <div className="received-friend-requests-name">
                  {item.sender.profile.lastName + ' ' + item.sender.profile.firstName}
                </div>
                <Button className="received-friend-requests-accept-button" type="primary">
                  Xác nhận
                </Button>
                <Button className="received-friend-requests-delete-button">Xóa</Button>
              </div>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default ReceivedFriendRequests;
