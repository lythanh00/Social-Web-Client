import React, { useEffect, useState } from 'react';
import './index.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

import { Button, message } from 'antd';
import { MessageOutlined, UndoOutlined, UserAddOutlined, UserDeleteOutlined } from '@ant-design/icons';
import { useCheckIsFriend } from '../../apis/User-Friends';
import {
  useCheckIsPendingFriendRequest,
  useRemoveFriendRequest,
  useSendFriendRequest,
} from '../../apis/Friend-Requests';

const OrtherProfileInfo: React.FC = () => {
  const ortherProfile = useSelector((state: RootState) => state.profile.ortherProfile);
  const { data: isFriend, refetch: refetchIsFriend } = useCheckIsFriend(ortherProfile?.userId);
  const { mutate: sendFriendRequest, data: dataSendFriendRequest } = useSendFriendRequest();
  const { data: isPendingFriendRequest } = useCheckIsPendingFriendRequest(ortherProfile?.userId);
  const { mutate: removeFriendRequest, data: dataRemoveFriendRequest } = useRemoveFriendRequest();

  const [isPending, setIsPending] = useState(isPendingFriendRequest);

  const handleAddFriendClick = async () => {
    try {
      if (isFriend) {
        // await onRemoveFriend();
        message.success('Đã hủy kết bạn!');
      } else if (isPending) {
        // Hủy lời mời kết bạn
        removeFriendRequest(ortherProfile?.userId);
        message.success('Đã hủy lời mời kết bạn!');
        setIsPending(false);
      } else {
        sendFriendRequest(ortherProfile?.userId);
        message.success('Đã gửi lời mời kết bạn!');
        setIsPending(true);
      }
    } catch (error) {
      message.error('Đã xảy ra lỗi!');
    }
  };

  return (
    <div className="profile-info">
      <div className="relative">
        <img
          src={ortherProfile?.coverPhoto.url} // ảnh bìa
          alt="cover-photo"
          className="profile-info-cover-photo"
        />
      </div>

      <div className="flex gap-2 justify-between items-center">
        <div className="profile-info-avatar-name">
          <div className="relative">
            <img
              src={ortherProfile?.avatar.url} // avatar
              alt="avatar"
              className="profile-info-avatar "
            />
          </div>
          <div className="ml-4">
            <h1 className="text-3xl font-bold">{ortherProfile?.lastName + ' ' + ortherProfile?.firstName}</h1>
            <p className="text-gray-600">77 người bạn</p>
          </div>
        </div>

        <div className="profile-info-addfr-mess">
          <Button
            type={isFriend ? 'default' : 'primary'}
            icon={
              isFriend ? (
                <UserDeleteOutlined />
              ) : isPending ? (
                <UndoOutlined /> // Hiển thị khi đang gửi lời mời
              ) : (
                <UserAddOutlined />
              )
            }
            onClick={handleAddFriendClick}
          >
            {isFriend ? 'Hủy kết bạn' : isPending ? 'Hủy lời mời' : 'Thêm bạn bè'}
          </Button>
          <Button
            type="primary" // Nút sẽ có màu xanh khi chưa là bạn bè
            icon={<MessageOutlined />} // Biểu tượng thay đổi tùy vào trạng thái
          >
            Nhắn tin
          </Button>
        </div>
      </div>
      <hr className="border-gray-300 mt-4 mb-4" />
    </div>
  );
};

export default OrtherProfileInfo;
