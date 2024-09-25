import React, { useEffect, useState } from 'react';
import './index.scss';
import { Avatar, Button, Card, List, message } from 'antd';
import { useGetReceivedFriendRequests, useRespondToFriendRequest } from '../../apis/Friend-Requests';
import { useAppDispatch } from '../../store';
import { useGetProfile } from '../../apis/Profiles';
import { setProfile } from '../../store/profileSlice';

const ReceivedFriendRequests: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data: dataProfile } = useGetProfile();

  useEffect(() => {
    if (dataProfile && dataProfile.data) {
      dispatch(setProfile(dataProfile?.data as any));
    }
  }, [dataProfile?.data]);
  const { data } = useGetReceivedFriendRequests();
  const { mutate: respondToFriendRequest } = useRespondToFriendRequest();
  const [acceptedRequests, setAcceptedRequests] = useState<number[]>([]);
  const [rejectedRequests, setRejectedRequests] = useState<number[]>([]);

  const handleAccept = async (friendRequestId: number, accept: boolean) => {
    try {
      await respondToFriendRequest({ friendRequestId, accept });
      if (accept) {
        setAcceptedRequests((prev) => [...prev, friendRequestId]);
      } else {
        setRejectedRequests((prev) => [...prev, friendRequestId]);
      }
    } catch (error) {
      message.error('Đã xảy ra lỗi!');
    }
  };
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
                <div className="received-friend-requests-button">
                  {acceptedRequests.includes(item.id) ? (
                    <Button disabled type="default">
                      Đã chấp nhận lời mời
                    </Button>
                  ) : rejectedRequests.includes(item.id) ? (
                    <Button disabled type="default">
                      Đã từ chối lời mời
                    </Button>
                  ) : (
                    <>
                      <Button
                        className="received-friend-requests-accept-button"
                        type="primary"
                        onClick={() => handleAccept(item.id, true)}
                      >
                        Xác nhận
                      </Button>
                      <Button
                        className="received-friend-requests-delete-button"
                        onClick={() => handleAccept(item.id, false)}
                      >
                        Xóa
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default ReceivedFriendRequests;
