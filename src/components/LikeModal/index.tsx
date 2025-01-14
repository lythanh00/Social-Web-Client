import React, { useEffect, useState } from 'react';
import { Button, Input, Modal, Form, Avatar, List } from 'antd';

import './index.scss';
import { RightOutlined } from '@ant-design/icons';
import { useGetListCommentsByPost } from '../../apis/Comments';
import { socketConfig } from '../../socket';

interface LikeModalProps {
  open: boolean;
  onClose: () => void;
  name: string;
  avatarOwner: string;
  postId: number;
  post: any;
  userId: number | null;
}

const LikeModal: React.FC<LikeModalProps> = ({ open, onClose, name, avatarOwner, postId, post, userId }) => {
  return <div></div>;
};

export default LikeModal;
