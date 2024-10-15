import React, { useEffect, useRef, useState } from 'react';
import { Avatar, Button, Input, List, Popover } from 'antd';

import './index.scss';
import { CloseOutlined, RightOutlined } from '@ant-design/icons';
import { useGetListMessagesByChat, useSendMessage } from '../../apis/Messages';
import { useCreateChat } from '../../apis/Chats';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface ChatPopoverProps {
  open: boolean;
  onClose: () => void;
  friend: any;
}

const ChatPopover: React.FC<ChatPopoverProps> = ({ open, onClose, friend }) => {
  const [message, setMessage] = useState('');
  const { mutate: createChat, data: dataCreateChat } = useCreateChat(friend.id);
  const profile = useSelector((state: RootState) => state.profile.profile);
  const { mutate: sendMessage, data: dataSendMessage } = useSendMessage(dataCreateChat?.id, friend.id, message);

  // Ref để scroll đến cuối danh sách tin nhắn
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (friend.id) {
      createChat();
    }
  }, [friend.id]);

  const { data: dataGetListMessagesByChat, refetch: refetchGetListMessagesByChat } = useGetListMessagesByChat(
    dataCreateChat?.id,
  );

  useEffect(() => {
    if (dataCreateChat?.id) {
      refetchGetListMessagesByChat();
    }
  }, [dataCreateChat?.id]);

  // Tự động cuộn xuống khi mở chat hoặc có tin nhắn mới
  useEffect(() => {
    if (messagesEndRef.current) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 500); // Delay để đảm bảo tất cả các tin nhắn đã được render
    }
  }, [dataGetListMessagesByChat]);

  const renderMessageItem = (item: any, index: number) => {
    const isSender = item.senderId === profile.userId;

    return (
      <div
        key={index}
        className={`message-item ${isSender ? 'message-right' : 'message-left'}`}
        style={{
          display: 'flex',
          justifyContent: isSender ? 'flex-end' : 'flex-start',
          padding: '5px',
        }}
      >
        {!isSender && <Avatar src={friend.profile.avatar.url} size={'small'} />}
        <div
          className={`message-bubble ${isSender ? 'message-right-bubble' : 'message-left-bubble'}`}
          style={{
            backgroundColor: isSender ? '#87e8de' : '#f5f5f5',
            padding: '10px',
            borderRadius: '15px',
            maxWidth: '60%',
            textAlign: isSender ? 'right' : 'left',
          }}
        >
          {item.text && item.text}
          {item.image && <img src={item.image} />}
        </div>
      </div>
    );
  };

  const handleSendMessage = () => {
    sendMessage();
    setMessage('');
  };

  return (
    <>
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
            <div className="chat-popover-content">
              <List dataSource={dataGetListMessagesByChat} renderItem={renderMessageItem} />
              {/* Phần tử ẩn để cuộn đến */}
              <div ref={messagesEndRef} />
            </div>
            {/* chat popover send message */}
            <div className="chat-popover-footer flex flex-row items-end gap-1">
              <Input.TextArea
                autoSize={{ minRows: 1, maxRows: 8 }}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Aa"
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
        <div className="chat-popover-trigger">
          <Avatar src={friend.profile.avatar.url} size={'large'} />
        </div>
      </Popover>
    </>
  );
};

export default ChatPopover;
