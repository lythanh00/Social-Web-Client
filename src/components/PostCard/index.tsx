import React from 'react';
import { Card, Avatar, Image } from 'antd';
import { LikeOutlined, CommentOutlined, ShareAltOutlined } from '@ant-design/icons';
import './index.scss';
import testImage from '../../assets/test-image.jpg';

const { Meta } = Card;

interface Props {
  post: any;
}

const PostCard: React.FC<Props> = (props: Props) => {
  const { post } = props;
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
      <p>{post.content}</p>
      {/* Render danh sách hình ảnh */}
      {post.images && post.images.length > 0 && (
        <div className="post-card-images">
          {post.images.map((image: any) => (
            <Image key={image.id} className="post-card-image" src={image.url} alt={`Post image ${image.id}`} />
          ))}
        </div>
      )}
    </Card>
  );
};

export default PostCard;
