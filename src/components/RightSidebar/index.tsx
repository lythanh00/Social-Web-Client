import React from 'react';
import { Card, List, Avatar } from 'antd';
import './index.scss';

const RightSidebar: React.FC = () => {
  const onlineFriends = [
    { name: 'Nguyễn Văn B', avatar: 'https://example.com/avatar1.png' },
    { name: 'Trần Văn C', avatar: 'https://example.com/avatar2.png' },
    { name: 'Trần Văn C', avatar: 'https://example.com/avatar2.png' },
    { name: 'Trần Văn C', avatar: 'https://example.com/avatar2.png' },
    { name: 'Trần Văn C', avatar: 'https://example.com/avatar2.png' },
    { name: 'Trần Văn C', avatar: 'https://example.com/avatar2.png' },
    { name: 'Trần Văn C', avatar: 'https://example.com/avatar2.png' },
    { name: 'Trần Văn C', avatar: 'https://example.com/avatar2.png' },
    { name: 'Trần Văn C', avatar: 'https://example.com/avatar2.png' },
    { name: 'Trần Văn C', avatar: 'https://example.com/avatar2.png' },
    { name: 'Trần Văn C', avatar: 'https://example.com/avatar2.png' },
    { name: 'Trần Văn C', avatar: 'https://example.com/avatar2.png' },
    { name: 'Trần Văn C', avatar: 'https://example.com/avatar2.png' },
  ];

  return (
    <Card className="right-sidebar-card" title="Bạn bè trực tuyến">
      <List
        dataSource={onlineFriends}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta avatar={<Avatar src={item.avatar} />} title={item.name} />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default RightSidebar;
