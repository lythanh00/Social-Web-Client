import React, { useEffect, useState } from 'react';
import { Button, Card, DatePicker, DatePickerProps, Divider, Input, Modal, Space, Form, Avatar } from 'antd';

import './index.scss';
import { RightOutlined } from '@ant-design/icons';
import { useCommentPost } from '../../apis/Comments';

interface CommentModalProps {
  open: boolean;
  onClose: () => void;
  name: string;
  avatarOwner: string;
  postId: number;
}

const CommentModal: React.FC<CommentModalProps> = ({ open, onClose, name, avatarOwner, postId }) => {
  console.log('open', open);

  const [content, setContent] = useState('');
  const { mutate: commentPost } = useCommentPost();

  const handleCreateComment = () => {
    commentPost({ postId, content });
    setContent('');
  };

  return (
    <Modal title={`Bài viết của ${name}`} open={open} onOk={onClose} onCancel={onClose} footer={null}>
      <Form className="post-comment-form">
        <Form.Item className="post-comment-form-avatar">
          <Avatar className="post-card-meta-avatar" src={avatarOwner} />
        </Form.Item>
        <Form.Item className="post-comment-form-content">
          <Input.TextArea
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Viết bình luận của bạn..."
            autoSize={{ minRows: 3, maxRows: 6 }}
          />
        </Form.Item>
        <Form.Item className="post-comment-form-button">
          <Button onClick={() => handleCreateComment()}>
            <RightOutlined />
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CommentModal;
