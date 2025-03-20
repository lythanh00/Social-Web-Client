import React, { useEffect, useState } from 'react';
import { Layout, Menu, Input, Avatar, Popover, Dropdown, List, Badge } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './index.scss';
import logo from '../../assets/logo.jpg';
import setting from '../../assets/setting.jpg';
import logout from '../../assets/logout.jpg';
import message from '../../assets/message.jpg';
import notification from '../../assets/notification.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useNavigate } from 'react-router-dom';
import { CLIENT_ROUTE_PATH } from '../../constant/routes';
import { useSearchProfileByName } from '../../apis/Profiles';
import { closeChat, openChat, resetChatState } from '../../store/chatSlice';
import {
  useCountUnreadNotifications,
  useGetListNotifications,
  useMarkNotificationAsRead,
} from '../../apis/Notifications';
import { formatDistanceToNow } from 'date-fns';
import { useCreateChat, useGetListChats } from '../../apis/Chats';
import { useCountUnreadChats } from '../../apis/Messages';
import { resetAuthState } from '../../store/authSlice';
import { resetProfileState } from '../../store/profileSlice';
import { socketConfig } from '../../socket';
// import { socketConfig } from '../../socket';

const { Header } = Layout;
const { Search } = Input;

const Navbar: React.FC = () => {
  // const [profile, setProfile] = useState<any>(useSelector((state: RootState) => state.profile.profile));
  const profile = useSelector((state: RootState) => state.profile.profile);
  const isOpenChat = useSelector((state: RootState) => state.chat.open);
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const { data: dataGetListNotifications } = useGetListNotifications();
  const { mutate: markNotificationAsRead } = useMarkNotificationAsRead();
  const { data: dataGetListChats } = useGetListChats();
  // const { chatId } = useSelector((state: RootState) => state.chat);
  const { data: dataCountUnreadChats, isLoading: isLoadingCountUnreadChats } = useCountUnreadChats();
  const [unreadChatsCount, setUnreadChatsCount] = useState(0);
  const [listUnreadChats, setListUnreadChats] = useState<any[]>([]);
  const [listChats, setListChats] = useState<any[]>([]);
  const { data: dataCountUnreadNotifications, isLoading: isLoadingCountUnreadNotifications } =
    useCountUnreadNotifications();
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(0);
  const { mutate: createChat } = useCreateChat();

  useEffect(() => {
    if (dataGetListChats) {
      setListChats(dataGetListChats);
    }
  }, [dataGetListChats]);

  useEffect(() => {
    if (dataCountUnreadChats) {
      setUnreadChatsCount(dataCountUnreadChats.unreadChatsCount);
      setListUnreadChats(dataCountUnreadChats.listUnreadChats);
    }
  }, [dataCountUnreadChats]);

  useEffect(() => {
    if (dataCountUnreadNotifications) {
      setUnreadNotificationsCount(dataCountUnreadNotifications);
    }
  }, [dataCountUnreadNotifications]);

  const handleLogout = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    socketConfig.disconnect();
    await Promise.all([
      dispatch(closeChat()),
      dispatch(resetAuthState()),
      dispatch(resetProfileState()),
      dispatch(resetChatState()),
    ]);
    navigate(CLIENT_ROUTE_PATH.SIGNIN);
    window.location.reload();
  };

  const handleClickChat = (item: any) => {
    // socketConfig.emit('leave_chat', chatId);
    if (isOpenChat) {
      console.log('close chat');
      dispatch(closeChat());
    }
    createChat(item.participant2.id !== profile.userId ? item.participant2.id : item.participant1.id, {
      onSuccess: async (dataCreateChat) => {
        dispatch(
          openChat({
            friend: item.participant2.id !== profile.userId ? item.participant2 : item.participant1,
            ownerId: profile.userId,
            chatId: dataCreateChat?.id,
          }),
        );
      },
    });
    // Loại bỏ item.id khỏi listUnreadChats
    setListUnreadChats((prevList) => prevList.filter((chatId) => chatId !== item.id));
  };

  const handleUnreadChats = () => {
    setUnreadChatsCount(0);
  };

  const handleUnreadNotifications = () => {
    setUnreadNotificationsCount(0);
  };

  const handleClickNotification = (item: any) => {
    markNotificationAsRead(item.id);
    if (item.likedPostId) {
      navigate(`${CLIENT_ROUTE_PATH.POST}?postId=${item.likedPostId}`);
    }
    if (item.commentedPostId) {
      navigate(`${CLIENT_ROUTE_PATH.POST}?postId=${item.commentedPostId}`);
    }
    if (item.friendRequestId) {
      navigate(`${CLIENT_ROUTE_PATH.FRIENDS}`);
    }
  };

  useEffect(() => {
    if (profile.userId) {
      socketConfig.on('message_notification', (messageNotification: any) => {
        if (
          !listUnreadChats.includes(messageNotification.chat.id) &&
          profile.userId === messageNotification.receiverId
        ) {
          setUnreadChatsCount((prevCount) => prevCount + 1);
          // thêm id đoạn chat có tin nhắn mới vào listUnreadChats
          setListUnreadChats((prevList) => [...prevList, messageNotification.chat.id]);

          console.log('messageNotification.chat.id', messageNotification.chat.id);
          console.log('listUnreadChats', listUnreadChats);
          console.log('listChats', listChats);
        }
        setListChats((prevList) => {
          const updatedList = prevList.filter((chat) => chat.id !== messageNotification.chat.id);
          return [messageNotification.chat, ...updatedList];
        });
      });
    }
    return () => {
      socketConfig.off('message_notification');
    };
  }, [profile.userId, listUnreadChats]);

  const messageContent = (
    <>
      <strong className="text-xl p-1">Trò chuyện</strong>
      <List
        dataSource={listChats}
        className="listChats"
        renderItem={(item: any) => (
          <List.Item className={`chat-item`} onClick={() => handleClickChat(item)}>
            <List.Item.Meta
              avatar={
                listUnreadChats.includes(item.id) ? (
                  <Badge size="small" count="1">
                    <Avatar
                      src={
                        item.participant2.id !== profile.userId
                          ? item.participant2.profile.avatar.url
                          : item.participant1.profile.avatar.url
                      }
                    />
                  </Badge>
                ) : (
                  <Avatar
                    src={
                      item.participant2.id !== profile.userId
                        ? item.participant2.profile.avatar.url
                        : item.participant1.profile.avatar.url
                    }
                  />
                )
              }
              title={
                <span>
                  <strong>
                    {item.participant2.id !== profile.userId
                      ? `${item.participant2.profile.lastName} ${item.participant2.profile.firstName}`
                      : `${item.participant1.profile.lastName} ${item.participant1.profile.firstName}`}
                  </strong>
                </span>
              }
            />
          </List.Item>
        )}
      />
    </>
  );

  const notificationContent = (
    <List
      dataSource={dataGetListNotifications}
      className="notifications"
      renderItem={(item: any) => (
        <List.Item
          className={`notification-item ${item.isRead ? 'read' : 'unread'}`}
          onClick={() => handleClickNotification(item)}
        >
          <List.Item.Meta
            avatar={<Avatar src={item.sender.avatar} />}
            title={
              <span>
                {item.type === 'like' && (
                  <>
                    <strong>{`${item.sender.lastName} ${item.sender.firstName}`}</strong> đã thích bài viết của bạn.
                  </>
                )}
                {item.type === 'comment' && (
                  <>
                    <strong>{`${item.sender.lastName} ${item.sender.firstName}`}</strong> đã bình luận về bài viết của
                    bạn.
                  </>
                )}
                {item.type === 'friend_request' && (
                  <>
                    <strong>{`${item.sender.lastName} ${item.sender.firstName}`}</strong> đã gửi cho bạn lời mời kết
                    bạn.
                  </>
                )}
              </span>
            }
            description={<small>{formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}</small>}
          />
        </List.Item>
      )}
    />
  );

  const profilePopoverContent = (
    <div className="profile-popover-content">
      <p onClick={() => navigate(CLIENT_ROUTE_PATH.PROFILE)}>
        <strong>
          <Avatar className="border-1 border-gray-400 rounded-full" src={profile.avatar.url} />{' '}
          {profile.lastName + ' ' + profile.firstName}
        </strong>
      </p>
      <p>
        <Avatar src={setting} /> Cài đặt
      </p>
      <p onClick={handleLogout}>
        <Avatar src={logout} /> Đăng xuất
      </p>
    </div>
  );

  const menuItems = [
    {
      key: '1',
      icon: (
        <Popover
          content={messageContent}
          trigger="click"
          placement="bottomRight"
          // arrow={{ pointAtCenter: false }}
        >
          <Badge size="small" count={isLoadingCountUnreadChats ? 0 : unreadChatsCount} overflowCount={9}>
            <Avatar
              src={message}
              shape="circle"
              style={{
                border: '1px solid #1890ff',
              }}
              size="large"
              onClick={() => handleUnreadChats()}
            />
          </Badge>
        </Popover>
      ),
    },
    {
      key: '2',
      icon: (
        <Popover
          content={notificationContent}
          trigger="click"
          placement="bottomRight"
          // arrow={{ pointAtCenter: false }}
        >
          <Badge
            size="small"
            count={isLoadingCountUnreadNotifications ? 0 : unreadNotificationsCount}
            overflowCount={9}
          >
            <Avatar
              src={notification}
              shape="circle"
              style={{
                border: '1px solid #1890ff',
              }}
              size="large"
              onClick={() => handleUnreadNotifications()}
            />
          </Badge>
        </Popover>
      ),
    },
    {
      key: '3',
      icon: (
        <Popover
          content={profilePopoverContent}
          trigger="click"
          placement="bottomRight"
          // arrow={{ pointAtCenter: false }}
        >
          <Avatar
            shape="circle"
            style={{
              border: '1px solid #1890ff',
            }}
            src={profile.avatar.url}
            size="large"
          />
        </Popover>
      ),
    },
  ];

  const { data: searchProfileByNameResults, refetch: refetchSearchProfileByName } = useSearchProfileByName(searchValue);

  const handleSearch = async (value: string) => {
    setSearchValue(value);
    if (value.trim()) {
      try {
        await refetchSearchProfileByName();
        await setSearchResults(searchProfileByNameResults); // Cập nhật kết quả tìm kiếm
      } catch (error) {
        console.error('Error fetching profiles:', error);
      }
    } else {
      setSearchResults([]); // Xóa kết quả tìm kiếm khi không có đầu vào
    }
    setVisible(true);
  };

  const handleCheckProfileNavigation = (userId: number) => {
    if (userId === profile.userId) {
      // Nếu điều kiện hợp lệ, thực hiện điều hướng
      navigate(CLIENT_ROUTE_PATH.PROFILE);
    } else {
      // Thực hiện hành động khác nếu cần (thông báo, cảnh báo, v.v.)
      navigate(`${CLIENT_ROUTE_PATH.OTHERPROFILE}?userId=${userId}`);
    }
  };

  // hien thi ket qua search
  const searchMenuItems = searchResults?.map((item: any) => ({
    key: item.id,
    label: (
      <div onClick={() => handleCheckProfileNavigation(item.userId)}>
        <Avatar src={item.avatar.url} className="mr-2" />
        {`${item.lastName} ${item.firstName}`}
      </div>
    ),
  }));

  // neu mo dropdown thi flag la true, dong dropdown thi flag la false
  const handleDropdownVisibility = (flag: boolean) => {
    setVisible(flag);
  };

  return (
    <Header className="navbar">
      <div className="navbar-logo-search">
        <div className="navbar-logo" onClick={() => navigate(CLIENT_ROUTE_PATH.HOME)}>
          <img src={logo} alt="Logo" className="logo-img" />
        </div>

        <Dropdown
          menu={{ items: searchMenuItems }}
          open={visible && searchResults?.length > 0} // Chỉ hiển thị khi có kết quả
          onOpenChange={handleDropdownVisibility}
          trigger={['click']}
        >
          <Search
            placeholder="Tìm kiếm trên FunHouse"
            enterButton={<SearchOutlined />}
            className="navbar-search"
            onSearch={handleSearch}
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              setVisible(true);
            }}
            size="large"
            onFocus={() => setVisible(true)} // Mở dropdown khi focus vào ô tìm kiếm
          />
        </Dropdown>
      </div>

      <Menu mode="horizontal" className="navbar-menu" items={menuItems} />
    </Header>
  );
};

export default Navbar;
