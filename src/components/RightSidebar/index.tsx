import React, { useState } from 'react';
import { Card, List, Avatar } from 'antd';
import './index.scss';
import { useGetFriends } from '../../apis/User-Friends';
import ChatPopover from '../ChatPopover';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { socketConfig } from '../../socket';

const RightSidebar: React.FC = () => {
  const { data } = useGetFriends();
  const profile = useSelector((state: RootState) => state.profile.profile);
  const [isChatPopoverOpen, setIsChatPopoverOpen] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState<any>(null);

  // Hàm mở Drawer và đặt thông tin người bạn
  const handleChatPopoverOpen = (friend: any) => {
    setSelectedFriend(friend); // Cập nhật thông tin người bạn khi click
    setIsChatPopoverOpen(true); // Hiển thị Drawer
    console.log('fr', friend);
  };

  // Hàm đóng ChatPopover
  const handleChatPopoverClose = () => {
    setIsChatPopoverOpen(false); // Ẩn Drawer
    socketConfig.disconnect();
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

      {isChatPopoverOpen && (
        <ChatPopover
          open={isChatPopoverOpen}
          onClose={handleChatPopoverClose}
          friend={selectedFriend}
          senderId={profile.userId}
        />
      )}
    </>
  );
};

export default RightSidebar;
