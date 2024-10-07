import React, { useEffect, useState } from 'react';
import { Button, Card, DatePicker, DatePickerProps, Divider, Input, Modal, Space, Form, Avatar, List } from 'antd';

import './index.scss';
import { RightOutlined, UpOutlined } from '@ant-design/icons';
import { useCommentPost, useGetListCommentsByPost } from '../../apis/Comments';
import { Navigate } from 'react-router-dom';
import { CLIENT_ROUTE_PATH } from '../../constant/routes';
import HomePostCard from '../HomePostCard';

interface CommentModalProps {
  open: boolean;
  onClose: () => void;
  name: string;
  avatarOwner: string;
  postId: number;
  post: any;
}

const CommentModal: React.FC<CommentModalProps> = ({ open, onClose, name, avatarOwner, postId, post }) => {
  console.log('open', open);

  const [content, setContent] = useState('');
  const { mutate: commentPost } = useCommentPost();
  const { data: dataGetListCommentsByPost } = useGetListCommentsByPost(postId);

  const handleCreateComment = () => {
    commentPost({ postId, content });
    setContent('');
  };

  return (
    <Modal
      title={<div className="comment-modal-title">{`Bài viết của ${name}`}</div>}
      open={open}
      onOk={onClose}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      {/*get list comments*/}
      <List
        className="list-post-comments"
        dataSource={dataGetListCommentsByPost}
        renderItem={(item: any) => (
          <List.Item className="post-comment-item">
            <Avatar src={item.user.profile.avatar.url} className="post-comment-item-avatar" />
            <div className="post-comment-item-name-content">
              <div className="pl-4 pt-1 pb-1 pr-2">
                <span className="font-medium">{item.user.profile.lastName + ' ' + item.user.profile.firstName}</span>
                <p className="post-comment-item-content">{item.content}</p>
              </div>
            </div>
          </List.Item>
        )}
      />

      {/*create comment*/}
      <Form className="post-comment-form">
        <Form.Item className="pl-5">
          <Avatar className="post-comment-item-avatar" src={avatarOwner} />
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
        <Form.Item className="pr-2">
          <Button onClick={() => handleCreateComment()}>
            <UpOutlined />
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CommentModal;
