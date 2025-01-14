import React, { useEffect, useState } from 'react';
import { Card, Avatar, Image } from 'antd';
import { LikeOutlined, CommentOutlined, ShareAltOutlined } from '@ant-design/icons';
import './index.scss';
import { formatDistanceToNow } from 'date-fns';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { useLikePost, useUnLikePost } from '../../../apis/Likes';
import { useNavigate } from 'react-router-dom';
import { CLIENT_ROUTE_PATH } from '../../../constant/routes';
import CommentModal from '../../CommentModal';
import { socketConfig } from '../../../socket';

const { Meta } = Card;

interface Props {
  post: any;
}

const HomePostCard: React.FC<Props> = (props: Props) => {
  const { post } = props;
  const timeAgo = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true });
  const [isLike, setIsLike] = useState<boolean>(false);
  const profile = useSelector((state: RootState) => state.profile.profile);
  const navigate = useNavigate();
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
          name={post.user.profile.lastName + ' ' + post.user.profile.firstName}
          avatarOwner={profile.avatar.url}
          postId={post.id}
          post={post}
          userId={profile.userId}
        />
      )}
      <Meta
        className="post-card-meta"
        avatar={
          <Avatar
            className="post-card-meta-avatar"
            src={post.user.profile.avatar.url}
            onClick={() => navigate(`${CLIENT_ROUTE_PATH.OTHERPROFILE}?userId=${post.user.id}`)}
          />
        }
        title={
          <div className="post-card-meta-name-time">
            <p
              className="post-card-meta-name"
              onClick={() => navigate(`${CLIENT_ROUTE_PATH.OTHERPROFILE}?userId=${post.user.id}`)}
            >
              {post.user.profile.lastName + ' ' + post.user.profile.firstName}
            </p>
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

      <span className="like-count">
        <LikeOutlined style={{ color: 'blue' }} />
        <LikeOutlined style={{ color: 'blue' }} />
        <LikeOutlined style={{ color: 'blue' }} /> {post.likes?.length || 0}
      </span>
    </Card>
  );
};

export default HomePostCard;
