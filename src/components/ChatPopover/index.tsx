import React, { useEffect, useState } from 'react';
import { Avatar, Button, Input, List, Popover } from 'antd';

import './index.scss';
import { CloseOutlined, RightOutlined } from '@ant-design/icons';
import { useGetListMessagesByChat } from '../../apis/Messages';
import { useCreateChat } from '../../apis/Chats';

interface ChatPopoverProps {
  open: boolean;
  onClose: () => void;
  friend: any;
}

const ChatPopover: React.FC<ChatPopoverProps> = ({ open, onClose, friend }) => {
  const [message, setMessage] = useState('');
  const { mutate: createChat, data: dataCreateChat } = useCreateChat(friend.id);

  useEffect(() => {
    if (friend.id) {
      createChat();
    }
  }, [friend.id]);

  console.log('dataCreateChat', dataCreateChat);

  const { data: dataGetListMessagesByChat } = useGetListMessagesByChat(dataCreateChat?.id);

  console.log('dataGetListMessagesByChat', dataGetListMessagesByChat);

  // const listMessGroup = (item: itemMessage | any, index: number) => {
  //   const messRight = {
  //     item,
  //   };
  //   const messleft = {
  //     item,
  //     setCheck,
  //   };

  //   return (
  //     <div key={index}>
  //       {item.sender.id === idUserA ? <ItemMessageRightGroup {...messRight} /> : <ItemMessageLeftGroup {...messleft} />}
  //     </div>
  //   );
  // };

  const handleSendMessage = () => {
    // Thực hiện logic gửi tin nhắn ở đây
    console.log(`Message sent to ${friend.profile.firstName}: ${message}`);
    setMessage(''); // Reset message
  };

  return (
    <Popover
      content={
        <div>
          {/* chat popover header */}
          <div className="chat-popover-header">
            <div className="flex items-center gap-1" style={{ cursor: 'pointer' }}>
              <Avatar src={friend.profile.avatar.url} />
              <span className="font-medium">{friend.profile.lastName + ' ' + friend.profile.firstName}</span>
            </div>
            <CloseOutlined className="close-icon" onClick={onClose} /> {/* Nút "X" để đóng */}
          </div>
          {/* chat popover list messages */}
          <div>
            {/* <List
              className=""
              dataSource={dataGetListMessagesByChat}
              renderItem={(item, index) => listMessGroup(item, index)}
            /> */}
            <div>aaa</div>
            <div>aaa</div>
            <div>aaa</div>
            <div>aaa</div>
          </div>
          {/* chat popover send message */}
          <div className="flex flex-row items-end gap-1">
            <Input.TextArea
              autoSize={{ minRows: 1, maxRows: 8 }}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Nhập tin nhắn..."
            />
            <Button type="primary" onClick={handleSendMessage}>
              <RightOutlined />
            </Button>
          </div>
        </div>
      }
      trigger="click"
      placement="topRight"
      open={open}
      onOpenChange={() => {}}
      arrow={false}
    >
      <div className="chat-popover-trigger">chat</div>
    </Popover>
  );
};

export default ChatPopover;
