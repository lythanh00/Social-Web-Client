import React from 'react';
import './index.scss';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../../store';
import { Avatar, Button, message, UploadProps } from 'antd';
import Upload from 'antd/es/upload';
import { CameraOutlined } from '@ant-design/icons';
import { useGetProfile } from '../../../apis/Profiles';
import { useCountFriendsByOwner } from '../../../apis/User-Friends';
import { setProfile } from '../../../store/profileSlice';

const ProfileInfo: React.FC = () => {
  const profile = useSelector((state: RootState) => state.profile.profile);
  const { refetch: refetchDataProfile } = useGetProfile();
  const { data: dataCountFriends } = useCountFriendsByOwner();
  const dispatch = useAppDispatch();

  const propsCoverPhoto: UploadProps = {
    name: 'coverphoto-profile',
    action: `${process.env.REACT_APP_API_URL}/profiles/update-coverphoto-profile`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    showUploadList: false,
    onChange(info) {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        refetchDataProfile().then((res) => {
          dispatch(setProfile(res?.data?.data as any));
        });
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const propsAvatar: UploadProps = {
    name: 'avatar-profile',
    action: `${process.env.REACT_APP_API_URL}/profiles/update-avatar-profile`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    showUploadList: false,
    onChange(info) {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        refetchDataProfile().then((res) => {
          dispatch(setProfile(res?.data?.data as any));
        });
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div className="profile-info">
      <div className="relative">
        <img
          src={profile.coverPhoto.url} // Thay bằng ảnh bìa của bạn
          alt="cover-photo"
          className="profile-info-cover-photo"
        />

        <Upload {...propsCoverPhoto} className="upload-profile-coverphoto">
          <Button icon={<CameraOutlined />}>Chỉnh sửa ảnh bìa</Button>
        </Upload>
      </div>

      <div className="profile-info-avatar-name">
        <div className="relative">
          <Avatar
            src={profile.avatar.url} // Thay bằng ảnh đại diện của bạn
            alt="avatar"
            className="profile-info-avatar "
          />
          <Upload {...propsAvatar} className="upload-profile-avatar">
            <Button icon={<CameraOutlined />} />
          </Upload>
        </div>
        <div className="ml-4">
          <h1 className="text-3xl font-bold">{profile.lastName + ' ' + profile.firstName}</h1>
          <p className="text-gray-600 font-medium">{dataCountFriends} người bạn</p>
        </div>
      </div>
      <hr className="border-gray-300 mt-4 mb-4" />
    </div>
  );
};

export default ProfileInfo;
