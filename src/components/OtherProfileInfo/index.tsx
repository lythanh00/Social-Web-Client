import React, { useEffect, useState } from 'react';
import './index.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

import { Avatar, Button, message, Modal } from 'antd';
import { MessageOutlined, UndoOutlined, UserAddOutlined, UserDeleteOutlined } from '@ant-design/icons';
import { useCheckIsFriend, useRemoveUserFriend } from '../../apis/User-Friends';
import {
  useCheckIsPendingFriendRequest,
  useRemoveFriendRequest,
  useSendFriendRequest,
} from '../../apis/Friend-Requests';

const OtherProfileInfo: React.FC = () => {
  const otherProfile = useSelector((state: RootState) => state.profile.otherProfile);
  const { data: isFriendUserFriend } = useCheckIsFriend(otherProfile?.userId);
  const { mutate: sendFriendRequest } = useSendFriendRequest();
  const { data: isPendingFriendRequest } = useCheckIsPendingFriendRequest(otherProfile?.userId);
  const { mutate: removeFriendRequest } = useRemoveFriendRequest();
  const { mutate: removeUserFriend } = useRemoveUserFriend();

  const [isPending, setIsPending] = useState(false);
  const [isSender, setIsSender] = useState(false);
  const [isFriend, setIsFriend] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    removeUserFriend(otherProfile?.userId);
    setIsFriend(false);
    message.success('Đã hủy kết bạn!');
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isFriendUserFriend) {
      setIsFriend(isFriendUserFriend);
    }
  }, [isFriendUserFriend]);

  useEffect(() => {
    if (isPendingFriendRequest) {
      setIsPending(isPendingFriendRequest.isPending);
      setIsSender(isPendingFriendRequest.owner === 'sender');
    }
  }, [isPendingFriendRequest]);
  // console.log('isPendingFriendRequest', isPendingFriendRequest);
  // console.log('isSender', isSender);

  const handleAddFriendClick = async () => {
    try {
      if (isFriend) {
        // await onRemoveFriend();
        showModal();
      } else if (isPending) {
        // Nếu là người gửi, cho phép hủy lời mời
        if (isSender) {
          removeFriendRequest(otherProfile?.userId);
          message.success('Đã hủy lời mời kết bạn!');
          setIsPending(false);
          setIsSender(false);
        } else {
          // Nếu là người nhận, có thể hiện nút "Chấp nhận"
          // từ từ làm sau
          message.success('Bạn chưa chấp nhận lời mời kết bạn!');
        }
      } else {
        sendFriendRequest(otherProfile?.userId);
        message.success('Đã gửi lời mời kết bạn!');
        setIsPending(true);
        setIsSender(true);
      }
    } catch (error) {
      message.error('Đã xảy ra lỗi!');
    }
  };

  return (
    <div className="profile-info">
      <div className="relative">
        <img
          src={otherProfile?.coverPhoto.url} // ảnh bìa
          alt="cover-photo"
          className="profile-info-cover-photo"
        />
      </div>

      <div className="flex gap-2 justify-between items-center">
        <div className="profile-info-avatar-name">
          <div className="relative">
            <Avatar
              src={otherProfile?.avatar.url} // Thay bằng ảnh đại diện của bạn
              alt="avatar"
              className="profile-info-avatar "
            />
          </div>
          <div className="ml-4">
            <h1 className="text-3xl font-bold">{otherProfile?.lastName + ' ' + otherProfile?.firstName}</h1>
            <p className="text-gray-600">77 người bạn</p>
          </div>
        </div>

        <div className="profile-info-addfr-mess">
          {isPendingFriendRequest?.owner === 'receiver' ? (
            <div className="flex items-center text-black text-base bg-gray-100 rounded-lg p-4">
              <span className="font-bold">{otherProfile?.lastName + ' ' + otherProfile?.firstName}</span>
              <span className="ml-1"> đã gửi cho bạn lời mời kết bạn</span>
            </div>
          ) : (
            <div>
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
            </div>
          )}
          <Button
            type="primary" // Nút sẽ có màu xanh khi chưa là bạn bè
            icon={<MessageOutlined />} // Biểu tượng thay đổi tùy vào trạng thái
          >
            Nhắn tin
          </Button>
        </div>
      </div>
      <hr className="border-gray-300 mt-4 mb-4" />

      <Modal
        title={`Hủy kết bạn với ${otherProfile?.lastName + ' ' + otherProfile?.firstName}`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        <p>Bạn có chắc chắn muốn hủy kết bạn với {otherProfile?.lastName + ' ' + otherProfile?.firstName} không?</p>
      </Modal>
    </div>
  );
};

export default OtherProfileInfo;
