import React, { useEffect, useRef, useState } from 'react';
import { Avatar, Button, Input, List, Popover } from 'antd';

import './index.scss';
import { CheckCircleOutlined, CloseOutlined, EyeFilled, RightOutlined } from '@ant-design/icons';
import { useGetListMessagesByChat } from '../../apis/Messages';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { socketConfig } from '../../socket';
import { closeChat } from '../../store/chatSlice';

const ChatBox: React.FC = () => {
  const dispatch = useDispatch();
  const { open, friend, ownerId, chatId } = useSelector((state: RootState) => state.chat);
  const [message, setMessage] = useState('');
  const profile = useSelector((state: RootState) => state.profile.profile);
  const [arrMessages, setArrMessages] = useState<any[]>([]);
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [previousScrollHeight, setPreviousScrollHeight] = useState<number>(1);
  const [currentScrollHeight, setCurrentScrollHeight] = useState<number>(1);
  const [cursor, setCursor] = useState<any>(null);
  const [sendMesScroll, setSendMesScroll] = useState<boolean>(false);

  const { data: dataGetListMessagesByChat, refetch: refetchGetListMessagesByChat } = useGetListMessagesByChat(
    chatId,
    cursor,
  );

  useEffect(() => {
    if (open === true) {
      setArrMessages([]);
      setCursor(null);
    }
  }, [open]);

  // set 20 tin nhắn vào mảng
  useEffect(() => {
    if (chatId && dataGetListMessagesByChat) {
      setTimeout(() => {
        setArrMessages([...dataGetListMessagesByChat, ...arrMessages]);
      }, 1000);
    }
  }, [dataGetListMessagesByChat, chatId]);

  // Ref để scroll đến cuối danh sách tin nhắn
  const messagesRef = useRef<HTMLDivElement | null>(null);

  // load thêm tin nhắn khi cuộn lên đầu danh sách
  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const isTop = e.currentTarget.scrollTop === 0;
    const scrollTopValue = e.currentTarget.scrollTop;
    setScrollPosition(scrollTopValue);
    setCursor(arrMessages[0].id);
    if (isTop) {
      setPreviousScrollHeight(currentScrollHeight);
      setCurrentScrollHeight(e.currentTarget.scrollHeight);
      refetchGetListMessagesByChat();
    }
  };
  // scroll đến giữa danh sách tin nhắn khi load thêm
  useEffect(() => {
    if (messagesRef.current && scrollPosition === 0 && previousScrollHeight && currentScrollHeight) {
      setTimeout(() => {
        const newScrollTop = currentScrollHeight - previousScrollHeight;
        document.getElementById('scroll-message')?.scrollTo({ top: newScrollTop });
      }, 1000);
    }
  }, [dataGetListMessagesByChat]);

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
    if (messagesRef.current && (arrMessages.length <= 20 || sendMesScroll)) {
      setTimeout(() => {
        messagesRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 1000); // Delay để đảm bảo tất cả các tin nhắn đã được render
      setSendMesScroll(false);
    }
  }, [arrMessages]);

  console.log('cursor', cursor);

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
        {!isOwner && <Avatar className="avatar-boxchat" src={friend.profile.avatar.url} size={'small'} />}
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
            <EyeFilled />
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
      setSendMesScroll(true);
    }
  };

  // nhận sự kiện newMessage từ server sau khi send message
  // bỏ tin nhắn mới nhận vào mảng chat hiện tại
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
    <div className="chatbox">
      {/* chatbox header */}
      <div className="chat-box-header">
        <div className="flex items-center gap-1" style={{ cursor: 'pointer' }}>
          <Avatar className="avatar-boxchat" src={friend?.profile.avatar.url} />
          <span className="font-medium">{friend?.profile.lastName + ' ' + friend?.profile.firstName}</span>
        </div>
        <CloseOutlined className="close-icon" onClick={() => dispatch(closeChat())} /> {/* Nút "X" để đóng */}
      </div>
      {/* chatbox list messages */}
      <div className="chat-box-content" id="scroll-message" onScroll={handleScroll}>
        <List dataSource={arrMessages} renderItem={renderMessageItem} />
        {/* Phần tử ẩn để cuộn đến */}
        <div ref={messagesRef} />
      </div>
      {/* chatbox send message */}
      <div className="chat-box-footer flex flex-row items-end gap-1">
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
  );
};

export default ChatBox;
