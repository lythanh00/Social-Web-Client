import React from 'react';
import { Card, Avatar, Image } from 'antd';
import { LikeOutlined, CommentOutlined, ShareAltOutlined } from '@ant-design/icons';
import './index.scss';
import testImage from '../../assets/test-image.jpg';

const { Meta } = Card;

const PostCard: React.FC = () => {
  return (
    <Card
      className="post-card"
      actions={[<LikeOutlined key="like" />, <CommentOutlined key="comment" />, <ShareAltOutlined key="share" />]}
    >
      <Meta
        className="post-card-meta"
        avatar={<Avatar className="post-card-meta-avatar" src={testImage} />}
        title={
          <div className="post-card-meta-name-time">
            <p className="post-card-meta-name">
              Thạch Sinh Thạch Sinh Thạch Sinh Thạch Sinh Thạch Sinh Thạch Sinh Thạch Sinh Thạch Sinh Thạch Sinh Thạch
              Sinh
            </p>
            <span className="post-card-meta-time">1 giờ</span>
          </div>
        }
      />
      <p>
        Đang cảm thấy tuyệt vời!Đang cảm thấy tuyệt vời!Đang cảm thấy tuyệt vời!Đang cảm thấy tuyệt vời!Đang cảm thấy
        tuyệt vời!Đang cảm thấy tuyệt vời!Đang cảm thấy tuyệt vời!Đang cảm thấy tuyệt vời!
      </p>
      <Image className="post-card-image" src={testImage} />
    </Card>
  );
};

export default PostCard;
