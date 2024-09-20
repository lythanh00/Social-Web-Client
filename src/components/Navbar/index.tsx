import React, { useState } from 'react';
import { Layout, Menu, Input, Avatar, Popover, List, Dropdown } from 'antd';
import { SearchOutlined, BellOutlined, MessageOutlined } from '@ant-design/icons';
import './index.scss';
import logo from '../../assets/logo.jpg';
import setting from '../../assets/setting.jpg';
import logout from '../../assets/logout.jpg';
import message from '../../assets/message.jpg';
import notification from '../../assets/notification.jpg';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useNavigate } from 'react-router-dom';
import { CLIENT_ROUTE_PATH } from '../../constant/routes';
import { api } from '../../apis';
import { useSearchProfileByName } from '../../apis/Profiles';

const { Header } = Layout;
const { Search } = Input;

const Navbar: React.FC = () => {
  const profile = useSelector((state: RootState) => state.profile.profile);
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [visible, setVisible] = useState(false);

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
      <p>
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
      icon: <Avatar src={notification} />,
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
      navigate(`${CLIENT_ROUTE_PATH.ORTHERPROFILE}?userId=${userId}`);
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

  // neu mo dropdown thi flag la tru, dong dropdown thi flag la false
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
