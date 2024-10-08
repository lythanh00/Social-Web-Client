import React from 'react';
import { Card, Avatar, Image } from 'antd';
import { LikeOutlined, CommentOutlined, ShareAltOutlined } from '@ant-design/icons';
import './index.scss';
import { formatDistanceToNow } from 'date-fns';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

const { Meta } = Card;

interface Props {
  post: any;
}

const ProfilePostCard: React.FC<Props> = (props: Props) => {
  const { post } = props;
  const timeAgo = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true });
  const profile = useSelector((state: RootState) => state.profile.profile);

  return (
    <Card
      className="post-card"
      actions={[<LikeOutlined key="like" />, <CommentOutlined key="comment" />, <ShareAltOutlined key="share" />]}
    >
      <Meta
        className="post-card-meta"
        avatar={<Avatar className="post-card-meta-avatar" src={profile.avatar.url} />}
        title={
          <div className="post-card-meta-name-time">
            <p className="post-card-meta-name">{profile.lastName + ' ' + profile.firstName}</p>
            <span className="post-card-meta-time">{timeAgo}</span>
          </div>
        }
      />

      <p className="post-card-content">{post.content}</p>

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

export default ProfilePostCard;
