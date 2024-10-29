import React, { useState } from 'react';
import { Card, List, Avatar } from 'antd';
import './index.scss';
import { useGetFriends } from '../../apis/User-Friends';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { openChat, setMessages } from '../../store/chatSlice';
import ChatPopover from '../ChatPopover';
import { useCreateChat } from '../../apis/Chats';
import { useGetListMessagesByChat } from '../../apis/Messages';

const RightSidebar: React.FC = () => {
  const dispatch = useDispatch();
  const { data } = useGetFriends();
  const profile = useSelector((state: RootState) => state.profile.profile);
  const { mutate: createChat, data: dataCreateChat } = useCreateChat();

  // Hàm mở Drawer và đặt thông tin người bạn
  const handleChatPopoverOpen = async (friend: any) => {
    // Bước 1: Tạo cuộc trò chuyện mới với bạn bè
    createChat(friend.id, {
      onSuccess: async (dataCreateChat) => {
        dispatch(openChat({ friend, senderId: profile.userId, chatId: dataCreateChat?.id }));
      },
    });
  };

  return (
    <>
      <Card className="right-sidebar-card" title="Người liên hệ">
        <List
          dataSource={data}
          renderItem={(item: any) => (
            <List.Item>
              <div
                className="right-sidebar-card-item"
                onClick={() => handleChatPopoverOpen(item.friend)}
                style={{ cursor: 'pointer' }}
              >
                <Avatar src={item.friend.profile.avatar.url} />
                <span className="font-medium">
                  {item.friend.profile.lastName + ' ' + item.friend.profile.firstName}
                </span>
              </div>
            </List.Item>
          )}
        />
      </Card>
    </>
  );
};

export default RightSidebar;
