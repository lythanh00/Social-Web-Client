import React, { useEffect } from 'react';
import './index.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

{
  /* Phần Ảnh Bìa và Ảnh Đại Diện */
}
const ProfileInfo: React.FC = () => {
  const profile = useSelector((state: RootState) => state.profile.profile);
  return (
    <div className="profile-info">
      <img
        src={profile.coverPhoto.url} // Thay bằng ảnh bìa của bạn
        alt="cover-photo"
        className="profile-info-cover-photo"
      />
      <div className="profile-info-avatar-name">
        <img
          src={profile.avatar.url} // Thay bằng ảnh đại diện của bạn
          alt="avatar"
          className="profile-info-avatar "
        />
        <div className="ml-4">
          <h1 className="text-3xl font-bold">{profile.lastName + ' ' + profile.firstName}</h1>
          <p className="text-gray-600">77 người bạn</p>
        </div>
      </div>
      <hr className="border-gray-300 mt-4 mb-4" />
    </div>
  );
};

export default ProfileInfo;
