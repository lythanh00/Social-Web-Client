import React, { useState } from 'react';
import './index.scss';
import { Avatar, Button, Card, Image, Modal } from 'antd';
import { CommentOutlined, LikeOutlined, ShareAltOutlined } from '@ant-design/icons';
import Meta from 'antd/es/card/Meta';

const StatusUpdate: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Card className="status-update-card" style={{ marginBottom: 16 }}>
      <div>
        <Avatar className="status-update-avatar" src="https://example.com/avatar.png" />

        <Button className="question-button" type="primary" onClick={showModal}>
          Tiến Thành ơi, bạn đang nghĩ gì thế?
        </Button>
        <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    </Card>
  );
};

export default StatusUpdate;
