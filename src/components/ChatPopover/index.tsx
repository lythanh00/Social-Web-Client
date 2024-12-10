import React, { useEffect, useRef, useState } from 'react';
import { Avatar, Button, Input, List, Popover } from 'antd';

import './index.scss';
import { CheckCircleOutlined, CloseOutlined, RightOutlined } from '@ant-design/icons';
import { useGetListMessagesByChat } from '../../apis/Messages';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { socketConfig } from '../../socket';
import { closeChat } from '../../store/chatSlice';

const ChatPopover: React.FC = () => {
  const dispatch = useDispatch();
  const { open, friend, ownerId, chatId } = useSelector((state: RootState) => state.chat);
  const [message, setMessage] = useState('');
  const profile = useSelector((state: RootState) => state.profile.profile);
  const [arrMessages, setArrMessages] = useState<any[]>([]);
  const { data: dataGetListMessagesByChat } = useGetListMessagesByChat(chatId);

  useEffect(() => {
    if (chatId) {
      setTimeout(() => {
        setArrMessages(dataGetListMessagesByChat);
      }, 500);
    }
  }, [dataGetListMessagesByChat, chatId]);

  // Ref để scroll đến cuối danh sách tin nhắn
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // kết nối socket khi mở chat popover
  useEffect(() => {
    if (chatId) {
      // socketConfig.connect();
      socketConfig.emit('join_chat', chatId);
    }
  }, [chatId]);

  // xem tin nhắn
  useEffect(() => {
    if (chatId) {
      socketConfig.emit('markAsRead', {
        ownerId: ownerId,
        chatId: chatId,
      });
    }
  }, [chatId, arrMessages]);

  // nhận sự kiện xem tin nhắn từ server sau khi mở  chatpopover
  useEffect(() => {
    if (chatId) {
      socketConfig.on('markAsRead', (markAsRead) => {
        if (markAsRead) {
          setArrMessages((arrMessages) =>
            arrMessages.map((message) => {
              return message.senderId === ownerId && message.isRead === false
                ? {
                    ...message,
                    isRead: true,
                  }
                : message;
            }),
          );
        }
      });
    }
    return () => {
      socketConfig.off('markAsRead');
    };
  }, [chatId]);

  // Tự động cuộn xuống khi mở chat hoặc có tin nhắn mới
  useEffect(() => {
    if (messagesEndRef.current) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 500); // Delay để đảm bảo tất cả các tin nhắn đã được render
    }
  }, [arrMessages]);

  const renderMessageItem = (item: any, index: number) => {
    const isOwner = item.senderId === profile.userId;

    return (
      <div
        key={index}
        className={`message-item ${isOwner ? 'message-right' : 'message-left'}`}
        style={{
          display: 'flex',
          justifyContent: isOwner ? 'flex-end' : 'flex-start',
          padding: '5px',
        }}
      >
        {!isOwner && <Avatar src={friend.profile.avatar.url} size={'small'} />}
        <div
          className={`message-bubble ${isOwner ? 'message-right-bubble' : 'message-left-bubble'}`}
          style={{
            backgroundColor: isOwner ? '#87e8de' : '#f5f5f5',
            textAlign: isOwner ? 'right' : 'left',
          }}
        >
          {item.text && item.text}
          {item.image && <img src={item.image} />}
        </div>
        {isOwner && item.isRead && (
          <span className="is-read">
            <CheckCircleOutlined />
          </span>
        )}
      </div>
    );
  };

  const handleSendMessage = () => {
    if (message) {
      socketConfig.emit('sendMessage', {
        senderId: ownerId,
        chatId: chatId,
        receiverId: friend?.id,
        text: message,
      });
      setMessage('');
    }
  };

  // nhận sự kiện newMessage từ server sau khi send message
  // vấn đề: bỏ tin nhắn mới nhận vào mảng chat hiện tại
  useEffect(() => {
    if (chatId) {
      socketConfig.on('newMessage', (newMessage: any) => {
        if (newMessage.chatId === chatId) {
          setArrMessages((prevArrMessages) => [...prevArrMessages, newMessage]);
        }
      });
    }
    return () => {
      socketConfig.off('newMessage');
    };
  }, [chatId]);

  return (
    <>
      <Popover
        content={
          <div>
            {/* chat popover header */}
            <div className="chat-popover-header">
              <div className="flex items-center gap-1" style={{ cursor: 'pointer' }}>
                <Avatar src={friend?.profile.avatar.url} />
                <span className="font-medium">{friend?.profile.lastName + ' ' + friend?.profile.firstName}</span>
              </div>
              <CloseOutlined className="close-icon" onClick={() => dispatch(closeChat())} /> {/* Nút "X" để đóng */}
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
          <Avatar src={friend?.profile.avatar.url} size={'large'} />
        </div>
      </Popover>
    </>
  );
};

export default ChatPopover;
