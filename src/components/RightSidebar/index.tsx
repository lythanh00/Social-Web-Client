import React, { useState } from 'react';
import { Card, List, Avatar } from 'antd';
import './index.scss';
import { useGetFriends } from '../../apis/User-Friends';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { closeChat, openChat } from '../../store/chatSlice';
import { useCreateChat } from '../../apis/Chats';

const RightSidebar: React.FC = () => {
  const isOpenChat = useSelector((state: RootState) => state.chat.open);
  const dispatch = useDispatch();
  const { data } = useGetFriends();
  const profile = useSelector((state: RootState) => state.profile.profile);
  const { mutate: createChat } = useCreateChat();

  // Hàm mở chat popover
  const handleChatPopoverOpen = async (friend: any) => {
    if (isOpenChat) {
      dispatch(closeChat());
    }
    createChat(friend.id, {
      onSuccess: async (dataCreateChat) => {
        dispatch(openChat({ friend, ownerId: profile.userId, chatId: dataCreateChat?.id }));
      },
    });
  };

  return (
    <>
      <Card className="right-sidebar-card" title="Bạn bè">
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
