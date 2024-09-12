import React from 'react';
import { Card, Avatar, Image } from 'antd';
import { LikeOutlined, CommentOutlined, ShareAltOutlined } from '@ant-design/icons';
import './index.scss';

const { Meta } = Card;

const PostCard: React.FC = () => {
  return (
    <Card
      className="post-card"
      style={{ marginBottom: 16 }}
      actions={[<LikeOutlined key="like" />, <CommentOutlined key="comment" />, <ShareAltOutlined key="share" />]}
    >
      <Meta
        avatar={<Avatar className="post-card-avatar" src="https://example.com/avatar.png" />}
        title="Nguyễn Văn A"
        description="Đang cảm thấy tuyệt vời!"
      />
      <Image style={{ marginTop: 16 }} src="https://example.com/post-image.png" />
    </Card>
  );
};

export default PostCard;
