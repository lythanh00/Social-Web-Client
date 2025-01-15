import React, { useEffect, useState } from 'react';
import { Modal, Avatar, List } from 'antd';

import './index.scss';
import { LikeOutlined } from '@ant-design/icons';
import { useGetListLikesByPost } from '../../apis/Likes';

interface LikeModalProps {
  open: boolean;
  onClose: () => void;
  postId: number;
}

const LikeModal: React.FC<LikeModalProps> = ({ open, onClose, postId }) => {
  const [arrLikes, setArrLikes] = useState<any[]>([]);
  const [cursor, setCursor] = useState<any>();

  const { data: dataGetListLikesByPost, refetch: refetchGetListLikesByPost } = useGetListLikesByPost(postId, cursor);

  // load thêm 10 likes
  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 1) {
      refetchGetListLikesByPost();
    }
  };

  // thêm 10 likes mới load vào mảng
  useEffect(() => {
    if (dataGetListLikesByPost) {
      setTimeout(() => {
        setArrLikes((prevLikes) => [...prevLikes, ...dataGetListLikesByPost]);
      }, 1000);
    }
  }, [dataGetListLikesByPost]);

  // Cập nhật cursor với id cuối
  useEffect(() => {
    if (arrLikes.length > 0) {
      setCursor(arrLikes[arrLikes.length - 1].id);
    }
  }, [arrLikes]);

  return (
    <Modal
      open={open}
      onOk={onClose}
      onCancel={onClose}
      footer={null}
      width={600}
      title={
        <div className="like-modal-title">
          <LikeOutlined style={{ color: 'blue' }} />
          <LikeOutlined style={{ color: 'blue' }} />
          <LikeOutlined style={{ color: 'blue' }} />
        </div>
      }
    >
      <div className="list-post-likes" onScroll={handleScroll}>
        <List
          dataSource={arrLikes}
          renderItem={(item: any) => (
            <List.Item className="post-like-item">
              <Avatar src={item.user.profile.avatar.url} className="post-like-item-avatar" />
              <span className="font-medium">{item.user.profile.lastName + ' ' + item.user.profile.firstName}</span>
            </List.Item>
          )}
        />
      </div>
    </Modal>
  );
};

export default LikeModal;
