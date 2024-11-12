import React, { useState } from 'react';
import { Layout, Menu, Input, Avatar, Popover, Dropdown, List } from 'antd';
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
import { closeChat } from '../../store/chatSlice';
import { useGetListNotifications, useMarkNotificationAsRead } from '../../apis/Notifications';
import { formatDistanceToNow } from 'date-fns';

const { Header } = Layout;
const { Search } = Input;

const Navbar: React.FC = () => {
  const profile = useSelector((state: RootState) => state.profile.profile);
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const { data: dataGetListNotifications } = useGetListNotifications();
  const { mutate: markNotificationAsRead } = useMarkNotificationAsRead();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    dispatch(closeChat());
    navigate(CLIENT_ROUTE_PATH.SIGNIN);
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

  const notificationContent = (
    <List
      dataSource={dataGetListNotifications}
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
      icon: <Avatar src={message} />,
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
          <Avatar src={notification} />
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
          <Avatar className="border-1 border-gray-400 rounded-full" src={profile.avatar.url} />
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
            placeholder="Tìm kiếm trên SideWalk IceTea"
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
