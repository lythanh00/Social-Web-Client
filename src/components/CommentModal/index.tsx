import React, { useEffect, useState } from 'react';
import { Button, Input, Modal, Form, Avatar, List } from 'antd';

import './index.scss';
import { RightOutlined } from '@ant-design/icons';
import { useGetListCommentsByPost } from '../../apis/Comments';
import { socketConfig } from '../../socket';

interface CommentModalProps {
  open: boolean;
  onClose: () => void;
  name: string;
  avatarOwner: string;
  postId: number;
  post: any;
  userId: number | null;
}

const CommentModal: React.FC<CommentModalProps> = ({ open, onClose, name, avatarOwner, postId, post, userId }) => {
  const [content, setContent] = useState('');
  // const { mutate: commentPost } = useCommentPost();
  const [arrComments, setArrComments] = useState<any[]>([]);
  const [cursor, setCursor] = useState<any>();

  const { data: dataGetListCommentsByPost, refetch: refetchGetListCommentsByPost } = useGetListCommentsByPost(
    postId,
    cursor,
  );

  // load thêm 10 comments
  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 1) {
      refetchGetListCommentsByPost();
    }
  };

  // thêm 10 comments mới load vào mảng
  useEffect(() => {
    if (dataGetListCommentsByPost) {
      setTimeout(() => {
        setArrComments((prevComments) => [...prevComments, ...dataGetListCommentsByPost]);
      }, 1000);
    }
  }, [dataGetListCommentsByPost]);

  // Cập nhật cursor với id cuối
  useEffect(() => {
    if (arrComments.length > 0) {
      setCursor(arrComments[arrComments.length - 1].id);
    }
  }, [arrComments]);

  // kết nối socket khi mở modal comment
  useEffect(() => {
    if (postId) {
      // socketConfig.connect();
      socketConfig.emit('join_comment', postId);
    }
  }, [postId]);

  const handleCreateComment = () => {
    if (content) {
      socketConfig.emit('sendComment', { userId: userId, postId: postId, content: content });
      setContent('');
    }
  };

  // nhận sự kiện newComment từ server sau khi comment
  useEffect(() => {
    if (postId) {
      socketConfig.on('newComment', (newComment: any) => {
        setArrComments((prevComments) => [...prevComments, newComment]);
      });
    }

    return () => {
      socketConfig.off('newComment');
    };
  }, [postId]);

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
      <div className="list-post-comments" onScroll={handleScroll}>
        <List
          dataSource={arrComments}
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
      </div>

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
            <RightOutlined />
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CommentModal;
