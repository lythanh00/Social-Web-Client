import React, { useEffect, useState } from 'react';
import { Card, Avatar, Image } from 'antd';
import { LikeOutlined, CommentOutlined, ShareAltOutlined } from '@ant-design/icons';
import './index.scss';
import { formatDistanceToNow } from 'date-fns';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { useLikePost, useUnLikePost } from '../../../apis/Likes';
import { socketConfig } from '../../../socket';
import CommentModal from '../../CommentModal';

const { Meta } = Card;

interface Props {
  post: any;
}

const OtherProfilePostCard: React.FC<Props> = (props: Props) => {
  const { post } = props;
  const timeAgo = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true });
  const [isLike, setIsLike] = useState<boolean>(false);
  const otherProfile = useSelector((state: RootState) => state.profile.otherProfile);
  const profile = useSelector((state: RootState) => state.profile.profile);
  const { mutate: likePost } = useLikePost();
  const { mutate: unLikePost } = useUnLikePost();
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

  useEffect(() => {
    if (post.likes?.some((like: any) => like.user.id === profile.userId)) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  }, [post, profile.userId]);

  const handleLikeClick = () => {
    if (isLike) {
      unLikePost(post.id);
      setIsLike(false);
    } else {
      likePost(post.id);
      setIsLike(true);
    }
  };

  const handleCommentClick = () => {
    setIsCommentModalOpen(true);
  };

  const handleCommentModalClose = () => {
    setIsCommentModalOpen(false);
    socketConfig.disconnect();
  };

  return (
    <Card
      className="post-card"
      actions={[
        <span key="like" className="like-comment-share-text" onClick={() => handleLikeClick()}>
          {isLike ? (
            <>
              <LikeOutlined style={{ color: 'blue' }} /> <span className="text-blue-600">Đã Thích</span>
            </>
          ) : (
            <>
              <LikeOutlined /> <span>Thích</span>
            </>
          )}
        </span>,
        <span key="comment" className="like-comment-share-text" onClick={() => handleCommentClick()}>
          <CommentOutlined /> Bình luận
        </span>,
        <span key="share" className="like-comment-share-text">
          <ShareAltOutlined /> Chia sẻ
        </span>,
      ]}
    >
      {isCommentModalOpen && (
        <CommentModal
          open={isCommentModalOpen}
          onClose={handleCommentModalClose}
          name={otherProfile.lastName + ' ' + otherProfile.firstName}
          avatarOwner={profile.avatar.url}
          postId={post.id}
          post={post}
          userId={profile.userId}
        />
      )}
      <Meta
        className="post-card-meta"
        avatar={<Avatar className="post-card-meta-avatar" src={otherProfile.avatar.url} />}
        title={
          <div className="post-card-meta-name-time">
            <p className="post-card-meta-name">{otherProfile.lastName + ' ' + otherProfile.firstName}</p>
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

export default OtherProfilePostCard;
