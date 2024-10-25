import React, { useEffect, useRef, useState } from 'react';
import { Avatar, Button, Input, List, Popover } from 'antd';

import './index.scss';
import { CloseOutlined, RightOutlined } from '@ant-design/icons';
import { useGetListMessagesByChat, useSendMessage } from '../../apis/Messages';
import { useCreateChat } from '../../apis/Chats';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { socketConfig } from '../../socket';

interface ChatPopoverProps {
  open: boolean;
  onClose: () => void;
  friend: any;
  senderId: number | null;
}

const ChatPopover: React.FC<ChatPopoverProps> = ({ open, onClose, friend, senderId }) => {
  const [message, setMessage] = useState('');
  const { mutate: createChat, data: dataCreateChat } = useCreateChat(friend.id);
  const profile = useSelector((state: RootState) => state.profile.profile);
  const [arrMessages, setArrMessages] = useState<any[]>([]);

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
      setArrMessages(dataGetListMessagesByChat);
    }
  }, [dataGetListMessagesByChat, dataCreateChat?.id]);

  // arrMessages rỗng
  console.log('arrMessages', arrMessages);
  console.log('dataGetListMessagesByChat', dataGetListMessagesByChat);
  console.log('dataCreateChat?.id', dataCreateChat?.id);
  console.log('friend.id', friend.id);

  useEffect(() => {
    if (dataCreateChat?.id) {
      refetchGetListMessagesByChat();
    }
  }, [dataCreateChat?.id]);

  // kết nối socket khi mở chat popover
  useEffect(() => {
    if (dataCreateChat?.id) {
      socketConfig.connect();
      socketConfig.emit('join_chat', dataCreateChat?.id);
    }
  }, [dataCreateChat?.id]);

  // Tự động cuộn xuống khi mở chat hoặc có tin nhắn mới
  useEffect(() => {
    if (messagesEndRef.current) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 500); // Delay để đảm bảo tất cả các tin nhắn đã được render
    }
  }, [arrMessages]);

  const renderMessageItem = (item: any, index: number) => {
    const isSender = item.senderId === profile.userId;

    // Hàm đóng ChatPopover
    const onClose = () => {};

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
    if (message) {
      socketConfig.emit('sendMessage', {
        senderId: senderId,
        chatId: dataCreateChat?.id,
        receiverId: friend.id,
        text: message,
      });
      setMessage('');
    }
  };

  // nhận sự kiện newMessage từ server sau khi send message
  useEffect(() => {
    if (dataCreateChat?.id) {
      socketConfig.on('newMessage', (newMessage: any) => {
        setArrMessages((prevArrMessages) => [...prevArrMessages, newMessage]);
      });
    }

    return () => {
      socketConfig.off('newMessage');
    };
  }, [dataCreateChat?.id]);

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
              <List dataSource={arrMessages} renderItem={renderMessageItem} />
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
        overlayClassName="chat-popover"
      >
        <div className="chat-popover-trigger">
          <Avatar src={friend.profile.avatar.url} size={'large'} />
        </div>
      </Popover>
    </>
  );
};

export default ChatPopover;
